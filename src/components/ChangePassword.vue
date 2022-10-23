<template>
   <div
      class="modal fade"
      id="ChangePassword"
      tabindex="-1"
      role="dialog"
      aria-labelledby="ChangePasswordLabel"
      aria-hidden="true"
   >
      <div class="modal-dialog modal-dialog-centered" role="document">
         <div class="modal-content">
            <div class="modal-header">
               <h5 class="modal-title">Change Password</h5>
               <span data-dismiss="modal">Close</span>
            </div>
            <div class="modal-body">
               <form class="form">
                  <div class="alert alert-danger" role="alert" v-if="IsError">
                     <div v-for="errorMsg in errors" :key="errorMsg[0]">
                        {{ errorMsg[0] }}
                     </div>
                  </div>
                  <div class="form-inline justify-content-between">
                     <label for="#">Old Password</label>
                     <input
                        type="password"
                        class="form-control"
                        v-model="old_password"
                     />
                  </div>
                  <div class="form-inline justify-content-between">
                     <label for="#">New Password</label>
                     <input
                        type="password"
                        class="form-control"
                        v-model="password"
                     />
                  </div>
                  <div class="form-inline justify-content-between">
                     <label for="#">Confirm Password</label>
                     <input
                        type="password"
                        class="form-control"
                        v-model="password_confirmation"
                     />
                  </div>
               </form>
            </div>
            <div class="modal-footer justify-content-center">
               <button type="button" class="btn btn-success" @click="submit">
                  Change Password
               </button>
            </div>
         </div>
      </div>
   </div>
</template>

<script>
const $ = require("jquery");
window.$ = $;
export default {
   name: "ChangePassword",
   data() {
      return {
         old_password: "",
         password: "",
         password_confirmation: "",
         errors: [],
         IsError: false,
      };
   },
   methods: {
      async submit() {
         this.IsError = false;
         this.$http
            .post(
               this.$apiBaseUrl + "change-password",
               {
                  old_password: this.old_password,
                  password: this.password,
                  password_confirmation: this.password_confirmation,
               },
               {
                  headers: {
                     Authorization: this.accessToken(),
                  },
               }
            )
            .then((response) => {
               this.IsError = false;
               this.old_password = "";
               this.password = "";
               this.password_confirmation = "";
               this.$toast.success(response.data.message, {
                  position: "top-right",
               });
               $("#ChangePassword").modal("hide");
            })
            .catch((error) => {
               this.errors = [];
               if (error.response.status == 400) {
                  this.$toast.error(error.response.data.message, {
                     position: "top-right",
                  });
               } else {
                  this.IsError = true;
                  this.errors = error.response.data.errors;
               }
            });
      },
   },
};
</script>