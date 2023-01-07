<script setup>
import { RouterLink } from 'vue-router'
const props = defineProps({
  usernames: Object,
  userFriends: Array,
  restTab: {
    type: String
  }
});

const emit = defineEmits(['handle-reset'])

</script>

<template>
  <div
    class="tab-pane fade tab-pane__div py-2"
    :class="restTab"
    id="friendTab"
  >
    <div class="d-flex flex-wrap justify-content-around align-content-around">
      <div
        class="card d-flex border p-2 m-2"
        id="friend-profile"
        v-for="(f, index) of userFriends"
        :key="f"
      >
        <i class="bi bi-person align-self-center profile__icon_small"></i>
        <div class="card-body d-flex justify-content-center p-1 my-1">
          <RouterLink 
            type="button" 
            class="btn btn-secondary"
            :to="{ name: 'profile', params: { id: f }}" 
            @click="emit('handle-reset')"
          >
           {{ usernames[index] }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style>
#friend-profile {
  width: 35%;
  height: 40%;
}
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
