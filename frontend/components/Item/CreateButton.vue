<template>
  <BaseFloatingButton label="Create a new Item" @click="handleClick" />
</template>

<script setup lang="ts">
  const modalStore = useModalStore();
  const route = useRoute();

  function handleClick() {
    const currentPath = route.path;
    console.log("[ItemCreateButton] clicked ", { currentPath });

    if (currentPath.startsWith("/location")) {
      openLocationModal();
    } else if (currentPath === "/labels") {
      modalStore.openCreateLabelModal();
    } else {
      modalStore.openCreateItemModal();
    }
  }

  async function openLocationModal() {
    const route = useRoute();
    const api = useUserApi();

    const locationId = route.params.id as string;

    let initForm: LocationOut | undefined;
    if (locationId) {
      const { data, error } = await api.locations.get(locationId);
      if (error) {
        console.error("Failed to load location", { locationId });
        return;
      }
      initForm = {
        name: `Child of ${data.name}`,
        description: `Located in ${data.name}`,
        parent: data,
      };
    }
    console.log("*** openCreateLocationModal", { initForm });
    modalStore.openCreateLocationModal(initForm);
  }
</script>
