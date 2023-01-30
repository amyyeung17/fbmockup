<script setup>
defineProps({
  previewList: {
    type: Array,
  },
  usernames: {
    type: Object,
  },
  recipient: {
    type: Number,
  },
});

const emit = defineEmits(["select-friend"]);
</script>

<script>
/**
 * @vue-prop {Array} previewList - all of the current user's convos
 * @vue-prop {Object} usernames - user ids as keys and associated their associated username
 *
 * @vue-event {number} selectFriend - changes the conversation being displayed
 */

export default {
  name: "MsgListPreview",
};
</script>

<template>
  <div v-if="previewList.length !== 0" class="list-group w-100 mt-3">
    <a
      role="button"
      v-for="m of previewList"
      :class="`list-group-item list-group-item-action ${
        recipient === m.mid ? 'selected' : 'normal'
      }`"
      :key="m.mid"
      @click="emit('select-friend', m.mid)"
    >
      <div class="d-flex flex-column">
        <span class="text-info my-1 p-1"> {{ usernames[m.mid] }} </span>
        <span v-if="m.msg.length > 0" class="px-0 my-1" id="msg-preview-text">
          {{ usernames[m.msg[m.msg.length - 1].user] }} :
          <span class="text-muted"> {{ m.msg[m.msg.length - 1].m }} </span>
        </span>
      </div>
    </a>
  </div>
  <p v-else class="text-secondary fs-4 my-4">No active convos</p>
</template>

<style lang="scss" scoped>
#msg-preview-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}

.normal {
  &:hover {
    background-color: $gray-200;
  }
}

.selected {
  background-color: $gray-300;
}
</style>
