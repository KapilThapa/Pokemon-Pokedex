<template>
  <div id="app">
    <div class="page-wrapper">
      <div class="menu-btn">
        <div class="menu-btn__burger"></div>
      </div>
      <div class="sidebar">
        <ul>
          <li>Home</li>
          <li>About</li>
        </ul>
      </div>
      <div class="page-content">
        <router-view></router-view>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "App",
  mounted(){
    $(function() {
      $(".menu-btn").on("click", function() {
        if ($(this).hasClass("open")) {
          $(this).removeClass("open");
        } else {
          $(this).addClass("open");
        }
      });
    });
  }
};
</script>

<style >
  @import './assets/css/style.css';
</style>