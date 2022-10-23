<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header tabName="Batch" />
            <!-- Header end -->

            <!-- No data added -->
            <div
                class="nodata-found"
                v-if="totalData == 0"
            >
                <div class="found-img">
                    <img
                        src="./../assets/images/nodata-found.svg"
                        alt="nodata-found img"
                    />
                </div>
                <div class="found-text">
                    <h3>Please Enter data to <br />access dashbord</h3>
                    <router-link to="/subsrate-ecph">
                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Enter Data
                        </button>
                    </router-link>
                </div>
            </div>
            <!-- No data added end -->
            <section
                class="bath-section dashboard-section"
                v-else
            >
                <div class="row m-0">
                    <!-- Batch section -->
                    <Batch
                        @reload="reloadData"
                        ref="batch"
                    />
                    <!-- Batch section end -->

                    <!-- Historic section -->
                    <Historic
                        @reload="reloadData"
                        ref="historic"
                    />
                    <!-- Historic section end -->
                </div>
            </section>
        </div>
    </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Batch from "../components/dashboard/batch/Batch";
import Historic from "../components/dashboard/batch/Historic";

export default {
    name: "dashboard",
    components: {
        Sidebar,
        Header,
        Batch,
        Historic,
    },

    data() {
        return {
            totalData: 0,
        };
    },

    methods: {
        checkData() {
            this.$http
                .post(
                    this.$apiBaseUrl + "dashboard/batch",
                    {
                        type: "Flower",
                        batchselect: 1,
                        byDate: "",
                        cutomDate: "",
                        byBatchID: "",
                        byRoomID: "",
                        byCultivar: "",
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    this.totalData = response.data.data.count;
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
        reloadData() {
            this.$refs.batch.getData()
            this.$refs.historic.getData()
        }
    },
    beforeMount() {
        this.checkData();
    },
    mounted() {
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });
    },
};
</script>
