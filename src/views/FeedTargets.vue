<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header tabName="Feed EC/pH targets" />
            <!-- Header end -->

            <!-- Batch comparment -->
            <div
                class="select-comparment"
                style="padding: 10px 48px 0px 48px;"
            >
                <h3 class="m-0">Select {{ this.userDetails().growUnit }}</h3>
                <ul
                    class="nav nav-pills"
                    id="pills-tab"
                    role="tablist"
                >
                    <li
                        class="nav-item"
                        v-for="type in types"
                        :key="type.name"
                    >
                        <a
                            :class="type.class"
                            id="pills-Flower-tab"
                            data-toggle="pill"
                            href="#pills-Vegetative"
                            role="tab"
                            aria-controls="pills-Vegetative"
                            :aria-selected="type.selecetd"
                            v-on:click="changeType(type.name)"
                        >
                            {{ type.name }}
                        </a>
                    </li>
                </ul>
            </div>
            <!-- Batch comparment end -->
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
                    <div class="subsrate-content">
                        <div class="subsrate-filter mb-2">
                            <!-- Filter -->
                            <div class="filter dropdown">
                                <a
                                    href="#"
                                    id="dropdownMenuButton"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                    class="btn btn-primary"
                                >
                                    Filter
                                    <img
                                        src="./../assets/images/filter.svg"
                                        alt="Filter"
                                    >
                                </a>
                                <div
                                    aria-labelledby="dropdownMenuButton"
                                    class="dropdown-menu dropdown-menu-right"
                                    style=""
                                >
                                    <div class="d-flex align-items-center justify-content-between mb-3">
                                        <h3 class="m-0 p-0">Filter data</h3>
                                        <a class="text-danger m-0 p-0">Close</a>
                                    </div>
                                    <div class="filter-date">
                                        <form class="form">
                                            <div class="form-group d-flex">
                                                <label class="filter-title">By Date</label>
                                                <ul
                                                    id="pills-tab"
                                                    role="tablist"
                                                    class="nav nav-pills"
                                                >
                                                    <input
                                                        type="date"
                                                        placeholder="Enter Custom date"
                                                        v-model="cutomDate"
                                                    >
                                                </ul>
                                            </div>
                                            <div
                                                id="pills-tabContent"
                                                class="tab-content"
                                            >
                                                <div
                                                    role="tabpanel"
                                                    aria-labelledby="pills-lastmonthbatch-tab"
                                                    class="tab-pane fade show active"
                                                >
                                                    <div class="form-inline">
                                                        <label class="filter-title">Show no. of data</label>
                                                        <input
                                                            type="number"
                                                            placeholder="Ex. 10"
                                                            class="form-control"
                                                            v-model="limit"
                                                        >
                                                    </div>
                                                    <div class="form-inline">
                                                        <label class="filter-title">By Cultivar</label>
                                                        <input
                                                            type="text"
                                                            placeholder="Enter Cultivar name"
                                                            class="form-control"
                                                            v-model="byCultivar"
                                                        />
                                                    </div>
                                                </div>
                                            </div>
                                        </form>
                                    </div>
                                    <div class="d-flex align-items-center">
                                        <button
                                            type="button"
                                            class="btn btn-success"
                                            @click="getData"
                                        >
                                            Filter data
                                        </button>
                                        <button
                                            type="button"
                                            class="btn btn-danger ml-3"
                                            @click="clearfilter()"
                                        >
                                            Clear Filters
                                        </button>
                                    </div>
                                </div>
                            </div>
                            <!-- End Filter -->
                        </div>

                        <div class="panel panel-default">
                            <div class="panel-body">
                                <div class="table-responsive">
                                    <table class="table table-condensed table-striped">
                                        <thead>
                                            <tr class="accordion-toggle">
                                                <th>Cultivar</th>
                                                <th>Start Date</th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                                <th></th>
                                            </tr>
                                        </thead>
                                        <tbody
                                            class="accordion"
                                            id="accordionExample"
                                        >
                                            <template v-for="(item, index) in items">
                                                <tr
                                                    class="accordion accordion-toggle"
                                                    :key="'tr1' + item.feedId"
                                                >
                                                    <td>
                                                        <v-select
                                                            v-model="items[index].cultivar"
                                                            :options="cultivars"
                                                            placeholder="Cultivar"
                                                            :class="errors.comparmentNo?'errorMsg':''"
                                                            :reduce="cultivar => cultivar.code"
                                                            v-if="selectedRow[index]"
                                                            @input="checkChangeData()"
                                                        ></v-select>
                                                        <span v-else>{{ items[index].cultivar }}</span>
                                                    </td>
                                                    <td>
                                                        <b-input-group v-if="selectedRow[index]">
                                                            <b-form-input
                                                                id="example-input"
                                                                v-model="items[index].startDate"
                                                                type="date"
                                                                placeholder="YYYY-MM-DD"
                                                                autocomplete="off"
                                                                :class="errors.startDate?'errorMsg':''"
                                                                @input="checkChangeData()"
                                                            ></b-form-input>
                                                            <b-input-group-append>
                                                                <b-form-datepicker
                                                                    v-model="items[index].startDate"
                                                                    button-only
                                                                    right
                                                                    aria-controls="example-input"
                                                                    @input="checkChangeData()"
                                                                ></b-form-datepicker>
                                                            </b-input-group-append>
                                                        </b-input-group>
                                                        <span v-else>
                                                            {{ format_date(items[index].startDate,'DD MMM, YYYY') }}
                                                        </span>
                                                    </td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td></td>
                                                    <td class="text-center">
                                                        <img
                                                            class="rotate collapsed"
                                                            src="./../assets/images/collapse-down.svg"
                                                            alt="collapse icon"
                                                            data-toggle="collapse"
                                                            :data-target="'#collapse' + index"
                                                            aria-expanded="true"
                                                            :aria-controls="'collapse' + index"
                                                            :id="'collapseBtn' + index"
                                                            v-on:click="OpenSub(index)"
                                                            v-if="items[index].feedId != ''"
                                                        />
                                                    </td>
                                                    <td class="d-flex">
                                                        <span>
                                                            <span
                                                                v-if="!selectedRow[index]"
                                                                href="#"
                                                                @click="edit(index)"
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
                                                                    v-on:click="save(index)"
                                                                />
                                                            </span>
                                                        </span>
                                                        <a
                                                            href="#"
                                                            class="ml-3"
                                                        >
                                                            <img
                                                                src="./../assets/images/delete-data.svg"
                                                                alt="Delete Row"
                                                                v-on:click=" openDelete(index, 'editDelete')"
                                                            />
                                                        </a>
                                                        <span
                                                            class="btn btn-sm pl-1 ml-3 duplicate-btn"
                                                            v-if="item.feedId"
                                                        >
                                                            <img
                                                                src="./../assets/images/duplicate.svg"
                                                                alt="Duplicate Row"
                                                                @click="duplicate(index)"
                                                            />
                                                        </span>
                                                    </td>
                                                </tr>
                                                <!-- Sub Feed Targets -->
                                                <tr
                                                    :key="'tr2' + item.feedId"
                                                    v-if="items[index].feedId != ''"
                                                >
                                                    <td
                                                        colspan="12"
                                                        class="hiddenRow"
                                                    >
                                                        <div
                                                            :id="'collapse' + index"
                                                            class="collapse"
                                                            aria-labelledby="headingOne"
                                                            data-parent="#accordionExample"
                                                        >
                                                            <SubFeedTargetsTr
                                                                :ParentId="item.feedId"
                                                                v-if="subId == index"
                                                            />
                                                        </div>
                                                    </td>
                                                </tr>
                                                <!-- Sub Feed Targets end -->
                                            </template>
                                        </tbody>

                                        <tfoot>
                                            <tr
                                                v-for="(addRow, index) in addRows"
                                                :key="index"
                                            >
                                                <td>
                                                    <v-select
                                                        v-model="addRows[index].cultivar"
                                                        :options="cultivars"
                                                        placeholder="Cultivar"
                                                        :class="errors[index] && errors[index].cultivar?'errorMsg':''"
                                                        :reduce="cultivar => cultivar.code"
                                                        @input="checkChangeData()"
                                                    ></v-select>
                                                </td>
                                                <td>
                                                    <b-input-group>
                                                        <b-form-input
                                                            id="example-input"
                                                            v-model="addRows[index].startDate"
                                                            type="date"
                                                            placeholder="YYYY-MM-DD"
                                                            autocomplete="off"
                                                            :class="errors[index] && errors[index].startDate?'errorMsg':''"
                                                            @input="checkChangeData()"
                                                        ></b-form-input>
                                                        <b-input-group-append>
                                                            <b-form-datepicker
                                                                v-model="addRows[index].startDate"
                                                                button-only
                                                                right
                                                                aria-controls="example-input"
                                                                @input="checkChangeData()"
                                                            ></b-form-datepicker>
                                                        </b-input-group-append>
                                                    </b-input-group>
                                                </td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td></td>
                                                <td class="d-flex">
                                                    <span>
                                                        <span>
                                                            <img
                                                                src="./../assets/images/done.svg"
                                                                alt="Done Row"
                                                                v-on:click="store(addRows[index],index)"
                                                            />
                                                        </span>
                                                    </span>
                                                    <a
                                                        href="#"
                                                        class="ml-3"
                                                    >
                                                        <img
                                                            src="./../assets/images/delete-data.svg"
                                                            alt="Delete Row"
                                                            v-on:click=" openDelete(index, $event)"
                                                        />
                                                    </a>
                                                </td>
                                            </tr>
                                        </tfoot>
                                    </table>
                                </div>
                            </div>
                            <!-- Add/Duplicate button -->
                            <div class="Flowering-button justify-content-end align-items-end d-blog d-md-flex d-lg-flex ">
                                <a
                                    href="javascript:void(0)"
                                    class="btn btn-primary"
                                    @click="addNew"
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
                </div>
            </div>
        </div>

        <!-- Delect Model -->
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
        <!-- Delect Model end -->
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import SubFeedTargetsTr from "../components/SubFeedTargetsTr";

