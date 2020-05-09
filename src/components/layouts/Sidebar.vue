<template>
  <div>
    <div class="menu-btn">
      <div class="menu-btn__burger"></div>
    </div>
    <div class="sidebar">
      <ul>
        <li>
            <router-link :to="{ name: 'Home'}">
               Home
            </router-link>
        </li>
        <li>
            <router-link :to="{ name: 'About'}">
               About
            </router-link>
        </li>
      </ul>
    </div>
  </div>
</template>
<script>
export default {
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