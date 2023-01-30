<script setup>
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center text-center w-75"
    :style="{ height: '100vh' }"
  >
    <h1 class="display-3 text-primary m-3">Fakebook</h1>
    <p class="fs-5">
      A small practice project implenting some common functionality to learn &
      practice:
    </p>
    <ul class="list w-75 m-2">
      <li>Vue (Composition API)</li>
      <li>Vue-router</li>
      <li>Pinia</li>
      <li>CSS (Bootstrap)</li>
    </ul>
    <div class="d-flex align-items-center justify-content-evenly w-50 my-4">
      <a
        class="link-primary link-button fs-5 p-2"
        href="https://github.com/amyyeung17/fbmockup"
        target="_blank"
      >
        Code
      </a>
      <a class="link-primary link-button fs-5 p-2" href="https://www.ayeung.me">
        Portfolio
      </a>
    </div>
    <button
      class="nav-link border-0 text-decoration-none p-2 m-2"
      @click="router.back()"
    >
      <span class="bi bi-arrow-left"></span>
      Back
    </button>
  </div>
</template>

<style lang="scss" scoped>
.link-button {
  min-width: 7.5rem;
}

.nav-link {
  background-color: transparent;
  &:hover {
    background-color: $gray-200;
  }
}
</style>
