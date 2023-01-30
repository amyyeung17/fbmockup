<script setup>
import { ref, watch, onMounted, onUnmounted } from "vue";
import { useRoute, useRouter } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useUserStore } from "@/stores/user";
import { useMessageStore } from "@/stores/message";

import CustomAlert from "@/components/reusable/CustomAlert.vue";
import MsgListComposite from "./msglist/MsgListComposite.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
import ConvoComposite from "./convo/ConvoComposite.vue";
import SideProfile from "./SideProfile.vue";

const userStore = useUserStore();
const currentStore = useCurrentStore();
const messageStore = useMessageStore();
const route = useRoute();
const router = useRouter();
const usernames = userStore.getAllUsernames();

const userAlert = ref(false);

//When going to the url directly and there is no user signed in.
onMounted(() => {
  if (currentStore.userId === -1) {
    router.push("/home");
  }
});
onUnmounted(() => {
  if (currentStore.error) {
    currentStore.setError();
  }
});

/**
 * When route changes, remove unsent messages.
 * If navigating within /message (ex. switching current userId), updates messages.
 */
watch(
  route,
  () => {
    if (currentStore.userId !== -1 && route.path.includes("message")) {
      if (messageStore.getAllMsgs(route.params.id).length !== 0) {
        messageStore.removeEmpty();
      }
      if (route.path.includes("message")) {
        messageStore.switchConvos(route.params.id);
      }
      if (currentStore.error) {
        currentStore.setError();
      }
    }
  },
  { immediate: true }
);
watch(
  () => currentStore.userId,
  () => {
    userAlert.value = true;
  }
);

const handleAlert = () => {
  if (currentStore.errorMsg.includes("Message")) {
    currentStore.setError();
  }
  if (userAlert.value) {
    userAlert.value = false;
  }
};
</script>

<template>
  <MainStructure :page="'msg'">
    <template #left>
      <MsgListComposite
        :preview-list="messageStore.getAllMsgs(route.params.id)"
        :recipient="currentStore.recipientId"
        :user="userStore.getCurrentUser()"
        :usernames="usernames"
        :window-width="currentStore.windowWidth"
        @select-friend="messageStore.update"
      />
    </template>
    <template #middle>
      <CustomAlert
        @handle-alert="handleAlert"
        :condition="currentStore.error || userAlert"
        :alert-style="userAlert ? 'alert-success' : 'alert-warning'"
      >
        <template #msg>
          <template v-if="currentStore.error">
            <strong> Whoops! </strong>
            {{ currentStore.errorMsg }}
          </template>
          <template v-else>
            <strong> Success! </strong>
            Signed in as <strong>{{ usernames[currentStore.userId] }}</strong
            >.
          </template>
        </template>
      </CustomAlert>
      <ConvoComposite
        :convo-items="messageStore.getCurrentMsg(route.params.id)"
        :recipient="currentStore.recipientId"
        :usernames="usernames"
        :window-size="currentStore.getWindow"
        @send-msg="messageStore.enterMsg"
      />
    </template>
    <template #right>
      <template id="optional-buttons">
        <SideProfile
          :recipient="currentStore.recipientId"
          :recipientName="usernames[currentStore.recipientId]"
        />
      </template>
    </template>
  </MainStructure>
</template>

<style lang="scss" scoped>
#optional-buttons {
  display: none;
}

@include media-breakpoint-up(lg) {
  #optional-buttons {
    align-items: center;
    display: flex;
    flex-direction: column;
    width: 100%;
  }
}
</style>
