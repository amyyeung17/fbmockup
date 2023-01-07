<script setup>
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
  <div class="list-group w-100 mt-3">
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
</template>

<style scoped>
#msg-preview-text {
  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
}
</style>
