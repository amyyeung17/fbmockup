<script setup>
defineProps({
  buttonText: {
    type: String
  },
  smBreakpoint: {
    type: Boolean 
  },
  smallDisplay: {
    type: String
  }
})

const emit = defineEmits(['on-display'])
</script>

<script>
/**
 * @vue-prop {string} buttonText
 * @vue-prop {boolean} smBreakpoint - window width >= 576, responsive design
 * @vue-prop {string} smallDisplay - if smBreakpoint is false, options to present message previews and friends are available.
 * Hidden by default and only one option can be active.
 * 
 * @vue-event {string} onDisplay - controls what is being displayed in addition to the conversation. 
 */

export default {
  name: 'Options'
}
</script>

<template>
  <div :class="!smBreakpoint ? 'd-flex justify-content-around w-100' : ''"> 
    <button class="btn btn-secondary m-2" :disabled="smallDisplay === 'previews'" @click="emit('on-display', 'friends')">
      {{ buttonText }}
    </button>
    <button v-if="!smBreakpoint" class="btn btn-secondary m-2" :disabled="smallDisplay === 'friends'" @click="emit('on-display', 'previews')">
      {{ smallDisplay === 'previews' ? 'Hide' : 'Active Messages'}}
    </button>
  </div>
</template>