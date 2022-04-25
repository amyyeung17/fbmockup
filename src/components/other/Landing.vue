<script setup>
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useCurrentStore } from "@/stores/currentstate";
import Alert from "@/components/reusable/Alert.vue";
import CustomInput from "@/components/reusable/CustomInput.vue";

const currentStore = useCurrentStore();
const router = useRouter();

const landingAlert = ref(true);
const formClass = ref(["form-floating", "mx-2", "my-3"]);
const inputStyle = ref({ minWidth: "20rem" });

function enter() {
  if (!currentStore.guest) {
    currentStore.setGuestUser();
  }
  router.push("/home");
}
</script>

<template>
  <div class="d-flex justify-content-center" id="landing-container">
    <div
      class="d-flex flex-column align-items-center justify-content-center w-50"
    >
      <Alert :condition="landingAlert">
        For current demo purposes, username and password are not required to
        enter.
      </Alert>
      <h1 class="display-3 text-primary">Fakebook</h1>
      <CustomInput
        :form-class="formClass"
        :label-text="'floatingInput'"
        :input-style="inputStyle"
        landing
      >
        Username
      </CustomInput>
      <CustomInput
        :form-class="formClass"
        :label-text="'floatingPassword'"
        :input-style="inputStyle"
        landing
      >
        Password
      </CustomInput>
      <button
        type="button"
        class="btn btn-primary w-25 m-3 px-3 py-2"
        @click="enter"
      >
        Enter
      </button>
      <a href="#" class="nav-link mt-2 disabled"> Create Account </a>
      <a href="#" class="nav-link mt-2 disabled"> Forget Password </a>
      <a class="nav-link fs-5 mt-2" @click="router.push({ name: 'info' })">
        <i class="bi bi-info-square"></i>
      </a>
    </div>
  </div>
</template>

<style>
#landing-container {
  height: 100vh;
}
</style>
