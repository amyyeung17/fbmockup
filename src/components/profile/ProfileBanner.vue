<script setup>
import IconButton from "@/components/reusable/IconButton.vue";
import CustomDropdown from "@/components/reusable/CustomDropdown.vue";

defineProps({
  currentUser: {
    type: Boolean,
  },
  profileUsername: {
    type: String,
  },
  friendStat: {
    type: Boolean,
  },
});

const emit = defineEmits(["edit-friends"]);
</script>

<script>
/**
 * @vue-prop {boolean} currentUser - checks to see there is a user signed in. If so, checks if the current profile is that user's.
 * Controls whether the 'add friend' option is available.
 * @vue-prop {string} profileUsername - the profile's username
 * @vue-prop {boolean} friendStat - if there is a current user, friendship status with the person in the profile
 *
 * @vue-event {undefined} editFriends - adds or removes person from your friend's list
 */

export default {
  name: 'ProfileBanner',
};
</script>

<template>
  <div
    class="d-flex bg-light text-center w-100 py-2 px-3 mb-2"
    :style="{ height: '22vh' }"
  >
    <span class="bi bi-person-circle profile-pic"></span>
    <h2 class="align-self-end display-5 ms-2 py-1">{{ profileUsername }}</h2>
    <div class="d-flex flex-grow-1 p-3 justify-content-end" v-if="currentUser">
      <IconButton
        v-if="!friendStat"
        :icon-class="'person-plus'"
        :button-style="'align-self-end'"
        @on-click="emit('edit-friends')"
      >
        <span class="mx-1"> Add Friend </span>
      </IconButton>
      <CustomDropdown
        v-else
        :dropdown-style="'align-self-end'"
        :id-label="'dropfriend'"
        :menu-options="['Unfriend'].entries()"
        :menu-style="'dropdown-menu-end'"
        @on-menu-click="emit('edit-friends')"
      >
        <template #dropbutton>
          <IconButton
            :icon-class="'person-check-fill'"
            :button-color="'btn-primary'"
            :button-id="'dropfriend'"
            :button-style="'align-self-end dropdown-toggle'"
            :extra-attrs="{
              'data-bs-toggle': 'dropdown',
              'aria-expanded': 'false',
            }"
          >
            <span class="mx-1"> Friends </span>
          </IconButton>
        </template>
      </CustomDropdown>
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
