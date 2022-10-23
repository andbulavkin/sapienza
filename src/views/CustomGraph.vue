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
          <img src="./../assets/images/nodata-found.svg" alt="nodata-found img" />
        </div>
        <div class="found-text">
          <h3>Please Enter data to <br />access dashbord</h3>
          <router-link to="/Subsrate-ecpH">
            <button type="submit" class="btn btn-primary">Enter Data</button>
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
                  <p class="m-0">
                    Select
                    {{ userDetail.growUnit }}
                  </p>
                </div>
                <ul id="pills-tab" role="tablist" class="nav nav-pills">
                  <li class="nav-item" v-for="type in types" :key="type.name">
                    <a :class="type.class" id="pills-Flower-tab" data-toggle="pill" href="#pills-Vegetative" role="tab" aria-controls="pills-Vegetative" :aria-selected="type.selecetd" v-on:click="changeType(type.name)">
                      {{ type.name }}
                    </a>
                  </li>
                </ul>
              </div>
              <!-- Batch Comparment End -->

              <!-- Filter Section -->
              <div class="filter dropdown">
                <a href="#" class="btn btn-primary" id="dropdownMenuButton" data-toggle="dropdown" aria-haspopup="true" aria-expanded="false">
                  Filter
                  <img src="./../assets/images/filter.svg" alt="Filter" />
                </a>
                <div class="dropdown-menu dropdown-menu-right" aria-labelledby="dropdownMenuButton">
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
                        <ul id="pills-tab" role="tablist" class="nav nav-pills">
                          <li class="nav-item">
                            <a id="pills-lastmonthbatch-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-lastmonthbatch" aria-selected="false" class="nav-link filterBatchDateBtn" v-on:click="changeDate(1)">
                              Last month
                            </a>
                          </li>
                          <li class="nav-item">
                            <a id="pills-sixmonthbatch-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-sixmonthbatch" aria-selected="false" class="nav-link filterBatchDateBtn" v-on:click="changeDate(2)">
                              Last 6 month
                            </a>
                          </li>
                          <li class="nav-item">
                            <a id="pills-twelvemonthbatch-tab" data-toggle="pill" href="#" role="tab" aria-controls="pills-twelvemonthbatch" aria-selected="false" class="nav-link filterBatchDateBtn" v-on:click="changeDate(3)">
                              Last 12 month
                            </a>
                          </li>
                          <input type="date" placeholder="Enter Custom date" v-model="cutomDate" />
                        </ul>
                      </div>
                      <div id="pills-tabContent" class="tab-content">
                        <div role="tabpanel" aria-labelledby="pills-lastmonthbatch-tab" class="tab-pane fade show active">
                          <div class="form-inline">
                            <label class="filter-title">By Batch ID</label>
                            <input type="text" placeholder="Enter Batch ID" class="form-control" v-model="byBatchID" />
                          </div>
                          <div class="form-inline">
                            <label class="filter-title">By
                              {{ userDetail.growUnit }} ID</label>
                            <b-form-select class="form-control selectCompartment" v-model="byRoomID" :options="comparments"></b-form-select>
                          </div>
                          <div class="form-inline">
                            <label class="filter-title">By Cultivar</label>
                            <input type="text" placeholder="Enter Cultivar name" class="form-control" v-model="byCultivar" />
                          </div>
                        </div>
                      </div>
                    </form>
                  </div>
                  <div class="d-flex align-items-center">
                    <button class="btn btn-success" type="button" v-on:click="getData(type)">
                      Filter data
                    </button>
                    <button class="btn btn-danger ml-3" type="button" v-on:click="clearfilter(type)">
                      Clear Filters
                    </button>
                  </div>
                </div>
              </div>
              <!-- Filter Section End -->
            </div>
          </div>
          <div class="col-12 col-sm-12 col-md-12 col-lg-4">
            <div class="
                d-flex
                align-items-center
                justify-content-between
                custom-graph
              ">
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
          <div id="pills-Flower" role="tabpanel" aria-labelledby="pills-Flower-tab" class="tab-pane fade show active">
            <div class="row">
              <div class="col-12 col-sm-12 col-md-12 col-lg-8">
                <div class="subsrate-content">
                  <div class="panel panel-default">
                    <div class="panel-body">
                      <div class="table-responsive">
                        <table class="table table-condensed table-striped">
                          <thead>
                            <tr class="accordion-toggle">
                              <th class="text-center">Batch ID</th>
                              <th>
                                {{ userDetail.growUnit }}
                              </th>
                              <th>cultivar</th>
                              <th v-if="type == 'Flower'">HarvestDate</th>
                              <th v-else-if="
                                  type == 'Vegetative' || type == 'Clone'
                                ">
                                Transplant Date
                              </th>
                              <th v-else-if="type == 'Mother'">Cull Date</th>
                              <th>Measured Substrate</th>
                              <th>Substrate Target Max</th>
                              <th>Substrate Target Min</th>
                              <th>Feed Target</th>
                            </tr>
                          </thead>
                          <tbody>
                            <tr v-for="(item, index) in items" :key="item.id">
                              <td class="text-primary text-center">
                                {{ item.batchID }}
                              </td>
                              <td class="text-dark">
                                <!-- {{ item.comparment }} -->
                                {{ type }}
                                {{ userDetail.growUnit }}
                                {{ item.comparmentNo }}
                              </td>
                              <td class="text-dark">
                                {{ item.cultivar }}
                              </td>
                              <td class="text-dark" v-if="type == 'Flower'">
                                {{ item.harvestDate }}
                              </td>
                              <td class="text-dark" v-else-if="
                                  type == 'Vegetative' || type == 'Clone'
                                ">
                                {{ item.transplantDate }}
                              </td>
                              <td class="text-dark" v-else-if="type == 'Mother'">
                                {{ item.cullDate }}
                              </td>
                              <td>
                                <input :id="item.id + '1checkBox'" type="checkbox" chklist-all @click="selectBatch(index)" />
                                <label :for="item.id + '1checkBox'"></label>
                              </td>
                              <td>
                                <input :id="item.id + '2checkBox'" type="checkbox" chklist-all @click="selectBatch(index)" />
                                <label :for="item.id + '2checkBox'"></label>
                              </td>
                              <td>
                                <input :id="item.id + '3checkBox'" type="checkbox" chklist-all @click="selectBatch(index)" />
                                <label :for="item.id + '3checkBox'"></label>
                              </td>
                              <td>
                                <input :id="item.id + '4checkBox'" type="checkbox" chklist-all @click="selectBatch(index)" />
                                <label :for="item.id + '4checkBox'"></label>
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
                <div id="carouselExampleControls" class="carousel slide" data-ride="carousel">
                  <div class="carousel-inner">
                    <div class="carousel-item active">
                      <!-- Ec graph -->
                      <div class="example">
                        <img src="./../assets/images/full-screen.svg" alt="Full Screen" data-toggle="modal" data-target="#exampleModal" />
                        <Plotly :data="Ecdata" :layout="Eclayout" :display-mode-bar="false"></Plotly>
                      </div>
                      <!-- Ec graph End -->

                      <!-- Ph graph -->
                      <div class="example">
                        <img src="./../assets/images/full-screen.svg" alt="Full Screen" data-toggle="modal" data-target="#exampleModal" />
                        <Plotly :data="pHdata" :layout="pHlayout" :display-mode-bar="false"></Plotly>
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
      <div class="modal-dialog" role="document" style="max-width: 80%">
        <div class="modal-content">
          <div class="modal-header">
            <button type="button" class="close" data-dismiss="modal" aria-label="Close">
              <span aria-hidden="true">&times;</span>
            </button>
          </div>
          <div class="modal-body row">
            <!-- Ec graph -->
            <div class="col-md-6">
              <Plotly :data="Ecdata" :layout="Eclayout" :display-mode-bar="false"></Plotly>
            </div>
            <!-- Ec graph End -->

            <!-- Ph graph -->
            <div class="col-md-6">
              <Plotly :data="pHdata" :layout="pHlayout" :display-mode-bar="false"></Plotly>
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

  import {
    Plotly
  } from "vue-plotly";

  export default {
    name: "CustomGraph",
    components: {
      Sidebar,
      Header,
      Plotly,
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
        selcetdBatch: [],
        comparments: [],

        Ecdata: [],
        Eclayout: {},

        pHdata: [],
        pHlayout: {},
      };
    },
    methods: {
      changeType(type) {
        this.type = type;
        this.selcetdBatch = [];
        this.comparments = [];
        this.Ecdata = [];
        this.Eclayout = {};
        this.pHdata = [];
        this.pHlayout = {};

        this.comparments.push({
          value: null,
          text: "Select " + this.userDetail.growUnit,
        });
        for (let index = 0; index < this.types.length; index++) {
          if (this.type == this.types[index].name) {
            for (
              let index2 = 1; index2 <= this.types[index].comparment; index2++
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
            this.$apiBaseUrl + "dashboard/custom-graph", {
              type: this.type,
              batchselect: 1,
              byDate: this.byDate,
              cutomDate: this.cutomDate,
              byBatchID: this.byBatchID,
              byRoomID: this.byRoomID,
              byCultivar: this.byCultivar,
            }, {
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
            this.resetGrph();
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
        var item = this.items[index];
        for (let i = 1; i <= 4; i++) {
          var checkInArrray = this.selcetdBatch.indexOf(index);
          if ($(`#${item.id}${i}checkBox`).prop('checked')) {
            if (checkInArrray === -1) {
              this.selcetdBatch.push(index);
            }
            break;
          } else {
            if (checkInArrray !== -1) {
              this.selcetdBatch.splice(checkInArrray, 1);
            }
          }
        }

        // if (checkInArrray !== -1) {
        //   this.selcetdBatch.splice(checkInArrray, 1);
        // } else {
        //   this.selcetdBatch.push(index);
        // }
        this.setGraph();
      },
      setGraph() {
        this.Ecdata = [];
        this.pHdata = [];

        /** Put graph layout */

        this.Eclayout =  {
          title: "Substate EC",
          showlegend: true,
          legend: {"orientation": "h"},
          xaxis: {
            tickmode: "linear",
            tick0: 0,
            dtick: 7,
            rangemode: "tozero",
          },
          yaxis: {
            rangemode: "tozero",
          },
        }

        this.pHlayout = {
          title: "Substate pH",
          showlegend: true,
          legend: {"orientation": "h"},
          xaxis: {
            tickmode: "linear",
            tick0: 0,
            dtick: 7,
            rangemode: "tozero",
          },
          yaxis: {
            rangemode: "tozero",
            autorange: 'visible',
            range: [3,8],
          },
        }




        var allCategories = [];
        var categories = [];

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

        let length  = this.items[this.items.length - 1].subsrateData.length;

        if(length < 70){
          this.Eclayout.xaxis.dtick = 7;
          this.pHlayout.xaxis.dtick = 7;
        } else if(length > 70 && length < 182){
          this.Eclayout.xaxis.dtick = 14;
          this.pHlayout.xaxis.dtick = 14;
        } else if(length > 182){
          this.Eclayout.xaxis.dtick = 30;
          this.pHlayout.xaxis.dtick = 30;
        } else {
          this.Eclayout.xaxis.dtick = 7;
          this.pHlayout.xaxis.dtick = 7;
        }

        // Add Value
        for (let index = 0; index < this.selcetdBatch.length; index++) {
          var item2 = this.items[this.selcetdBatch[index]];
          var ecData = {
            x: [],
            y: [],
            name: `S ${item2.batchID}`,
            mode: "lines+markers",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          var ecDataMax = {
            x: categories,
            y: [],
            name: `ST+ ${item2.batchID}`,
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          var ecDataMin = {
            x: categories,
            y: [],
            name: `ST- ${item2.batchID}`,
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          var ecFeedData = {
            x: categories,
            y: [],
            name: `FT ${item2.batchID}`,
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };

          var phData = {
            x: [],
            y: [],
            name: `S_${item2.batchID}`,
            mode: "lines+markers",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          var phDataMax = {
            x: categories,
            y: [],
            name: `ST+ ${item2.batchID}`,
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          var phDataMin = {
            x: categories,
            y: [],
            name: `ST- ${item2.batchID}`,
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          var phFeedData = {
            x: categories,
            y: [],
            name: `FT ${item2.batchID}`,
            mode: "lines",
            line: {
              shape: "linear",
              width: 3,
            },
            marker: {
              size: 8,
            },
            type: "scatter",
          };
          for (let index2 = 0; index2 < categories.length; index2++) {
            var eCsetValue = '';
            var eCsetValueMax = 0;
            var eCsetValueMin = 0;
            var ecSetFeedValue = 0;
            var pHsetValue = '';
            var phSetValueMax = 0;
            var phSetValueMin = 0;
            var phSetFeedValue = 0;
            if (item2.subsrateData.length > 0) {
              for (let index3 = 0; index3 < item2.subsrateData.length; index3++) {
                const subsrateData = item2.subsrateData[index3];
                if (
                  subsrateData &&
                  subsrateData.samplingDay == categories[index2]
                ) {
                  eCsetValue = subsrateData.eC;
                  eCsetValueMax = subsrateData.ecTargetMax;
                  eCsetValueMin = subsrateData.ecTargetMin;
                  ecSetFeedValue = subsrateData.ecFeedTarget;

                  pHsetValue = subsrateData.pH;
                  phSetValueMax = subsrateData.phTargetMax;
                  phSetValueMin = subsrateData.phTargetMin;
                  phSetFeedValue = subsrateData.phFeedTarget;
                  break;
                }
              }
            }
            if ($(`#${item2.id}1checkBox`).prop('checked')) {
              if(typeof eCsetValue !== 'undefined' && typeof eCsetValue !== 'undefined' ) {
            
                ecData.x.push(index2);
                ecData.y.push(eCsetValue);

                phData.x.push(index2);
                phData.y.push(pHsetValue);
              }
            }
            if ($(`#${item2.id}2checkBox`).prop('checked')) {
              ecDataMax.y.push(eCsetValueMax);
              phDataMax.y.push(phSetValueMax);
            }
            if ($(`#${item2.id}3checkBox`).prop('checked')) {
              ecDataMin.y.push(eCsetValueMin);
              phDataMin.y.push(phSetValueMin);
            }
            if ($(`#${item2.id}4checkBox`).prop('checked')) {
              ecFeedData.y.push(ecSetFeedValue);
              phFeedData.y.push(phSetFeedValue);
            }
            
          }
          this.Ecdata.push(ecData);
          this.Ecdata.push(ecDataMax);
          this.Ecdata.push(ecDataMin);
          this.Ecdata.push(ecFeedData);

          this.pHdata.push(phData);
          this.pHdata.push(phDataMax);
          this.pHdata.push(phDataMin);
          this.pHdata.push(phFeedData);
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