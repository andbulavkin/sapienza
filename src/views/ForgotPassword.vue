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
                            <img
                                class="w-100"
                                src="./../assets/images/slider-1.jpg"
                                alt="First slide"
                            />
                        </div>
                        <div class="carousel-item">
                            <img
                                class="w-100"
                                src="./../assets/images/slider-2.jpg"
                                alt="First slide"
                            />
                        </div>
                        <div class="carousel-item">
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
            <div class="reset-page-data">
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
                <form class="">
                    <div>
                        <h4 class="text-center mb-5">Forgot Password</h4>
                        <p class="text-center mb-5">‘Let’s reset your password’ or ‘Having trouble signing in?’
                        </p>
                    </div>
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
                    <router-link to="">
                        <div class="form-group">
                            <button
                                type="submit"
                                class="btn btn-success"
                                v-on:click="sendmail"
                            >
                                Reset Password
                            </button>
                        </div>
                    </router-link>
                </form>
                <div class="register-link">
                    <router-link to="/">
                        <a
                            href="#"
                            class="mr-2"
                        >Or Go Back</a>
                        <a>
                            <img
                                src="./../assets/images/register-arrow.svg"
                                alt="Create Account"
                            />
                        </a>
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
            errors: [],
            email: "",
        };
    },
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
        async sendmail() {
            await this.$http
                .post(this.$apiBaseUrl + "forgot-password", {
                    email: this.email,
                    password: this.password,
                })
                .then((response) => {
                    console.log("res", response);
                    this.$router.push({ path: "/" });
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
