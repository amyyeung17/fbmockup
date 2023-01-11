<script setup>
import { RouterView, useRoute } from "vue-router";
import IconButton from '@/components/reusable/IconButton.vue'
import NavBar from "@/components/other/NavBar.vue";
// max-width: 65rem;
const route = useRoute();

//Allows user to scroll back immediately to the top
function scrollBack() {
  window.scrollTo({ behavior: "smooth", top: 0 });
}
</script>

<template>
  <NavBar v-if="!route.path.includes('welcome') && !route.path.includes('info')" />
  <div class="container-md d-flex justify-content-center">
    <RouterView></RouterView>
    <IconButton
      v-if="route.path.includes('/home')"
      :icon-class="'arrow-up'"
      :button-color="'btn-primary'"
      :button-id="'nav-up-icon'"
      :button-style="'position-fixed'"
      @handle-click="scrollBack()"
    />
  </div>
</template>
<style lang="scss" scoped>
@import "@/assets/base.css";


@include media-breakpoint-only(xs) {
  #nav-up-icon {
    background-color: transparent;
    border: none;
    color: $primary;
    left: 89.5%;
    top: 92.5%;

    &:hover {
      background-color: $gray-200;
    }
  }
}

@media (min-width: 576px) and (max-width: 684px) {
  #nav-up-icon {
    left: 91.5%;
    top: 92.5%;
  }
}

@media (min-width: 685px) {
  #nav-up-icon {
    left: 92.5%;
    top: 92.5%;
  }
}


</style>