const $ = require("jquery");
window.$ = $;

export default {
    name: "dashboard",
    components: {
        Sidebar,
        Header,
        SubFeedTargetsTr,
    },
    data() {
        return {
            type: "",
            types: [],
            items: [],
            subId: "",
            selectedRow: {},
            errors: [],
            cultivars: [],
            addRows: [],
            deleteId: "",
            deleteType: "",
            cutomDate: "",
            byCultivar: "",
            limit: 10,
            leavePage: true,
        };
    },
    methods: {
        changeType(type) {
            this.addRows = [];
            this.errors = [];
            this.selectedRow = {};
            this.type = type;
            // this.getData();
            this.getCultivar();
            this.clearfilter();
        },
        getData() {
            this.$http
                .post(this.$apiBaseUrl + "feed/" + this.type,
                    {
                        cultivar: this.byCultivar,
                        startDate: this.cutomDate,
                        limit: this.limit
                    },
                    {
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
        OpenSub(id) {
            this.subId = id;
        },
        save(id) {
            this.errors = [];
            if (this.items[id].feedId != "") {
                this.update(id);
            } else {
                this.store(id);
            }
        },
        edit(id) {
            this.errors = [];
            this.removeEmpty();
            this.selectedRow = {
                [id]: true,
            };
            this.checkChangeData();
        },
        update(id) {
            this.$http
                .put(
                    this.$apiBaseUrl + "feed/" + this.items[id].feedId,
                    this.items[id],
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.selectedRow = {};
                    this.getData(this.type);
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
        addNew() {
            this.addRows.push({
                feedId: "",
                comparment: this.type,
                cultivar: null,
                startDate: "",
                feedSub: [],
            });
        },
        store(storeData, index) {
            this.$http
                .post(
                    this.$apiBaseUrl + "feed", storeData, {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                }
                )
                .then((response) => {
                    this.getData();
                    this.addRows.splice(index, 1);
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
        removeEmpty() {
            if (
                this.items[this.items.length - 1] &&
                this.items[this.items.length - 1].feedId == ""
            ) {
                this.items.pop();
            }
        },
        openDelete(id, deleteType) {
            if (deleteType == "editDelete") {
                this.deleteId = this.items[id].feedId;
            }
            this.deleteType = deleteType;
            $("#DeleteField").modal("show");
        },
        deleteData() {
            this.errors = [];
            if (this.deleteType != "editDelete") {
                this.addRows.splice(this.deleteType, 1);
                this.$toast.success("Feed deleted successfully.", {
                    position: "top-right",
                });
            } else {
                this.$http
                    .delete(this.$apiBaseUrl + "feed/" + this.deleteId, {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    })
                    .then((response) => {
                        this.getData(this.type);
                        this.$toast.success(response.data.message, {
                            position: "top-right",
                        });
                        this.deleteId = "";
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
            }
            $("#DeleteField").modal("hide");
        },
        duplicate(index) {
            var duplicateData = this.items[index];
            this.addRows.push({
                feedId: "",
                comparment: duplicateData.comparment,
                cultivar: duplicateData.cultivar,
                startDate: duplicateData.startDate,
                feedSub: duplicateData.feedSub,
            });
            this.store(this.addRows[this.addRows.length - 1], this.addRows.length - 1);
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
        clearfilter() {
            this.cutomDate = "";
            this.byCultivar = "";
            this.limit = 10;
            this.getData();
        },
        checkChangeData() {
            this.leavePage = true;
            if ($.isEmptyObject(this.selectedRow) == false) {
                this.leavePage = false;
            }
            for (let newItem of this.addRows) {
                if (newItem.cultivar != null) {
                    this.leavePage = false;
                    return false;
                }
                if (newItem.startDate != "") {
                    this.leavePage = false;
                    return false;
                }
            }
        }
    },
    mounted() {
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });

        this.changeType("Flower");
    },
    beforeMount() {
        let electricalConductivity = JSON.parse(this.userDetails().electricalConductivity);
        for (let index = 0; index < electricalConductivity.length; index++) {
            let comparment = 0;
            let active = "";
            if (index == 0) {
                active = "active"
            }
            switch (electricalConductivity[index]) {
                case 'Flower':
                    comparment = this.userDetails().flower;
                    break;
                case 'Vegetative':
                    comparment = this.userDetails().vegitative;
                    break;
                case 'Clone':
                    comparment = this.userDetails().clone;
                    break;
                case 'Mother':
                    comparment = this.userDetails().mother;
                    break;
            }
            this.types.push({
                name: electricalConductivity[index],
                selecetd: true,
                class: "nav-link " + active,
                comparment: comparment
            });
        }

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

<style scoped>
.table-responsive table thead tr th {
    color: #9b9ba1 !important;
}
.subsrate-filter {
    width: fit-content;
    margin-left: auto;
}
</style>