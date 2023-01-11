<script setup>
defineProps({
  buttonText: {
    type: String
  },
  mdBreakpoint: {
    type: Boolean 
  },
  smallDisplay: {
    type: String
  }
})

const emit = defineEmits(['on-small-display'])
</script>

<template>
  <div :class="!mdBreakpoint ? 'd-flex justify-content-around w-100' : ''"> 
    <button class="btn btn-secondary m-2" :disabled="smallDisplay === 'previews'" @click="emit('on-small-display', 'friends')">
      {{ buttonText }}
    </button>
    <button v-if="!mdBreakpoint" class="btn btn-secondary m-2" :disabled="smallDisplay === 'friends'" @click="emit('on-small-display', 'previews')">
      {{ smallDisplay === 'previews' ? 'Hide' : 'Active Messages'}}
    </button>
  </div>
</template>