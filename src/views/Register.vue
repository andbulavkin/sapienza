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
            <div class="register-page-data">
                <a href="#" class="text-center d-block">
                    <img
                        class="company-logo"
                        src="./../assets/images/header-logo.svg"
                        alt="Login Logo"
                    />
                </a>
                <form class="" @submit="checkForm" method="post">
                    <div class="form-group">
                        <input
                            type="text"
                            class="form-control"
                            v-model="name"
                            placeholder="Full Name"
                            required=""
                            id="name"
                        />
                        <p class="text-danger mb-0" v-if="errors.name">
                            {{ errors.name[0] }}
                        </p>
                    </div>

                    <div class="form-group">
                        <input
                            type="email"
                            class="form-control"
                            v-model="email"
                            placeholder="Email"
                            required=""
                        />
                        <span class="email-icon">
                            <img
                                src="./../assets/images/email.svg"
                                alt="Email"
                            />
                        </span>
                        <p class="text-danger mb-0" v-if="errors.email">
                            {{ errors.email[0] }}
                        </p>
                    </div>
                    <div class="form-group">
                        <input
                            v-if="showPassword"
                            type="text"
                            v-model="password"
                            class="input form-control"
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
                        <p class="text-danger mb-0" v-if="errors.password">
                            {{ errors.password[0] }}
                        </p>
                    </div>

                    <div class="form-group">
                        <input
                            v-if="Repassword"
                            type="text"
                            v-model="password_confirmation"
                            class="input form-control"
                            placeholder="Re-enter Password"
                            required=""
                        />
                        <input
                            v-else
                            type="password"
                            class="input form-control"
                            v-model="password_confirmation"
                            placeholder="Re-enter Password"
                            required=""
                        />
                        <a
                            href="#"
                            class="show-hide-password"
                            @click="hideShow"
                        >
                            <span class="icon is-small is-right">
                                <a
                                    href="#"
                                    class="email-icon fas"
                                    :class="{ 'show-pass': Repassword }"
                                >
                                    <img
                                        src="./../assets/images/password.svg"
                                        alt="Password"
                                    />
                                </a>
                                <a
                                    href="#"
                                    class="email-icon fas"
                                    :class="{ 'hide-pass': !Repassword }"
                                >
                                    <img
                                        src="./../assets/images/show-password.svg"
                                        alt="show-password"
                                    />
                                </a>
                            </span>
                        </a>
                    </div>

                    <router-link to="">
                        <div class="form-group">
                            <button
                                type="submit"
                                class="btn btn-success"
                                v-on:click="signUp"
                            >
                                Create Account
                            </button>
                        </div>
                    </router-link>
                </form>
                <div class="register-link">
                    <router-link to="/">
                        <a href="#" class="mr-2">Or Login to your Account</a>
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
            showPassword: false,
            Repassword: false,
            errors: [],
            name: "",
            email: "",
            password: "",
            password_confirmation: "",
        };
    },
    computed: {
        buttonshow() {
            return this.showPassword ? "Hide" : "Show";
        },
        buttonhide() {
            return this.Repassword ? "Hide" : "Show";
        },
    },
    methods: {
        toggleShow() {
            this.showPassword = !this.showPassword;
        },
        hideShow() {
            this.Repassword = !this.Repassword;
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
        async signUp() {
            await this.$http
                .post(this.$apiBaseUrl + "register", {
                    name: this.name,
                    email: this.email,
                    password: this.password,
                    password_confirmation: this.password_confirmation,
                })
                .then((response) => {
                    console.log(response);
                    this.$router.push({ path: "/" });
                })
                .catch((error) => {
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
