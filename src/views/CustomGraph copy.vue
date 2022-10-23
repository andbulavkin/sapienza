<template>
  <div class="dashboard">
    <!-- Sidebar -->
    <Sidebar />
    <!-- Sidebar end -->
    <div class="content">
      <!-- Header -->
      <Header tabName="Custom Graph" />
      <!-- Header end-->

      <!-- No data added -->
      <div class="nodata-found" v-if="totalData == 0">
        <div class="found-img">
          <img
            src="./../assets/images/nodata-found.svg"
            alt="nodata-found img"
          />
        </div>
        <div class="found-text">
          <h3>Please Enter data to <br />access dashbord</h3>
          <router-link to="/Subsrate-ecpH">
            <button type="submit" class="btn btn-primary">
              Enter Data
            </button>
          </router-link>
        </div>
      </div>
      <!-- No data added end -->

      <section class="dashboard-section main-dashboard" v-else>
        <div class="row">
          <div class="col-12 col-sm-12 col-md-12 col-lg-8">
            <div class="select-comparment graph-compartment">
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
                  <img src="./../assets/images/filter.svg" alt="Filter" />
                </a>
                <div
                  class="dropdown-menu dropdown-menu-right"
                  aria-labelledby="dropdownMenuButton"
                >
                  <div
                    class="
                                 d-flex
                                 align-items-center
                                 justify-content-between
                                 mb-3
                              "
                  >
                    <h3 class="m-0 p-0">Filter data</h3>
                    <a class="text-danger m-0 p-0">Close</a>
                  </div>
                  <div class="filter-date">
                    <form class="form">
                      <div class="form-group d-flex">
                        <label class="filter-title">By Date</label>
                        <ul id="pills-tab" role="tablist" class="nav nav-pills">
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
                      <div id="pills-tabContent" class="tab-content">
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
                            <label class="filter-title"
                              >By {{ userDetail.growUnit }} ID</label
                            >
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
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <div
              class="d-flex align-items-center justify-content-between custom-graph "
            >
              <div class="edit-row">
                <span>
                  <img src="./../assets/images/edit-row.svg" alt="edit-row" />
                  Select Multiple compartments to view combined graph
                </span>
              </div>
              <span class="text-danger btn" @click="resetGrph">
                Reset Graph
              </span>
            </div>
          </div>
        </div>
        <div id="pills-tabContent" class="tab-content">
          <div
            id="pills-Flower"
            role="tabpanel"
            aria-labelledby="pills-Flower-tab"
            class="tab-pane fade show active"
          >
            <div class="row">
              <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                <div class="subsrate-content">
                  <div class="panel panel-default">
                    <div class="panel-body">
                      <div class="table-responsive">
                        <table class=" table table-condensed table-striped ">
                          <thead>
                            <tr class="accordion-toggle">
                              <th class="text-center">
                                Batch ID
                              </th>
                              <th>{{ userDetail.growUnit }}</th>
                              <th>cultivar</th>
                              <th v-if="type == 'Flower'">HarvestDate</th>
                              <th
                                v-else-if="
                                  type == 'Vegetative' || type == 'Clone'
                                "
                              >
                                Transplant Date
                              </th>
                              <th v-else-if="type == 'Mother'">Cull Date</th>
                              <th>Incude in Custom Graph</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in items" :key="item.id">
                              <td class="text-primary text-center">
                                {{ item.batchID }}
                              </td>
                              <td class="text-dark">
                                {{ item.comparment }}
                                {{ userDetail.growUnit }}
                                {{ item.comparmentNo }}
                              </td>
                              <td class="text-dark">
                                {{ item.cultivar }}
                              </td>
                              <td class="text-dark" v-if="type == 'Flower'">
                                {{ item.harvestDate }}
                              </td>
                              <td
                                class="text-dark"
                                v-else-if="
                                  type == 'Vegetative' || type == 'Clone'
                                "
                              >
                                {{ item.transplantDate }}
                              </td>
                              <td
                                class="text-dark"
                                v-else-if="type == 'Mother'"
                              >
                                {{ item.cullDate }}
                              </td>
                              <td>
                                <input
                                  :id="item.id + 'checkBox'"
                                  type="checkbox"
                                  chklist-all
                                  @click="selectBatch(index)"
                                />
                                <label :for="item.id + 'checkBox'"></label>
                              </td>
                            </tr>
                          </tbody>
                        </table>
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
                        <apexchart
                          width="100%"
                          height="250"
                          type="area"
                          :options="chartOptionsEc"
                          :series="ecSeries"
                        ></apexchart>
                      </div>
                      <!-- Ec graph End -->
                      <!-- Ph graph -->
                      <div class="example">
                        <img
                          src="./../assets/images/full-screen.svg"
                          alt="Full Screen"
                          data-toggle="modal"
                          data-target="#exampleModal"
                        />
                        <apexchart
                          width="100%"
                          height="250"
                          type="area"
                          :options="chartOptionsPh"
                          :series="phSeries"
                        ></apexchart>
                      </div>
                      <!-- Ph graph End -->
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>

    <!-- Graph Modal -->
    <div class="modal" tabindex="-1" role="dialog" id="exampleModal">
      <div class="modal-dialog" role="document" style="max-width: 80%;">
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
            <!-- Ec graph -->
            <div class="col-md-6">
              <apexchart
                type="area"
                :options="chartOptionsEc"
                :series="ecSeries"
              ></apexchart>
            </div>
            <!-- Ec graph End -->

            <!-- Ph graph -->
            <div class="col-md-6">
              <apexchart
                type="area"
                :options="chartOptionsPh"
                :series="phSeries"
              ></apexchart>
            </div>
            <!-- Ph graph End -->
          </div>
        </div>
      </div>
    </div>
    <!-- End Graph Modal -->
  </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";

