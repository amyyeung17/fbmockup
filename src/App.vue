<script setup>
import { RouterView, useRoute } from "vue-router";
import NavBar from "@/components/other/NavBar.vue";

const route = useRoute();
</script>

<template>
  <div v-if="!route.path.includes('welcome') && !route.path.includes('info')">
    <NavBar />
  </div>
  <RouterView></RouterView>
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
</style>
