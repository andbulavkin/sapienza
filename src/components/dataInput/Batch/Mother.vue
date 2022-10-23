<template>
    <div class="subsrate-content">
        <div class="search-box">
            <div class="edit-row">
                <!-- <span>
                    <img
                        src="./../../../assets/images/edit-row.svg"
                        alt="edit-row"
                    />
                    Double Click Row to edit.
                </span> -->
            </div>
            <!-- Search -->
            <div class="search-input">
                <input
                    type="text"
                    placeholder="Search"
                    class="form-control"
                    v-model="searchTerm"
                    v-on:keyup.enter="getData"
                />
                <span>
                    <img
                        src="./../../../assets/images/search.svg"
                        alt="search"
                    />
                </span>
            </div>
            <!-- Search end -->
        </div>
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
                        <template #cell(comparment)="data">
                            <span v-if="selectedRow[data.index]">
                                <v-select
                                    v-model="items[data.index].comparmentNo"
                                    :options="comparments"
                                    :placeholder="'Select '+ userDetail.growUnit"
                                    :class="errors.comparmentNo?'errorMsg':''"
                                    :reduce="comparments => comparments.code"
                                ></v-select>
                            </span>
                            <span v-else>
                                {{ items[data.index].comparmentNo }}
                            </span>
                        </template>
                        <template #cell(batchID)="data">
                            <span v-if="selectedRow[data.index]">
                                <b-form-input
                                    type="text"
                                    v-model="items[data.index].batchID"
                                    placeholder="Batch ID"
                                    :class="errors.batchID?'errorMsg':''"
                                ></b-form-input>
                            </span>
                            <span v-else>{{ data.value }}</span>
                        </template>
                        <template #cell(cultivar)="data">
                            <v-select
                                v-model="items[data.index].cultivar"
                                :options="cultivars"
                                placeholder="Cultivar"
                                :class="errors.comparmentNo?'errorMsg':''"
                                :reduce="cultivar => cultivar.code"
                                v-if="selectedRow[data.index]"
                            ></v-select>
                            <span v-else>{{ data.value }}</span>
                        </template>
                        <template #cell(plantingDate)="data">
                            <b-input-group v-if="selectedRow[data.index]">
                                <b-form-input
                                    id="example-input"
                                    v-model="items[data.index].plantingDate"
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    autocomplete="off"
                                    :class="errors.plantingDate?'errorMsg':''"
                                    :max="maxDate"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker
                                        v-model="items[data.index].plantingDate"
                                        button-only
                                        right
                                        aria-controls="example-input"
                                        :max="maxDate"
                                    ></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                            <span v-else>{{ format_date(data.value,'DD MMM, YYYY') }}</span>
                        </template>
                        <template #cell(cullDate)="data">
                            <b-input-group v-if="selectedRow[data.index]">
                                <b-form-input
                                    id="example-input"
                                    v-model="items[data.index].cullDate"
                                    type="date"
                                    placeholder="YYYY-MM-DD"
                                    autocomplete="off"
                                    :class="errors.cullDate?'errorMsg':''"
                                    :min="items[data.index].plantingDate"
                                    :max="maxDate"
                                ></b-form-input>
                                <b-input-group-append>
                                    <b-form-datepicker
                                        v-model="items[data.index].cullDate"
                                        button-only
                                        right
                                        aria-controls="example-input"
                                        :min="items[data.index].plantingDate"
                                        :max="maxDate"
                                    ></b-form-datepicker>
                                </b-input-group-append>
                            </b-input-group>
                            <span v-else>{{ format_date(data.value,'DD MMM, YYYY') }}</span>
                        </template>
                        <template #cell(edit)="data">
                            <b-button class="bg-transparent border-0">
                                <div class="d-flex">
                                    <span
                                        v-if="!selectedRow[data.index]"
                                        v-on:click="edit(data.index)"
                                    >
                                        <img
                                            src="./../../../assets/images/edit-data.svg"
                                            alt="Edit Row"
                                        />
                                    </span>
                                    <span
                                        v-else
                                        v-on:click="save(data.index)"
                                    >
                                        <img
                                            src="./../../../assets/images/done.svg"
                                            alt="Done Row"
                                        />
                                    </span>
                                </div>
                            </b-button>
                        </template>
                        <template #cell(delete)="data">
                            <span
                                class="pl-1"
                                v-if="!selectedRow[data.index]"
                                v-on:click="openDelete(data.index, 'editDelete')"
                            >
                                <img
                                    src="./../../../assets/images/delete-data.svg"
                                    alt="Delete Row"
                                />
                            </span>
                            <span
                                class="pl-1"
                                v-else
                                v-on:click="cleareditData(data.index)"
                            >
                                <img
                                    src="./../../../assets/images/delete-data.svg"
                                    alt="Delete Row"
                                />
                            </span>
                        </template>
                        <template #cell(duplicate)="data">
                            <span
                                class="btn btn-sm pl-1 ml-3 duplicate-btn"
                                v-if="items[data.index].id"
                            >
                                <img
                                    src="./../../../assets/images/duplicate.svg"
                                    alt="Duplicate Row"
                                    @click="duplicate(data.index)"
                                />
                            </span>
                        </template>

                        <!-- Add rows -->
                        <template
                            #custom-foot="{}"
                            v-if="addRows.length > 0"
                        >
                            <b-tr
                                v-for="(addRow, index) in addRows"
                                :key="addRow+index"
                            >
                                <b-td>
                                    <v-select
                                        v-model="addRows[index].comparmentNo"
                                        :options="comparments"
                                        :placeholder="'Select '+ userDetail.growUnit"
                                        :class="errors[index] && errors[index].comparmentNo?'errorMsg':''"
                                        :reduce="comparments => comparments.code"
                                        @input="checkChangeData()"
                                    ></v-select>
                                </b-td>
                                <b-td>
                                    <b-form-input
                                        type="text"
                                        v-model="addRows[index].batchID"
                                        placeholder="Batch ID"
                                        :class="errors[index] && errors[index].batchID?'errorMsg':''"
                                        @keyup="checkChangeData"
                                        v-on:blur="getBatchSuggestion(index)"
                                    ></b-form-input>
                                </b-td>
                                <b-td>
                                    <v-select
                                        v-model="addRows[index].cultivar"
                                        :options="cultivars"
                                        placeholder="Cultivar"
                                        :class="errors[index] && errors[index].cultivar?'errorMsg':''"
                                        :reduce="cultivar => cultivar.code"
                                        @input="checkChangeData()"
                                    ></v-select>
                                </b-td>
                                <b-td>
                                    <b-input-group>
                                        <b-form-input
                                            id="example-input"
                                            v-model="addRows[index].plantingDate"
                                            type="date"
                                            placeholder="YYYY-MM-DD"
                                            autocomplete="off"
                                            :class="errors[index] && errors[index].plantingDate?'errorMsg':''"
                                            :max="maxDate"
                                            @input="checkChangeData()"
                                        ></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker
                                                v-model="addRows[index].plantingDate"
                                                button-only
                                                right
                                                aria-controls="example-input"
                                                :max="maxDate"
                                                @input="checkChangeData()"
                                            ></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-td>
                                <b-td>
                                    <b-input-group>
                                        <b-form-input
                                            id="example-input"
                                            v-model="addRows[index].cullDate"
                                            type="date"
                                            :min="addRows[index].plantingDate"
                                            placeholder="YYYY-MM-DD"
                                            autocomplete="off"
                                            :max="maxDate"
                                            @input="checkChangeData()"
                                        ></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker
                                                v-model="addRows[index].cullDate"
                                                button-only
                                                right
                                                aria-controls="example-input"
                                                :min="addRows[index].plantingDate"
                                                :max="maxDate"
                                                @input="checkChangeData()"
                                            ></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                </b-td>
                                <b-td>
                                    <b-button class="bg-transparent border-0">
                                        <div class="d-flex">
                                            <span v-on:click="store(addRows[index], index)">
                                                <img
                                                    src="./../../../assets/images/done.svg"
                                                    alt="Done Row"
                                                />
                                            </span>
                                        </div>
                                    </b-button>
                                </b-td>
                                <b-td>
                                    <span
                                        class="pl-1"
                                        v-on:click="clearAddData(index)"
                                    >
                                        <img
                                            src="./../../../assets/images/delete-data.svg"
                                            alt="Delete Row"
                                        />
                                    </span>
                                </b-td>
                            </b-tr>
                        </template>
                        <!-- End add rows -->
                    </b-table>
                </div>
                <!-- Add/Duplicate button -->
                <div class="Flowering-button justify-content-end align-items-end d-blog d-md-flex d-lg-flex">
                    <a
                        href="javascript:void(0)"
                        class="btn btn-primary"
                        v-on:click="add"
                    >
                        Add new Field
                    </a>
                    <a
                        href="javascript:void(0)"
                        class="btn btn-success mt-3 mt-md-0 mt-lg-0"
                        v-on:click="duplicate(items.length - 1)"
                    >
                        Duplicate Last Field
                    </a>
                </div>
                <!-- Add/Duplicate button end -->
            </div>
        </div>

        <!-- Delete model -->
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
                            src="./../../../assets/images/delete-message.svg"
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
        <!-- Delete model end -->
    </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;

