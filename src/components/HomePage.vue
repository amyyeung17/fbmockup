<script setup>
import FakeAds from "@/components/other/FakeAds.vue";
import HomeMenu from "@/components/other/HomeMenu.vue";
import AllPosts from "@/components/allposts/AllPosts.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
</script>

<template>
  <MainStructure :page="'post'">
    <template #left>
      <HomeMenu />
    </template>
    <template #middle>
      <AllPosts />
    </template>
    <template #right>
      <FakeAds />
    </template>
  </MainStructure>
</template>
