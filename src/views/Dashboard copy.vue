<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Sidebar End -->
    <div class="content">
      <!-- Header -->
      <Header tabName="Dashboard" />
      <!-- Header End -->

      <!-- No data added -->
      <div class="nodata-found" v-if="totalData == 0">
        <div class="found-img">
          <img
            src="./../assets/images/nodata-found.svg"
            alt="nodata-found img"
          />
        </div>
        <div class="found-text">
          <h3>Please enter data to <br />access dashbord</h3>
          <router-link to="/subsrate-ecph">
            <button type="submit" class="btn btn-primary">Enter Data</button>
          </router-link>
        </div>
      </div>
      <!-- No data added end -->

      <section class="dashboard-section main-dashboard" v-else>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <div class="select-comparment">
              <!-- Batch Comparment -->
              <div class="batch-comparment">
                <div class="comparment-title">
                  <p class="m-0">Select {{ userDetail.growUnit }}</p>
                </div>
                <ul id="pills-tab" role="tablist" class="nav nav-pills">
                  <li class="nav-item" v-for="type in types" :key="type.name">
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
            </div>
            <div class="dashboard-searchbox pt-4">
              <div class="comparment-title">
                <h3>{{ userDetail.growUnit }} Details</h3>
                <p>{{ items.length }} {{ userDetail.growUnit }}</p>
              </div>

              <!-- Search -->
              <div class="comparment-search">
                <input
                  type="text"
                  class="form-control"
                  placeholder="Search"
                  v-model="serach"
                  v-on:keyup.enter="getData"
                />
                <span>
                  <img src="./../assets/images/search.svg" alt="search" />
                </span>
              </div>
              <!-- Search end -->
            </div>

            <div id="pills-tabContent" class="tab-content">
              <div
                id="pills-Flower"
                role="tabpanel"
                aria-labelledby="pills-Flower-tab"
                class="tab-pane fade show active"
              >
                <div class="subsrate-content">
                  <div class="panel panel-default">
                    <div class="panel-body">
                      <div class="table-responsive">
                        <!-- comparment list -->
                        <table class="table table-condensed table-striped">
                          <thead>
                            <tr>
                              <th>{{ userDetail.growUnit }}</th>
                              <th>Min-Max EC</th>
                              <th>Min-Max pH</th>
                              <th>Last Updated</th>
                              <th>Graph</th>
                            </tr>
                          </thead>
                          <tbody>
                            <template v-for="(comparment, index) in items">
                              <tr
                                :key="`tr1${comparment.compartmentNo}${index}`"
                              >
                                <td>
                                  <img
                                    src="./../assets/images/collapse-down.svg"
                                    class="rotate collapsed view-graph accordion-toggle mr-2"
                                    data-toggle="collapse"
                                    :data-target="
                                      `#compartment${comparment.compartmentNo +
                                        index}`
                                    "
                                  />
                                  <span>{{ comparment.compartment }}</span>
                                </td>
                                <td>{{ comparment.minMaxEc }}</td>
                                <td>{{ comparment.minMaxPh }}</td>
                                <td>{{ comparment.updated_date }}</td>
                                <td>
                                  <button
                                    class="btn btn-outline-light"
                                    data-toggle="collapse"
                                    :data-target="
                                      `#compartment${comparment.compartmentNo +
                                        index}`
                                    "
                                    @click="
                                      selectComparament(
                                        index + 1,
                                        comparment.batchs.length > 0 ? 1 : 0
                                      )
                                    "
                                  >
                                    View
                                  </button>
                                </td>
                              </tr>
                              <tr
                                :key="`tr2${comparment.compartmentNo}${index}`"
                              >
                                <td colspan="5" class="hiddenRow">
                                  <div
                                    class="accordian-body collapse "
                                    :id="
                                      `compartment${comparment.compartmentNo +
                                        index}`
                                    "
                                  >
                                    <!-- Batch list -->
                                    <table class="table">
                                      <thead>
                                        <tr>
                                          <th>Batch ID</th>
                                          <th>Cultivar</th>
                                          <th>Day of cycle</th>
                                          <th>EC Measured (Targets)</th>
                                          <th>pH Measured (Targets)</th>
                                          <th>Last Updated</th>
                                          <th>Highlight in graph</th>
                                        </tr>
                                      </thead>
                                      <tbody>
                                        <template
                                          v-for="(batchs,
                                          bIndex) in comparment.batchs"
                                        >
                                          <tr
                                            :key="`batch1${batchs.id}${bIndex}`"
                                          >
                                            <td>
                                              <a
                                                class="text-primary"
                                                data-toggle="collapse"
                                                :data-target="
                                                  `#batch${comparment.compartmentNo}${batchs.id}${bIndex}`
                                                "
                                              >
                                                {{ batchs.batchID }}
                                              </a>
                                            </td>
                                            <td>{{ batchs.cultivar }}</td>
                                            <td>{{ batchs.dayOfCycle }}</td>
                                            <td>{{ batchs.ecMeasured }}</td>
                                            <td>{{ batchs.phMeasured }}</td>
                                            <td>{{ batchs.updated_date }}</td>
                                            <td>
                                              <img
                                                src="./../assets/images/graph-arrow.svg"
                                                @click="
                                                  selectComparament(
                                                    index + 1,
                                                    bIndex + 1
                                                  )
                                                "
                                              />
                                            </td>
                                          </tr>
                                          <tr
                                            :key="`batch2${batchs.id}${bIndex}`"
                                          >
                                            <td colspan="7" class="hiddenRow">
                                              <div
                                                class="accordian-body collapse "
                                                :id="
                                                  `batch${comparment.compartmentNo}${batchs.id}${bIndex}`
                                                "
                                              >
                                                <!-- Sample list -->
                                                <table
                                                  class="table table-condensed table-striped"
                                                >
                                                  <thead>
                                                    <tr>
                                                      <th></th>
                                                      <th>
                                                        <span
                                                          v-if="
                                                            type == 'Flower' ||
                                                              type ==
                                                                'Vegetative' ||
                                                              type == 'Mother'
                                                          "
                                                        >
                                                          Day after planting
                                                        </span>
                                                        <span
                                                          v-if="type == 'Clone'"
                                                        >
                                                          Day after cloning
                                                        </span>
                                                      </th>
                                                      <th>Sample Date</th>
                                                      <th>
                                                        EC Measured (Targets)
                                                      </th>
                                                      <th>
                                                        pH Measured (Targets)
                                                      </th>
                                                      <th></th>
                                                    </tr>
                                                  </thead>
                                                  <tbody>
                                                    <tr
                                                      v-for="(subsrateData,
                                                      SBIndex) in batchs.subsrateData"
                                                      :key="
                                                        `${subsrateData.subsrateID}${SBIndex}`
                                                      "
                                                    >
                                                      <td></td>
                                                      <td>
                                                        {{
                                                          subsrateData.dayAfterTrigger
                                                        }}
                                                        Days
                                                      </td>
                                                      <td>
                                                        {{
                                                          subsrateData.samplingDate
                                                        }}
                                                      </td>
                                                      <td>
                                                        <span
                                                          v-if="
                                                            sampleEditId !=
                                                              subsrateData.subsrateID
                                                          "
                                                          >{{
                                                            subsrateData.ecMeasured
                                                          }}</span
                                                        >
                                                        <span v-else>
                                                          <b-form-input
                                                            type="number"
                                                            v-model="
                                                              items[index]
                                                                .batchs[bIndex]
                                                                .subsrateData[
                                                                SBIndex
                                                              ].eC
                                                            "
                                                            v-on:keypress="
                                                              isNumber($event)
                                                            "
                                                            class="ecph"
                                                            placeholder="EC"
                                                          ></b-form-input>
                                                        </span>
                                                      </td>
                                                      <td>
                                                        <span
                                                          v-if="
                                                            sampleEditId !=
                                                              subsrateData.subsrateID
                                                          "
                                                          >{{
                                                            subsrateData.phMeasured
                                                          }}</span
                                                        >
                                                        <span v-else>
                                                          <b-form-input
                                                            type="number"
                                                            v-model="
                                                              items[index]
                                                                .batchs[bIndex]
                                                                .subsrateData[
                                                                SBIndex
                                                              ].pH
                                                            "
                                                            v-on:keypress="
                                                              isNumber($event)
                                                            "
                                                            class="ecph"
                                                            placeholder="EC"
                                                          ></b-form-input>
                                                        </span>
                                                        <!-- {{ subsrateData.phMeasured }} -->
                                                      </td>
                                                      <td>
                                                        <b-button
                                                          class="bg-transparent border-0"
                                                        >
                                                          <div class="d-flex">
                                                            <span
                                                              v-if="
                                                                sampleEditId !=
                                                                  subsrateData.subsrateID
                                                              "
                                                            >
                                                              <img
                                                                @click="
                                                                  editSample(
                                                                    subsrateData.subsrateID
                                                                  )
                                                                "
                                                                src="./../assets/images/edit-data.svg"
                                                                alt="Edit Row"
                                                              />
                                                            </span>
                                                            <span v-else>
                                                              <img
                                                                @click="
                                                                  saveSample(
                                                                    subsrateData.subsrateID,
                                                                    index,
                                                                    bIndex,
                                                                    SBIndex
                                                                  )
                                                                "
                                                                src="./../assets/images/done.svg"
                                                                alt="Done Row"
                                                              />
                                                            </span>
                                                            <span
                                                              class="pl-1"
                                                              v-on:click="
                                                                openDelete(
                                                                  subsrateData.subsrateID,
                                                                  index,
                                                                  bIndex,
                                                                  SBIndex
                                                                )
                                                              "
                                                            >
                                                              <img
                                                                src="./../assets/images/delete-data.svg"
                                                                alt="Delete Row"
                                                              />
                                                            </span>
                                                          </div>
                                                        </b-button>
                                                      </td>
                                                    </tr>
                                                  </tbody>
                                                </table>
                                                <!-- Sample list End-->
                                              </div>
                                            </td>
                                          </tr>
                                        </template>
                                      </tbody>
                                    </table>
                                    <!-- Batch list end -->
                                  </div>
                                </td>
                              </tr>
                            </template>
                          </tbody>
                        </table>
                        <!-- comparment list End -->
                      </div>
                    </div>
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
                      @click="setGraph()"
                    />
                    <GChart
                      type="LineChart"
                      :options="EcOptions"
                      :data="EcCollectionData"
                      :events="EcChartEvents"
                    />
                  </div>
                  <!-- Ec graph end -->

                  <!-- Ph graph -->
                  <div class="example">
                    <img
                      src="./../assets/images/full-screen.svg"
                      alt="Full Screen"
                      data-toggle="modal"
                      data-target="#exampleModal"
                      @click="setGraph()"
                    />
                    <GChart
                      type="LineChart"
                      :options="pHOptions"
                      :data="pHCollectionData"
                      :events="pHChartEvents"
                    />
                  </div>
                  <!-- Ph graph end -->
                </div>
              </div>
              <!-- slide button for next graph -->
              <div
                class="d-flex align-items-center justify-content-center w-100"
                v-if="
                  items.length > 0 &&
                    items[selectedComparment - 1].batchs.length > 0
                "
              >
                <div class="d-flex align-items-center pl-lg-4">
                  <a
                    class="carousel-control-prev-icon"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                    @click="changeBatchLeft()"
                  ></a>
                  <span class="pl-lg-4 pr-lg-4 graph-count">
                    {{ selectedBatch }}/{{
                      items[selectedComparment - 1].batchs.length
                    }}
                  </span>
                  <a
                    class="carousel-control-next-icon"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                    @click="changeBatchRight()"
                  ></a>
                </div>
                <div class="d-flex align-items-center pr-lg-4">
                  <span class="pl-lg-4 pr-lg-4 graph-name">
                    {{
                      items[selectedComparment - 1].batchs[selectedBatch - 1]
                        .batchID +
                        " - " +
                        items[selectedComparment - 1].batchs[selectedBatch - 1]
                          .cultivar
                    }}
                  </span>
                </div>
              </div>
              <!-- slide button for next graph end -->
              <br />
              <!-- slide button for next comparment -->
              <div
                class="d-flex align-items-center justify-content-center w-100"
                v-if="items.length > 0"
              >
                <div class="d-flex align-items-center pl-lg-4">
                  <a
                    class="carousel-control-prev-icon"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="prev"
                    @click="changeCompartmentLeft()"
                  ></a>
                  <span class="pl-lg-4 pr-lg-4 graph-count"
                    >{{ selectedComparment }}/{{ items.length }}</span
                  >
                  <a
                    class="carousel-control-next-icon"
                    href="#carouselExampleControls"
                    role="button"
                    data-slide="next"
                    @click="changeCompartmentRight()"
                  ></a>
                </div>
                <div class="d-flex align-items-center pr-lg-4">
                  <span class="pl-lg-4 pr-lg-4 graph-name">{{
                    userDetail.growUnit + " " + selectedComparment
                  }}</span>
                </div>
              </div>
              <!-- slide button for next comparment end -->
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Graph Modal -->
    <div
      class="modal graph-model"
      tabindex="-1"
      role="dialog"
      id="exampleModal"
    >
      <div class="modal-dialog" role="document" style="max-width: 85%;">
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
              <GChart
                type="LineChart"
                :options="EcOptions"
                :data="EcCollectionData"
                :events="EcChartEvents"
              />
            </div>
            <div class="col-md-6">
              <GChart
                type="LineChart"
                :options="pHOptions"
                :data="pHCollectionData"
                :events="pHChartEvents"
              />
            </div>
          </div>
        </div>
      </div>
    </div>
    <!-- Graph Modal end -->

    <!-- Delete model -->
    <div
      class="modal fade"
      id="DeleteField"
      tabindex="-1"
      role="dialog"
      aria-labelledby="DeleteFieldLabel"
      aria-hidden="true"
    >
      <div class="modal-dialog modal-dialog-centered" role="document">
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
const $ = require("jquery");
window.$ = $;

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

