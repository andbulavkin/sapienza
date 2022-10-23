<template>
    <div>
        <a
            href="javascript:void(0)"
            class="btn btn-default display-menu"
        >
            <img
                class=""
                id="menuBtn"
                src="./../assets/images/collapse-down.svg"
                alt="Mobile Menu"
            />
        </a>
        <header class="header">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
                <a
                    class="navbar-brand"
                    href="#"
                >
                    {{ tabName }}
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
                    <ul
                        class="navbar-nav ml-auto"
                        v-if="tabName == 'Edit Profile Details'"
                    >
                        <!-- Logout button -->
                        <Logout />
                        <!-- Logout button End -->
                    </ul>
                    <ul
                        class="navbar-nav ml-auto"
                        v-else
                    >
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
                                <div class="d-flex justify-content-between align-items-center">
                                    <router-link to="/edit-profile">
                                        <button
                                            type="button"
                                            class="btn btn-outline-primary"
                                        >
                                            Edit Profile
                                        </button>
                                    </router-link>
                                    <!-- Logout button -->
                                    <Logout />
                                    <!-- Logout button End -->
                                </div>
                            </div>
                        </li>
                    </ul>
                </div>
            </nav>
        </header>
    </div>
</template>

<script>
import Logout from "../components/button/Logout";
const $ = require("jquery");
window.$ = $;
export default {
    data: function () {
        return {
            user: this.userDetails(),
        };
    },
    components: {
        Logout,
    },
    props: ["tabName"],

    mounted() {
        $("#menu-toggle").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
        });

        $(".display-menu").click(function () {
            $(".sidebar").toggleClass("sidebar-collapse");
            $(".content").toggleClass("display-content");
            $("#menuBtn").toggleClass("roated");
        });
    },
};
</script>

<style scoped>
.profile {
    width: 50px;
    height: 50px;
    border-radius: 50%;
}
.display-menu {
    padding: 1px;
}
#menuBtn {
    transition: all 0.5s linear;
    transform: rotate(90deg);
}

.roated {
    transition: all 0.5s linear !important;
    transform: rotate(270deg) !important;
}
</style>
