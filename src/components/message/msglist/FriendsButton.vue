<script setup>
defineProps({
  usernames: {
    type: Object 
  },
  user: {
    type: Object
  },
  smallDisplay: {
    type: String
  }
})

const emit = defineEmits(['on-create-convo'])
</script>

<template>
  <h4 class="align-self-start m-3 mb-2"> Friends </h4>
  <button
    class="btn btn-outline-secondary w-75 m-2"
    v-for="j of user.friends"
    :key="j"
    @click="emit('on-create-convo', parseInt(j))"
  >
    {{ usernames[j] }}
  </button>
</template>