import { GChart } from "vue-google-charts";

export default {
  name: "dashboard",
  data: function() {
    return {
      userDetail: {},
      type: "",
      types: [],
      items: [],
      totalData: 0,
      chartOptionsEc: {},
      chartOptionsPh: {},
      seriesEc: [],
      seriesPh: [],
      selectedComparment: 0,
      selectedBatch: 0,
      serach: "",
      sampleEditId: "",
      deleteId: {},

      EcLegend: [],
      EcCollectionData: [],
      EcOptions: {
        title: "EC",
        // pointSize: 3,
        hAxis: {
          ticks: [],
        },
        vAxis: {
          minValue: 0,
          maxValue: 1.0,
        },
        series: {
          0: { color: "red", lineWidth: 4 },
          1: { color: "#49ef6f", lineWidth: 2 },
          2: { color: "#fbb940", lineWidth: 2 },
          3: { color: "#fbb940", lineWidth: 2 },
        },
        annotations: {
          style: 'line',
          stem: {
            color: "#000"
          },
        },
        // width: 450,
        height: 500,
        legend: { position: "right", },
      },
      EcChartEvents:{
        click: async(e) => {
          let legend;
          if(e.targetID == "legendentry#0"){
            legend = 2;
          }else if(e.targetID == "legendentry#1"){
            legend = 3;
          }else if(e.targetID == "legendentry#2"){
            legend = 4;
          }else if(e.targetID == "legendentry#3"){
            legend = 5;
          }
          if(this.EcLegend.includes(legend)){
            this.EcLegend = this.EcLegend.filter(element => element !== legend);
          }else{
            this.EcLegend.push(legend);
          }
          this.EcCollectionData = JSON.parse(localStorage.getItem("sapinzaDashboardEcData"));
          this.EcCollectionData.map((EcCollection, index)=> {
            if(this.EcLegend.length > 0){
              if(EcCollection[0] !== "Day" ){
                if(this.EcLegend.includes(2)){
                  EcCollection[2] = null;
                  if(index === 1){
                    EcCollection[2] = 0;
                  }
                }
                if(this.EcLegend.includes(3)){
                  EcCollection[3] = null;
                  if(index === 1){
                    EcCollection[3] = 0;
                  }
                }
                if(this.EcLegend.includes(4)){
                  EcCollection[4] = null;
                  if(index === 1){
                    EcCollection[4] = 0;
                  }
                }
                if(this.EcLegend.includes(5)){
                  EcCollection[5] = null;
                  if(index === 1){
                    EcCollection[5] = 0;
                  }
                }
              }
            }
            return EcCollection;
          })
        }
      },
  
      pHLegend: [],
      pHCollectionData: [],
      pHOptions: {
        title: "pH",
        // pointSize: 3,
        hAxis: {
          ticks: [],
        },
        vAxis: {
          minValue: 0,
          maxValue: 1.0,
        },
        series: {
          0: { color: "blue", lineWidth: 4 },
          1: { color: "#49ef6f", lineWidth: 2 },
          2: { color: "#4d8af1", lineWidth: 2 },
          3: { color: "#4d8af1", lineWidth: 2 },
        },
        annotations: {
          style: 'line',
          stem: {
            color: "#000"
          },
        },
        // width: 450,
        height: 500,
        // legend: { position: "bottom" },
      },
      pHChartEvents:{
        click: async(e) => {
          let legend;
          if(e.targetID == "legendentry#0"){
            legend = 2;
          }else if(e.targetID == "legendentry#1"){
            legend = 3;
          }else if(e.targetID == "legendentry#2"){
            legend = 4;
          }else if(e.targetID == "legendentry#3"){
            legend = 5;
          }
          if(this.pHLegend.includes(legend)){
            this.pHLegend = this.pHLegend.filter(element => element !== legend);
          }else{
            this.pHLegend.push(legend);
          }
          this.pHCollectionData = JSON.parse(localStorage.getItem("sapinzaDashboardpHData"));
          this.pHCollectionData.map((pHCollection, index)=> {
            if(this.pHLegend.length > 0){
              if(pHCollection[0] !== "Day" ){
                if(this.pHLegend.includes(2)){
                  pHCollection[2] = null;
                  if(index === 1){
                    pHCollection[2] = 0;
                  }
                }
                if(this.pHLegend.includes(3)){
                  pHCollection[3] = null;
                  if(index === 1){
                    pHCollection[3] = 0;
                  }
                }
                if(this.pHLegend.includes(4)){
                  pHCollection[4] = null;
                  if(index === 1){
                    pHCollection[4] = 0;
                  }
                }
                if(this.pHLegend.includes(5)){
                  pHCollection[5] = null;
                  if(index === 1){
                    pHCollection[5] = 0;
                  }
                }
              }
            }
            return pHCollection;
          })
        }
      },
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
      this.getData();
    },
    getData() {
      this.selectedComparment = 0;
      this.selectedBatch = 0;
      this.items = [];
      this.chartOptionsEc = {
        title: {
          text:
            "Substate EC Graph (" +
            this.type +
            " Comarment " +
            this.selectedComparment +
            ")",
          align: "left",
        },
      };
      this.chartOptionsPh = {
        title: {
          text:
            "Substate PH Graph (" +
            this.type +
            " Comarment " +
            this.selectedComparment +
            ")",
          align: "left",
        },
      };
      this.seriesEc = [];
      this.seriesPh = [];
      this.$http
        .post(
          this.$apiBaseUrl + "dashboard",
          {
            type: this.type,
            search: this.serach,
          },
          {
            headers: {
              Authorization: this.accessToken(),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.totalData = response.data.data.totalData;
            this.items = response.data.data.items;
            if (this.items.length > 0) {
              this.selectComparament(1, 1);
            }
          } else {
            this.totalData = 0;
          }
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            this.unauthenticatedError();
          } else {
            this.$toast.error(error.response.data.message, {
              position: "top-right",
            });
          }
        });
    },
    selectComparament(comparment, batch) {
      this.selectedComparment = comparment;
      this.selectedBatch = batch;
      this.setGraph();
    },
    setGraph() {
      this.EcLegend = [];
      this.EcOptions.hAxis.ticks = [0];
      this.EcCollectionData = [
        [
          "Day",
          "EC meas",
          "Feed tar",
          "Ec min sub",
          "Ec max sub",
        ],
        [0, 0, 0, 0, 0],
      ];

      this.pHLegend = [];
      this.pHOptions.hAxis.ticks = [0];
      this.pHCollectionData = [
        [
          "Day",
          "pH meas",
          "Feed tar",
          "pH min sub",
          "pH max sub",
        ],
        [0, 0, 0, 0, 0],
      ];

      if (this.selectedComparment != 0 && this.selectedBatch != 0) {
        this.chartOptionsPh = {};
        if (
          this.items[this.selectedComparment - 1].batchs[this.selectedBatch - 1]
        ) {
          var bathcId = this.items[this.selectedComparment - 1].batchs[
            this.selectedBatch - 1
          ].id;
          this.$http
            .get(this.$apiBaseUrl + "dashboard/graph/" + bathcId, {
              headers: {
                Authorization: this.accessToken(),
              },
            })
            .then((response) => {
              if (response.status == 200) {
                localStorage.setItem("sapinzaDashboardEcData", JSON.stringify(response.data.data.eC.value)) 
                this.EcCollectionData = response.data.data.eC.value;
                this.EcOptions.hAxis.ticks = response.data.data.eC.lable;

                localStorage.setItem("sapinzaDashboardpHData", JSON.stringify(response.data.data.pH.value)) 
                this.pHCollectionData = response.data.data.pH.value;
                this.pHOptions.hAxis.ticks = response.data.data.pH.lable;
              }
            })
            .catch((error) => {
              console.log(error);
              if (error.response.status == 401) {
                this.unauthenticatedError();
              } else {
                this.$toast.error(error.response.data.message, {
                  position: "top-right",
                });
              }
            });
        }
      }
    },
    changeCompartmentRight() {
      var selectedComparment = this.selectedComparment;
      if (selectedComparment < this.items.length) {
        this.selectComparament(selectedComparment + 1, 1);
      } else {
        this.selectComparament(1, 1);
      }
    },
    changeCompartmentLeft() {
      var selectedComparment = this.selectedComparment;
      if (selectedComparment == 1) {
        this.selectComparament(this.items.length, 1);
      } else {
        this.selectComparament(selectedComparment - 1, 1);
      }
    },
    changeBatchRight() {
      var selectedComparment = this.selectedComparment;
      var selectedBatch = this.selectedBatch;
      if (selectedBatch < this.items[selectedComparment - 1].batchs.length) {
        this.selectComparament(selectedComparment, selectedBatch + 1);
      } else {
        this.selectComparament(selectedComparment, 1);
      }
    },
    changeBatchLeft() {
      var selectedComparment = this.selectedComparment;
      var selectedBatch = this.selectedBatch;
      if (selectedBatch == 1) {
        this.selectComparament(
          selectedComparment,
          this.items[selectedComparment - 1].batchs.length
        );
      } else {
        this.selectComparament(selectedComparment, selectedBatch - 1);
      }
    },
    editSample(subsrateID) {
      this.sampleEditId = subsrateID;
    },
    saveSample(subsrateID, index, bIndex, SBIndex) {
      console.log(subsrateID);
      this.$http
        .post(
          this.$apiBaseUrl + "subsrate/dashboard/update",
          this.items[index].batchs[bIndex].subsrateData[SBIndex],
          {
            headers: {
              Authorization: this.accessToken(),
            },
          }
        )
        .then((response) => {
          if (response.status == 200) {
            this.sampleEditId = "";
            this.items[index].batchs[bIndex].subsrateData[SBIndex].ecMeasured =
              response.data.data.ecMeasured;
            this.items[index].batchs[bIndex].subsrateData[SBIndex].phMeasured =
              response.data.data.phMeasured;
          }
        })
        .catch((error) => {
          if (error.response.status == 401) {
            this.unauthenticatedError();
          } else if (error.response.status == 422) {
            this.errors = [];
            this.errors[index] = error.response.data.errors;
            let errors = Object.keys(this.errors[index]).map((key) => [
              this.errors[index][key],
            ]);
            if (errors.length > 0) {
              let errorMsg = "";
              for (const errorData of errors) {
                errorMsg += errorData[0] + "<br>";
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
    isNumber: function(evt) {
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
    openDelete(subsrateID, index, bIndex, SBIndex) {
      this.deleteId = {
        index: index,
        bIndex: bIndex,
        SBIndex: SBIndex,
      };
      $("#DeleteField").modal("show");
    },
    deleteData() {
      this.errors = [];
      this.$http
        .delete(
          this.$apiBaseUrl +
            "subsrate/" +
            this.items[this.deleteId.index].batchs[this.deleteId.bIndex]
              .subsrateData[this.deleteId.SBIndex].subsrateID,
          {
            headers: {
              Authorization: this.accessToken(),
            },
          }
        )
        .then((response) => {
          this.$toast.success(response.data.message, {
            position: "top-right",
          });
          this.items[this.deleteId.index].batchs[
            this.deleteId.bIndex
          ].subsrateData.splice(this.deleteId.SBIndex, 1);
          this.deleteId = {};
        })
        .catch((error) => {
          console.log(error);
          if (error.response.status == 401) {
            this.unauthenticatedError();
          } else {
            this.$toast.error(error.response.data.message, {
              position: "top-right",
            });
          }
        });
      $("#DeleteField").modal("hide");
    },
  },
  components: {
    Sidebar,
    Header,
    GChart,
  },
  mounted() {
    // $(window).resize(function(){
    //   console.log("width: ",$(".graph-model").width());
    //   console.log("height: ",$(".graph-model").height());
    // });

    this.userDetail = this.userDetails();
    this.changeType("Flower");
    $("#menu-toggle").click(function() {
      $(".sidebar").toggleClass("sidebar-collapse");
    });
  },
  beforeMount() {
    let electricalConductivity = JSON.parse(
      this.userDetails().electricalConductivity
    );
    for (let index = 0; index < electricalConductivity.length; index++) {
      let comparment = 0;
      let active = "";
      if (index == 0) {
        active = "active";
      }
      switch (electricalConductivity[index]) {
        case "Flower":
          comparment = this.userDetails().flower;
          break;
        case "Vegetative":
          comparment = this.userDetails().vegitative;
          break;
        case "Clone":
          comparment = this.userDetails().clone;
          break;
        case "Mother":
          comparment = this.userDetails().mother;
          break;
      }
      this.types.push({
        name: electricalConductivity[index],
        selecetd: true,
        class: "nav-link " + active,
        comparment: comparment,
      });
    }
  },
};
</script>
