<script setup>
import { nextTick, ref } from "vue";

defineProps({
  user: Object,
  username: String,
});

const emit = defineEmits(["push-route"]);

const firstNav = ref([]);
const firstTab = ref([]);
const restNav = ref([]);
const restTab = ref([]);

function resetProfile(f) {
  firstNav.value.push("nav-link", "active");
  firstTab.value.push("tab-pane", "fade", "show", "active");
  restNav.value.push("nav-link");
  restTab.value.push("tab-pane", "fade");
  emit("push-route", f);

  nextTick(() => {
    firstNav.value = [];
    firstTab.value = [];
    restNav.value = [];
    restTab.value = [];
    window.scrollTo({ behavior: "instant", top: 0 });
  });
}
</script>

<template>
  <ul class="nav nav-tabs my-2" id="profileTab" role="tablist">
    <li class="nav-item mx-2">
      <a
        class="nav-link active"
        :class="firstNav"
        data-bs-toggle="tab"
        href="#postTab"
        role="tab"
      >
        <i class="bi bi-pencil"></i> Posts
      </a>
    </li>
    <li class="nav-item mx-2">
      <a
        class="nav-link"
        :class="restNav"
        data-bs-toggle="tab"
        href="#info"
        role="tab"
      >
        <i class="bi bi-file-person"></i> Profile
      </a>
    </li>
    <li class="nav-item mx-2">
      <a
        class="nav-link"
        :class="restNav"
        data-bs-toggle="tab"
        href="#smallFriend"
        role="tab"
      >
        <i class="bi bi-people"></i> Friends
      </a>
    </li>
  </ul>
  <div class="tab-content d-flex justify-content-center" id="profileTabContent">
    <div
      class="tab-pane fade show active tab-pane_div py-2"
      :class="firstTab"
      id="postTab"
    >
      <slot name="posts"> </slot>
    </div>
    <div class="tab-pane fade tab-pane_div" :class="restTab" id="info">
      <div class="d-flex flex-column align-items-center">
        <p class="display-6 m-2">Personal Info</p>
        <i class="bi bi-person-circle profile__icon_small"></i>
        <div>
          <p class="m-2">
            <i class="bi bi-person-lines-fill"></i> &nbsp; {{ username }}
          </p>
          <p class="m-2">
            <i class="bi bi-pin-fill"></i> &nbsp; {{ user.desc }}
          </p>
          <p class="m-2">
            <i class="bi bi-pin-map-fill"></i> &nbsp; {{ user.location }}
          </p>
        </div>
      </div>
    </div>
    <div
      class="tab-pane fade tab-pane__div w-100"
      :class="restTab"
      id="smallFriend"
    >
      <div class="d-flex flex-column align-items-center">
        <p class="display-6 m-2">Friends</p>
      </div>
      <div class="d-flex flex-wrap justify-content-around align-content-around">
        <div
          class="card d-flex border m-2"
          id="friend-profile"
          v-for="f of user.friends"
          :key="f"
        >
          <i class="bi bi-person align-self-center profile__icon_small"></i>
          <div class="card-body d-flex justify-content-center p-1 my-1 w-100">
            <a class="card-link text-decoration-none" @click="resetProfile(f)">
              <slot name="smallFriend" :small-friend-id="f"> </slot>
            </a>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#friend-profile {
  width: 30%;
  height: 40%;
}
.tab-pane__div {
  width: 85%;
  min-height: 70vh;
}
.profile__icon_small {
  font-size: 4.5rem;
  background-size: 4.5rem;
  margin: 0;
}
</style>
