<script setup>
//Component - shows options of current active messages 

/**
 * previewList - list of active conversations 
 * usernames - fallthrough attributes, list of associated ids and usernames
 */
defineProps({
  previewList: {
    type: Array
  }, 
  usernames: {
    type: Object
  }
})

const emit = defineEmits(['select-friend'])
</script>

<template>
  <div v-if="previewList.length !== 0" class="list-group w-100 mt-3">
    <a
      class="list-group-item list-group-item-action"
      role="button"
      v-for="m of previewList"
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
  <p v-else class="text-secondary fs-4 my-4"> No active convos </p>
</template>

<style scoped>
#msg-preview-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
