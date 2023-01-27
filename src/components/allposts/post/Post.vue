<script setup>
import { nextTick, computed, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { usePostStore } from "@/stores/post";
import { useCommentStore } from "@/stores/comment";
import Comment from "./Comment.vue";
import Options from "./Options.vue";
import PostBody from './PostBody.vue'
import PostHeader from './PostHeader.vue'
import Reply from './Reply.vue'

const route = useRoute();
const currentStore = useCurrentStore();
const commentStore = useCommentStore();
const postStore = usePostStore();
const userStore = useUserStore();
const usernames = userStore.getAllUsernames()
const editPost = ref('');
const replyComment = ref('');

const props = defineProps({
  p: {
    type: Object
  },
  usernames: {
    type: Object
  }
})

//If path location or current user changes, reset the inputs and current post number. 
watch([route, () => currentStore.userId], () => {
  editPost.value = '';
  replyComment.value = '';
  currentStore.setPost(-2)
});

//enter the new comment and resets the input 
const enterReply = (pid) => {
  commentStore.enterReply(pid, replyComment.value);
  replyComment.value = '';
}

//updates the post and resets the input
const enterPost = (type) => {
  postStore.enterPost(editPost.value, type);
  editPost.value = ''
}

//sets the posts edit mode and the input to its current content
const updateContentText = (pid) => {
  postStore.setEdit(pid)
  nextTick(() => {
    editPost.value = postStore.getPost(pid).content; 
  })
}

const getReplyLabel = computed(() => {
  let currentUsername = usernames[currentStore.userId]
  if (currentStore.windowWidth < 900) {
    currentUsername = currentUsername.split(' ')[0];
  }
  if (currentUsername.length > 12) {
    const u = currentUsername.split(' ');
    currentUsername = `${u[0]} ${u[1][0]}`;
  }
  return `${currentUsername}:`
})
</script>

<script>
/**
 * @vue-prop {Object} p - post 
 *  @vue-prop {Object} usernames -  user ids as keys and associated their associated username
 * 
 * @vue-computed {string} getReplyLabel - adjusts the label for the comment input based on available space 
 */

 export default {
   name: 'Post'
 }
</script>

<template>
  <div class="post-container card m-2">
    <PostHeader 
      :current-id="currentStore.userId"
      :post="p" 
      :usernames="usernames"
      @update-content-text="updateContentText"
    />
    <PostBody
      :post="p"
      :usernames="usernames"
      v-model="editPost"
      @enter-post="enterPost"
    />
    <Options
      :guest-stat="currentStore.userId === -1"
      :post-pid="p.pid"
      :post-comments="commentStore.getComments(p.pid)"
      :post-likes="postStore.getCurrentLikes(p.pid) !== -1"
      @set-display="commentStore.setDisplay"
      @set-input-display="commentStore.setReply"
      @set-likes="postStore.addLikes"
    />
    <Comment 
      :post-comments="commentStore.getComments(p.pid)"
      :usernames="usernames"
    />
    <Reply 
      :current-username="getReplyLabel"
      :post-pid="p.pid"
      v-model="replyComment"
      @enter-reply="enterReply"
    />
  </div>
</template>

<style lang="scss" scoped>
.post-container {
  width: 90%;
}

@include media-breakpoint-up(xxl) {
  .post-container {
    min-width: 32.5rem !important;
    max-width: 35rem;
  }
 }
</style>
