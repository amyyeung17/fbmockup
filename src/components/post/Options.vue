<script setup>
import { ref } from "vue";
import { useCurrentStore } from "@/stores/currentstate";
import OptionsLabel from "@/components/reusable/OptionsLabel.vue";

const props = defineProps({
  postObject: Object,
  numComments: Object,
  likeDisplay: Array,
  buttonSize: String,
});

const emit = defineEmits([
  "update-content-text",
  "set-display",
  "set-input-display",
  "set-likes",
]);

const currentStore = useCurrentStore();

const editClass = ref(["bi-pencil-square", "mx-1", props.buttonSize]);

function disableComments() {
  return !(props.numComments.comments.length > 1);
}

function displayText() {
  if (disableComments()) {
    return "all shown";
  } else {
    return props.numComments.display ? "display less" : "display all";
  }
}

function displayReply() {
  if (!currentStore.getWindow) {
    return "";
  }
  return props.numComments.reply ? "cancel" : "reply";
}

function returnDisplay(type) {
  if (type === "c") {
    return props.numComments.display
      ? ["bi-arrow-up", "mx-1", props.buttonSize]
      : ["bi-arrow-down", "mx-1", props.buttonSize];
  } else {
    return props.numComments.reply
      ? ["bi-x-lg", "mx-1", props.buttonSize]
      : ["bi-reply", "mx-1", props.buttonSize];
  }
}

function marginButtons() {
  return currentStore.windowWidth < 1200 && currentStore.getWindow
    ? "mx-1"
    : "mx-2";
}
</script>

<template>
  <div class="d-flex flex-row mx-2 mt-2 mb-3" :key="postObject.pid">
    <div class="d-flex justify-content-start" id="like-div">
      <button
        class="btn btn-outline-primary mx-2 px-2 py-1"
        @click="emit('set-likes', postObject.pid)"
        :disabled="currentStore.guest"
      >
        <OptionsLabel :icon-class="likeDisplay" />
      </button>
    </div>
    <div
      class="d-flex justify-content-end btn-toolbar"
      role="toolbar"
      id="toolbar__div"
    >
      <div v-if="postObject.id === currentStore.currentId && !postObject.edit">
        <button
          class="btn btn-outline-primary py-1 px-2"
          :class="marginButtons()"
          @click="emit('update-content-text', postObject.pid)"
        >
          <OptionsLabel :icon-class="editClass"> edit </OptionsLabel>
        </button>
      </div>
      <button
        class="btn btn-outline-primary py-1 px-2"
        :class="marginButtons()"
        data-bs-toggle="collapse"
        :data-bs-target="'#collapseinput' + postObject.pid"
        :aria-controls="'collapseinput' + postObject.pid"
        @click="emit('set-input-display', postObject.pid)"
        :disabled="currentStore.guest"
      >
        <i :class="returnDisplay('d')"></i>
        <span class="icon__label"> {{ displayReply() }} </span>
      </button>
      <button
        class="btn btn-outline-primary py-1 px-2"
        :class="marginButtons()"
        :disabled="disableComments()"
        @click="emit('set-display', postObject.pid)"
      >
        <OptionsLabel
          :condition="disableComments()"
          :icon-class="returnDisplay('c')"
        >
          {{ displayText() }}
        </OptionsLabel>
      </button>
    </div>
  </div>
</template>

<style>
#like-div {
  width: 15%;
}
#toolbar__div {
  width: 85%;
}
</style>
