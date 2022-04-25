<script setup>
import { defineEmits, nextTick, ref } from "vue";
import { useRoute } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { useMessageStore } from "@/stores/message";
import ConvoButtons from "./ConvoButtons.vue";
import CustomInput from "../reusable/CustomInput.vue";

const userStore = useUserStore();
const currentStore = useCurrentStore();
const messageStore = useMessageStore();
const route = useRoute();

const formClass = ref(["input-group", "w-100", "m-2", "px-4"]);
const currentMessage = ref("");
const convoContainer = ref(null);

function sendMessage(content) {
  messageStore.sendMessage(content);
  currentMessage.value = "";
  nextTick(() => {
    convoContainer.value.scrollTop = convoContainer.value.scrollHeight;
  });
}

const emit = defineEmits(["go-profile"]);
</script>

<template>
  <div
    v-if="parseInt(route.params.id) !== currentStore.selectedMessage"
    class="w-100 m-2 p-1"
  >
    <div class="d-flex justify-content-between border-bottom mx-3">
      <h5 class="align-self-start mx-2 p-2">
        {{ userStore.getUsername(parseInt(currentStore.selectedMessage)) }}
      </h5>
      <div v-if="!currentStore.getWindow">
        <button
          class="btn btn-outline-secondary border-0"
          id="smallConvo"
          data-bs-toggle="dropdown"
          aria-expanded="false"
        >
          <i class="bi bi-three-dots-vertical"> </i>
        </button>
        <div
          class="dropdown-menu dropdown-menu-end"
          aria-labelledby="smallConvo"
        >
          <a
            class="dropdown-item link text-decoration-none"
            @click="emit('go-profile')"
          >
            Profile
          </a>
          <ConvoButtons
            :convo-class="['dropdown-item', 'link', 'text-decoration-none']"
          />
        </div>
      </div>
    </div>
    <ul
      class="d-flex flex-column align-items-center list-group-flush w-100 my-2 p-2"
      id="convo-body"
      ref="convoContainer"
    >
      <li
        class="list-group-item w-100"
        v-for="(a, index) of messageStore.getMessage(route.params.id, '').msg"
        :key="index + a.user"
      >
        <a class="link text-decoration-none active w-50 my-3 p-2">
          {{ userStore.getUsername(a.user) }} :
        </a>
        <p class="px-2 my-2">{{ a.m }}</p>
      </li>
    </ul>
    <CustomInput
      :label-text="'convoInput'"
      :placeholder-text="'Type message here'"
      :input-class="'form-control'"
      :form-class="formClass"
      v-model="currentMessage"
      @send-event="sendMessage"
    >
      Send
    </CustomInput>
  </div>
  <div v-else>
    <h5 class="m-5">No messages to show!</h5>
  </div>
</template>

<style scoped>
#convo-body {
  height: 50vh;
  margin-bottom: 4px;
  overflow-y: auto;
}
</style>
