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

//button -> in template 
const emit = defineEmits(['handle-click', 'handle-menu'])
console.log(props.menuOptions)
console.log(import.meta.url)

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
          v-on="idLabel.includes('nav-dropdown') ? {click: () => emit('handle-menu', info.id)} : {click: () => emit('handle-menu')}"
        >
          {{idLabel.includes('nav-dropdown') ? info.name : info }}
        </button>
      </slot>
    </div>  
  </div>

</template>
