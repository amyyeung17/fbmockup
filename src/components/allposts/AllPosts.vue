<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { usePostStore } from "@/stores/post";

import NewPost from "./NewPost.vue";
import Alert from "@/components/reusable/Alert.vue";
import CustomInput from "@/components/reusable/CustomInput.vue";
import Post from './post/Post.vue'

const route = useRoute();
const currentStore = useCurrentStore();
const postStore = usePostStore();

const newPost = ref('');
const postcontainer = ref(null);
const posts = ref([]);
const firstAlert = ref(true)
onMounted(() => {
  changeProfile();
});

const changeProfile = () => {
  posts.value = [];
  if (route.params.length !== 0 && route.path.includes("profile")) {
    posts.value = postStore.getFilterId(route.params.id)
  } else if (currentStore.currentId === -1) {
    posts.value = postStore.post;
  } else {
    posts.value = postStore.getFilterAll()
  }
  posts.value = posts.value.sort((a, b) => (a.time === b.time ? 0 : (a.time < b.time ? -1 : 1)))
}

watch([route, postStore.post, () => currentStore.currentId], () => {
  changeProfile();
});

const createPost = (p) => {
  const postLocation = (route.params.length !== 0 && route.path.includes("profile") ? route.params.id : currentStore.currentId)
  const oldLength = postStore.post.length;
  postStore.update(p, postLocation);
  nextTick(() => {
    if (postStore.post.length > oldLength) {
      newPost.value = '';
      window.scrollTo({
        behavior: "smooth",
        top: postcontainer.value.scrollHeight,  
      });
    }
  });
}
</script>

<template>
  <div
    ref="postcontainer"
    class="d-flex flex-column align-items-center w-100 m-2"
  >
    <NewPost
      :error="currentStore.error"
      :error-message="currentStore.errorMsg"
      v-model="newPost"
      @send-event="createPost"
      @handle-error="currentStore.setError"
    />
    <Alert :condition="currentStore.currentId === -1 && firstAlert" @handle-error="firstAlert = false">
      <template #errorMsg>
       <strong> Please select a user to access & use all other functions. </strong>
      </template>
    </Alert>
    <p v-if="posts.length === 0 && route.path.includes('profile')" class="fs-4 text-secondary m-2">
      No post to show
    </p>
    <Post v-for="(p, index) in posts" :key="index" :p="p" />
  </div>
</template>

<style lang="scss">
.text-break-size {
  width: 90%;
}
</style>
