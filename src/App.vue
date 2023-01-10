<script setup>
import { RouterView, useRoute } from "vue-router";
import NavBar from "@/components/other/NavBar.vue";

const route = useRoute();
</script>

<template>
  <NavBar v-if="!route.path.includes('welcome') && !route.path.includes('info')" />
  <div class="container-md d-flex justify-content-center">
      <RouterView></RouterView>
  </div>
</template>
<style>
@import "@/assets/base.css";

@media (hover: hover) {
  a:hover {
    background-color: hsla(160, 100%, 37%, 0.2);
  }
}

nav a.router-link-exact-active {
  color: var(--color-text);
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}

nav a:first-of-type {
  border: 0;
}

.row {
  max-width: 65rem;
}

@media only screen and (max-width: 771px) {
  #portfolio-button {
    left: 90%;
    top: 92.5%;
  }
};

@media only screen and (min-width: 772px) {
  #portfolio-button {
    left: 7.5%;
    top: 92.5%;
  }
};
</style>
