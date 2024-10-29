<template>
  <button class="mt-auto mx-2 hover:bg-base-300 p-3 rounded-btn" @click="logout">Sign Out</button>
</template>

<script lang="ts" setup>
  const authCtx = useAuthContext();
  const api = useUserApi();

  async function logout() {
    await authCtx.logout(api);
    navigateTo("/");
  }
</script>
