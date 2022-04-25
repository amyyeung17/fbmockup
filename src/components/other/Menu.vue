<script setup>
import { ref } from "vue";
import { RouterLink, useRouter } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import { useMessageStore } from "@/stores/message";
import OptionsLabel from "@/components/reusable/OptionsLabel.vue";
import LinkLabel from "@/components/reusable/LinkLabel.vue";

const router = useRouter();
const currentStore = useCurrentStore();
const messageStore = useMessageStore();

const profileClass = ref(["bi-person-fill", "icon"]);
const messageClass = ref(["bi-send-fill", "icon"]);
const controllerClass = ref(["bi-controller", "icon"]);
const mapClass = ref(["bi-map-fill", "icon"]);
const gearClass = ref(["bi-gear-fill", "icon"]);
const infoClass = ref(["bi-info", "icon"]);

function setMessage() {
  const m = messageStore.getMessage(currentStore.currentId, "all");

  if (currentStore.currentId !== -1) {
    if (m.length === 0) {
      currentStore.setSelectedMessage(currentStore.currentId);
      return;
    }
    if (m[0].msg.length !== 0) {
      currentStore.setSelectedMessage(parseInt(m[0].mid));
    }
  }
}
</script>

<template>
  <nav class="border-end h-25 m-1 py-5" id="menu-container">
    <RouterLink
      :to="
        currentStore.currentId !== -1
          ? { name: 'profile', params: { id: currentStore.currentId } }
          : '/home'
      "
      class="nav-link"
    >
      <OptionsLabel :icon-class="profileClass" space> Profile </OptionsLabel>
    </RouterLink>
    <RouterLink
      :to="
        currentStore.currentId !== -1
          ? { name: 'message', params: { id: currentStore.currentId } }
          : '/home'
      "
      class="nav-link"
      @click="setMessage"
    >
      <OptionsLabel :icon-class="messageClass" space> Message </OptionsLabel>
    </RouterLink>
    <a class="nav-link" @click="router.push('/info')">
      <OptionsLabel :icon-class="infoClass" space> Info </OptionsLabel>
    </a>
    <LinkLabel
      :icon-option="controllerClass"
      :condition-option="true"
      :slot-info="'Games'"
    />
    <LinkLabel
      :icon-option="mapClass"
      :condition-option="true"
      :slot-info="'Map'"
    />
    <LinkLabel
      :icon-option="gearClass"
      :condition-option="true"
      :slot-info="'Settings'"
    />
  </nav>
</template>

<style scoped>
#menu-container {
  max-width: 18rem;
  max-height: 35rem;
}
@media only screen and (min-width: 768px) {
  #menu-container {
    padding-left: 36px;
    padding-right: 36px;
  }
}
@media only screen and (min-width: 992px) {
  #menu-container {
    padding: 36px;
    width: 100%;
  }
}
@media only screen and (min-width: 1200px) {
  #menu-container {
    padding: 48px;
    width: 100%;
  }
}
</style>
