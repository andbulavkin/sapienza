<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header tabName="Historic Data" />
            <!-- Header end -->

            <!-- No data added -->
            <div
                class="nodata-found"
                v-if="!totalData"
            >
                <div class="found-img">
                    <img
                        src="./../assets/images/nohistoric.svg"
                        alt="nodata-found img"
                    />
                </div>
                <div class="found-text">
                    <h3>No historic data <br />available</h3>
                </div>
            </div>
            <!-- No data added end -->

            <section
                class="dashboard-section main-dashboard"
                v-else
            >
                <div class="row">
                    <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                        <div class="select-comparment">
                            <!-- Batch comparment -->
                            <div class="batch-comparment">
                                <div class="comparment-title">
                                    <p class="m-0">Select {{ userDetail.growUnit }}</p>
                                </div>
                                <ul
                                    id="pills-tab"
                                    role="tablist"
                                    class="nav nav-pills"
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

                            <!-- Filter section -->
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
                                        src="./../assets/images/filter.svg"
                                        alt="Filter"
                                    />
                                </a>
                                <div
                                    class="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="dropdownMenuButton"
                                >
                                    <div class="d-flex align-items-center justify-content-between mb-3 ">
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
                            <!-- Filter section End -->
                        </div>
                    </div>
                    <div class="col-12 col-sm-12 col-md-12 col-lg-4"></div>
                </div>

                <div
                    id="pills-tabContent"
                    class="tab-content"
                >
                    <div
                        id="pills-Flower"
                        role="tabpanel"
                        aria-labelledby="pills-Flower-tab"
                        class="tab-pane fade show active"
                    >
                        <div class="row">
                            <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                                <div class="subsrate-content historic-data">
                                    <div class="panel panel-default">
                                        <div class="panel-body">
                                            <div class="table-responsive">
                                                <!-- Batch list -->
                                                <table class="table table-condensed table-striped">
                                                    <thead>
                                                        <tr class="accordion-toggle">
                                                            <th class="text-center">
                                                                Batch ID
                                                            </th>
                                                            <th>
                                                                {{ this.userDetail.growUnit }}
                                                            </th>
                                                            <th>cultivar</th>
                                                            <th>EC Measured (Target)</th>
                                                            <th>pH Measured (Target)</th>
                                                            <th>Harvest Date</th>
                                                            <th>Graph</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        <template v-for="(item, index) in items">
                                                            <tr :key="'tr1' + item.id">
                                                                <td class="text-primary text-center">
                                                                    {{ item.batchID }}
                                                                </td>
                                                                <td class="text-dark">
                                                                    {{ item.comparmentNo }}
                                                                </td>
                                                                <td class="text-dark">
                                                                    {{ item.cultivar }}
                                                                </td>
                                                                <td class="text-dark">
                                                                    <span v-if="item.subsrateData.length > 0">
                                                                        {{ item.subsrateData[ item.subsrateData.length - 1 ].eC }}
                                                                        <span v-if="item.subsrateData[item.subsrateData.length - 1].targets.length > 0">
                                                                            ({{ item.subsrateData[ item.subsrateData.length - 1].targets[item.subsrateData[item.subsrateData.length - 1].targets.length - 1].ecMinMax }})
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                                <td class="text-dark">
                                                                    <span v-if="item.subsrateData.length > 0">
                                                                        {{ item.subsrateData[item.subsrateData.length - 1].pH }}
                                                                        <span v-if=" item.subsrateData[ item.subsrateData.length - 1 ].targets.length > 0 ">
                                                                            ({{ item.subsrateData[item.subsrateData.length - 1].targets[item.subsrateData[item.subsrateData.length - 1].targets.length - 1].phMinMax}})
                                                                        </span>
                                                                    </span>
                                                                </td>
                                                                <td class="text-dark">
                                                                    {{ item.harvestDate }}
                                                                </td>
                                                                <td
                                                                    class="text-primary view-graph accordion-toggle"
                                                                    data-toggle="collapse"
                                                                    :data-target="'#History'+item.id"
                                                                >
                                                                    <button
                                                                        class="btn btn-outline-light"
                                                                        @click="getGraph(index)"
                                                                    >
                                                                        View
                                                                    </button>
                                                                </td>
                                                            </tr>
                                                            <tr :key="'tr2' + item.id">
                                                                <td
                                                                    colspan="12"
                                                                    class="hiddenRow"
                                                                >
                                                                    <div
                                                                        class="accordian-body collapse "
                                                                        :id="'History'+item.id"
                                                                    >
                                                                        <!-- Sample list -->
                                                                        <table class="table table-striped">
                                                                            <thead class="visible">
                                                                                <tr
                                                                                    data-toggle="collapse"
                                                                                    :data-target="'#History'+item.id"
                                                                                    class="accordion-toggle"
                                                                                >
                                                                                    <th></th>
                                                                                    <th></th>
                                                                                    <th>
                                                                                        Sample Date
                                                                                    </th>
                                                                                    <th>
                                                                                        EC Measured
                                                                                        (Target)
                                                                                    </th>
                                                                                    <th>
                                                                                        pH Measured
                                                                                        (Target)
                                                                                    </th>
                                                                                    <th></th>
                                                                                    <th></th>
                                                                                </tr>
                                                                            </thead>
                                                                            <tbody v-if="item.subsrateData.length > 0">
                                                                                <tr
                                                                                    v-for="subData in item.subsrateData"
                                                                                    :key="subData.subsrateID"
                                                                                >
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                    <td>
                                                                                        {{ subData.samplingDate }}
                                                                                    </td>
                                                                                    <td>
                                                                                        {{ subData.eC }}
                                                                                        <span v-if="subData.targets.length > 0 ">
                                                                                            ({{ subData.targets[subData.targets.length -1].ecMinMax }})
                                                                                        </span>
                                                                                    </td>
                                                                                    <td>
                                                                                        {{ subData.pH }}
                                                                                        <span v-if="subData.targets.length >0">
                                                                                            ({{ subData.targets[subData.targets.length -1].phMinMax}})
                                                                                        </span>
                                                                                    </td>
                                                                                    <td></td>
                                                                                    <td></td>
                                                                                </tr>
                                                                            </tbody>
                                                                        </table>
                                                                        <!-- Sample list end-->
                                                                    </div>
                                                                </td>
                                                            </tr>
                                                        </template>
                                                    </tbody>
                                                </table>
                                                <!-- Batch list end -->
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div class="col-12 col-sm-12 col-md-12 col-lg-4">
                                <div
                                    id="carouselExampleControls"
                                    class="carousel slide"
                                    data-ride="carousel"
                                >
                                    <div class="carousel-inner">
                                        <div class="carousel-item active">
                                            <!-- Ec graph -->
                                            <div class="example">
                                                <img
                                                    src="./../assets/images/full-screen.svg"
                                                    alt="Full Screen"
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                />
                                                <Plotly
                                                    :data="EcSubstratedata"
                                                    :layout="EcSubstratelayout"
                                                    :display-mode-bar="false"
                                                ></Plotly>
                                                <!-- <apexchart
                                                    width="100%"
                                                    height="250"
                                                    type="area"
                                                    :options="ecChartOptions"
                                                    :series="ecSeries"
                                                ></apexchart> -->
                                            </div>
                                            <!-- Ec graph end -->

                                            <!-- Ph graph -->
                                            <div class="example">
                                                <img
                                                    src="./../assets/images/full-screen.svg"
                                                    alt="Full Screen"
                                                    data-toggle="modal"
                                                    data-target="#exampleModal"
                                                />

                                                <Plotly
                                                    :data="pHSubstratedata"
                                                    :layout="pHSubstratelayout"
                                                    :display-mode-bar="false"
                                                ></Plotly>

                                                <!-- <apexchart
                                                    width="100%"
                                                    height="250"
                                                    type="area"
                                                    :options="phchartOptions"
                                                    :series="phSeries"
                                                ></apexchart> -->
                                            </div>
                                            <!-- Ph graph end -->
                                        </div>
                                    </div>

                                    <!-- slide button for next graph -->
                                    <div class="d-flex align-items-center justify-content-center w-100 ">
                                        <div class="d-flex align-items-center pl-lg-4">
                                            <a
                                                class="carousel-control-prev-icon"
                                                href="#carouselExampleControls"
                                                role="button"
                                                data-slide="prev"
                                                @click="changeGraphLeft"
                                            ></a>
                                            <span class="pl-lg-4 pr-lg-4 graph-count">{{ activeGraph }}/{{ items.length }}</span>
                                            <a
                                                class="carousel-control-next-icon"
                                                href="#carouselExampleControls"
                                                role="button"
                                                data-slide="next"
                                                @click="changeGraphRight"
                                            ></a>
                                            <span
                                                class="pl-lg-4 pr-lg-4 graph-name"
                                                v-if="items.length > 0"
                                            >
                                                {{ items[activeGraph-1].batchID }} - {{ items[activeGraph-1].cultivar }}
                                            </span>
                                        </div>
                                    </div>
                                    <!-- slide button for next graph end -->
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>

        <!-- Graph Modal -->
        <div
            class="modal"
            tabindex="-1"
            role="dialog"
            id="exampleModal"
        >
            <div
                class="modal-dialog"
                role="document"
                style="max-width: 80%;"
            >
                <div class="modal-content">
                    <div class="modal-header">
                        <button
                            type="button"
                            class="close"
                            data-dismiss="modal"
                            aria-label="Close"
                        >
                            <span aria-hidden="true">&times;</span>
                        </button>
                    </div>
                    <div class="modal-body row">
                        <div class="col-md-6">
                            <Plotly
                                :data="EcSubstratedata"
                                :layout="EcSubstratelayout"
                                :display-mode-bar="false"
                            ></Plotly>
                                
                            <!-- <apexchart
                                type="area"
                                :options="ecChartOptions"
                                :series="ecSeries"
                            ></apexchart> -->
                        </div>
                        <div class="col-md-6">
                            <Plotly
                                :data="pHSubstratedata"
                                :layout="pHSubstratelayout"
                                :display-mode-bar="false"
                            ></Plotly>

                            <!-- <apexchart
                                type="area"
                                :options="phchartOptions"
                                :series="phSeries"
                            ></apexchart> -->
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Graph End Modal -->
    </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;
