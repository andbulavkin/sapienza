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
                                        <router-link to="/">
                                            <button
                                                type="button"
                                                class="btn btn-outline-danger"
                                            >
                                                Logout
                                                <img
                                                    src="./../assets/images/logout.svg"
                                                    alt="profile"
                                                />
                                            </button>
                                        </router-link>
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
                        <p class="profile-details-text">
                            Enter these details to personalize your experience
                        </p>
                    </div>

                    <div class="Grow-flower">
                        <h5>
                            How many flower {{ this.$route.query.growUnit }} do you
                            have?
                        </h5>
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
                        <h5>
                            How many Clone {{ this.$route.query.growUnit }} do you
                            have?
                        </h5>
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
                        <h5>
                            How many Mother {{ this.$route.query.growUnit }} do you
                            have?
                        </h5>
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
                        <h5>
                            How many Vegetative
                            {{ this.$route.query.growUnit }} do you have?
                        </h5>
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
                        v-on:click="Finish"
                    >
                        Finish
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
export default {
    data() {
        return {
            errors: [],
            flower: "",
            clone: "",
            mother: "",
            vegitative: "",
            user: this.userDetails(),
        };
    },
    props: ["growUnit"],
    methods: {
        checkForm: function (e) {
            if (this.name) {
                return true;
            }
            this.errors = [];
            if (!this.name) {
                this.errors.push("Name required.");
            }
            e.preventDefault();
        },
        async Finish() {
            this.errors = [];
            await this.$http
                .post(
                    this.$apiBaseUrl + "set-your-profile",
                    {
                        customName: this.$route.query.customName,
                        growUnit: this.$route.query.growUnit,
                        electricalConductivity:
                            this.$route.query.electricalConductivity,
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
                        this.updateDetails();
                        this.$toast.success(response.data.message, {
                            position: "top-right",
                        });
                        this.$router.push({ path: "/dashboard" });
                    }
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                    this.errors = error.response.data.errors;
                });
        },
        updateDetails() {
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
    },

    mounted() {
        if (
            !this.$route.query.growUnit ||
            !this.$route.query.electricalConductivity
        ) {
            this.$router.push({
                path: "/profileset",
            });
        }
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