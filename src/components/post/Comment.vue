<script setup>
defineProps({
  commentObject: Object,
});
</script>

<template>
  <ul class="list-group list-group-flush">
    <div v-if="commentObject.comments.length !== 0 && commentObject.display">
      <li
        class="list-group-item"
        v-for="c in commentObject.comments"
        :key="c.id"
      >
        <slot name="commentSlot" :user="c.id" :comment="c.c"></slot>
      </li>
    </div>
    <div v-else-if="commentObject.comments.length !== 0">
      <li class="list-group-item">
        <slot
          name="commentSlot"
          :user="commentObject.comments[0].id"
          :comment="commentObject.comments[0].c"
        ></slot>
      </li>
    </div>
    <div v-else>
      <p class="text-center m-3">No comments available</p>
    </div>
  </ul>
</template>
