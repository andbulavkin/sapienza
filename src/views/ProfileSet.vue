<template>
    <div class="login">
        <!-- Header -->
        <header class="header">
            <div class="container-fluid">
                <nav class="navbar navbar-expand-md navbar-light">
                    <a class="navbar-brand">
                        <img
                            src="./../assets/images/header-logo.svg"
                            alt="Sapienza Logo"
                        />
                    </a>
                    <a
                        href="javascript:void(0)"
                        class="btn btn-default d-block d-md-none d-lg-none"
                        id="menu-toggle"
                    >
                        <img
                            src="./../assets/images/menu.svg"
                            alt="Mobile Menu"
                        />
                    </a>

                    <button
                        class="navbar-toggler d-none d-md-block d-lg-none"
                        type="button"
                        data-toggle="collapse"
                        data-target="#navbarSupportedContent"
                        aria-controls="navbarSupportedContent"
                        aria-expanded="false"
                        aria-label="Toggle navigation"
                    >
                        <span class="navbar-toggler-icon"></span>
                    </button>
                    <div
                        class="collapse navbar-collapse"
                        id="navbarSupportedContent"
                    >
                        <ul class="navbar-nav ml-auto">
                            <li class="nav-item dropdown">
                                <a
                                    class="nav-link"
                                    href="#"
                                    id="navbarDropdown"
                                    role="button"
                                    data-toggle="dropdown"
                                    aria-haspopup="true"
                                    aria-expanded="false"
                                >
                                    <img
                                        class="profile"
                                        :src="user.profile"
                                        alt="profile"
                                    />
                                </a>
                                <div
                                    class="dropdown-menu dropdown-menu-right"
                                    aria-labelledby="navbarDropdown"
                                >
                                    <img
                                        class="profile"
                                        :src="user.profile"
                                        alt="profile"
                                    />
                                    <h3>{{ user.name }}</h3>
                                    <span>{{ user.email }}</span>
                                    <div class="
                                 d-flex
                                 justify-content-between
                                 align-items-center
                              ">
                                        <router-link to="/edit-profile">
                                            <button
                                                type="button"
                                                class="btn btn-outline-primary"
                                            >
                                                Edit Profile
                                            </button>
                                        </router-link>
                                        <Logout />
                                    </div>
                                </div>
                            </li>
                        </ul>
                    </div>
                </nav>
            </div>
        </header>
        <!-- Header end -->

        <section class="profile-section">
            <div class="container">
                <div class="profile-content">
                    <div class="profile-title">
                        <h3>Setup Your Profile</h3>
                        <p>Enter these details to personalize your experience</p>
                    </div>

                    <div class="Grow-units">
                        <h5>What do you call your growing areas?</h5>
                        <div class="Grow-units-select-fild">
                            <div class="selected-room">
                                <input
                                    type="radio"
                                    id="checkone"
                                    value="Room"
                                    name="Growunits"
                                    v-model="growUnit"
                                    @change="changeGrowUnit"
                                />
                                <label
                                    for="checkone"
                                    class="button"
                                >Room</label>
                            </div>
                            <div class="selected-room">
                                <input
                                    type="radio"
                                    id="checktwo"
                                    value="Tent"
                                    name="Growunits"
                                    v-model="growUnit"
                                    @change="changeGrowUnit"
                                />
                                <label
                                    for="checktwo"
                                    class="button"
                                >Tent</label>
                            </div>
                            <div class="selected-room">
                                <input
                                    type="radio"
                                    id="checkthree"
                                    value="Bay"
                                    name="Growunits"
                                    v-model="growUnit"
                                    @change="changeGrowUnit"
                                />
                                <label
                                    for="checkthree"
                                    class="button"
                                >Bay</label>
                            </div>
                            <div class="selected-room">
                                <input
                                    type="radio"
                                    id="checkfour"
                                    value="Compartment"
                                    name="Growunits"
                                    v-model="growUnit"
                                    @change="changeGrowUnit"
                                />
                                <label
                                    for="checkfour"
                                    class="button"
                                >Compartment</label>
                            </div>
                            <div class="selected-room">
                                <!-- <div class="custom-input"> -->
                                <input
                                    v-model="growUnitCustom"
                                    type="texx"
                                    placeholder="Type Name"
                                    class="form-control text-center"
                                    v-on:input="changeCustomGrowUnit"
                                />
                                <!-- </div> -->
                            </div>
                        </div>
                        <p
                            class="text-danger mb-0"
                            v-if="errors.growUnit"
                        >
                            {{ errors.growUnit }}
                        </p>
                    </div>

                    <div class="Grow-units">
                        <h5>
                            In Which grow rooms you measure electrical conductivity and
                            pH?
                        </h5>
                        <!-- Batch comparment -->
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
                        <!-- Batch comparment -->
                        <p
                            class="text-danger mb-0"
                            v-if="errors.electricalConductivity"
                        >
                            {{ errors.electricalConductivity }}
                        </p>
                    </div>

                    <button
                        type="submit"
                        class="btn btn-success"
                        v-on:click="Cotinue"
                    >
                        Cotinue
                    </button>

                    <p class="text-body">
                        Don’t worry you can change these details afterward too.
                    </p>
                </div>
            </div>
        </section>
    </div>
</template>

<script>
import Logout from "../components/button/Logout";
export default {
    data() {
        return {
            user: this.userDetails(),
            growUnit: "",
            growUnitCustom: "",
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
            electricalConductivitis: [],
            errors: {
                growUnit: "",
                electricalConductivity: "",
            },
        };
    },
    components: {
        Logout,
    },
    methods: {
        async Cotinue() {
            this.errors.growUnit = "";
            this.errors.electricalConductivity = "";
            if (!this.growUnit) {
                this.errors.growUnit = "Please select grow Unit";
            }
            if (this.electricalConductivitis.length == 0) {
                this.errors.electricalConductivity =
                    "Please select an option";
                    // "Please select an option electrical conductivity";
            }
            if (this.growUnit && this.electricalConductivitis.length > 0) {
                let electricalConductivitis = [];
                this.electricalConductivitys.forEach(element => {
                    if (this.electricalConductivitis.indexOf(element.name) >= 0) {
                        electricalConductivitis.push(element.name)
                    }
                });

                this.$router.push({
                    path: "/profilesetflower",
                    query: {
                        growUnit: this.growUnit,
                        electricalConductivity: electricalConductivitis,
                    },
                });
            }
        },
        changeGrowUnit() {
            this.growUnitCustom = "";
        },
        changeCustomGrowUnit() {
            this.growUnit = this.growUnitCustom;
        },
    },
};
</script>

<style scoped>
.profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
</style>
