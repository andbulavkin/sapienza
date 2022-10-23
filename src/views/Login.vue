<template>
    <div class="login">
        <div class="login-form">
            <div class="overlay-background">
                <div
                    id="slider"
                    class="carousel slide mb-0"
                    data-ride="carousel"
                >
                    <div class="carousel-inner">
                        <div class="carousel-item active">
                            <div class="overlay"></div>
                            <img
                                class="w-100"
                                src="./../assets/images/slider-1.jpg"
                                alt="First slide"
                            />
                        </div>
                        <div class="carousel-item">
                            <div class="overlay"></div>
                            <img
                                class="w-100"
                                src="./../assets/images/slider-2.jpg"
                                alt="First slide"
                            />
                        </div>
                        <div class="carousel-item">
                            <div class="overlay"></div>
                            <img
                                class="w-100"
                                src="./../assets/images/slider-3.jpg"
                                alt="First slide"
                            />
                        </div>
                    </div>
                </div>
                <div class="form-logo">
                    <img
                        src="./../assets/images/sapienza-white-logo.svg"
                        class="sapienza-logo"
                        alt="sapienza-white-logo"
                    />
                </div>
            </div>
            <div class="login-page-data">
                <a
                    href="#"
                    class="text-center d-block"
                >
                    <img
                        class="company-logo"
                        src="./../assets/images/header-logo.svg"
                        alt="Login Logo"
                    />
                </a>
                <form
                    class=""
                    @submit.prevent="login()"
                >
                    <div class="form-group">
                        <input
                            type="email"
                            class="form-control"
                            placeholder="Email"
                            v-model="email"
                            required=""
                        />
                        <span class="email-icon">
                            <img
                                src="./../assets/images/email.svg"
                                alt="Email"
                            />
                        </span>
                        <p
                            class="text-danger mb-0"
                            v-if="errors.email"
                        >
                            {{ errors.email[0] }}
                        </p>
                    </div>
                    <div class="form-group">
                        <input
                            v-if="showPassword"
                            type="text"
                            class="input form-control"
                            v-model="password"
                            placeholder="Password"
                            required=""
                        />
                        <input
                            v-else
                            type="password"
                            class="input form-control"
                            v-model="password"
                            placeholder="Password"
                            required=""
                        />
                        <a
                            href="#"
                            class="hide-show-password"
                            @click="toggleShow"
                        >
                            <span class="icon is-small is-right">
                                <a
                                    href="#"
                                    class="email-icon fas"
                                    :class="{ 'show-pass': showPassword }"
                                >
                                    <img
                                        src="./../assets/images/password.svg"
                                        alt="Password"
                                    />
                                </a>
                                <a
                                    href="#"
                                    class="email-icon fas"
                                    :class="{ 'hide-pass': !showPassword }"
                                >
                                    <img
                                        src="./../assets/images/show-password.svg"
                                        alt="show-password"
                                    />
                                </a>
                            </span>
                        </a>
                        <p
                            class="text-danger mb-0"
                            v-if="errors.password"
                        >
                            {{ errors.password[0] }}
                        </p>
                    </div>
                    <div class="form-group text-right">
                        <router-link to="/forgot-password">
                            <span class="mr-2 Forgot-pass"> Forgot Password? </span>
                            <img
                                src="./../assets/images/forgot-pass-arrow.svg"
                                alt="Forgot Password"
                            />
                        </router-link>
                    </div>
                    <div class="form-group">
                        <button
                            type="submit"
                            class="btn btn-success"
                        >Login</button>
                    </div>
                </form>
                <div class="register-link">
                    <router-link to="/register">
                        <span>Or Create Account</span>
                        <img
                            src="./../assets/images/register-arrow.svg"
                            alt="Create Account"
                        />
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    data() {
        return {
            showPassword: false,
            errors: [],
            email: "",
            password: "",
        };
    },
    computed: {
        buttonLabel() {
            return this.showPassword ? "Hide" : "Show";
        },
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },

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

        async login() {
            await this.$http
                .post(this.$apiBaseUrl + "login", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    if (response.data.data.auth) {
                        this.$toast.success("Login successfully.", {
                            position: "top-right",
                        });
                        // store user details and jwt token in local storage to keep user logged in between page refreshes
                        localStorage.setItem(
                            "sapienzaAccessToken",
                            "Bearer " + response.data.data.auth.access_token
                        );
                        localStorage.setItem(
                            "sapienzaUser",
                            JSON.stringify(response.data.data)
                        );
                        if (
                            !response.data.data.clone &&
                            !response.data.data.customName &&
                            !response.data.data.electricalConductivity &&
                            !response.data.data.flower &&
                            !response.data.data.growUnit &&
                            !response.data.data.mother
                        ) {
                            this.$router.push({ path: "/profileset" });
                        } else {
                            this.$router.push({ path: "/dashboard" });
                        }
                    }
                })
                .catch((error) => {
                    this.$toast.error(error.response.data.message, {
                        position: "top-right",
                    });
                    this.errors = [];
                    this.errors = error.response.data.errors;
                });
        },
    },

    mounted() {
        const $ = require("jquery");
        window.$ = $;
        $("#slider").carousel({
            interval: 3000,
            cycle: true,
        });
    },
};
</script>
