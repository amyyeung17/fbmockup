<script setup>
import ConvoButtons from "./ConvoButtons.vue";

defineProps({
  currentName: String,
});

const emit = defineEmits(["go-profile"]);
</script>

<template>
  <h4 class="m-2 p-2">{{ currentName }}</h4>
  <i class="bi bi-person-circle profile-pic"></i>
  <div class="list-group w-75 m-3">
    <a
      class="list-group-item list-group-item-action p-2"
      @click="emit('go-profile')"
    >
      Profile
    </a>
    <ConvoButtons :convo-class="['list-group-item', 'p-2']" />
  </div>
</template>
