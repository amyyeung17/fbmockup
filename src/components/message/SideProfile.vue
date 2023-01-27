<script setup>
import { RouterLink } from "vue-router";

defineProps({
  recipient: {
    type: Number 
  },
  recipientName: {
    type: String
  }
})
</script>

<script>
/**
 * @vue-prop {number} recipient - user id of the current message's recipient 
 * @vue-prop {string} recipientName - name of the recipient
 */

export default {
  name: 'SideProfile'
}
</script>

<template>
  <h3 class="text-center m-2"> {{ recipientName }} </h3>
  <span class="bi bi-person-circle profile-pic" id="iconpic"></span>
  <RouterLink
    class="list-group-item list-group-item-action p-2"
    :to="{name: 'profile', params: { id: recipient }}"
  >
    Profile
  </RouterLink>
  <button
    class="list-group-item list-group-item-action disabled p-2"
    disabled
    aria-disabled="true"
    v-for="(text, index) of ['Photos', 'Options', 'Settings']"
    :key="index"
  >
    {{ text }}
  </button>
</template>

<style lang="scss" scoped>
#iconpic {
  font-size: 5rem
}
</style>
