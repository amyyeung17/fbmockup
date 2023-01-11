<script setup>
import { RouterLink } from "vue-router";
import IconButton from '../../reusable/IconButton.vue'
import Dropdown from '../../reusable/Dropdown.vue'

/**
 * Component - Several options, mainly for display purposes.
 */

defineProps({
  recipient: Number,
  windowSize: Boolean,
  currentUsername: String
})
</script>

<template>
  <div class="d-flex justify-content-between border-bottom">
    <h3 class="align-self-start mx-2 p-2"> {{ currentUsername }} </h3>
    <Dropdown
      v-if="!windowSize"
      :id-label="'smallConvo'"
      :menu-options="['Photos', 'Options', 'Settings'].entries()"
      :menu-style="'dropdown-menu-end'"
    >
      <template #dropbutton>
        <IconButton 
          :icon-class="'three-dots-vertical'"
          :button-color="'btn-outline-secondary'"
          :button-id="'smallConvo'"
          :button-style="'border-0'"
          :extra-attrs="{'data-bs-toggle': 'dropdown', 'aria-expanded': 'false'}"
        />
      </template>
      <template #extra>
        <RouterLink
          class="dropdown-item"
          :to="{name: 'profile', params: { id: recipient }}"
        >
          Profile
        </RouterLink>
      </template>
    </Dropdown>
  </div>
</template>

