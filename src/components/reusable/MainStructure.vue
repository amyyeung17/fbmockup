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
      return 'xs-break col-4 col-lg-3'
    case 'post':
      return 'xs-break col-3'
    case 'profile':
      return 'col-4'
  }
})

const midStyle = computed(() => {
  switch(props.page){
    case 'msg':
      return 'xs-break col-8 col-lg-7'
    case 'post':
      return 'xs-break col-9 col-lg-6'
    case 'profile':
      return 'col-8'
  }
})

const rightStyle = computed(() => {
  switch(props.page){
    case 'msg':
      return 'col-lg-2'
    case 'post':
      return 'xs-none col-lg-3'
  }
})
</script>
 
 <script>
 /**
  * @vue-prop {string} page - defines which the type of classes are being returned in the computed values
  * 
  * @vue-computed {string} leftStyle - number of columns to span, if any, of the left column
  * @vue-computed {string} midStyle - number of columns to span, if any, or the middle column
  * @vue-computed {string} rightStyle - number of columns to span, if any, or the right column
  */
 export default {
   name: 'MainStructure'
 }
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


<style lang="scss" scoped>
@include media-breakpoint-down(sm) { 
  .xs-break {
    width: 100%;
  }

  .xs-none {
    display: none !important;
  }
}

@include media-breakpoint-down(lg)  { 
  .xs-none {
    display: none !important;
  }
}
</style>