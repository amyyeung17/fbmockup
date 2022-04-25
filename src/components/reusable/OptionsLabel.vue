<script setup>
import { useCurrentStore } from "@/stores/currentstate";

defineProps({
  iconClass: Array,
  condition: {
    type: Boolean,
    default: false,
  },
  space: {
    type: Boolean,
    default: false,
  },
  slotStyle: {
    type: Boolean,
    default: false,
  },
});
const currentStore = useCurrentStore();
</script>

<template>
  <i :class="iconClass" class="bi" :disabled="condition"></i>
  <template v-if="space"> &nbsp; </template>
  <span
    v-if="currentStore.getWindow"
    :class="[!slotStyle ? 'icon__label' : 'friend__label']"
  >
    <slot> </slot>
  </span>
</template>

<style>
.friend__icon {
  font-size: 1.2rem;
}
@media only screen and (max-width: 991px) {
  .icon {
    font-size: 1.8rem;
  }
  .friend__icon {
    font-size: 1.2rem;
  }
}
@media only screen and (min-width: 992px) {
  .icon {
    font-size: 1.6rem;
  }
  .icon__label {
    font-size: 1rem;
  }
  .friend__icon {
    font-size: 1.4rem;
  }
  .friend__label {
    font-size: 1.2rem;
  }
}
</style>
