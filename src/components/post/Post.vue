<script setup>
import { nextTick, onMounted, ref, watch } from "vue";
import { RouterLink, useRoute, useRouter } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { usePostStore } from "@/stores/post";
import { useCommentStore } from "@/stores/comment";

import Comment from "./Comment.vue";
import Options from "./Options.vue";
import NewPost from "./NewPost.vue";
import Alert from "@/components/reusable/Alert.vue";
import CustomInput from "@/components/reusable/CustomInput.vue";
import OptionsLabel from "@/components/reusable/OptionsLabel.vue";

const route = useRoute();
const router = useRouter();
const currentStore = useCurrentStore();
const commentStore = useCommentStore();
const postStore = usePostStore();
const userStore = useUserStore();

const cardStyle = ref({ minHeight: "8rem" });
const replyClass = ref([["bi-reply-fill", "mx-1"]]);

const editPost = ref("");
const replyComment = ref("");
const newPost = ref("");
const postcontainer = ref(null);
let posts = ref([]);

onMounted(() => {
  changeProfile();
});

function changeProfile() {
  posts.value = [];
  if (route.params.length !== 0 && route.path.includes("profile")) {
    const routeId = parseInt(route.params.id);
    for (const p of postStore.post) {
      if (p.id === routeId || p.postLocation === routeId) {
        posts.value.push(p);
      }
    }
  } else if (currentStore.guest) {
    posts.value = postStore.post;
  } else {
    const current = userStore.getUser(currentStore.currentId);
    for (const p of postStore.post) {
      if (
        currentStore.currentId === p.id ||
        currentStore.currentId === p.postLocation ||
        current.friends.indexOf(p.id) !== -1 ||
        current.friends.indexOf(p.postLocation) !== -1
      ) {
        posts.value.push(p);
      }
    }
  }
}

watch([route, postStore.post, currentStore.getCurrentId], () => {
  changeProfile();
  editPost.value = "";
  replyComment.value = "";
});

function enterReply(pid) {
  const newReply = replyComment.value;
  commentStore.enterReply(pid, newReply);
  replyComment.value = "";
}

function enterPost(pid, type) {
  const edit = editPost.value;
  const l = postStore.post.length;
  postStore.enterPost(pid, edit, type);
  if (postStore.post.length > l) {
    editPost.value = "";
  }
}

function createPost(p) {
  let postLocation = currentStore.currentId;
  let l = postStore.post.length;
  if (route.params.length !== 0 && route.path.includes("profile")) {
    postLocation = parseInt(route.params.id);
  }
  postStore.createNewPost(p, postLocation);
  nextTick(() => {
    if (postStore.post.length > l) {
      newPost.value = "";
      window.scrollTo({
        behavior: "smooth",
        top: postcontainer.value.scrollHeight,
      });
    }
  });
}

function getLikes(l, likes) {
  return l !== likes.length
    ? userStore.getUsername(likes[l - 1]) + ", "
    : userStore.getUsername(likes[l - 1]);
}

function returnButton() {
  return currentStore.getWindow ? "fs-6" : "fs-5";
}

function likeOption(pid) {
  return postStore.getCurrentLikes(pid) === -1
    ? ["bi-hand-thumbs-up", "mx-1", returnButton()]
    : ["bi-hand-thumbs-up-fill", "mx-1", returnButton()];
}

function updateContentText(pid) {
  const x = postStore.setEdit(pid);
  if (x) {
    editPost.value = postStore.getPost(pid).content;
  }
}

function getReplyLabel(user) {
  if (currentStore.windowWidth < 900) {
    return user.split(" ")[0];
  }
  if (user.length > 12) {
    let u = user.split(" ");
    return u[0] + " " + u[1][0];
  }
  return user;
}
</script>

