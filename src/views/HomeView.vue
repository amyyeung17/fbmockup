<script setup>
import FakeAds from "@/components/other/FakeAds.vue";
import Menus from "@/components/other/Menu.vue";
import Post from "@/components/post/Post.vue";
import MainStructure from "@/components/reusable/MainStructure.vue";
</script>

<template>
  <main>
    <MainStructure>
      <template #left>
        <Menus />
      </template>
      <template #middle>
        <Post />
      </template>
      <template #right>
        <FakeAds />
      </template>
    </MainStructure>
  </main>
</template>
