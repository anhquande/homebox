<template>
  <v-btn icon="mdi-arrow-left" variant="text" title="Back" @click="goBack"> </v-btn>
</template>
<script setup lang="ts">
  import { useRouter } from "vue-router";

  const router = useRouter();

  function goBack() {
    router.go(-1);
  }
</script>
