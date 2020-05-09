<template>
  <figure v-lazyload class="image__wrapper">
    <img
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
  }
};
</script>