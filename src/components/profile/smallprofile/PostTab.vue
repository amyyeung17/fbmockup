<script setup>
import AllPosts from "@/components/allposts/AllPosts.vue";

defineProps({
  firstTab: {
    type: String,
  },
});
</script>

<script>
/**
 * @vue-prop {string} firstTab - applied style classes, always the first one active
 */

export default {
  name: "PostTab",
};
</script>

<template>
  <div
    class="tab-pane fade show active tab-pane_div w-100 py-2"
    :class="firstTab"
    id="postTab"
  >
    <AllPosts />
  </div>
</template>
