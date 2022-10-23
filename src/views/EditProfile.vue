<template>
   <div class="dashboard">
      <!-- Sidebar -->
      <Sidebar />
      <!-- Sidebar end -->
      <div class="content">
         <!-- Header -->
         <Header tabName="Edit Profile Details" />
         <!-- Header end -->

         <section class="edit-profile-section">
            <div class="edit-form">
               <form
                  class="form"
                  @submit.prevent="checkForm"
               >
                  <div class="avatar-edit">
                     <img
                        :src="profile_url"
                        alt="Edit Avatar"
                        class="profileImg"
                     />
                     <a
                        href="#"
                        class="upload-btn-wrapper"
                     >
                        <img
                           src="./../assets/images/gallery.svg"
                           alt="Gallery"
                        />
                        <input
                           type="file"
                           ref="file"
                           v-on:change="handleFileUpload()"
                        />
                     </a>
                  </div>
                  <div class="form-inline mb-0">
                     <input
                        type="text"
                        placeholder="Name"
                        class="form-control"
                        v-model="name"
                     />
                     <span>
                        <img
                           src="./../assets/images/edit-name.svg"
                           alt="Edit Name"
                        />
                     </span>
                  </div>
                  <div class="mb-4">
                     <p
                        class="text-danger mb-0"
                        v-if="errors.name"
                     >
                        {{ errors.name[0] }}
                     </p>
                  </div>
                  <div class="form-inline">
                     <input
                        type="text"
                        placeholder="Email"
                        class="form-control"
                        v-model="email"
                        readonly
                     />
                     <span>
                        <img
                           src="./../assets/images/edit-email.svg"
                           alt="Edit Name"
                        />
                     </span>
                  </div>
                  <div class="form-inline">
                     <button
                        type="submit"
                        class="btn btn-success"
                        v-on:click="update"
                     >
                        save
                     </button>
                  </div>
                  <div class="d-flex align-items-center justify-content-between">
                     <a
                        href="#"
                        class="text-primary"
                        data-toggle="modal"
                        data-target="#ChangePassword"
                     >Change Password
                        <img
                           src="./../assets/images/forgot-pass-arrow.svg"
                           alt="Change Password"
                        />
                     </a>
                     <a
                        href="#"
                        class="text-primary"
                     >Payment Details
                        <img
                           src="./../assets/images/forgot-pass-arrow.svg"
                           alt="Payment Details"
                        />
                     </a>
                  </div>
               </form>
            </div>
         </section>

         <!-- Change Password -->
         <ChangePassword />
         <!-- Change Password end -->
      </div>
   </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
import Header from "../components/Header";
import ChangePassword from "../components/ChangePassword";

export default {
   name: "EditProfile",
   components: {
      Sidebar,
      Header,
      ChangePassword,
   },
   data() {
      return {
         name: "",
         email: "",
         profile_url: "",
         profile: "",
         errors: [],
      };
   },
   methods: {
      checkForm: function (e) {
         if (this.name) {
            return true;
         }
         this.errors = [];
         e.preventDefault();
      },
      async update() {
         let formData = new FormData();
         formData.append("name", this.name);
         formData.append("profile", this.profile);
         await this.$http
            .post(this.$apiBaseUrl + "edit-profile", formData, {
               headers: {
                  "Content-Type": "multipart/form-data",
                  Authorization: this.accessToken(),
               },
            })
            .then((response) => {
               this.$toast.success(response.data.message, {
                  position: "top-right",
               });
               this.details();
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
      details() {
         this.$http
            .get(this.$apiBaseUrl + "profile", {
               headers: {
                  Authorization: this.accessToken(),
               },
            })
            .then((response) => {
               if (response.status == 200) {
                  this.name = response.data.data.name;
                  this.email = response.data.data.email;
                  this.profile_url = response.data.data.profile;
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
      handleFileUpload() {
         this.profile = this.$refs.file.files[0];
         this.createImage(this.$refs.file.files[0]);
      },
      createImage(file) {
         var reader = new FileReader();
         reader.onload = (e) => {
            this.profile_url = e.target.result;
         };
         reader.readAsDataURL(file);
      },
   },

   beforeMount() {
      this.details();
   },
   mounted() {
      const $ = require("jquery");
      window.$ = $;

      $("#menu-toggle").click(function () {
         $(".sidebar").toggleClass("sidebar-collapse");
      });
   },
};
</script>

