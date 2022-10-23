<template>
    <div class="col-12 col-sm-12 col-md-12 col-lg-12">
        <div class="subsrate-content">
            <!-- <h3>EC & pH Batch</h3> -->
            <h3>Current Batches</h3>
            <div class="select-comparment batch-filter">
                <!-- Batch Comparment -->
                <div class="batch-comparment">
                    <div class="comparment-title">
                        <p class="m-0">Select {{ userDetail.growUnit }}</p>
                    </div>
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
                <!-- Batch Comparment End -->

                <!-- Filter Section -->
                <div class="filter dropdown">
                    <a
                        href="#"
                        class="btn btn-primary"
                        id="dropdownMenuButton"
                        data-toggle="dropdown"
                        aria-haspopup="true"
                        aria-expanded="false"
                    >
                        Filter
                        <img
                            src="./../../../assets/images/filter.svg"
                            alt="Filter"
                        />
                    </a>
                    <div
                        class="dropdown-menu dropdown-menu-right"
                        aria-labelledby="dropdownMenuButton"
                    >
                        <div class="
                        d-flex
                        align-items-center
                        justify-content-between
                        mb-3
                     ">
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
                                        <li class="nav-item">
                                            <a
                                                id="pills-lastmonthbatch-tab"
                                                data-toggle="pill"
                                                href="#"
                                                role="tab"
                                                aria-controls="pills-lastmonthbatch"
                                                aria-selected="false"
                                                class="nav-link filterBatchDateBtn"
                                                v-on:click="changeDate(1)"
                                            >
                                                Last month
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                id="pills-sixmonthbatch-tab"
                                                data-toggle="pill"
                                                href="#"
                                                role="tab"
                                                aria-controls="pills-sixmonthbatch"
                                                aria-selected="false"
                                                class="nav-link filterBatchDateBtn"
                                                v-on:click="changeDate(2)"
                                            >
                                                Last 6 month
                                            </a>
                                        </li>
                                        <li class="nav-item">
                                            <a
                                                id="pills-twelvemonthbatch-tab"
                                                data-toggle="pill"
                                                href="#"
                                                role="tab"
                                                aria-controls="pills-twelvemonthbatch"
                                                aria-selected="false"
                                                class="nav-link filterBatchDateBtn"
                                                v-on:click="changeDate(3)"
                                            >
                                                Last 12 month
                                            </a>
                                        </li>
                                        <input
                                            type="date"
                                            placeholder="Enter Custom date"
                                            v-model="cutomDate"
                                        />
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
                                            <label class="filter-title">By Batch ID</label>
                                            <input
                                                type="text"
                                                placeholder="Enter Batch ID"
                                                class="form-control"
                                                v-model="byBatchID"
                                            />
                                        </div>
                                        <div class="form-inline">
                                            <label class="filter-title">By {{ userDetail.growUnit }} ID</label>
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
                                class="btn btn-success"
                                type="button"
                                v-on:click="getData(type)"
                            >
                                Filter data
                            </button>
                            <button
                                class="btn btn-danger ml-3"
                                type="button"
                                v-on:click="clearfilter(type)"
                            >
                                Clear Filters
                            </button>
                        </div>
                    </div>
                </div>
                <!-- Filter Section End -->
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
                            id="FlowerBatchTable"
                            small
                        >
                            <template #cell(comparment)="data">
                                <span>{{ items[data.index].comparmentNo }}</span>
                            </template>
                            <template #cell(batchID)="data">
                                <b-form-input
                                    type="text"
                                    v-model="items[data.index].batchID"
                                    placeholder="Batch ID"
                                    :class="errors.batchID?'errorMsg':''"
                                    v-if="selectedRow[data.index]"
                                ></b-form-input>
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
                            <template #cell(triggerDate)="data">
                                <b-input-group v-if="selectedRow[data.index]">
                                    <b-form-input
                                        id="example-input"
                                        v-model="items[data.index].triggerDate"
                                        type="date"
                                        :min="items[data.index].plantingDate"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                        :max="maxDate"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker
                                            v-model="items[data.index].triggerDate"
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
                            <template #cell(cloneDate)="data">
                                <b-input-group v-if="selectedRow[data.index]">
                                    <b-form-input
                                        id="example-input"
                                        v-model="items[data.index].cloneDate"
                                        type="date"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                        :class="errors.cloneDate?'errorMsg':''"
                                        :max="maxDate"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker
                                            v-model="items[data.index].cloneDate"
                                            button-only
                                            right
                                            aria-controls="example-input"
                                            :max="maxDate"
                                        ></b-form-datepicker>
                                    </b-input-group-append>
                                </b-input-group>
                                <span v-else>{{ format_date(data.value,'DD MMM, YYYY') }}</span>
                            </template>
                            <template #cell(harvestDate)="data">
                                <b-input-group v-if="selectedRow[data.index]">
                                    <b-form-input
                                        id="example-input"
                                        v-model="items[data.index].harvestDate"
                                        type="date"
                                        :min="items[data.index].triggerDate"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                        :class="errors.harvestDate?'errorMsg':''"
                                        :max="maxDate"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker
                                            v-model="items[data.index].harvestDate"
                                            button-only
                                            right
                                            aria-controls="example-input"
                                            :min="items[data.index].triggerDate"
                                            :max="maxDate"
                                        ></b-form-datepicker>
                                    </b-input-group-append>
                                </b-input-group>
                                <span v-else>{{ format_date(data.value,'DD MMM, YYYY') }}</span>
                            </template>
                            <template #cell(transplantDate)="data">
                                <b-input-group v-if="selectedRow[data.index]">
                                    <b-form-input
                                        id="example-input"
                                        v-model="items[data.index].transplantDate"
                                        type="date"
                                        :min="(type == 'Vegetative')?items[data.index].plantingDate:items[data.index].cloneDate"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                        :class="errors.transplantDate?'errorMsg':''"
                                        :max="maxDate"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker
                                            v-model="items[data.index].transplantDate"
                                            button-only
                                            right
                                            aria-controls="example-input"
                                            :min="(type == 'Vegetative')?items[data.index].plantingDate:items[data.index].cloneDate"
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
                                        :min="items[data.index].plantingDate"
                                        placeholder="YYYY-MM-DD"
                                        autocomplete="off"
                                        :class="errors.cullDate?'errorMsg':''"
                                    ></b-form-input>
                                    <b-input-group-append>
                                        <b-form-datepicker
                                            v-model="items[data.index].cullDate"
                                            button-only
                                            right
                                            aria-controls="example-input"
                                            :min="items[data.index].plantingDate"
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
                                    v-on:click="openDelete(data.index)"
                                >
                                    <img
                                        src="./../../../assets/images/delete-data.svg"
                                        alt="Delete Row"
                                    />
                                </span>
                            </template>
                        </b-table>
                    </div>
                </div>
            </div>
        </div>

        <!-- Delete Model -->
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
        <!-- Delete Model End -->
    </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;
