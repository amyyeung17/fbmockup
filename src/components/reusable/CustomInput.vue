<script setup>
import { useCurrentStore } from "@/stores/currentstate";

const currentStore = useCurrentStore();

defineProps({
  formClass: {
    type: String,
    default: 'input-group w-100 m-2 px-2',
  },
  inputClass: {
    type: String,
    default: 'form-control w-75'
  },
  placeholderText: {
    type: String,
    default: 'Placeholder',
  },
  modelValue: String,
  error: {
    type: Boolean,
    default: false,
  },
  labelText: {
    type: String,
    required: '',
  },
});

const emit = defineEmits(["update:modelValue", "send-event"]);
</script>

<script>
/**
 * @vue-prop {string} [formClass = 'input-group w-100 m-2 px-2']
 * @vue-prop {string} [inputClass = 'form-control w-75']
 * @vue-prop {string} [placeholderText = 'Placeholder']
 * @vue-prop {string} modelValue - prop that is binded to the input's value
 * @vue-prop {boolean} [error = false] - disables the input 
 * @vue-prop {string} [labelText = ''] - used as id for the input
 * 
 * @vue-event {} update:modelValue - updates the modelValue prop 
 * @vue-event {} send-event - executes a function that uses the final modelValue
 */

export default {
  name: 'CustomInput'
}
</script>

<template>
  <div class="d-flex flex-column align-items-center" :class="!labelText.includes('navbar') ? 'w-100' : 'custom-input-div'">
    <div :class="formClass">
      <slot name="inputLabel"></slot>
      <input
        type="input"
        class="form-control"
        :class="inputClass"
        :placeholder="placeholderText"
        :id="labelText"
        :value="modelValue"
        @input="$emit('update:modelValue', $event.target.value)"
        :disabled="error || (currentStore.userId === -1)"
      />
      <slot name="inputButton"> 
        <button
          v-if="!labelText.includes('floating')"
          class="input-group-text"
          @click="emit('send-event', modelValue)"
          :disabled="error"
        >
          <slot></slot>
        </button>
      </slot>
      <slot name="floatLabel"></slot>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.custom-input-div {
  flex-grow: 1;
  max-width: 44%;
}
</style>
