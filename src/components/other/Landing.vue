<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import Alert from "@/components/reusable/Alert.vue";
import CustomInput from "@/components/reusable/CustomInput.vue";
import IconLink from '@/components/reusable/IconLink.vue'

</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center" id="landing-container">
    <div class="w-75 land-alert"> 
      <Alert :condition="true" :alert-style="'alert-info land-box'">
        <template #msg>
          For demo purposes, username and password are not required to enter.
        </template>
      </Alert>
    </div>
    <h1 class="display-3 text-primary">Fakebook</h1>
    <div class="w-50 sign"> 
      <CustomInput
        :form-class="'form-floating w-75 mx-2 my-3'"
        :input-class="'form-control w-100'"
        :label-text="'floatingInput'"
      >
        <template #floatLabel>
          <label for="floatingInput"> Username </label>
        </template>
      </CustomInput>
      <CustomInput
        :form-class="'form-floating w-75 mx-2 my-3'"
        :input-class="'form-control w-100'"
        :label-text="'floatingPassword'"
      >
        <template #floatLabel>
          <label :for="'floatingPassword'"> Password </label>
        </template>
      </CustomInput>
    </div>
    <RouterLink
      type="button"
      class="btn btn-primary w-25 m-3 px-3 py-2"
      :to="'/home'"
    >
      Enter
    </RouterLink>
    <a href="#" class="nav-link m-2 disabled"> Create Account </a>
    <a href="#" class="nav-link m-2 disabled"> Forget Password </a>
    <IconLink 
      :icon-class="'info fs-5'"
      :toLocation="'/info'"
      :link-style="'btn btn-outline-primary p-0'"
    />
    <a class="link-primary p-2 m-2" href="https://www.ayeung.me"> 
      <span class="bi bi-arrow-left"></span>
      Back to portfolio
    </a>
  </div>
</template>

<style lang="scss" scoped>
#landing-container {
  height: 100vh;
  max-width: 100%;
  width: 100vw;
}

@include media-breakpoint-down(sm) {
  .sign {
    width: 100% !important;
  }

  .land-alert {
    width: 90% !important;
  }

  .land-box {
    margin-left: 0rem !important;
    margin-right: 0rem !important;
  }
}
</style>
