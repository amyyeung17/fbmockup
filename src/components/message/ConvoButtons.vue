<script setup>
import { defineProps } from "vue";

defineProps({
  convoClass: Array,
});
</script>

<template>
  <a href="#" class="disabled" :class="convoClass"> Photos </a>
  <a href="#" class="disabled" :class="convoClass"> Options </a>
  <a href="#" class="disabled" :class="convoClass"> Settings </a>
</template>
