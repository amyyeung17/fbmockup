<script setup>
import IconButton from '@/components/reusable/IconButton.vue'
import Dropdown from '@/components/reusable/Dropdown.vue'

defineProps({
  currentUser: {
    type: Boolean,
  },
  currentUsername: {
    type: String
  },
  friendStat: {
    type: Boolean
  }
})

const emit = defineEmits(['edit-friends'])
</script>

<template>
  <div class="d-flex bg-light text-center w-100 py-2 px-3 mb-2" :style="{ height: '22vh' }">
    <i class="bi bi-person-circle profile-pic"></i>
    <h2 class="align-self-end display-5 ms-2 py-1"> {{ currentUsername }} </h2>
    <div
      class="d-flex flex-grow-1 p-3 justify-content-end" 
      v-if="currentUser"
    >
      <IconButton
        v-if="!friendStat"
        :icon-class="'person-plus'"
        :button-style="'align-self-end'"
        @handle-click="emit('edit-friends')"
      >
        <span class="mx-1">
          Add Friend
        </span>
      </IconButton>
      <Dropdown
        v-else
        :dropdown-style="'align-self-end'"
        :id-label="'dropfriend'"
        :menu-options="['Unfriend'].entries()"
        :menu-style="'dropdown-menu-end'"
        @handle-menu="emit('edit-friends')"
      > 
        <template #dropbutton>
          <IconButton
            :icon-class="'person-check-fill'"
            :button-color="'btn-primary'"
            :button-id="'dropfriend'"
            :button-style="'align-self-end dropdown-toggle'"
            :extra-attrs="{'data-bs-toggle': 'dropdown', 'aria-expanded': 'false'}"
          >
            <span class="mx-1">
              Friends
            </span>
          </IconButton>
        </template>
      </Dropdown>
    </div>
  </div>
</template>

<style scoped>
.profile-pic {
  font-size: 6rem;
  background-size: 6rem;
  margin: 0;
  width: 27.5%;
}
</style>