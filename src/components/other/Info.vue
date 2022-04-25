<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";

const router = useRouter();
const infoContainer = ref({ height: "100vh" });
const contentContainer = ref({ width: "40%" });
</script>

<template>
  <div
    class="d-flex flex-column align-items-center justify-content-center text-center"
    :style="infoContainer"
  >
    <div
      class="d-flex flex-column align-items-center"
      :style="contentContainer"
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
        <a class="nav-link w-25 fs-5 p-2"> Github </a>
        <a class="nav-link w-25 fs-5" @click="router.back()"> Back </a>
      </div>
    </div>
  </div>
</template>
