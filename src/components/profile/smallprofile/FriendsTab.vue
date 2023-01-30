<script setup>
import { RouterLink } from "vue-router";

defineProps({
  usernames: {
    type: Object,
  },
  userFriends: {
    type: Array,
  },
  restTab: {
    type: String,
  },
});

const emit = defineEmits(["on-reset"]);
</script>

<script>
/**
 * @vue-prop {Object} usernames - user ids as keys and associated their associated username
 * @vue-prop {Array} userFriends - all of the current user's friends
 * @vue-prop {string} restTab - applied style classes
 *
 * @vue-event {undefined} onReset - resets the classes for the tabs
 */

export default {
  name: "FriendsTab",
};
</script>

<template>
  <div
    class="tab-pane fade tab-pane__div py-2 w-100"
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
        <span class="bi bi-person align-self-center profile__icon_small"></span>
        <div class="card-body d-flex justify-content-center p-1 my-1">
          <RouterLink
            type="button"
            class="btn btn-secondary"
            :to="{ name: 'profile', params: { id: f } }"
            @click="emit('on-reset')"
          >
            {{ usernames[index] }}
          </RouterLink>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
#friend-profile {
  width: 35%;
  height: 40%;
}
</style>
