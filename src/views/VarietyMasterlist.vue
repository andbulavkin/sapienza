<template>
    <div class="dashboard">
        <Sidebar />
        <div class="content">
            <Header tabName="Cultivar Masterlist" />

            <div class="subsrate-content">
                <div
                    class="tab-content"
                    id="pills-tabContent"
                >
                    <div
                        class="tab-pane fade show active"
                        id="pills-Flower"
                        role="tabpanel"
                        aria-labelledby="pills-Flower-tab"
                    >
                        <div class="table-responsive">
                            <b-table
                                :items="items"
                                :fields="fields"
                                id="FlowerTable"
                                small
                            >
                                <template #cell(cultivar)="data">
                                    <span v-if="selectedRow[data.index]">
                                        <b-form-input
                                            v-model="items[data.index].cultivar"
                                            placeholder="Cultivar"
                                            :class="errors.cultivar?'errorMsg':''"
                                            @input="checkChangeData()"
                                        ></b-form-input>
                                    </span>
                                    <span v-else>{{ data.value }}</span>
                                </template>

                                <template #cell(archive)="data">
                                    <span v-if="selectedRow[data.index]">
                                        <b-form-select
                                            v-model="items[data.index].archive"
                                            :options="options"
                                        >
                                        </b-form-select>
                                    </span>
                                    <span v-else>{{ data.value?"Archive":"Active" }}</span>
                                </template>

                                <template #cell(actions)="data">
                                    <b-button class="bg-transparent border-0">
                                        <div class="d-flex">
                                            <span
                                                v-if="!selectedRow[data.index]"
                                                @click="edit(data.index)"
                                            >
                                                <img
                                                    src="./../assets/images/edit-data.svg"
                                                    alt="Edit Row"
                                                />
                                            </span>
                                            <span v-else>
                                                <img
                                                    src="./../assets/images/done.svg"
                                                    alt="Done Row"
                                                    v-on:click="save(data.index)"
                                                />
                                            </span>
                                        </div>
                                    </b-button>
                                    <span
                                        class="pl-1"
                                        v-on:click="openDelete(data.index)"
                                    >
                                        <img
                                            src="./../assets/images/delete-data.svg"
                                            alt="Delete Row"
                                        />
                                    </span>
                                    <span
                                        class="btn btn-sm pl-1 ml-3 duplicate-btn"
                                        v-if="items[data.index].subsrateID"
                                    >
                                        <img
                                            src="./../assets/images/duplicate.svg"
                                            alt="Duplicate Row"
                                            @click="duplicate(data.index)"
                                        />
                                    </span>
                                </template>
                            </b-table>
                        </div>
                        <div class="Flowering-button justify-content-end align-items-end d-blog d-md-flex d-lg-flex">
                            <a
                                href="javascript:void(0)"
                                class="btn btn-primary"
                                @click="add"
                            >
                                Add new Field
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete modal -->
        <div
            class="modal fade"
            id="DeleteField"
            tabindex="-1"
            role="dialog"
            aria-labelledby="DeleteFieldLabel"
            aria-hidden="true"
        >
            <div
                class="modal-dialog modal-dialog-centered"
                role="document"
            >
                <div class="modal-content">
                    <div class="modal-body">
                        <img
                            src="./../assets/images/delete-message.svg"
                            alt="Delete Message"
                        />
                        <h3>Are You sure about deleting this field ?</h3>
                    </div>
                    <div class="modal-footer justify-content-center">
                        <button
                            type="button"
                            class="btn btn-danger"
                            v-on:click="deleteData"
                        >
                            Yes , delete
                        </button>
                        <button
                            type="button"
                            class="btn btn-outline-danger"
                            data-dismiss="modal"
                        >
                            No , Go back
                        </button>
                    </div>
                </div>
            </div>
        </div>
        <!-- Delete modal end -->
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const $ = require("jquery");
window.$ = $;

