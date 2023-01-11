<script>
export default {
  inheritAttrs: false
}
</script>

<script setup>
import { computed, ref, watch, useAttrs } from "vue";
import CustomInput from "../../reusable/CustomInput.vue";
import FriendsButton from './FriendsButton.vue'
import Options from "./Options.vue";
import Preview from "./Preview.vue";

/**
 * displayFriends - controls display of messages or friend options 
 * previewList - list of active conversations
 */
const attrs = useAttrs()
const displayFriends = ref(false);
const smallDisplay = ref('none')
const props = defineProps({
  previewList: {
    type: Array
  }, 
  buttonBreakpoint: {
    type: Boolean
  },
  mdBreakpoint: {
    type: Boolean
  }
})

watch(() => props.mdBreakpoint, () => {
  if (props.mdBreakpoint) {
    smallDisplay.value = 'none'
  }
})

//Adds a new conversation to the message store & shows list of active messages again 
const createNewConvo = (id) => {
  attrs.onHandleNew(id)
  displayFriends.value = !displayFriends.value;
}

const handleSmallDisplay = (type) => {
  if (props.mdBreakpoint) {
    displayFriends.value = !displayFriends.value;
  } else {
    smallDisplay.value = (smallDisplay.value === 'none' ? type : 'none')
  }
}

const buttonText = computed(() => {
  return(
    props.buttonBreakpoint ?
      (displayFriends.value ? 'Cancel' : 'Start a new convo')
    :
      (smallDisplay.value === 'friends' ? 'Cancel' : 'New Convos')
  )
})

</script>

<template>
  <h2 class="display-6 m-2">Messages</h2>
  <Options :button-text="buttonText" :md-breakpoint="mdBreakpoint" :small-display="smallDisplay" @on-small-display="handleSmallDisplay" />
  <Preview
    v-if="((!displayFriends && mdBreakpoint) || (!mdBreakpoint && smallDisplay === 'previews'))"
    :preview-list="previewList"
    v-bind="$attrs"
  />
  <FriendsButton 
    v-if="((displayFriends && mdBreakpoint) || (!mdBreakpoint && smallDisplay === 'friends'))" 
    v-bind="$attrs" 
    @on-create-convo="createNewConvo" 
  />
</template>