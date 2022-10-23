<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header :tabName="'Data Input - ' + type + ' Batches'" />
            <!-- Header end -->

            <!-- Batch Comparment -->
            <div class="select-comparment">
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
            <!-- Batch Comparment end -->

            <!-- Flower -->
            <Flower
                v-if="type == 'Flower'"
                :userDetail="userDetail"
            />
            <!-- Flower end -->
            <!-- Clone -->
            <Clone
                v-else-if="type == 'Clone'"
                :userDetail="userDetail"
            />
            <!-- Clone end -->
            <!-- Mother -->
            <Mother
                v-else-if="type == 'Mother'"
                :userDetail="userDetail"
            />
            <!-- Mother end -->
            <!-- Vegetative -->
            <Vegetative
                v-else-if="type == 'Vegetative'"
                :userDetail="userDetail"
            />
            <!-- Vegetative end -->
        </div>
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import Clone from "../components/dataInput/Batch/Clone";
import Flower from "../components/dataInput/Batch/Flower";
import Mother from "../components/dataInput/Batch/Mother";
import Vegetative from "../components/dataInput/Batch/Vegetative";

const $ = require("jquery");
window.$ = $;

export default {
    name: "DataBatch",
    components: {
        Sidebar,
        Header,
        Flower,
        Clone,
        Mother,
        Vegetative,
    },
    data() {
        return {
            type: "",
            types: [
            ],
            userDetail: {},
            leavePage: true,
        };
    },
    methods: {
        changeType(type) {
            this.leavePage = true;
            this.type = type;
        },
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
    mounted() {
        this.userDetail = this.userDetails();
        this.changeType("Flower");
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });
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
