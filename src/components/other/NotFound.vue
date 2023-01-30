<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center w-100 error-page"
  >
    <h2 class="display-3 text-primary font-weight-bold">404</h2>
    <h3 class="display-4 text-primary">Page not found</h3>
    <p class="display-6">The current url is not valid, please go back.</p>
    <RouterLink class="link-primary p-2 m-2" to="/">
      <span class="bi bi-arrow-left"></span>
      Back
    </RouterLink>
  </div>
</template>

<style>
.error-page {
  height: 99vh;
}
</style>
