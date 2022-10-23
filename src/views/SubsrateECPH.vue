<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header tabName="Substrate - EC / pH Data" />
            <!-- Header end-->

            <!-- Batch comparment -->
            <div class="select-comparment subsrate-coparment">
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
            <!-- Batch comparment -->

            <div class="subsrate-content">
                <div class="search-box">
                    <div class="edit-row">
                        <!-- <span>
                            <img
                                src="./../assets/images/edit-row.svg"
                                alt="edit-row"
                            />
                            Double Click Row to edit.
                        </span> -->
                    </div>

                    <div class="subsrate-filter">
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
                                                    <label class="filter-title">By Batch ID</label>
                                                    <input
                                                        type="text"
                                                        placeholder="Enter Batch ID"
                                                        class="form-control"
                                                        v-model="byBatchID"
                                                    >
                                                </div>
                                                <div class="form-inline">
                                                    <label class="filter-title">By Room ID</label>
                                                    <b-form-select
                                                        class="form-control selectCompartment"
                                                        v-model="byRoomID"
                                                        :options="comparments"
                                                    ></b-form-select>
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

                        <!-- Search -->
                        <div class="search-input w-100">
                            <input
                                type="text"
                                placeholder="Search"
                                class="form-control"
                                v-model="searchTerm"
                                @keyup.enter="getData"
                            />
                            <span>
                                <img
                                    src="./../assets/images/search.svg"
                                    alt="search"
                                />
                            </span>
                        </div>
                        <!-- Search End -->
                    </div>
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
                                        <b-form-select
                                            v-model="items[data.index].comparmentNo"
                                            :options="comparments"
                                            v-on:change="getBatchs(items[data.index].comparmentNo,data.index, 'editRow')"
                                            :class="errors.comparmentNo?'errorMsg':''"
                                        ></b-form-select>
                                    </span>
                                    <span v-else>
                                        {{ items[data.index].comparmentNo}}
                                    </span>
                                </template>
                                <template #cell(batchName)="data">
                                    <span v-if="selectedRow[data.index]">
                                        <b-form-select
                                            v-model="items[data.index].batchID"
                                            :options="batchs"
                                            v-on:change="getBatchDetail(items[data.index].batchID,data.index)"
                                            :disabled="!items[data.index].comparmentNo"
                                            :class="errors.batchID?'errorMsg':''"
                                        ></b-form-select>
                                    </span>
                                    <span v-else>{{ data.value }}</span>
                                </template>
                                <template #cell(cultivar)="data">
                                    <b-form-input
                                        v-if="selectedRow[data.index]"
                                        v-model="items[data.index].cultivar"
                                        readonly
                                        placeholder="Cultivar"
                                        :class="errors.cultivar?'errorMsg':''"
                                    ></b-form-input>
                                    <span v-else>{{ data.value }}</span>
                                </template>
                                <template #cell(samplingDate)="data">
                                    <b-input-group v-if="selectedRow[data.index]">
                                        <b-form-input
                                            id="example-input"
                                            v-model="items[data.index].samplingDate"
                                            type="date"
                                            placeholder="YYYY-MM-DD"
                                            autocomplete="off"
                                            :class="errors.samplingDate?'errorMsg':''"
                                        ></b-form-input>
                                        <b-input-group-append>
                                            <b-form-datepicker
                                                v-model="items[data.index].samplingDate"
                                                button-only
                                                right
                                                aria-controls="example-input"
                                            ></b-form-datepicker>
                                        </b-input-group-append>
                                    </b-input-group>
                                    <span v-else>{{ format_date(data.value,'DD MMM, YYYY') }}</span>
                                </template>
                                <template #cell(eC)="data">
                                    <span v-if="selectedRow[data.index]">
                                        <b-form-input
                                            type="number"
                                            v-model="items[data.index].eC"
                                            v-on:keypress="isNumber($event)"
                                            :class="errors.eC?'errorMsg':''+'ecph'"
                                            placeholder="EC"
                                        ></b-form-input>
                                    </span>
                                    <span v-else>{{ data.value }}</span>
                                </template>
                                <template #cell(pH)="data">
                                    <span v-if="selectedRow[data.index]">
                                        <b-form-input
                                            type="number"
                                            v-if="selectedRow[data.index]"
                                            v-model="items[data.index].pH"
                                            v-on:keypress="isNumber($event)"
                                            :class="errors.pH?'errorMsg':''+'ecph'"
                                            placeholder="pH"
                                        ></b-form-input>
                                    </span>
                                    <span v-else>{{ data.value }}</span>
                                </template>
                                <template #cell(edit)="data">
                                    <b-button class="bg-transparent border-0 p-0">
                                        <div class="d-flex">
                                            <span
                                                v-if="!selectedRow[data.index]"
                                                @click="edit(data)"
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
                                </template>
                                <template #cell(delete)="data">
                                    <span
                                        class="pl-1"
                                        v-on:click="openDelete(data.index, 'editDelete')"
                                    >
                                        <img
                                            src="./../assets/images/delete-data.svg"
                                            alt="Delete Row"
                                        />
                                    </span>
                                </template>
                                <template #cell(duplicate)="data">
                                    <span
                                        class="btn btn-sm pl-1 duplicate-btn"
                                        v-if="items[data.index].subsrateID"
                                    >
                                        <img
                                            src="./../assets/images/duplicate.svg"
                                            alt="Duplicate Row"
                                            @click="duplicate(data.index)"
                                        />
                                    </span>
                                </template>

                                <!-- Add Rows -->
                                <template
                                    #custom-foot="{}"
                                    v-if="addRows.length > 0"
                                >
                                    <b-tr
                                        v-for="(addRow, index) in addRows"
                                        :key="addRow+index"
                                    >
                                        <b-td>
                                            <span>
                                                <b-form-select
                                                    v-model="addRows[index].comparmentNo"
                                                    :options="comparments"
                                                    v-on:change="getBatchs(addRows[index].comparmentNo,index, 'addRows')"
                                                    :class="errors[index] && errors[index].comparmentNo?'errorMsg':''"
                                                    @input="checkChangeData()"
                                                ></b-form-select>
                                            </span>
                                        </b-td>
                                        <b-td>
                                            <b-form-select
                                                v-model="addRows[index].batchID"
                                                :options="addRows[index].batchs"
                                                v-on:change="getBatchDetail(addRows[index].batchID,index, 'addRows')"
                                                :disabled="!addRows[index].comparmentNo"
                                                :class="errors[index] && errors[index].batchID?'errorMsg':''"
                                                @input="checkChangeData()"
                                            ></b-form-select>
                                        </b-td>
                                        <b-td>
                                            <b-form-input
                                                v-model="addRows[index].cultivar"
                                                readonly
                                                placeholder="Cultivar"
                                                :class="errors[index] && errors[index].cultivar?'errorMsg':''"
                                                @input="checkChangeData()"
                                            ></b-form-input>
                                        </b-td>
                                        <b-td>
                                            <b-input-group>
                                                <b-form-input
                                                    id="example-input"
                                                    v-model="addRows[index].samplingDate"
                                                    type="date"
                                                    placeholder="YYYY-MM-DD"
                                                    autocomplete="off"
                                                    :max="maxDate"
                                                    :class="errors[index] && errors[index].samplingDate?'errorMsg':''"
                                                    @input="checkChangeData()"
                                                ></b-form-input>
                                                <b-input-group-append>
                                                    <b-form-datepicker
                                                        v-model="addRows[index].samplingDate"
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
                                            <b-form-input
                                                type="number"
                                                v-model="addRows[index].eC"
                                                v-on:keypress="isNumber($event)"
                                                :class="errors[index] && errors[index].eC?'errorMsg ecph':'ecph'"
                                                placeholder="EC"
                                                @input="checkChangeData()"
                                            ></b-form-input>
                                        </b-td>
                                        <b-td>
                                            <b-form-input
                                                type="number"
                                                v-model="addRows[index].pH"
                                                v-on:keypress="isNumber($event)"
                                                :class="errors[index] && errors[index].pH?'errorMsg ecph':'ecph'"
                                                placeholder="pH"
                                                @input="checkChangeData()"
                                            ></b-form-input>
                                        </b-td>
                                        <b-td>
                                            <b-button class="bg-transparent border-0">
                                                <div class="d-flex">
                                                    <span v-on:click="store(addRows[index], index)">
                                                        <img
                                                            src="./../assets/images/done.svg"
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
                                                    src="./../assets/images/delete-data.svg"
                                                    alt="Delete Row"
                                                />
                                            </span>
                                        </b-td>
                                    </b-tr>
                                </template>
                                <!-- End Add Rows -->
                            </b-table>
                        </div>

                        <!-- Add/Duplicate button -->
                        <div class="Flowering-button justify-content-end align-items-end d-blog d-md-flex d-lg-flex">
                            <a
                                href="javascript:void(0)"
                                class="btn btn-primary"
                                @click="add"
                            >
                                Add new Field
                            </a>
                            <a
                                href="javascript:void(0)"
                                class="btn btn-success mt-3 mt-md-0 mt-lg-0"
                                v-on:click="duplicate(items.length-1)"
                                v-if="items.length > 1"
                            >
                                Duplicate Last Field
                            </a>
                        </div>
                        <!-- Add/Duplicate button end -->
                    </div>
                </div>
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
        <!-- End delete model -->
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
            searchTerm: "",
            errors: [],
            type: "",
            types: [],
            fields: [
                {
                    key: "comparment",
                    label: this.userDetails().growUnit,
                },
                {
                    key: "batchName",
                    label: "Batch ID",
                    class: 'px-1'
                },
                {
                    key: "cultivar",
                    label: "Cultivar",
                    class: 'px-1'
                },
                {
                    key: "samplingDate",
                    label: "Sampling Date",
                    class: 'px-1'
                },
                {
                    key: "eC",
                    label: "EC",
                    class: 'px-1'
                },
                {
                    key: "pH",
                    label: "pH",
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
            userDetail: {},
            comparments: [],
            batchs: [
                {
                    text: "Select Batch",
                    value: null
                }
            ],
            addRows: [],
            deleteId: "",
            deleteType: "",
            cutomDate: "",
            byBatchID: "",
            byRoomID: null,
            byCultivar: "",
            limit: 10,
            maxDate: "",
            leavePage: true
        };
    },
    methods: {
        add() {
            this.addRows.push({
                subsrateID: "",
                userID: "",
                comparment: this.type,
                comparmentNo: null,
                batchID: null,
                batchName: "",
                cultivar: "",
                samplingDate: "",
                eC: "",
                pH: "",
                batchs: [
                    {
                        text: "Select Batch",
                        value: null
                    }
                ],
            });
        },
        duplicate(index) {
            var duplicateData = this.items[index];
            this.addRows.push({
                subsrateID: "",
                userID: "",
                comparment: duplicateData.comparment,
                comparmentNo: duplicateData.comparmentNo,
                batchID: duplicateData.batchID,
                batchName: duplicateData.batchName,
                cultivar: duplicateData.cultivar,
                samplingDate: duplicateData.samplingDate,
                eC: duplicateData.eC,
                pH: duplicateData.pH,
                batchs: []
            });
            this.getBatchs(duplicateData.comparmentNo, this.addRows.length - 1, 'addRows');
            this.checkChangeData();
            // this.store(this.addRows[this.addRows.length - 1], this.addRows.length - 1);
        },
        async edit(data) {
            await this.removeEmpty();
            await this.getBatchs(data.item.comparmentNo, data.index);
            this.selectedRow = {
                [data.index]: !this.selectedRow[data.index],
            };
            await this.checkChangeData();
        },
        changeType(type) {
            this.type = type;
            this.comparments = [];
            this.searchTerm = "";
            this.errors = [];
            this.selectedRow = {};
            this.leavePage= true;
            this.comparments.push({
                value: null,
                text: "Select " + this.userDetail.growUnit,
            });
            for (let index = 0; index < this.types.length; index++) {
                if (this.type == this.types[index].name) {
                    for (
                        let index2 = 1;
                        index2 <= this.types[index].comparment;
                        index2++
                    ) {
                        this.comparments.push({
                            value: index2,
                            text: this.userDetail.growUnit + " " + index2,
                        });
                    }
                }
            }
            this.addRows = [];
            this.add();
            this.clearfilter();
        },
        getData() {
            this.$http
                .post(
                    this.$apiBaseUrl + "subsrate/" + this.type,
                    {
                        search: this.searchTerm,
                        samplingDate: this.cutomDate,
                        byBatchID: this.byBatchID,
                        byRoomID: this.byRoomID,
                        byCultivar: this.byCultivar,
                        limit: this.limit
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
        async getBatchs(comparmentNo, index, type) {
            await this.$http
                .get(
                    this.$apiBaseUrl + "batchid-list/" + this.type + "/" + comparmentNo,
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    var options = response.data.data.map(function (elm) {
                        return {
                            value: elm.id,
                            text: elm.batch,
                        };
                    });
                    options.unshift({
                        value: null,
                        text: "Select Batch",
                    });
                    if (type == 'addRows') {
                        this.addRows[index].batchs = options;
                    } else {
                        console.log(options);
                        this.batchs = options;
                        console.log(this.items[index]);
                    }
                    return true;
                    // this.batchs = options;
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
        getBatchDetail(BatchId, index, type) {
            if (BatchId) {
                this.$http
                    .get(this.$apiBaseUrl + "batch/details/" + BatchId, {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    })
                    .then((response) => {
                        if (type == "addRows") {
                            this.addRows[index].cultivar = response.data.data.cultivar;
                        } else {
                            this.items[index].cultivar = response.data.data.cultivar;
                        }
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
                if (type == "addRows") {
                    this.addRows[index].cultivar = "";
                } else {
                    this.items[index].cultivar = "";
                }
            }
        },
        save(id) {
            this.errors = [];
            if (this.items[id].subsrateID != "") {
                this.update(id);
            } else {
                this.store(id);
            }
        },
        store(storeDate, index) {
            this.$http
                .post(this.$apiBaseUrl + "subsrate", storeDate, {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    this.errors = [];
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
        update(id) {
            this.$http
                .put(
                    this.$apiBaseUrl + "subsrate/" + this.items[id].subsrateID,
                    this.items[id],
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.changeType(this.type);
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
                    this.checkChangeData();
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else {
                        this.selectedRow = { [id]: true };
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
            if (deleteType == "editDelete") {
                this.deleteId = this.items[id].subsrateID;
            }
            this.deleteType = deleteType;
            $("#DeleteField").modal("show");
        },
        deleteData() {
            this.errors = [];
            console.log(this.deleteId);
            if (this.deleteType != "editDelete") {
                this.addRows.splice(this.deleteId, 1);
                this.$toast.success("Subsrate deleted successfully.", {
                    position: "top-right",
                });
            } else {
                this.$http
                    .delete(this.$apiBaseUrl + "subsrate/" + this.deleteId, {
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
            }
            $("#DeleteField").modal("hide");
        },
        removeEmpty() {
            if (
                this.items[this.items.length - 1] &&
                this.items[this.items.length - 1].subsrateID == ""
            ) {
                this.items.pop();
            }
        },
        isNumber: function (evt) {
            evt = evt ? evt : window.event;
            var charCode = evt.which ? evt.which : evt.keyCode;
            if (
                charCode > 31 &&
                (charCode < 48 || charCode > 57) &&
                charCode !== 46
            ) {
                evt.preventDefault();
            } else {
                return true;
            }
        },
        clearfilter() {
            this.cutomDate = "";
            this.byBatchID = "";
            this.byRoomID = null;
            this.byCultivar = "";
            this.getData();
        },
        checkChangeData() {
            this.leavePage = true;
            if ($.isEmptyObject(this.selectedRow) == false) {
                this.leavePage = false;
            }
            for (let newItem of this.addRows) {
                console.log(newItem);
                if (newItem.comparmentNo != null) {
                    this.leavePage = false;
                    return false;
                }
                if (newItem.samplingDate != "") {
                    this.leavePage = false;
                    return false;
                }
                if (newItem.eC != "") {
                    this.leavePage = false;
                    return false;
                }
                if (newItem.pH != "") {
                    this.leavePage = false;
                    return false;
                }
            }
        },
        clearAddData(index) {
            this.addRows[index].comparmentNo = null;
            this.addRows[index].batchID = null;
            this.addRows[index].cultivar = "";
            this.addRows[index].samplingDate = "";
            this.addRows[index].eC = "";
            this.addRows[index].pH = "";
        },
    },
    mounted() {
        this.userDetail = this.userDetails();
        this.changeType("Flower");
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });
        var d = new Date();
        this.maxDate = this.format_date(d, 'YYYY-MM-DD');
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
