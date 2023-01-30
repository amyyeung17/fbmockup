<script setup>
import { computed, ref, watch, useAttrs } from "vue";

import MsgFriendOptions from "./MsgListOptionsFriend.vue";
import MsgOptions from "./MsgListOptions.vue";
import MsgPreview from "./MsgListPreview.vue";

const attrs = useAttrs();
const displayFriends = ref(false);
const smallDisplay = ref("none");

const props = defineProps({
  previewList: {
    type: Array,
  },

  windowWidth: {
    type: Number,
  },
});

const smBreakpoint = computed(() => {
  return props.windowWidth >= 576;
});

const buttonBreakpoint = computed(() => {
  return props.windowWidth >= 615;
});

//if window width >= 576, resets
watch(
  () => smBreakpoint,
  () => {
    if (smBreakpoint.value) {
      smallDisplay.value = "none";
    }
  }
);

watch(
  () => props.previewList,
  () => {
    displayFriends.value = false;
    smallDisplay.value = "none";
  }
);

//Adds a new conversation to the message store & shows list of active messages again
const createNewConvo = (id) => {
  attrs.onSelectFriend(id);
  displayFriends.value = !displayFriends.value;
};

/**
 * Handles what is being displayed at different breakpoints
 * If smBreakpoint, displayFriends will show a friends list when true and preview of messages otherwise.
 * Else, it sets smallDisplay to the appropriate option and display. If an option is selected, swithc
 */
const handleDisplay = (type) => {
  if (smBreakpoint.value) {
    displayFriends.value = !displayFriends.value;
  } else {
    smallDisplay.value = smallDisplay.value === "none" ? type : "none";
  }
};

const buttonText = computed(() => {
  return buttonBreakpoint.value
    ? displayFriends.value
      ? "Cancel"
      : "Start a new convo"
    : smallDisplay.value === "friends"
    ? "Cancel"
    : "New Convos";
});
</script>

<script>
/**
 * Fallthrough attributes of @select-friend and usernames (Object) are passed to MsgPreview.
 * Fallthrough attribute of user is passed to MsgFriendOptions.
 *
 * @vue-prop {Array} previewList - all of the current user's convos
 * @vue-prop {Number} windowWidth - current width of window
 *
 * @vue-data {boolean} displayFriends - if smBreakpoint is true, alternates whether MsgPreview or MsgFriendOptions is displayed.
 * @vue-data {('none' | 'previews' | 'friends')} [smallDisplay = 'none'] - if smBreakpoint is false, MsgOptions will present separate choices for the components mentioned above.
 * Only one can be displayed at a time.
 *
 * @vue-computed {boolean} buttonBreakpoint - window width >= 615, responsive design, adjusts some text
 * @vue-computed {boolean} smBreakpoint - window width >= 576, responsive design
 * @vue-computed {string} buttonText
 */

export default {
  inheritAttrs: false,
  name: "MsgListComposite",
};
</script>

<template>
  <h2 class="display-6 m-2">Messages</h2>
  <MsgOptions
    :button-text="buttonText"
    :sm-breakpoint="smBreakpoint"
    :small-display="smallDisplay"
    @on-display="handleDisplay"
  />
  <MsgPreview
    v-if="
      (!displayFriends && smBreakpoint) ||
      (!smBreakpoint && smallDisplay === 'previews')
    "
    :preview-list="previewList"
    v-bind="$attrs"
  />
  <MsgFriendOptions
    v-if="
      (displayFriends && smBreakpoint) ||
      (!smBreakpoint && smallDisplay === 'friends')
    "
    v-bind="$attrs"
    @on-create-convo="createNewConvo"
  />
</template>
