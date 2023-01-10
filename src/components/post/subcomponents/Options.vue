<script setup>
import { ref } from "vue";
import IconButton from '@/components/reusable/IconButton.vue'
const props = defineProps({
  post: Object,
  postComments: Object,
  postLikes: String,
  guestStat: Boolean
});

const emit = defineEmits([
  "set-display",
  "set-input-display",
  "set-likes",
]);

</script>

<template>
  <div
    class="d-flex flex-column btn-toolbar p-2 w-100"
    role="toolbar"
    id="toolbar__div"
    :key="post.pid"
  >
    <div class="d-flex"> 
      <IconButton
        :disabled-stat="guestStat" 
        :icon-class="'hand-thumbs-up' + postLikes + ' mx-1 fs-5'"
        @handle-click="emit('set-likes', post.pid)"
      />
      <IconButton
        :button-color="'btn-outline-' + (postComments.reply ? 'secondary' : 'primary')"
        :disabled-stat="guestStat" 
        :icon-class="postComments.reply ? 'x-lg' : 'chat'"
        :extra-attrs="{'data-bs-toggle': 'collapse', 'data-bs-target': `#collapseinput${post.pid}`,
          'aria-controls': `#collapseinput${post.pid}` }"
        @handle-click="emit('set-input-display', post.pid)"
      />
    </div>
    <div class="d-flex align-items-center align-self-end mt-3"> 
      <p class="me-2 card-subtitle text-muted fs-6">  {{ (postComments.comments.length > 0 ? `Showing ${postComments.display ? '' : `${postComments.comments.length > 3 ? '3' : postComments.comments.length} of `}${postComments.comments.length} comments` : '') }} </p>
      <IconButton
        :disabled-stat="postComments.comments.length <= 3" 
        :icon-class="`chevron-${postComments.display ? 'up' : 'down'} fs-6`"
        :button-color="'btn-outline-secondary'"
        @handle-click="emit('set-display', post.pid)"
      />
    </div>
  </div>
</template>

<style>
#like-div {
  width: 15%;
}
#toolbar__div {
  width: 85%;
}
</style>
