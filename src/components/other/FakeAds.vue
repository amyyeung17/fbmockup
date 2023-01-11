<!--Component - Fake ads placeholders to be used in Home.vue -->
<template>
  <div class="d-flex flex-column align-items-center w-100 py-5 px-3">
    <div
      class="d-flex justify-content-center align-items-center border border-primary w-100 ad"
    >
      <i class="bi bi-shop ad__icon"></i>
    </div>
    <p class="w-75 py-2 text-center">Shop today at Fake Ad #1!</p>
    <div
      class="d-flex justify-content-center align-items-center border border-primary w-100 ad"
    >
      <i class="bi bi-signpost-2 ad__icon"></i>
    </div>
    <p class="w-75 py-2 text-center">Next vacation stop: Fake Ad #2.</p>
  </div>
</template>

<style lang="scss" scoped>
.ad {
  min-height: 10rem;
  max-width: 15rem;
}
.ad__icon {
  font-size: 5rem;
  color: #0d6efd;
}
</style>
