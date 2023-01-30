<script setup>
import { computed, nextTick, onMounted, ref, watch } from "vue";
import { useRoute } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { usePostStore } from "@/stores/post";
import { useUserStore } from "@/stores/user";

import NewPost from "./NewPost.vue";
import CustomAlert from "@/components/reusable/CustomAlert.vue";
import PostComposite from "./post/PostComposite.vue";

const route = useRoute();
const currentStore = useCurrentStore();
const postStore = usePostStore();
const userStore = useUserStore();
const usernames = userStore.getAllUsernames();
const newPost = ref("");
const postcontainer = ref(null);
const posts = ref([]);
const firstAlert = ref(true);
const secondAlert = ref(false);

//retrieves the posts when the component is first mounted
onMounted(() => {
  updatePosts();
});

//updates posts based on the path location and user that's signed in
const updatePosts = () => {
  posts.value = [];
  if (route.params.length !== 0 && route.path.includes("profile")) {
    posts.value = postStore.getFilterId(route.params.id);
  } else if (currentStore.userId === -1) {
    posts.value = postStore.post;
  } else {
    posts.value = postStore.getFilterAll();
  }
  posts.value = posts.value.sort((a, b) =>
    a.time === b.time ? 0 : a.time < b.time ? -1 : 1
  );
};

watch(
  () => currentStore.userId,
  () => {
    secondAlert.value = true;

    if (firstAlert.value) {
      firstAlert.value = false;
    }
  }
);

//updates if navigating (specifically between profiles), a post is updated (sorts by time - not implemented), or the current user changes
watch([route, postStore.post, () => currentStore.userId], () => {
  updatePosts();
  if (currentStore.error) {
    currentStore.setError();
  }
});

/**
 * Creates a new post.
 * If the post is created on a different user's profile, postLocation ensures that post will appear in both users' timeline.
 * If a new post is added to the store successfully (new posts length > previous), scroll to that post.
 */
const createPost = (p) => {
  const postLocation =
    route.params.length !== 0 && route.path.includes("profile")
      ? route.params.id
      : currentStore.userId;
  const oldLength = postStore.post.length;
  postStore.update(p, postLocation);
  nextTick(() => {
    if (postStore.post.length > oldLength) {
      newPost.value = "";
      window.scrollTo({
        behavior: "smooth",
        top: postcontainer.value.scrollHeight,
      });
    }
  });
};

//user manually closes the alert
const handleAlert = () => {
  if (firstAlert.value) {
    firstAlert.value = false;
  } else {
    secondAlert.value = false;
  }
};

const getAlert = computed(() => {
  return (
    (currentStore.userId === -1 && firstAlert.value) ||
    (currentStore.userId !== -1 && secondAlert.value)
  );
});
</script>

<script>
/**
 * @vue-data {string} newPost - input string for the new post
 * @vue-data {HTMLElement} postcontainer - ref of the all the posts, allows automatic scroll when a new post is added
 * @vue-data {Array} posts - containing all available posts given the conditions
 * @vue-data {boolean} firstAlert - controls the initial alert display
 * @vue-data {boolean} secondAlert - controls the initial signed in display
 *
 * @vue-computed {boolean} getAlert
 */

export default {
  name: "AllPosts",
};
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
      @handle-alert="currentStore.setError"
    />
    <CustomAlert
      :condition="getAlert"
      :alert-style="currentStore.userId !== -1 ? 'alert-success' : 'alert-info'"
      @handle-alert="handleAlert"
    >
      <template #msg>
        <strong v-if="currentStore.userId === -1">
          Please select a user to access & use all other functions.
        </strong>
        <template v-else>
          <strong> Success! </strong>
          Signed in as <strong>{{ usernames[currentStore.userId] }}</strong
          >.
        </template>
      </template>
    </CustomAlert>
    <p
      v-if="posts.length === 0 && route.path.includes('profile')"
      class="fs-4 text-secondary m-2"
    >
      No post to show
    </p>
    <PostComposite
      v-for="(p, index) in posts"
      :key="index"
      :p="p"
      :usernames="usernames"
    />
  </div>
</template>

<style lang="scss">
.text-break-size {
  width: 90%;
}
</style>
