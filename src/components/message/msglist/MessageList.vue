<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { ref, useAttrs } from "vue";
import CustomInput from "../../reusable/CustomInput.vue";
import Preview from "./Preview.vue";

const attrs = useAttrs()
const displayFriends = ref(false);
defineProps({
  previewList: {
    type: Array
  }
})
const createNewConvo = (id) => {
  attrs.onHandleNew(id)
  displayFriends.value = !displayFriends.value;
}

</script>

<template>
  <h3 class="display-6 m-2">Messages</h3>
  <button class="btn btn-secondary m-2" @click="displayFriends = !displayFriends">
    {{ displayFriends ? 'Cancel' : 'Start a new convo'}}
  </button>
  <Preview
    v-if="previewList.length !== 0 && !displayFriends"
    :preview-list="previewList"
    v-bind="$attrs"
  />
  <h5 v-else-if="!displayFriends" class="my-4"> No active convos </h5>
  <div v-else class="d-flex flex-column align-items-center w-100 m-2">
    <h5 class="align-self-start mx-3 my-2">Friends</h5>
    <button
      class="btn btn-outline-secondary w-75 m-2"
      v-for="j of attrs.user.friends"
      :key="j"
      @click="createNewConvo(parseInt(j))"
    >
      {{ attrs.usernames[j] }}
    </button>
  </div>
</template>

<style scoped>
@media only screen and (max-width: 950px) {
  #nav-ser {
    width: 100% !important;
  }
}
</style>
