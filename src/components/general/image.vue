<template>
  <figure v-lazyload class="image__wrapper">
    <img
      ref="image"
      class="image__item"
      :data-url="source"
    >
  </figure>
</template>
<script>
import LazyLoadDirective from "../../directives/lazyload.js"; 
export default {
  name: "ImageItem",
  directives: {
    lazyload: LazyLoadDirective
  },
  props: {
    source: {
      type: String,
      required: true
    }
  },
  watch:{
    source: function(){
      this.$refs.image.src = this.source
    }
  }
};
</script>