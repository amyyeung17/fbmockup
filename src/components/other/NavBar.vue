<script setup>
import { onMounted, onUnmounted, ref, watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";
import CustomInput from "@/components/reusable/CustomInput.vue";

const users = useUserStore();
const currentStore = useCurrentStore();
const route = useRoute();
const router = useRouter();

const screenSize = ref(window.innerWidth);
const formClass = ref(["input-group", "w-100"]);
const inputClass = ref(["form-control", "w-50"]);

onMounted(() => {
  window.addEventListener("resize", resize);
});

onUnmounted(() => {
  window.removeEventListener("resize", resize);
});

watch(
  screenSize,
  () => {
    resize();
  },
  { immediate: true }
);

function changeUser(name, id) {
  if (currentStore.currentId === -1) {
    currentStore.setGuestUser();
  }

  currentStore.setUser(name, id);

  if (route.path.includes("message")) {
    router.push({ name: "message", params: { id: id } });
  }
}

function exit() {
  if (!currentStore.guest) {
    currentStore.setGuestUser();
    currentStore.setUser("Guest user", -1);
  }
  router.push("/welcome");
}

function resize() {
  screenSize.value = window.innerWidth;
  currentStore.setWindowWidth(screenSize);
}
</script>

<template>
  <nav class="navbar navbar-expand-lg bg-light w-100 mx-0 my-2 py-2">
    <div
      class="d-flex align-items-center justify-content-between w-100"
      id="nav-container"
    >
      <a class="navbar-brand active m-2" @click="router.push('/')">
        Fakebook
      </a>
      <div class="m-2" id="nav-logo">
        <CustomInput
          :form-class="formClass"
          :label-text="'navbar'"
          :placeholder-text="'Start typing here'"
          :input-class="inputClass"
        >
          Search
        </CustomInput>
      </div>
      <div class="d-flex justify-content-center" id="nav-input">
        <h5 class="m-2">Hello {{ currentStore.currentUser }} !</h5>
      </div>
      <div v-if="992 <= screenSize">
        <ul class="nav">
          <li class="nav-item m-2">
            <a class="nav-link active" @click="router.push('/')">
              <i class="bi bi-house-door-fill"></i>
            </a>
          </li>
          <li class="nav-item dropdown m-2">
            <a
              class="nav-link dropdown-toggle"
              href="#"
              id="nav-dropdown"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select a user
            </a>
            <div class="dropdown-menu" aria-labelledby="nav-dropdown">
              <button
                class="dropdown-item"
                v-for="u in users.user"
                :key="u.id + u.name"
                @click="changeUser(u.name, u.id)"
              >
                {{ u.name }}
              </button>
            </div>
          </li>
          <li class="nav-item m-2">
            <a class="nav-link active" @click="exit"> Log out </a>
          </li>
        </ul>
      </div>
      <div v-else class="m-3">
        <button
          class="btn btn-outline-primary border-0"
          id="sm-nav-dropdown"
          data-bs-toggle="dropdown"
          data-bs-auto-close="outside"
          aria-expanded="false"
        >
          <i class="bi bi-list" id="sm-nav-icon"></i>
        </button>
        <div
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="sm-nav-dropdown"
        >
          <button class="dropdown-item" @click="router.push('/')">Home</button>
          <div class="dropdown dropstart">
            <button
              class="dropdown-item"
              id="sm-nav-inner"
              data-bs-toggle="dropdown"
              aria-expanded="false"
            >
              Select a user
            </button>
            <div class="dropdown-menu" aria-labelledby="sm-nav-inner">
              <button
                class="dropdown-item"
                v-for="u in users.user"
                :key="u.id + u.name"
                @click="changeUser(u.name, u.id)"
              >
                {{ u.name }}
              </button>
            </div>
          </div>
          <div class="dropdown-divider"></div>
          <button class="dropdown-item" @click="exit">Log out</button>
        </div>
      </div>
    </div>
  </nav>
</template>

<style scoped>
#nav-container {
  height: 8vh;
}
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