export default {
    data() {
        return {
            userDetail: {},
            fields: [],
            types: [],
            items: [],
            type: "",
            byDate: "",
            cutomDate: "",
            byBatchID: "",
            byRoomID: null,
            byCultivar: "",
            comparments: [],
            selectedRow: {},
            errors: [],
            cultivars: [],
            deleteId: "",
            maxDate: ""
        };
    },
    methods: {
        getData() {
            this.items = [];
            this.$http
                .post(
                    this.$apiBaseUrl + "dashboard/batch",
                    {
                        type: this.type,
                        batchselect: 1,
                        byDate: this.byDate,
                        cutomDate: this.cutomDate,
                        byBatchID: this.byBatchID,
                        byRoomID: this.byRoomID,
                        byCultivar: this.byCultivar,
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.items = response.data.data.items;
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                });
        },
        changeType(type) {
            this.type = type;
            this.comparments = [];
            this.selectedRow = {};
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
            this.setFields();
            this.clearfilter();
        },
        changeDate(byDate) {
            this.byDate = byDate;
        },
        clearfilter() {
            this.byDate = "";
            this.cutomDate = "";
            this.byBatchID = "";
            this.byRoomID = null;
            this.byCultivar = "";
            $(".filterBatchDateBtn")
                .removeClass("active")
                .attr("aria-selected", false);
            this.getData(this.type);
        },
        setFields() {
            this.fields = [];
            this.fields.push(
                {
                    key: "comparment",
                    label: this.userDetails().growUnit,
                },
                {
                    key: "batchID",
                    label: "Batch ID",
                },
                {
                    key: "cultivar",
                    label: "Cultivar",
                },
            );
            switch (this.type) {
                case "Flower":
                    this.fields.push(
                        {
                            key: "plantingDate",
                            label: "Planting Date",
                        },
                        {
                            key: "triggerDate",
                            label: "Trigger Date",
                        },
                        {
                            key: "harvestDate",
                            label: "Harvest Date",
                        },
                        {
                            key: "dayAfter",
                            label: "Day after trigger",
                        }
                    );
                    break;
                case "Vegetative":
                    this.fields.push(
                        {
                            key: "plantingDate",
                            label: "Planting Date",
                        },
                        {
                            key: "transplantDate",
                            label: "Transplant Date",
                        },
                        {
                            key: "dayAfter",
                            label: "Day after planting",
                        }
                    );
                    break;
                case "Clone":
                    this.fields.push(
                        {
                            key: "cloneDate",
                            label: "Clone Date",
                        },
                        {
                            key: "transplantDate",
                            label: "Transplant Date",
                        },
                        {
                            key: "dayAfter",
                            label: "Day after cloning",
                        }
                    );
                    break;
                case "Mother":
                    this.fields.push(
                        {
                            key: "plantingDate",
                            label: "Planting Date",
                        },
                        {
                            key: "cullDate",
                            label: "Cull Date",
                        },
                        {
                            key: "dayAfter",
                            label: "Day after planting",
                        }
                    );
                    break;
            }
            this.fields.push(
                {
                    key: "edit",
                    label: "",
                },
                {
                    key: "delete",
                    label: "",
                }
            );
        },
        edit(index) {
            this.errors = [];
            this.selectedRow = {
                [index]: !this.selectedRow[index],
            };
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
        save(index) {
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
                    this.$emit('reload');
                    this.selectedRow = {};
                    this.$toast.success(response.data.message, {
                        position: "top-right",
                    });
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
        openDelete(id) {
            this.deleteId = this.items[id].id;
            $("#DeleteField").modal("show");
        },
        deleteData() {
            if (this.deleteId != "") {
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
                        this.$emit('reload');
                    })
                    .catch((error) => {
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    });
            } else {
                this.$emit('reload');
                this.$toast.success("Batch deleted successfully.", {
                    position: "top-right",
                });
            }
            $("#DeleteField").modal("hide");
        },
    },
    mounted() {
        this.userDetail = this.userDetails();
        this.changeType("Flower");
        this.getCultivar();
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
    },
};
</script>