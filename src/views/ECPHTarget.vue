<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header tabName="Targets" />
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
                    <router-link to="/Subsrate-ecpH">
                        <button
                            type="submit"
                            class="btn btn-primary"
                        >
                            Enter Targets
                        </button>
                    </router-link>
                </div>
            </div>
            <!-- No data added end -->

            <!-- Feed section -->
            <Feed v-if="totalData > 0" />
            <!-- Feed section -->

            <!-- Subrate section -->
            <Subrate v-if="totalData > 0" />
            <!-- Subrate section -->
        </div>
    </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;

import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Feed from "../components/dashboard/Targets/Feed";
import Subrate from "../components/dashboard/Targets/Subrate";

export default {
    data: function () {
        return {
            totalData: 0,
        };
    },
    components: {
        Sidebar,
        Header,
        Feed,
        Subrate,
    },
    methods: {
        checkData() {
            this.$http
                .post(
                    this.$apiBaseUrl + "dashboard/targets",
                    {
                        section: "Feed",
                        type: "Flower",
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
