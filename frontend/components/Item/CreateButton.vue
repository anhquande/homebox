<template>
  <BaseFloatingButton
    label="Create a new Item"
    @click="
      modalStore.openCreateItemModal();
      console.log('222');
    "
  />
</template>

<script setup lang="ts">
  const modalStore = useModalStore();
</script>
