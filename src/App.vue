<script setup>
import { watch, onMounted } from 'vue'
import { RouterView, useRoute, useRouter } from "vue-router";
import IconButton from '@/components/reusable/IconButton.vue'
import NavBar from "@/components/other/NavBar.vue";
// max-width: 65rem;
const route = useRoute();
const router = useRouter()

function scrollBack() {
  window.scrollTo({ behavior: "smooth", top: 0 });
}

onMounted(() => {
  const currentPath = window.location.href.split('/')
  if ((window.location.href.includes('message') || (window.location.href.includes('profile'))) && (parseInt(currentPath[currentPath.length - 1]) > 9)) {
    router.push('/error')
  }
})

</script>

<template>
  <NavBar v-if="!route.path.includes('welcome') && !route.path.includes('info') && !route.path.includes('error')" />
  <div class="container-md d-flex justify-content-center">
    <RouterView></RouterView>
    <IconButton
      v-if="route.path.includes('/home')"
      :icon-class="'arrow-up'"
      :button-color="'btn-primary rounded-circle'"
      :button-id="'nav-up-icon'"
      :button-style="'position-fixed'"
      @on-click="scrollBack()"
    />
  </div>
</template>

<style lang="scss" scoped>
@import "@/assets/base.css";

@include media-breakpoint-only(xs) {
  #nav-up-icon {
    height: 2.75rem !important;
    right: .5rem;
    top: 92.5%;
  }
}

@include media-breakpoint-up(sm) {
  #nav-up-icon {
    border-radius: .25rem !important;
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
