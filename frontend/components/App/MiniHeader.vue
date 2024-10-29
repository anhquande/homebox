<template>
  <div class="navbar z-[99] lg:hidden top-0 fixed bg-primary shadow-md drawer-button">
    <label for="my-drawer-2" class="btn btn-square btn-ghost text-base-100 drawer-button lg:hidden">
      <MdiMenu class="h-6 w-6" />
    </label>
    <NuxtLink to="/home">
      <h2 class="text-3xl font-bold tracking-tight text-base-100 flex">
        HomeB
        <AppLogo class="w-8 -mb-3" />
        x
      </h2>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  import MdiMenu from "~icons/mdi/menu";
</script>
