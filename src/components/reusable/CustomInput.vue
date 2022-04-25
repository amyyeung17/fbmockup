<script setup>
import { useCurrentStore } from "@/stores/currentstate";
const currentStore = useCurrentStore();

defineProps({
  formClass: {
    type: [String, Array],
    default: () => {
      return ["input-group", "w-75", "m-2"];
    },
  },
  inputType: {
    type: String,
    default: "text",
  },
  inputStyle: {
    type: [String, Object],
    default: "",
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
  landing: {
    type: Boolean,
    default: false,
  },
  labelText: {
    type: String,
    required: true,
  },
});
const emit = defineEmits(["update:modelValue", "send-event"]);

</script>

<template>
  <div class="d-flex flex-column align-items-center w-100">
    <slot name="alert"> </slot>
    <div :class="formClass">
      <slot name="replyLabel"></slot>
      <input
        :type="inputType"
        :class="inputClass"
        :style="inputStyle"
        :placeholder="placeholderText"
        :id="labelText"
        :value="modelValue"
        @input="emit('update:modelValue', $event.target.value)"
        :disabled="error || currentStore.guest"
      />
      <slot name="replyButton"> </slot>
      <div v-if="!landing && !labelText.includes('reply')">
        <button
          class="input-group-text"
          @click="emit('send-event', modelValue)"
          :disabled="error"
        >
          <slot></slot>
        </button>
        <slot name="additionalOptions"></slot>
      </div>
      <label v-if="landing && !labelText.includes('reply')" :for="labelText">
        <slot></slot>
      </label>
    </div>
  </div>
</template>
