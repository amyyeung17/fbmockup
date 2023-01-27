<script setup>
import { computed, ref } from "vue";
import IconButton from '@/components/reusable/IconButton.vue'

const props = defineProps({
  postPid: {
    type: Number
  },
  postComments: { 
    type: Object
  },
  postLikes: {
    type: Boolean
  },
  guestStat: {
    type: Boolean
  }
});

const emit = defineEmits([
  "set-display",
  "set-input-display",
  "set-likes",
]);

const commentButton = computed(() => {
  const length = props.postComments.comments.length
  return (
    length > 0 ? 
    `Showing ${props.postComments.display ? '' : `${length > 3 ? '3' : length} of `}${length} comments` 
    : 
    ''
  )
})

</script>

<script>
/**
 * @vue-prop {Object} postPid - current post's pid (identifier)
 * @vue-prop {Object} postComments - comments that correspond with postPid
 * @vue-prop {boolean} postLikes - whether the current user likes the post or not 
 * @vue-prop {boolean} guestStat - if user is signed in
 * 
 * @vue-event {number} setDisplay - shows all or less comments (only available if total comments > 3)
 * @vue-event {number} setInputDisplay - shows or hides comment input box (Reply.vue)
 * @vue-event {number} setLikes - adds or removes likes from post 
 * 
 * @vue-computed {string} commentButton
 */
export default {
  name: 'Options'
}
</script>

<template>
  <div
    class="d-flex flex-column btn-toolbar p-2 w-100"
    role="toolbar"
    id="toolbar__div"
    :key="postPid"
  >
    <div class="d-flex"> 
      <IconButton
        :disabled-stat="guestStat" 
        :icon-class="`hand-thumbs-up${postLikes ? '-fill' : ''} mx-1 fs-5`"
        @on-click="emit('set-likes', postPid)"
      />
      <IconButton
        :button-color="'btn-outline-' + (postComments.reply ? 'secondary' : 'primary')"
        :disabled-stat="guestStat" 
        :icon-class="postComments.reply ? 'x-lg' : 'chat'"
        :extra-attrs="{'data-bs-toggle': 'collapse', 'data-bs-target': `#collapseinput${postPid}`,
          'aria-controls': `#collapseinput${postPid}` }"
        @on-click="emit('set-input-display', postPid)"
      />
    </div>
    <div class="d-flex align-items-center align-self-end mt-3"> 
      <p class="me-2 card-subtitle text-muted fs-6"> {{ commentButton }} </p>
      <IconButton
        :disabled-stat="postComments.comments.length <= 3" 
        :icon-class="`chevron-${postComments.display ? 'up' : 'down'} fs-6`"
        :button-color="'btn-outline-secondary'"
        @on-click="emit('set-display', postPid)"
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
