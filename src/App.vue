<template>
  <div id="app">
    <div class="page-wrapper">
      <Sidebar></Sidebar>
      <div class="page-content">
        <div class="logo">
          <img src="./assets/poke-logo.png" alt="logo" />
        </div>
        <router-view></router-view>
      </div>
      <Footer></Footer>
    </div>
  </div>
</template>

<script>
import Sidebar from './components/layouts/Sidebar';
import Footer from './components/layouts/Footer';
export default {
  name: "App",
  components: { Sidebar,Footer }
};
</script>

<style >
  @import './assets/css/style.css';
</style>