export default {
    name: "Mother",
    props: ["userDetail"],
    data() {
        return {
            searchTerm: "",
            type: "Mother",
            fields: [
                {
                    key: "comparment",
                    label: this.userDetails().growUnit,
                },
                {
                    key: "batchID",
                    label: "Batch ID",
                    class: 'px-1'
                },
                {
                    key: "cultivar",
                    label: "Cultivar",
                    class: 'px-1'
                },
                {
                    key: "plantingDate",
                    label: "Planting Date",
                    class: 'px-1'
                },
                {
                    key: "cullDate",
                    label: "Cull Date",
                    class: 'px-1'
                },
                {
                    key: "edit",
                    label: "",
                    class: 'px-1'
                },
                {
                    key: "delete",
                    label: "",
                    class: 'px-1'
                },
                {
                    key: "duplicate",
                    label: "",
                    class: 'px-1'
                },
            ],
            items: [],
            selectedRow: {},
            comparments: [],
            errors: [],
            cultivars: [],
            addRows: [],
            deleteId: "",
            deleteType: "",
            maxDate: ""
        };
    },
    methods: {
        add() {
            this.addRows.push({
                id: "",
                userID: "",
                comparment: this.type,
                comparmentNo: null,
                batchID: "",
                cultivar: null,
                plantingDate: "",
                triggerDate: "",
                harvestDate: "",
                transplantDate: "",
                cloneDate: "",
                cullDate: "",
            });
        },
        duplicate(index) {
            var duplicateData = this.items[index];
            this.addRows.push({
                id: "",
                userID: "",
                comparment: duplicateData.comparment,
                comparmentNo: duplicateData.comparmentNo,
                batchID: duplicateData.batchID,
                cultivar: duplicateData.cultivar,
                plantingDate: duplicateData.plantingDate,
                triggerDate: duplicateData.triggerDate,
                harvestDate: duplicateData.harvestDate,
                transplantDate: duplicateData.transplantDate,
                cloneDate: duplicateData.cloneDate,
                cullDate: duplicateData.cullDate,
            });
        },
        getData() {
            this.selectedRow = {};
            this.$http
                .post(
                    this.$apiBaseUrl + "batch/" + this.type,
                    {
                        search: this.searchTerm,
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
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
        removeEmpty() {
            if (
                this.items[this.items.length - 1] &&
                this.items[this.items.length - 1].id == ""
            ) {
                this.items.pop();
            }
        },
        save(id) {
            this.errors = [];
            if (this.items[id].id != "") {
                this.update(id);
            } else {
                this.store(id);
            }
        },
        store(storeData, index) {
            this.$http
                .post(this.$apiBaseUrl + "batch", storeData, {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    this.getData();
                    this.addRows.splice(index, 1);
                    this.errors = [];
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
                        this.errors[index] = error.response.data.errors;
                        let errors = Object.keys(this.errors[index]).map((key) => [this.errors[index][key]]);
                        if (errors.length > 0) {
                            let errorMsg = "";
                            for (const errorData of errors) {
                                errorMsg += errorData[0] + '<br>';
                            }
                            this.$toast.error(errorMsg, {
                                position: "top-right",
                            });
                        }
                    } else {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        edit(index) {
            this.removeEmpty();
            this.errors = [];
            this.selectedRow = {
                [index]: !this.selectedRow[index],
            };
            this.checkChangeData();
        },
        update(index) {
            this.$http
                .put(
                    this.$apiBaseUrl + "batch/" + this.items[index].id,
                    this.items[index],
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.getData();
                    this.getCultivar();
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
                    this.checkChangeData();
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else {
                        this.selectedRow = { [index]: true };
                        this.errors = [];
                        this.errors = error.response.data.errors;
                        let errors = Object.keys(this.errors).map((key) => [this.errors[key]]);
                        if (errors.length > 0) {
                            let errorMsg = "";
                            for (const errorData of errors) {
                                errorMsg += errorData[0] + '<br>';
                            }
                            this.$toast.error(errorMsg, {
                                position: "top-right",
                            });
                        }
                    }
                });
        },
        openDelete(id, deleteType) {
            this.deleteId = this.items[id].id;
            this.deleteType = deleteType;
            $("#DeleteField").modal("show");
        },
        deleteData() {
            this.errors = [];
            if (this.deleteType != "editDelete") {
                this.addRows.splice(this.deleteType, 1);
                this.$toast.success("Batch deleted successfully.", {
                    position: "top-right",
                });
            } else {
                this.$http
                    .delete(this.$apiBaseUrl + "batch/" + this.deleteId, {
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
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    });
            }
            $("#DeleteField").modal("hide");
        },
        getCultivar() {
            this.cultivars = [];
            this.$http
                .get(this.$apiBaseUrl + "variety-master?status=0", {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    for (let index = 0; index < response.data.data.length; index++) {
                        this.cultivars.push({
                            label: response.data.data[index].cultivar,
                            code: response.data.data[index].cultivar,
                        });
                    }
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                });
        },
        clearAddData(index) {
            this.addRows[index].comparmentNo = "";
            this.addRows[index].batchID = "";
            this.addRows[index].cultivar = "";
            this.addRows[index].plantingDate = "";
            this.addRows[index].cullDate = "";
        },
        cleareditData(index) {
            this.items[index].comparmentNo = "";
            this.items[index].batchID = "";
            this.items[index].cultivar = "";
            this.items[index].plantingDate = "";
            this.items[index].cullDate = "";
        },
        checkChangeData() {
            this.$parent.leavePage = true;
            if ($.isEmptyObject(this.selectedRow) == false) {
                this.$parent.leavePage = false;
            }
            for (let newItem of this.addRows) {
                console.log(newItem);
                if (newItem.comparmentNo != null) {
                    this.$parent.leavePage = false;
                    return false;
                }
                if (newItem.batchID != "") {
                    this.$parent.leavePage = false;
                    return false;
                }
                if (newItem.cultivar != null) {
                    this.$parent.leavePage = false;
                    return false;
                }
                if (newItem.plantingDate != "") {
                    this.$parent.leavePage = false;
                    return false;
                }
                if (newItem.cullDate != "") {
                    this.$parent.leavePage = false;
                    return false;
                }
            }

        },
        getBatchSuggestion(index) {
            this.$http
                .post(this.$apiBaseUrl + "batch-suggestion",
                    {
                        'search': this.addRows[index].batchID,
                        'comparment': 'Clone'
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    })
                .then((response) => {
                    if (response.data.data) {
                        for (let i = 0; i < response.data.data.length; index++) {
                            let $data = response.data.data[i];
                            if($data.comparment == 'Clone'){
                                this.addRows[index].plantingDate = response.data.data[i].transplantDate;
                            }
                            this.addRows[index].cultivar = response.data.data[0].cultivar;
                        }
                    }
                    // if(response.data.data){
                    //     this.addRows[index].cultivar = response.data.data.cultivar;
                    //     this.addRows[index].plantingDate = response.data.data.plantingDate;
                    //     this.addRows[index].cullDate = response.data.data.cullDate;
                    // }   
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                });
        }
    },
    mounted() {
        this.getData();
        this.getCultivar();
        for (let index = 1; index <= this.userDetails().mother; index++) {
            this.comparments.push({
                label: this.userDetail.growUnit + " " + index,
                code: index,
            });
        }
        var d = new Date();
        this.maxDate = this.format_date(d, 'YYYY-MM-DD');
    },
};
</script>

<style scoped>
.search-input {
    width: 40% !important;
}
</style>