export default {
    name: "Subrate",
    components: {
        Sidebar,
        Header,
    },
    data() {
        return {
            errors: [],
            fields: [
                {
                    key: "cultivar",
                    label: "Cultivar",
                },
                {
                    key: "archive",
                    label: "Status",
                },
                {
                    key: "actions",
                    label: "Actions",
                }
            ],
            items: [],
            selectedRow: {},
            deleteId: "",
            options: [
                { value: false, text: 'Active' },
                { value: true, text: 'Archive' },
            ],
            leavePage: true,
        };
    },
    methods: {
        getData() {
            this.$http
                .get(this.$apiBaseUrl + "variety-master", {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    this.items = response.data.data;
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        add() {
            if (this.items.length > 0) {
                if (this.items[this.items.length - 1].id != "") {
                    this.items.push({
                        id: "",
                        user_id: "",
                        cultivar: "",
                        archive: false,
                    });
                    this.selectedRow = { [this.items.length - 1]: true };
                }
            } else {
                this.items.push({
                    id: "",
                    user_id: "",
                    cultivar: "",
                    archive: false,
                });
                this.selectedRow = { [0]: true };
            }
        },
        save(index) {
            this.errors = [];
            if (this.items[index].id != "") {
                this.update(index);
            } else {
                this.store(index);
            }
        },
        store(index) {
            this.$http
                .post(
                    this.$apiBaseUrl + "variety-master",
                    this.items[index],
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.selectedRow = {};
                    this.getData();
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
                    this.checkChangeData();
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else if (error.response.status == 422) {
                        this.selectedRow = { [index]: true };
                        this.errors = [];
                        this.errors = error.response.data.errors;
                        let errors = Object.keys(this.errors).map((key) => [this.errors[key]]);
                        let errorMsg = "";
                        if (errors.length > 0) {
                            for (const errorData of errors) {
                                errorMsg += errorData[0] + '<br>';
                            }
                        }
                        this.$toast.error(errorMsg, {
                            position: "top-right",
                        });
                    } else {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        edit(index) {
            this.errors = [];
            this.selectedRow = {
                [index]: true,
            };
            this.checkChangeData();
        },
        update(index) {
            this.$http
                .put(
                    this.$apiBaseUrl + "variety-master/" + this.items[index].id,
                    this.items[index],
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.selectedRow = {};
                    this.getData();
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
                    this.checkChangeData();
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else if (error.response.status == 422) {
                        this.errors = [];
                        this.errors = error.response.data.errors;
                        let errors = Object.keys(this.errors).map((key) => [this.errors[key]]);
                        let errorMsg = "";
                        if (errors.length > 0) {
                            for (const errorData of errors) {
                                errorMsg += errorData[0] + '<br>';
                            }
                        }
                        this.$toast.error(errorMsg, {
                            position: "top-right",
                        });
                    } else {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        openDelete(index) {
            this.deleteId = this.items[index].id;
            $("#DeleteField").modal("show");
        },
        deleteData() {
            if (this.deleteId != "") {
                this.$http
                    .delete(this.$apiBaseUrl + "variety-master/" + this.deleteId, {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    })
                    .then((response) => {
                        this.$toast.success(response.data.message, {
                            position: "top-right",
                        });
                        this.deleteId = "";
                        this.getData();
                    })
                    .catch((error) => {
                        if (error.response.status == 401) {
                            this.unauthenticatedError();
                        } else {
                            this.$toast.error(error.response.data.message, {
                                position: "top-right",
                            });
                        }
                    });
            } else {
                this.getData();
                this.$toast.success("Subsrate Target deleted successfully.", {
                    position: "top-right",
                });
            }
            $("#DeleteField").modal("hide");
        },
        checkChangeData() {
            this.leavePage = true;
            for (let index = 0; index < this.items.length; index++) {
                if (this.selectedRow[index]) {
                    let newItem = this.items[index];
                    if (newItem.id != "") {
                        this.leavePage = false;
                    } else {
                        if (newItem.cultivar != "") {
                            this.leavePage = false;
                            return false;
                        }
                    }
                }
            }
        },
    },
    mounted() {
        this.getData();
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });
    },
    beforeMount() {
        window.addEventListener("beforeunload", event => {
            if (this.leavePage == true) {
                return event.preventDefault()
            } else {
                return event.returnValue = ""
            }
        })
    },
    beforeRouteLeave(to, from, next) {
        if (this.leavePage == false) {
            const leavePage = window.confirm('Changes you made may not be saved.')
            if (leavePage == true) {
                next()
            } else {
                next(false)
            }
        } else {
            next();
        }
    },
};
</script>
