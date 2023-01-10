<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";
import { refThrottled } from '@vueuse/core'
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";
import CustomInput from "@/components/reusable/CustomInput.vue";
import IconButton from '@/components/reusable/IconButton.vue'
import IconLink from '@/components/reusable/IconLink.vue'
import Dropdown from '@/components/reusable/Dropdown.vue'
const userStore = useUserStore();
const currentStore = useCurrentStore();
const route = useRoute();
const router = useRouter();

const screenSize = ref(window.innerWidth);
const throttled = refThrottled(screenSize, 1000)
onMounted(() => {
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
});

watch(
  throttled,
  () => {
    resize();
  },
  { immediate: true }
);

const changeUser = (id) => {
  currentStore.setUser(id);

  if (route.path.includes("message")) {
    router.push({ name: "message", params: { id } });
  }
}

function resize() {
  screenSize.value = window.innerWidth;
  currentStore.setWindowWidth(screenSize);
}
</script>

<template>
  <nav 
    class="navbar navbar-expand-lg bg-light mb-2"
    id="nav-container"
  >
  <div class="container-fluid d-flex align-items-center justify-content-between"> 
    <RouterLink exact-active-class="exact-active" class="navbar-brand active mx-1" :to="'/home'">
      Fakebook
    </RouterLink>
    <CustomInput
      v-if="screenSize >= 772"
      :error="true"
      :form-class="'input-group m-2 px-2'"
      :label-text="'navbar'"
      :placeholder-text="'Start typing here'"
    >
      Search
    </CustomInput>
    <h5 class="m-0">Hello {{ userStore.getAllUsernames()[currentStore.currentId]}}!</h5>
    <div v-if="992 <= screenSize" class="d-flex align-items-center">
      <Dropdown
        :dropbutton-text="'Select a user'"
        :dropdown-style="'nav-item mx-2'"
        :menu-options="userStore.user.entries()"
        :id-label="'nav-dropdown'"
        @handle-menu="changeUser"
      />
      <a class="nav-item nav-link active mx-1" href="https://www.ayeung.me"> Portfolio </a>
      <RouterLink class="nav-item nav-link active mx-1" :to="'/welcome'" @click="currentStore.setUser(-1);"> Log out </RouterLink>
    </div>
    <Dropdown
      v-else
      :id-label="'sm-nav-dropdown'"
      :menu-style="'dropdown-menu-end'"
    >
      <template #dropbutton>
        <IconButton 
          :icon-class="'list'"
          :button-style="'border-0'"
          :button-id="'sm-nav-dropdown'"
          :extra-attrs="{'data-bs-toggle': 'dropdown', 'data-bs-auto-close': 'outside', 'aria-expanded': 'false'}"
        />
      </template>
      <template #menu>
        <RouterLink class="dropdown-item" to="/home"> Home</RouterLink>
        <Dropdown
          :dropbutton-style="'dropdown-item'"
          :dropbutton-text="'Select a user'"
          :dropdown-style="'dropstart'"
          :id-label="'sm-nav-dropdown-inner'"
          :menu-options="userStore.user.entries()"
          @handle-menu="changeUser"
        />
        <div class="dropdown-divider"></div>
        <a class="dropdown-item" href="https://www.ayeung.me"> Portfolio </a>
        <div class="dropdown-divider"></div>
        <button class="dropdown-item" @click="exit"> Log out </button>
      </template>
    </Dropdown>
  </div>
  </nav>
</template>

<style scoped>

#nav-input {
  min-width: 12rem;
}
#nav-logo {
  width: 30%;
}
#sm-nav-icon {
  font-size: 1.4rem;
}
</style>
