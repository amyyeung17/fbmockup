<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";
import Alert from "@/components/reusable/Alert.vue";
import CustomInput from "@/components/reusable/CustomInput.vue";
import IconLink from '@/components/reusable/IconLink.vue'

</script>

<template>
  <div class="d-flex flex-column align-items-center justify-content-center" id="landing-container">
    <Alert :condition="true">
      <template #errorMsg>
        For demo purposes, username and password are not required to enter.
      </template>
    </Alert>
    <h1 class="display-3 text-primary">Fakebook</h1>
    <div class="w-50"> 
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
      :to="'/project3/home'"
    >
      Enter
    </RouterLink>
    <a href="#" class="nav-link m-2 disabled"> Create Account </a>
    <a href="#" class="nav-link m-2 disabled"> Forget Password </a>
    <IconLink 
      :icon-class="'info-square'"
      :toLocation="'/info'"
    />
  </div>
</template>

<style>
#landing-container {
  height: 100vh;
  max-width: 100%;
  width: 100vw;
}
</style>
