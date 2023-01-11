<script setup>
import FakeAds from "@/components/other/FakeAds.vue";
import Menus from "@/components/other/Menu.vue";
import AllPosts from "@/components/allposts/AllPosts.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
</script>

<template>
  <MainStructure :page="'post'">
    <template #left>
      <Menus />
    </template>
    <template #middle>
      <AllPosts />
    </template>
    <template #right>
      <FakeAds />
    </template>
  </MainStructure>
</template>
