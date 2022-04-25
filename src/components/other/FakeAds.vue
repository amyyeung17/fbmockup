<script setup>
function scrollBack() {
  window.scrollTo({ behavior: "smooth", top: 0 });
}
</script>

<template>
  <div class="d-flex flex-column align-items-center w-100 py-5 px-3">
    <div
      class="d-flex justify-content-center align-items-center border border-primary w-75 ad"
    >
      <i class="bi bi-shop ad__icon"></i>
    </div>
    <p class="w-75 py-2 text-center">Shop today at Fake Ad #1!</p>
    <div
      class="d-flex justify-content-center align-items-center border border-primary w-75 ad"
    >
      <i class="bi bi-signpost-2 ad__icon"></i>
    </div>
    <p class="w-75 py-2 text-center">Next vacation stop: Fake Ad #2.</p>
    <div class="d-flex justify-content-end fixed-bottom m-2">
      <button class="btn btn-primary" @click="scrollBack">
        <i class="bi bi-arrow-up" id="nav-up-icon"> </i>
      </button>
    </div>
  </div>
</template>

<style>
.ad {
  min-height: 10rem;
  max-width: 15rem;
}
.ad__icon {
  font-size: 5rem;
  color: #0d6efd;
}
#nav-up-icon {
  font-size: 1.25rem;
}
</style>
