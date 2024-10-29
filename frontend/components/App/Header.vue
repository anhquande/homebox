<template>
  <div class="flex flex-col items-center gap-4">
    <p>Welcome, {{ username }}</p>
    <NuxtLink class="avatar placeholder" to="/home">
      <div class="bg-base-300 text-neutral-content rounded-full w-24 p-4">
        <AppLogo />
      </div>
    </NuxtLink>
  </div>
</template>

<script lang="ts" setup>
  const authCtx = useAuthContext();
  const username = computed(() => authCtx.user?.name || "User");
</script>
