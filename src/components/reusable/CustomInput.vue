<script setup>
import { useCurrentStore } from "@/stores/currentstate";
const currentStore = useCurrentStore();

defineProps({
  formClass: {
    type: [String, Array],
    default: 'input-group w-100 m-2 px-2',
  },
  inputClass: {
    type: [String, Array],
    default: () => {
      return ["form-control", "w-75"];
    },
  },
  placeholderText: {
    type: String,
    default: "Placeholder",
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
        :disabled="error || (currentStore.currentId === -1)"
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
