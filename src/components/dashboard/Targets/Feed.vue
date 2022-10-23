<template>
    <section class="dashboard-section">
        <div class="row">
            <div class="col-12 col-sm-12 col-md-12 col-lg-12">
                <div class="title-target">
                    <h3>Feed EC/pH</h3>
                </div>
                <div class="select-comparment">
                    <div class="
                     batch-comparment
                     d-block d-md-flex d-lg-flex
                     align-items-center
                     justify-content-lg-start
                  ">
                        <div class="comparment-title">
                            <p class="m-0">Select {{ this.userDetails().growUnit }}</p>
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
                </div>
            </div>
        </div>

        <div
            id="pills-tabContent"
            class="tab-content"
        >
            <div
                id="pills-FeedFlower"
                role="tabpanel"
                aria-labelledby="pills-FeedFlower-tab"
                class="tab-pane fade show active"
            >
                <div class="row">
                    <div class="col-6 col-sm-6 col-md-6 col-lg-2">
                        <div class="Food-graph-title">
                            <p>Cultivar</p>
                            <b-form-select
                                class="cultivarSelect"
                                v-model="cultivar"
                                :options="cultivars"
                                @change="toggalCultivarSelect"
                            ></b-form-select>
                        </div>
                    </div>
                    <!-- <div class="col-6 col-sm-6 col-md-6 col-lg-1">
                        <div class="Food-graph-title">
                            <p>Start Date</p>
                            <h3>{{ format_date(startDate,'DD MMM, YYYY') }}</h3>
                        </div>
                    </div> -->
                    <div class="col-12 col-sm-12 col-md-12 col-lg-10">
                        <div
                            class="mt-4"
                            id="chart"
                        >
                            <apexchart
                                width="100%"
                                :height="height"
                                type="rangeBar"
                                :options="chartOptions"
                                :series="series"
                            ></apexchart>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </section>
</template>

<script>
const $ = require("jquery");
window.$ = $;

export default {
    data: function () {
        return {
            height: 150,
            types: [],
            type: "",
            cultivars: [],
            cultivar: null,
            startDate: "",
            items: [],
            openCultivarSelectBox: false,
            series: [],
            chartOptions: {
                chart: {
                    height: 210,
                    type: "rangeBar",
                    toolbar: {
                        show: false,
                    },
                },
                colors: ['#f70000', '#2772F0'],
                dataLabels: {
                    enabled: true,
                    textAnchor: 'middle',
                    style: {
                        colors: ['#fff']
                    },
                    formatter: function (val, opt) { 
                        var dt = opt.w.globals.seriesZ[opt.seriesIndex][opt.dataPointIndex];
                            dt = dt.match(/\(([^)]+)\)/);
                            dt = dt[1].trim();
                        return dt;
                        //return opt.w.globals.seriesZ[opt.seriesIndex][opt.dataPointIndex]
                    },
                    dropShadow: {
                        enabled: true
                    },
                    offsetX: 0,
                    offsetY: 0,

                },
                plotOptions: {
                    bar: {
                        horizontal: true,
                        barHeight: "70%",
                    },
                },
                xaxis: {
                    type: "datetime",
                    position: "top",
                },
                stroke: {
                    width: 1,
                },
                fill: {
                    type: "solid",
                    opacity: 0.6,
                },
                grid: {
                    xaxis: {
                        lines: {
                            show: true,
                        },
                    },
                },
                legend: {
                    customLegendItems:['EC', 'pH'],
                    position: "top",
                    horizontalAlign: "center",
                },
                tooltip: {
                    enabled: true,
                    x: {
                        show: false,
                        format: '',
                        formatter: undefined,
                    },
                    y: {
                        formatter: undefined,
                        title: {
                            formatter: function (val, opt) {
                                return val+": "+opt.w.globals.seriesZ[opt.seriesIndex][opt.dataPointIndex]
                            },
                        },
                    },
                },
            },
        };
    },
    methods: {
        changeType(type) {
            this.type = type;
            this.items = [];
            this.cultivars = [];
            this.startDate = "";
            this.height = 150;
            this.getData();
        },
        getData() {
            this.$http
                .post(
                    this.$apiBaseUrl + "dashboard/targets",
                    {
                        section: "Feed",
                        type: this.type,
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    if (
                        response.status == 200 &&
                        response.data.data.items.length > 0
                    ) {
                        this.items = response.data.data.items;
                        for (let index = 0; index < this.items.length; index++) {
                            let checkCultivar = this.cultivars.find(item => item.text === this.items[index].cultivar);
                            if (!checkCultivar) {
                                this.cultivars.push({
                                    text: this.items[index].cultivar,
                                    value: this.items[index].cultivar,
                                });
                            }
                        }
                        this.changeData(this.items[0].cultivar);
                    } else {
                        this.removeSetData();
                    }
                })
                .catch((error) => {
                    this.$toast.error(error.message, {
                        position: "top-right",
                    });
                });
        },
        toggalCultivarSelect() {
            this.openCultivarSelectBox = !this.openCultivarSelectBox;
            this.changeData(this.cultivar);
        },
        changeData(cultivar) {
            this.height = 150;
            this.series = [];
            var count = 0;
            var eC = {
                name: "EC",
                data: [],
            };
            var pH = {
                name: "pH",
                data: [],
            };

            // console.log('length',this.items.length);

           

            for (let index = 0; index < this.items.length; index++) {

                
                if (this.items[index].cultivar == cultivar) {
                    this.cultivar = this.items[index].cultivar;
                    this.startDate = this.items[index].startDate;
                    
                    count++;

                    if(this.items[index].feedSub.length > 0){
                        for (
                            let index1 = 0;
                            index1 < this.items[index].feedSub.length;
                            index1++
                        ) {
                            var subData = this.items[index].feedSub[index1];
                            // var startDate = new Date(this.startDate);
                            // startDate.setDate(startDate.getDate() + subData.fromDay);
                            // startDate = startDate.getTime();
                            // var endDate = new Date(this.startDate);
                            // endDate.setDate(endDate.getDate() + subData.toDay);
                            // endDate = endDate.getTime();

                            

                            eC.data.push({
                                x: this.format_date(this.startDate, 'DD MMM, YYYY'),
                                y: [subData.fromDay, subData.toDay],
                                z: subData.fromDay + "-" + subData.toDay + " (" + subData.ecMinMax + ")",
                            });

                            pH.data.push({
                                x: this.format_date(this.startDate, 'DD MMM, YYYY'),
                                y: [subData.fromDay, subData.toDay],
                                z: subData.fromDay + "-" + subData.toDay + " (" + subData.phMinMax + ")",
                            });
                        }
                    } else {
                        eC.data.push({
                            x: this.format_date(this.startDate, 'DD MMM, YYYY'),
                            y: [0, 0],
                            z: 0 + "-" + 0 + " (" + 0 + ")",
                        });

                        pH.data.push({
                            x: this.format_date(this.startDate, 'DD MMM, YYYY'),
                            y: [0, 0],
                            z: 0 + "-" + 0 + " (" + 0 + ")",
                        });
                    }
                    // this.series.push(eC);
                    // this.series.push(pH);
                }
            }

            if(count == 1){
                this.height = this.height + 60;
            } else {
                this.height = this.height * count;
            }
            
            this.series.push(eC);
            this.series.push(pH);

        },
        removeSetData() {
            this.series = [];
        },
    },
    mounted() {
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
    },
};
</script>

<style scoped>
.clutivarName {
    cursor: pointer;
    display: flex;
}
.cultivarSelect {
    width: 160px;
}
</style>