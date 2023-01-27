<script setup>
import { RouterLink } from 'vue-router'

const props = defineProps({
  dropdownStyle: {
    type: String,
    default: ''
  },
  menuOptions: {
    type: Object,
    default: {}
  },
  menuStyle: {
    type: String,
    default: ''
  },
  idLabel: {
    type: String,
    default: ''
  },
  dropbuttonText: {
    type: String,
    default: ''
  },
  dropbuttonStyle: {
    type: String,
    default: 'nav-link dropdown-toggle border-0'
  },
})

const emit = defineEmits(['on-drop-click', 'on-menu-click'])
</script>

<script>
/**
 * @vue-prop {string} [dropdownStyle = ''] - style classes applied to the most outer div
 * @vue-prop {Object} [menuOptions = {}] - list of availble options to display in dropdown
 * @vue-prop {string} [menuStyle = ''] - style classes applied to the actual dropdrown div
 * @vue-prop {string} [idLabel = ''] - id for the button and to label the targeted dropdown div 
 * @vue-prop {string} [dropbuttonText = ''] - button text if using the default button type 
 * @vue-prop {string} [dropbuttonStyle = 'nav-link dropdown-toggle border-0']
 * 
 * @vue-event {number} onDropClick - callback that requires an argument
 * @vue-event {} onMenuClick - general callback with no arguments
 */

export default {
  name: 'Dropdown'
}
</script>

<template>
  <div class="dropdown" :class="dropdownStyle">
    <slot name="dropbutton">
      <button
        :class="dropbuttonStyle"
        :id="idLabel"
        data-toggle="dropdown"
        data-bs-toggle="dropdown"
        aria-expanded="false"
        type="button"
      >
        {{ dropbuttonText }}
      </button>
    </slot>
    <div 
      class="dropdown-menu"
      :class="menuStyle" 
      :aria-labelledby="idLabel"
    >
      <slot name="extra"> </slot>
      <slot name="menu">
        <button
          class="dropdown-item"
          :disabled="idLabel === 'smallConvo'"
          v-for="[index, info] of menuOptions"
          :key="index"
          type="button"
          v-on="idLabel.includes('nav-dropdown') ? {click: () => emit('on-menu-click', info.id)} : {click: () => emit('on-menu-click')}"
        >
          {{idLabel.includes('nav-dropdown') ? info.name : info }}
        </button>
      </slot>
    </div>  
  </div>

</template>
