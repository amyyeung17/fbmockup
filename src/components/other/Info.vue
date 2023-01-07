<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
</script>

<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center text-center w-75"
    :style="{height: '100vh'}"
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
    <div class="d-flex align-items-center justify-content-between w-75 my-4">
      <a class="nav-link w-50 fs-5 p-2" target="_blank"> Github </a>
      <a class="nav-link w-50 fs-5" @click="router.back()"> Back </a>
    </div>
  </div>
</template>
