<script setup>

const props = defineProps({
  restTab: {
    type: String
  },
  user: {
    type: Object
  }
});

const optionIcons = {person: 'person-lines-fill',  pin: 'pin-fill', pinmap: 'pin-map-fill'}
const optionText = {person: props.user.name, pin: props.user.desc, pinmap: props.user.location }

</script>

<template>
  <div class="tab-pane tab-pane__div fade w-100 py-2" :class="restTab" id="profileTab">
    <div class="d-flex flex-column align-items-center"> 
      <i class="bi bi-person-circle profile__icon_small"></i>
      <div class="d-flex align-items-center align-self-start" v-for="i of ['person', 'pin', 'pinmap']" :key="i" > 
        <i :class="`bi bi-${optionIcons[i]}`"> </i>
        <p class="m-2"> {{ optionText[i]}} </p>
      </div>
    </div>
  </div>
</template>

<style>
.tab-pane__div {
  width: 85%;
  min-height: 70vh;
}
.profile__icon_small {
  font-size: 4.5rem;
  background-size: 4.5rem;
  margin: 0;
}
</style>