import Sidebar from "../components/Sidebar";``
import Header from "../components/Header";

import { Plotly } from "vue-plotly";

export default {
    name: "HistoricData",
    components: {
        Sidebar,
        Header,
        Plotly,
    },
    data: function () {
        return {
            userDetail: {},
            type: "",
            types: [],
            totalData: 0,
            items: [],
            graphData: [],
            byDate: "",
            cutomDate: "",
            byBatchID: "",
            byRoomID: null,
            byCultivar: "",
            ecChartOptions: {},
            phchartOptions: {},
            ecSeries: [
                {
                    name: "Substate Ec",
                    data: [],
                },
            ],
            phSeries: [
                {
                    name: "Substate Ph",
                    data: [],
                },
            ],
            activeGraph: 0,
            comparments: [],

            /** plotly data variables */
            
            EcSubstratedata: [],
            EcSubstratelayout: {},

            pHSubstratedata: [],
            pHSubstratelayout: {},


            /** plotly data variables */



        };
    },
    methods: {
        changeType(type) {
            this.items = [];
            this.type = type;
            this.activeGraph = 0;
            this.EcSubstratelayout= {};
            this.pHSubstratelayout = {};
            this.EcSubstratedata = [];
            this.pHSubstratedata = [];

            // this.ecChartOptions = {};
            // this.phchartOptions = {};
            // this.ecSeries[0].data = [];
            // this.phSeries[0].data = [];
            this.comparments = [];
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
            this.clearfilter();
        },
        getData() {
           
            this.items = [];
            this.graphData = [];
            this.$http
                .post(
                    this.$apiBaseUrl + "dashboard/historic",
                    {
                        type: this.type,
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
                    if (response.status == 200) {
                        this.totalData = response.data.data.count;
                        if (response.data.data.items.length > 0) {
                            this.items = response.data.data.items;
                            this.graphData = response.data.data.data;
                            this.getGraph(0);
                        }
                    } else {
                        this.totalData = 0;
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
        getGraph(index) {

            this.EcSubstratelayout = {
                title: "EC",
                xaxis: {  
                    title: 'DAY',
                    tickmode: "linear",
                    tick0: 0,
                    dtick: 7,
                },
                yaxis: {
                    title: 'EC',
                    rangemode:"tozero"
                }
            }

            this.pHSubstratelayout = {
                title: "pH",
                xaxis: {
                    title: 'DAY',
                    tickmode: "linear",
                    tick0: 0,
                    dtick: 7,
                },
                yaxis: {
                    title: 'pH',
                    rangemode:"tozero",
                    autorange: 'visible',
                    range: [3,8],
                }
            }

            this.activeGraph = index + 1;

            this.EcSubstratedata = [];
            this.pHSubstratedata = [];
            
            let days = 0;
            let length = this.graphData[index].eC.length;

            if(this.graphData[index].eC.length > 0){
                days = this.graphData[index].eC[length - 1].lable.length;
            } 
            if(days < 70 ){
                this.EcSubstratelayout.xaxis.dtick = 7;
                this.pHSubstratelayout.xaxis.dtick = 7;    
            } else if(days > 70 && days < 182){
                this.EcSubstratelayout.xaxis.dtick = 14;    
                this.pHSubstratelayout.xaxis.dtick = 14;    
            } else if(days > 182){
                this.EcSubstratelayout.xaxis.dtick = 30;    
                this.pHSubstratelayout.xaxis.dtick = 30;    
            }


            for (
                let key = 0;
                key < this.graphData[index].eC.length;
                key++
            ) {
                const element = this.graphData[index].eC[key];
                if (element.title == "EC meas") {
                    this.EcSubstratedata.push({
                        x: element.lable,
                        y: element.value,
                        mode: "lines+markers",
                        name: element.title,
                        line: { shape: "linear", color: element.color,width:3 },
                        marker: { size: 8 },
                        type: "scatter",
                    });
                } else {
                    this.EcSubstratedata.push({
                        x: element.lable,
                        y: element.value,
                        mode: "lines",
                        name: element.title,
                        line: { shape: "hv", color: element.color },
                        type: "scatter",
                    });
                }
            }
            
            

           
                
            for (
                let key = 0;
                key < this.graphData[index].pH.length;
                key++
            ) {
                const element = this.graphData[index].pH[key];

                    if (element.title == "pH meas") {
                    this.pHSubstratedata.push({
                        x: element.lable,
                        y: element.value,
                        mode: "lines+markers",
                        name: element.title,
                        line: { shape: "linear", color: element.color,width:3  },
                        marker: { size: 8 },
                        type: "scatter",
                    });
                } else {
                    this.pHSubstratedata.push({
                        x: element.lable,
                        y: element.value,
                        mode: "lines",
                        name: element.title,
                        line: { shape: "hv", color: element.color},
                        type: "scatter",
                    });
                }
            }


        },
        changeGraphLeft() {
            if (this.activeGraph < this.items.length) {
                this.activeGraph + 1;
                this.getGraph(this.activeGraph);
            } else {
                this.getGraph(0);
            }
        },
        changeGraphRight() {
            if (this.activeGraph == this.items.length) {
                this.getGraph(0);
            } else {
                this.activeGraph + 1;
                this.getGraph(this.activeGraph);
            }
        }
    },
    mounted() {
        this.userDetail = this.userDetails();
        this.changeType("Flower");
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });
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