<script setup>
import { computed } from 'vue'
const props = defineProps({
  page: {
    type: String
  }
})
const leftStyle = computed(() => {
  switch(props.page){
    case 'msg':
      return 'col-4'
    case 'post':
      return 'col-3'
    case 'profile':
      return 'col-4'
  }
})

const midStyle = computed(() => {
  switch(props.page){
    case 'msg':
      return 'col-8 col-lg-6'
    case 'post':
      return 'col-9 col-lg-6'
    case 'profile':
      return 'col-8'
  }
})

const rightStyle = computed(() => {
  switch(props.page){
    case 'msg':
      return 'col-lg-2'
    case 'post':
      return 'col-lg-3'
  }
})
</script>

<template>
  <div class="row w-100"> 
    <div 
      class="d-flex flex-column align-items-center"
      :class="leftStyle"
    >
      <slot name="left"></slot>
    </div>
    <div 
      class="d-flex flex-column align-items-center"
      :class="midStyle"
    >
      <slot name="middle"></slot>
    </div>
    <div 
      class="d-flex flex-column align-items-center"
      :class="rightStyle"
    >
      <slot name="right"></slot>
    </div>
  </div>
</template>


