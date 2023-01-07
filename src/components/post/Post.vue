<script setup>
import { nextTick, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { usePostStore } from "@/stores/post";
import { useCommentStore } from "@/stores/comment";

import Reply from './subcomponents/Reply.vue'
import Comment from "./subcomponents/Comment.vue";
import Options from "./subcomponents/Options.vue";
import PostBody from './subcomponents/PostBody.vue'
import PostHeader from './subcomponents/PostHeader.vue'
import CustomInput from "@/components/reusable/CustomInput.vue";
import IconButton from "@/components/reusable/IconButton.vue";

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
  }
})

watch([route, () => currentStore.currentId], () => {
  editPost.value = '';
  replyComment.value = '';
  currentStore.setPost(-2)
});


const enterReply = (pid) => {
  commentStore.enterReply(pid, replyComment.value);
  replyComment.value = '';
}

const enterPost = (type) => {
  postStore.enterPost(editPost.value, type);
  editPost.value = ''
}

const updateContentText = (pid) => {
  postStore.setEdit(pid)
  nextTick(() => {
    const p = postStore.getPost(pid)
    if (p.edit) {
      editPost.value = p.content;
    }
  })
}

const getReplyLabel = (user) => {
  let currentUser = usernames[user]
  if (currentStore.windowWidth < 900) {
    currentUser = usernames[user].split(" ")[0];
  }
  if (usernames[user].length > 12) {
    let u = usernames[user].split(" ");
    currentUser = u[0] + " " + u[1][0];
  }
  return currentUser + ':'
}
</script>

<template>
  <PostHeader 
    :current-id="currentStore.currentId"
    :post="p" 
    :usernames="usernames"
    @update-content-text="updateContentText"
  />
  <PostBody
    :edit-post="editPost" 
    :post="p"
    :usernames="usernames"
    v-model="editPost"
    @enter-post="enterPost"
  />
  <Options
    :guest-stat="currentStore.currentId === -1"
    :post="p"
    :post-comments="commentStore.getComments(p.pid)"
    :post-likes="postStore.getCurrentLikes(p.pid) !== -1 ? '-fill' : ''"
    @set-display="commentStore.setDisplay"
    @set-input-display="commentStore.setReply"
    @set-likes="postStore.addLikes"
  />
  <Comment 
    :post-comments="commentStore.getComments(p.pid)"
    :usernames="usernames"
  />
  <Reply 
    :current-username="getReplyLabel(currentStore.currentId)"
    :post="p"
    v-model="replyComment"
    @enter-reply="enterReply"
  />
</template>
