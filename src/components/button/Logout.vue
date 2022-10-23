<template>
    <!-- Logout button -->
    <button
        type="button"
        class="btn btn-outline-danger"
        v-on:click="logout"
    >
        Logout
        <img
            src="./../../assets/images/logout.svg"
            alt="profile"
        />
    </button>
    <!-- Logout button end-->
</template>

<script>
export default {
    methods: {
        // Logout function
        async logout() {
            await this.$http
                .get(this.$apiBaseUrl + "logout", {
                    headers: {
                        Authorization: this.accessToken(),
                    },
                })
                .then((response) => {
                    if (response.status == 200) {
                        this.$toast.success(response.data.message, {
                            position: "top-right",
                        });
                        localStorage.removeItem("sapienzaAccessToken");
                        localStorage.removeItem("sapienzaUser");
                        this.$router.push({ path: "/" });
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        },
    },
};
</script>