<template>
  <div
    ref="postcontainer"
    class="d-flex flex-column align-items-center w-100 m-2"
  >
    <NewPost
      :error="currentStore.error"
      :error-message="currentStore.errorMessage"
      v-model="newPost"
      @send-event="createPost"
      @change-error="currentStore.setError"
    />
    <Alert :condition="currentStore.guest">
      Please select a user to access & use all other functions.
    </Alert>
    <h6 v-if="posts.length === 0 && route.path.includes('profile')" class="m-2">
      No post to show
    </h6>
    <div
      v-for="(p, index) in posts"
      :key="index"
      class="card m-2"
      id="post-container"
    >
      <div class="card-header py-1">
        <ul class="nav">
          <li class="nav-item">
            <RouterLink
              :to="{ name: 'profile', params: { id: p.id } }"
              class="nav-link text-info my-1 p-2"
            >
              {{ userStore.getUsername(p.id) }}
            </RouterLink>
          </li>
          <i
            v-if="p.postLocation !== p.id"
            class="bi bi-arrow-right d-flex align-self-center my-1"
          ></i>
          <li v-if="p.postLocation !== p.id" class="nav-item">
            <RouterLink
              :to="{ name: 'profile', params: { id: p.postLocation } }"
              class="nav-link text-info my-1 p-2"
            >
              {{ userStore.getUsername(p.postLocation) }}
            </RouterLink>
          </li>
        </ul>
      </div>
      <div class="card-body py-2" :style="cardStyle">
        <p v-if="!p.edit" class="card-text fs-3 pb-4">{{ p.content }}</p>
        <div v-else>
          <input class="w-100" v-model="editPost" />
          <div class="d-flex justify-content-end">
            <button
              class="btn btn-primary m-2"
              @click="enterPost(p.pid, 'cancel')"
            >
              Cancel
            </button>
            <button
              class="btn btn-primary m-2"
              @click="enterPost(p.pid, 'save')"
            >
              Save
            </button>
          </div>
        </div>
        <p class="card-subtitle text-muted" id="likes-text">
          {{ p.likes.length + " likes" }}
        </p>
        <p
          class="d-inline card-subtitle"
          v-for="l in p.likes.length"
          :key="`post${p.pid}-like-${l}`"
        >
          {{ getLikes(l, p.likes) }}
        </p>
      </div>
      <Options
        :post-object="p"
        :num-comments="commentStore.getMain(p.pid)"
        :like-display="likeOption(p.pid)"
        :button-size="returnButton()"
        @update-content-text="updateContentText"
        @set-display="commentStore.setDisplay"
        @set-input-display="commentStore.setInputDisplay"
        @set-likes="postStore.addLikes"
      />
      <Comment :commentObject="commentStore.getMain(p.pid)">
        <template #commentSlot="{ user, comment }">
          <a
            class="nav-link w-50 px-2"
            id="comment-name"
            @click="router.push({ name: 'profile', params: { id: user } })"
          >
            {{ userStore.getUsername(user) + ":" }}
          </a>
          <p class="mx-1" id="comment-content">{{ comment }}</p>
        </template>
      </Comment>
      <div class="collapse" :id="'collapseinput' + p.pid">
        <CustomInput
          :placeholder-text="'Write your reply here...'"
          :form-class="'card-footer d-flex flex-row align-items-center w-100'"
          :label-text="'reply' + p.pid"
          :input-class="'m-2'"
          :input-style="{ width: '55%' }"
          v-model="replyComment"
        >
          <template #replyLabel>
            <label :for="'reply' + p.pid" id="reply-label">
              {{ getReplyLabel(currentStore.currentUser) + ":" }}
            </label>
          </template>
          <template #replyButton>
            <button
              class="btn btn-primary mx-3 my-1 px-2"
              @click="enterReply(p.pid)"
              data-bs-toggle="collapse"
              :data-bs-target="'#collapseinput' + p.pid"
              :aria-controls="'collapseinput' + p.pid"
            >
              <OptionsLabel :icon-class="replyClass"> </OptionsLabel>
            </button>
          </template>
        </CustomInput>
      </div>
    </div>
  </div>
</template>

<style scoped>
#post-container {
  width: clamp(75%, 80%, 35rem);
}
#likes-text {
  display: inline;
  margin-right: 8px;
}
#comment-name {
  min-width: 6rem;
  border: 0px;
  line-height: 32px;
  margin: 2px;
  display: inline;
}
#comment-content {
  display: inline;
  word-break: break-word;
}
#reply-label {
  display: flex;
  justify-content: center;
  min-width: 6rem;
  padding: 0;
  margin: 0;
}

@media only screen and (max-width: 991px) {
  #reply-label {
    font-size: 0.9rem;
    min-width: 5rem;
  }
}
</style>
