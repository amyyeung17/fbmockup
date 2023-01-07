<script setup>
import { nextTick, ref, onMounted } from "vue";
import { RouterLink } from "vue-router";
import CustomInput from "../../reusable/CustomInput.vue";

const currentMessage = ref('');
const convoContainer = ref(null);

const props = defineProps({
  convoItems: Object,
  usernames: Object
})

const emit = defineEmits(['send-msg'])

const enterMsg = (content) => {
  emit('send-msg', content)
  currentMessage.value = '';
  nextTick(() => {
    convoContainer.value.scrollTop = convoContainer.value.scrollHeight;
  });
}
</script>

<template>  
  <ul
    class="d-flex flex-column align-items-center list-group-flush w-100 my-2 px-2"
    id="convo-body"
    ref="convoContainer"
  >
    <li
      class="list-group-item w-100"
      v-for="(a, index) of convoItems.msg"
      :key="index + 'user' + a.user"
    >
      <RouterLink 
        class="link-primary text-decoration-none active w-50 my-3 p-2"
        :to="{name: 'profile', params: { id: a.user }}"
      >
       {{ usernames[a.user] }}
      </RouterLink>
      <p class="px-2 my-2">{{ a.m }}</p>
    </li>
  </ul>
  <CustomInput
    :label-text="'convoInput'"
    :placeholder-text="'Type message here'"
    v-model="currentMessage"
    @send-event="enterMsg"
  >
    Send
  </CustomInput>
</template>

<style scoped>
#convo-body {
  height: 50vh;
  margin-bottom: 4px;
  overflow-y: auto;
}
</style>
