<script setup>
const props = defineProps({
  restTab: {
    type: String
  },
  user: {
    type: Object
  }
});

const options = {
  person: {icon: 'person-lines-fill', info: props.user.name },
  pin: {icon: 'pin-fill', info: props.user.desc },
  pinmap: {icon:'pin-map-fill', info: props.user.location }
}
</script>

<script>
/**
 * @vue-prop {string} restTab - applied style classes 
 * @vue-prop {Array} user - current user
 */

export default {
  name: 'ProfileTab'
}
</script>

<template>
  <div class="tab-pane tab-pane__div fade w-100 py-2" :class="restTab" id="profileTab">
    <div class="d-flex flex-column align-items-center"> 
      <span class="bi bi-person-circle profile__icon_small"></span>
      <div class="d-flex align-items-center align-self-start" v-for="i of ['person', 'pin', 'pinmap']" :key="i" > 
        <span :class="`bi bi-${options[i].icon}`"> </span>
        <p class="m-2"> {{ options[i].info }} </p>
      </div>
    </div>
  </div>
</template>

<style scoped>
.profile__icon_small {
  font-size: 4.5rem;
  background-size: 4.5rem;
  margin: 0;
}
</style>
