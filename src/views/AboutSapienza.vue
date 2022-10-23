<template>
   <div class="dashboard">
      <Sidebar />
      <div class="content">
         <header class="header">
            <nav class="navbar navbar-expand-lg navbar-light bg-light">
               <a class="navbar-brand" href="#">Our Story</a>

               <a
                  href="javascript:void(0)"
                  class="btn btn-default d-block d-md-none d-lg-none"
                  id="menu-toggle"
                  ><img src="./../assets/images/menu.svg" alt="Mobile Menu"
               /></a>

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
            </nav>
         </header>

         <section class="about-section">
            <div class="story-img">
               <img
                  src="./../assets/images/story-img.png"
                  class="w-100 img-responsive"
                  alt="Story Image"
               />
            </div>
            <div class="story">
               <p>
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed
                  nec eu consectetur interdum imperdiet sem. Vel, nullam vitae
                  quis egestas accumsan. Vitae amet in amet mattis scelerisque.
                  Neque, aliquam potenti morbi elit pellentesque tempus mattis
                  cursus ullamcorper.Ornare congue phasellus nisi integer
                  facilisi. Elit cursus convallis eget at in nunc amet. Magna
                  facilisis orci amet sed. Pellentesque leo sollicitudin netus
                  eget ullamcorper diam sed sem. Ornare morbi nulla ultrices
                  eget massa sagittis habitant a faucibus.
               </p>
               <p>
                  Feugiat ut mattis faucibus egestas. Aenean amet mi facilisi
                  varius vestibulum interdum lorem. Facilisi nunc massa aliquam
                  pharetra malesuada blandit magnis morbi. Arcu donec tristique
                  arcu massa, in. Imperdiet molestie hac in etiam sed. Lectus
                  facilisi elementum a a. Lacinia feugiat suspendisse magna
                  lectus sed aliquam, nibh. Venenatis netus phasellus sit cursus
                  nisi, vitae nisi pharetra. Semper at sed ipsum, laoreet velit,
                  mattis sit id. Quis lorem non eget viverra feugiat nunc, nec.
                  In malesuada semper justo, volutpat nisl odio rhoncus. Elit
                  non arcu sed ultricies cras tristique auctor non. Pulvinar
                  pellentesque tellus consequat nibh cras viverra scelerisque
                  risus ultrices. Sociis condimentum mauris suspendisse nullam.
                  Enim justo, ultrices mauris enim. Duis elementum lacus odio ut
                  non morbi sed. Diam urna adipiscing quam eu lacus, libero,
                  ullamcorper. Scelerisque egestas integer purus auctor sit eu.
               </p>
               <p>
                  Feugiat ut mattis faucibus egestas. Aenean amet mi facilisi
                  varius vestibulum interdum lorem. Facilisi nunc massa aliquam
                  pharetra malesuada blandit magnis morbi. Arcu donec tristique
                  arcu massa, in. Imperdiet molestie hac in etiam sed. Lectus
                  facilisi elementum a a. Lacinia feugiat suspendisse magna
                  lectus sed aliquam, nibh. Venenatis netus phasellus sit cursus
                  nisi, vitae nisi pharetra. Semper at sed ipsum, laoreet velit,
                  mattis sit id. Quis lorem non eget viverra feugiat nunc, nec.
                  In malesuada semper justo, volutpat nisl odio rhoncus. Elit
                  non arcu sed ultricies cras tristique auctor non. Pulvinar
                  pellentesque tellus consequat nibh cras viverra scelerisque
                  risus ultrices. Sociis condimentum mauris suspendisse nullam.
                  Enim justo, ultrices mauris enim. Duis elementum lacus odio ut
                  non morbi sed. Diam urna adipiscing quam eu lacus, libero,
                  ullamcorper. Scelerisque egestas integer purus auctor sit eu.
               </p>
               <p>
                  Developed by
                  <a href="https://iroidsolutions.com/" class="text-dark"
                     ><b>iRoid Solutions</b></a
                  >
               </p>
            </div>
         </section>
      </div>
   </div>
</template>

<script>
import Sidebar from "../components/Sidebar";
export default {
   name: "dashboard",
   components: {
      Sidebar,
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
