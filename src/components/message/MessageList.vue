<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { useMessageStore } from "@/stores/message";
import CustomInput from "../reusable/CustomInput.vue";

const userStore = useUserStore();
const currentStore = useCurrentStore();
const messageStore = useMessageStore();
const route = useRoute();

const formClass = ref(["input-group", "w-100", "m-2", "py-2", "px-4"]);
const displayFriends = ref(false);
const friendOptions = ref([]);

function getFriends() {
  displayFriends.value = !displayFriends.value;
  if (displayFriends.value) {
    const friends = userStore.getFriends(currentStore.currentId);
    friendOptions.value = friends;
  }
}

function returnAddOptions() {
  return displayFriends.value ? "Cancel" : "Start a new convo";
}

function createNewConvo(id) {
  const mes = messageStore.getMessage(currentStore.currentId, "all");
  for (const m of mes) {
    if (m.mid === id) {
      currentStore.setSelectedMessage(id);
      displayFriends.value = !displayFriends.value;
      return;
    }
  }
  messageStore.addNewMessage(id);
  displayFriends.value = !displayFriends.value;
}
</script>

<template>
  <h3 class="display-6 m-2">Messages</h3>
  <CustomInput
    :label-text="'msgSearch'"
    :placeholder-text="'Search...'"
    :input-class="'form-control'"
    :form-class="formClass"
  >
    Search
  </CustomInput>
  <button class="btn btn-secondary m-2" @click="getFriends">
    {{ returnAddOptions() }}
  </button>
  <div
    v-if="
      messageStore.getMessage(route.params.id, 'all').length !== 0 &&
      !displayFriends
    "
    class="w-100"
  >
    <ul class="list-group w-100 m-0 px-4 py-2">
      <button
        class="list-group-item list-group-item-action"
        v-for="m of messageStore.getMessage(route.params.id, 'all')"
        :key="m.mid"
        @click="currentStore.setSelectedMessage(m.mid)"
      >
        <a class="nav-link active w-75 my-1 py-1" id="nav-user">
          {{ userStore.getUsername(m.mid) }}
        </a>
        <div v-if="m.msg.length > 0" class="d-flex">
          <p class="px-0 m-1" id="msg-preview-text">
            {{ userStore.getUsername(m.msg[m.msg.length - 1].user) }} :
            <span class="text-muted"> {{ m.msg[m.msg.length - 1].m }} </span>
          </p>
        </div>
      </button>
    </ul>
  </div>
  <div v-else-if="!displayFriends">
    <h5 class="my-4">No active convos</h5>
  </div>
  <div v-else class="w-100 m-2">
    <h5 class="align-self-start px-3 py-2">Friends</h5>
    <div
      v-for="j of friendOptions"
      :key="j.id"
      class="d-flex flex-column align-items-center w-100"
    >
      <button
        class="btn btn-outline-secondary w-75 m-2"
        @click="createNewConvo(parseInt(j.id))"
      >
        {{ userStore.getUsername(j.id) }}
      </button>
    </div>
  </div>
</template>

<style>
#msg-preview-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

@media only screen and (max-width: 950px) {
  #nav-ser {
    width: 100% !important;
  }
}
</style>
