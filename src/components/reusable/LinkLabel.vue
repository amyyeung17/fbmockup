<script setup>
import OptionsLabel from "./OptionsLabel.vue";

defineProps({
  iconOption: Array,
  conditionOption: {
    type: Boolean,
    default: false,
  },
  slotInfo: String,
});
</script>

<template>
  <a class="nav-link disabled">
    <OptionsLabel :icon-class="iconOption" :condition="conditionOption" space>
      {{ slotInfo }}
    </OptionsLabel>
  </a>
</template>
