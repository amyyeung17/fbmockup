<script setup>
import { onMounted, ref } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useUserStore } from "@/stores/user";
import { useCurrentStore } from "@/stores/currentstate";

import LargeProfile from "./LargeProfile.vue";
import SmallProfile from "./SmallProfile.vue";
import Post from "@/components/post/Post.vue";
import OptionsLabel from "@/components/reusable/OptionsLabel.vue";

const userStore = useUserStore();
const currentStore = useCurrentStore();
const route = useRoute();
const router = useRouter();

const profileStyle = ref({ height: "20vh" });
const addFriendClass = ref(["bi-person-plus", "friend__icon", "px-1"]);
const friendClass = ref(["bi-person-check-fill", "friend__icon", "px-1"]);
const buttonChange = ref([
  currentStore.getWindow ? ["my-2"] : ["my-1", "py-1"],
]);

onMounted(() => {
  window.scrollTo({ behavior: "instant", top: 0 });
});

function pushRoute(f) {
  router.push({ name: "profile", params: { id: f } });
}

function addFriend() {
  return (
    userStore
      .getUser(route.params.id)
      .friends.indexOf(currentStore.currentId) !== -1
  );
}

function addFriendText() {
  return addFriend() ? "Friends" : "Add Friend";
}

function returnName() {
  return currentStore.getWindow ? "display-5" : ["display-6"];
}
</script>

<template>
  <div class="d-flex flex-column align-items-center w-100">
    <div class="bg-secondary div_size" id="profile-cover"></div>
    <div class="d-flex bg-light div_size" :style="profileStyle">
      <div
        class="d-flex align-items-center justify-content-center w-25 p-2 mx-0"
      >
        <i class="bi bi-person-circle profile-pic"></i>
      </div>
      <div class="d-flex w-50 py-1">
        <h2 class="align-self-end mx-0 my-0 py-1" :class="returnName()">
          {{ userStore.getUsername(route.params.id) }}
        </h2>
      </div>
      <div
        v-if="
          parseInt(route.params.id) !== currentStore.currentId && !addFriend()
        "
        class="d-flex w-25 justify-content-around mx-0 py-1"
      >
        <button
          class="btn btn-outline-primary align-self-end d-flex align-items-center justify-content-around"
          :class="buttonChange"
          @click="
            userStore.editFriends(route.params.id, currentStore.currentId)
          "
        >
          <OptionsLabel :icon-class="addFriendClass" space slot-style>
            {{ addFriendText() }}
          </OptionsLabel>
        </button>
      </div>
      <div
        v-if="
          parseInt(route.params.id) !== currentStore.currentId && addFriend()
        "
        class="d-flex justify-content-around w-25 mx-0 py-1"
      >
        <button
          class="btn btn-primary align-self-end dropdown-toggle d-flex align-items-center justify-content-around"
          :class="buttonChange"
          data-bs-toggle="dropdown"
        >
          <OptionsLabel :icon-class="friendClass" space slot-style>
            {{ addFriendText() }}
          </OptionsLabel>
        </button>
        <div class="dropdown-menu dropdown-menu-end">
          <a
            class="dropdown-item"
            @click="
              userStore.editFriends(route.params.id, currentStore.currentId)
            "
          >
            Unfriend
          </a>
        </div>
      </div>
    </div>
    <div
      v-if="currentStore.getWindow"
      class="d-flex flex-row div_size"
      id="profile-body"
    >
      <LargeProfile
        :user="userStore.getUser(route.params.id)"
        @push-route="pushRoute"
      >
        <template #friend="{ friendId }">
          {{ userStore.getUsername(friendId) }}
        </template>
      </LargeProfile>
      <div
        class="d-flex flex-column align-items-center div_size py-2"
        id="profile-post"
      >
        <div class="w-100">
          <Post />
        </div>
      </div>
    </div>
    <div v-else class="div_size">
      <SmallProfile
        :user="userStore.getUser(route.params.id)"
        :username="userStore.getUsername(route.params.id)"
        @push-route="pushRoute"
      >
        <template #posts>
          <Post />
        </template>
        <template #smallFriend="{ smallFriendId }">
          {{ userStore.getUsername(smallFriendId) }}
        </template>
      </SmallProfile>
    </div>
  </div>
</template>

<style>
.div_size {
  width: clamp(65%, 65%, 70%);
}
.profile-pic {
  font-size: 6rem;
  background-size: 6rem;
  margin: 0;
}

@media only screen and (min-width: 1200px) {
  .profile-pic {
    font-size: 6.25rem;
    background-size: 6.25rem;
  }
}
@media only screen and (min-width: 1400px) {
  .profile-pic {
    font-size: 6.5rem;
    background-size: 6.5rem;
  }
}
#profile-post {
  width: 75%;
}
#profile-body {
  min-height: 70vh;
}
#profile-cover {
  height: 200px;
}
</style>
