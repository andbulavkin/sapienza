<template>
    <div class="dashboard">
        <!-- Sidebar -->
        <Sidebar />
        <!-- Sidebar end -->
        <div class="content">
            <!-- Header -->
            <Header tabName="Facility Settings" />
            <!-- Header end -->
            <section class="profile-section">
                <div class="profile-content">
                    <div class="Grow-units">
                        <h5>What do you call your growing areas?</h5>
                        <div class="Grow-units-select-fild">
                            <div
                                class="selected-room"
                                v-for="(item, index) in growUnits"
                                :key="item.name"
                            >
                                <input
                                    type="radio"
                                    :id="'growUnit' + index"
                                    :value="item.name"
                                    name="Growunits"
                                    v-model="growUnit"
                                    @change="changeGrowUnit"
                                />
                                <label
                                    :for="'growUnit' + index"
                                    class="button"
                                >
                                    {{ item.name }}
                                </label>
                            </div>
                            <div class="selected-room">
                                <input
                                    v-model="growUnitCustom"
                                    type="texx"
                                    placeholder="Custom.."
                                    class="form-control text-center"
                                    v-on:input="changeCustomGrowUnit"
                                />
                            </div>
                        </div>
                        <p
                            class="text-danger mb-0"
                            v-if="errors.growUnit"
                        >
                            {{ errors.growUnit[0] }}
                        </p>
                    </div>
                    <div class="Grow-units">
                        <h5>
                            In which grow rooms you measure electrical conductivity and
                            pH?
                        </h5>
                        <div class="Grow-units-select-fild">
                            <div
                                class="selected-room"
                                v-for="(item, index) in electricalConductivitys"
                                :key="item.name"
                            >
                                <input
                                    type="checkbox"
                                    :id="'electricalconductivity' + index"
                                    :value="item.name"
                                    v-model="electricalConductivitis"
                                    class="d-none"
                                />
                                <label
                                    :for="'electricalconductivity' + index"
                                    class="button"
                                >
                                    {{ item.name }}
                                </label>
                            </div>
                        </div>
                        <p
                            class="text-danger mb-0"
                            v-if="errors.electricalConductivity"
                        >
                            {{ errors.electricalConductivity[0] }}
                        </p>
                    </div>
                </div>
                <div class="profile-content mt-5 pt-5">
                    <div class="Grow-flower">
                        <h5>How many Flower {{ growUnit }}s do you have?</h5>
                        <input
                            type="number"
                            placeholder="Enter Number"
                            class="form-control text-center"
                            v-model="flower"
                            v-on:keypress="isNumber($event)"
                        />
                        <p
                            class="text-danger mb-0"
                            v-if="errors.flower"
                        >
                            {{ errors.flower[0] }}
                        </p>
                    </div>
                    <div class="Grow-flower">
                        <h5>How many Clone {{ growUnit }}s do you have?</h5>
                        <input
                            type="number"
                            placeholder="Enter Number"
                            class="form-control text-center"
                            v-model="clone"
                            v-on:keypress="isNumber($event)"
                        />
                        <p
                            class="text-danger mb-0"
                            v-if="errors.clone"
                        >
                            {{ errors.clone[0] }}
                        </p>
                    </div>
                    <div class="Grow-flower">
                        <h5>How many Mother {{ growUnit }}s do you have?</h5>
                        <input
                            type="number"
                            placeholder="Enter Number"
                            class="form-control text-center"
                            v-model="mother"
                            v-on:keypress="isNumber($event)"
                        />
                        <p
                            class="text-danger mb-0"
                            v-if="errors.mother"
                        >
                            {{ errors.mother[0] }}
                        </p>
                    </div>
                    <div class="Grow-flower">
                        <h5>How many Vegetative {{ growUnit }}s do you have?</h5>
                        <input
                            type="number"
                            placeholder="Enter Number"
                            class="form-control text-center"
                            v-model="vegitative"
                            v-on:keypress="isNumber($event)"
                        />
                        <p
                            class="text-danger mb-0"
                            v-if="errors.vegitative"
                        >
                            {{ errors.vegitative[0] }}
                        </p>
                    </div>
                    <button
                        type="submit"
                        class="btn btn-success"
                        v-on:click="save"
                    >
                        Save
                    </button>
                </div>
            </section>
        </div>
    </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
const $ = require("jquery");
window.$ = $;

export default {
    name: "dashboard",
    components: {
        Sidebar,
        Header,
    },
    data() {
        return {
            growUnits: [
                {
                    name: "Room",
                },
                {
                    name: "Tent",
                },
                {
                    name: "Bay",
                },
                {
                    name: "Compartment",
                },
            ],
            electricalConductivitys: [
                {
                    name: "Flower",
                },
                {
                    name: "Vegetative",
                },
                {
                    name: "Clone",
                },
                {
                    name: "Mother",
                },
            ],
            growUnit: "",
            growUnitCustom: "",
            electricalConductivitis: [],
            flower: "",
            clone: "",
            mother: "",
            vegitative: "",
            errors: [],
        };
    },
    methods: {
        async save() {
            this.errors = [];
            let electricalConductivitis = [];
            this.electricalConductivitys.forEach(element => {
                if (this.electricalConductivitis.indexOf(element.name) >= 0) {
                    electricalConductivitis.push(element.name)
                }
            });
            if(this.growUnitCustom != ""){
                this.growUnit = this.growUnitCustom;
            }
            await this.$http
                .post(
                    this.$apiBaseUrl + "set-your-profile",
                    {
                        growUnit: this.growUnit,
                        electricalConductivity: electricalConductivitis,
                        flower: this.flower,
                        clone: this.clone,
                        mother: this.mother,
                        vegitative: this.vegitative,
                    },
                    {
                        headers: {
                            Authorization: this.accessToken(),
                        },
                    }
                )
                .then((response) => {
                    if (response.status == 200) {
                        this.Updatedetails();
                        this.$toast.success(response.data.message, {
                            position: "top-right",
                        });
                        
                        this.$router.push({
                            path: "/dashboard",
                        });

                    }
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else {
                        this.errors = [];
                        this.errors = error.response.data.errors;
                        this.$toast.error(error.response.data.message, {
                            position: "top-right",
                        });
                    }
                });
        },
        Updatedetails: function () {
            this.$http
                .get(this.$apiBaseUrl + "profile", {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    if (response.status == 200) {
                        localStorage.setItem(
                            "sapienzaUser",
                            JSON.stringify(response.data.data)
                        );
                    }
                })
                .catch((error) => {
                    if (error.response.status == 401) {
                        this.unauthenticatedError();
                    } else {
                        this.errors = [];
                        this.errors = error.response.data.errors;
                    }
                });
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
        changeGrowUnit() {
            this.growUnitCustom = "";
        },
        changeCustomGrowUnit() {
            this.growUnit = this.growUnitCustom;
        },
    },
    beforeMount() {
        this.growUnit = this.userDetails().growUnit;
        const electricalConductivitys = ["Room", "Tent", "Bay", "Compartment"]
        if (electricalConductivitys.indexOf(this.userDetails().growUnit) == -1) {
            this.growUnitCustom = this.userDetails().growUnit;
        }
        this.electricalConductivitis = JSON.parse(this.userDetails().electricalConductivity);
        this.flower = this.userDetails().flower;
        this.clone = this.userDetails().clone;
        this.mother = this.userDetails().mother;
        this.vegitative = this.userDetails().vegitative;
    },
    mounted() {
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });
    },
};
</script>