export default {
  name: "CustomGraph",
  components: {
    Sidebar,
    Header,
  },
  data: function() {
    return {
      userDetail: {},
      type: "",
      types: [],
      totalData: 0,
      items: [],
      byDate: "",
      cutomDate: "",
      byBatchID: "",
      byRoomID: null,
      byCultivar: "",
      chartOptionsEc: {},
      chartOptionsPh: {},
      ecSeries: [],
      phSeries: [],
      selcetdBatch: [],
      comparments: [],
    };
  },
  methods: {
    changeType(type) {
      this.type = type;
      this.selcetdBatch = [];
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
      this.$http
        .post(
          this.$apiBaseUrl + "dashboard/custom-graph",
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
          if (response.status == 200) {
            this.totalData = response.data.data.count;
            this.items = response.data.data.items;
          } else {
            this.totalData = 0;
          }
          this.setGraph();
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
    selectBatch(index) {
      var index2 = this.selcetdBatch.indexOf(index);
      if (index2 !== -1) {
        this.selcetdBatch.splice(index2, 1);
      } else {
        this.selcetdBatch.push(index);
      }
      this.setGraph();
    },
    setGraph() {
      var allCategories = [];
      var categories = [];
      this.ecSeries = [];
      this.phSeries = [];

      // Add X key
      for (let index = 0; index < this.selcetdBatch.length; index++) {
        var item = this.items[this.selcetdBatch[index]];
        if (item.subsrateData.length > 0) {
          for (let index2 = 0; index2 < item.subsrateData.length; index2++) {
            var subsrateData = item.subsrateData[index2];
            allCategories.push(subsrateData.samplingDay);
          }
        }
      }
      // Remove same key
      $.each(allCategories, function(i, el) {
        if ($.inArray(el, categories) === -1) categories.push(el);
      });
      // Sort key
      categories = categories.sort(function(a, b) {
        return a - b;
      });
      this.chartOptionsEc = {
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: categories,
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: "topRight",
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "Substate EC Graph",
          align: "left",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        legend: {
          horizontalAlign: "left",
        },
      };
      this.chartOptionsPh = {
        dataLabels: {
          enabled: true,
        },
        stroke: {
          curve: "smooth",
        },
        xaxis: {
          categories: categories,
        },
        tooltip: {
          fixed: {
            enabled: false,
            position: "topRight",
          },
        },
        chart: {
          toolbar: {
            show: false,
          },
        },
        title: {
          text: "Substate pH Graph",
          align: "left",
        },
        plotOptions: {
          bar: {
            horizontal: false,
          },
        },
        legend: {
          horizontalAlign: "left",
        },
      };
      // Add Value
      for (let index = 0; index < this.selcetdBatch.length; index++) {
        var item2 = this.items[this.selcetdBatch[index]];
        var ecData = {
          name: item2.batchID,
          data: [],
        };
        var phData = {
          name: item2.batchID,
          data: [],
        };
        for (let index2 = 0; index2 < categories.length; index2++) {
          var eCsetValue = 0;
          var pHsetValue = 0;
          if (item2.subsrateData.length > 0) {
            for (let index3 = 0; index3 < item2.subsrateData.length; index3++) {
              const subsrateData = item2.subsrateData[index3];
              if (
                subsrateData &&
                subsrateData.samplingDay == categories[index2]
              ) {
                eCsetValue = subsrateData.eC;
                pHsetValue = subsrateData.pH;
                break;
              } else {
                eCsetValue = 0;
                pHsetValue = 0;
              }
            }
          }
          ecData.data.push(eCsetValue);
          phData.data.push(pHsetValue);
        }
        this.ecSeries.push(ecData);
        this.phSeries.push(phData);
      }
    },
    resetGrph() {
      this.selcetdBatch = [];
      $("input:checkbox").prop("checked", false);
      this.setGraph();
    },
  },
  mounted() {
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
