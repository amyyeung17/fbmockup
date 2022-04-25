<script setup>
import { watch } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { useMessageStore } from "@/stores/message";
import MessageList from "./MessageList.vue";
import Convo from "./Convo.vue";
import ConvoOptions from "./ConvoOptions.vue";

const userStore = useUserStore();
const currentStore = useCurrentStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter();

watch(
  route,
  () => {
    if (currentStore.currentId !== -1) {
      if (messageStore.getMessage(currentStore.currentId, "all").length !== 0) {
        messageStore.cleanEmptyConvo();
      }
      if (route.path.includes("message")) {
        updateMessage();
      }
    }
  },
  { immediate: true }
);

function updateMessage() {
  let convo = messageStore.getMessage(parseInt(route.params.id), "all");
  if (convo.length !== 0 || currentStore.selectedMessage === -1) {
    currentStore.setSelectedMessage(parseInt(convo[0].mid));
  } else {
    currentStore.setSelectedMessage(parseInt(route.params.id));
  }
}

function goProfile() {
  router.push({
    name: "profile",
    params: { id: currentStore.selectedMessage },
  });
}
</script>

<template>
  <div class="d-flex justify-content-center w-100" id="msg">
    <div class="d-flex flex-row" id="msg">
      <div class="d-flex flex-column align-items-center" id="msg-left">
        <MessageList />
      </div>
      <div class="d-flex flex-column align-items-center" id="msg-mid">
        <Convo @go-profile="goProfile" />
      </div>
      <div
        v-if="currentStore.getWindow"
        class="d-flex flex-column align-items-center"
        id="msg-right"
      >
        <ConvoOptions
          :current-name="userStore.getUsername(currentStore.selectedMessage)"
          @go-profile="goProfile"
        />
      </div>
    </div>
  </div>
</template>

<style>
#msg {
  width: clamp(80%, 80%, 85%);
}
#msg-left {
  width: 35%;
}
#msg-mid {
  width: 65%;
}

@media only screen and (min-width: 992px) {
  #msg-left {
    width: 30%;
  }
  #msg-mid {
    width: clamp(45%, 45%, 50%);
  }
  #msg-right {
    width: 20%;
  }
}
</style>
