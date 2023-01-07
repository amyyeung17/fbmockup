<script setup>
import IconButton from '@/components/reusable/IconButton.vue'
function scrollBack() {
  window.scrollTo({ behavior: "smooth", top: 0 });
}
</script>

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
  <IconButton 
    :icon-class="'arrow-up'"
    :button-color="'btn-primary'"
    :button-id="'nav-up-icon'"
    :button-style="'position-fixed'"
    @handle-click="scrollBack()"
  />
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

@media only screen and (max-width: 771px) {
  #nav-up-icon {
    left: 90%;
    top: 92.5%;
  }
};

@media only screen and (min-width: 772px) {
  #nav-up-icon {
    left: 92.5%;
    top: 92.5%;
  }
};

</style>
