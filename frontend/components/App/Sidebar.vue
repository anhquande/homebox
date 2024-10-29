<template>
  <div class="drawer-side shadow-lg">
    <label for="my-drawer-2" class="drawer-overlay"></label>

    <!-- Top Section -->
    <div class="w-60 py-5 md:py-10 bg-base-200 flex flex-grow-1 flex-col">
      <div class="space-y-8">
        <AppHeader />
        <div class="flex flex-col bg-base-200">
          <ul class="flex flex-col mx-auto gap-2 w-40 menu">
            <li v-for="n in nav" :key="n.id" class="text-xl" @click="unfocus">
              <NuxtLink
                v-if="n.to"
                class="rounded-btn"
                :to="n.to"
                :class="{
                  'bg-secondary text-secondary-content': n.active?.value,
                }"
              >
                <component :is="n.icon" class="h-6 w-6 mr-4" />
                {{ n.name }}
              </NuxtLink>
            </li>
          </ul>
        </div>
      </div>

      <!-- Bottom -->
      <AppLogoutButton />
    </div>
  </div>
</template>

<script lang="ts" setup>
  import { useLabelStore } from "~~/stores/labels";
  import { useLocationStore } from "~~/stores/locations";

  import MdiHome from "~icons/mdi/home";
  import MdiFileTree from "~icons/mdi/file-tree";
  import MdiMagnify from "~icons/mdi/magnify";
  import MdiAccount from "~icons/mdi/account";
  import MdiCog from "~icons/mdi/cog";

  // Preload currency format
  useFormatCurrency();

  const route = useRoute();

  const drawerToggle = ref();

  function unfocus() {
    // unfocus current element
    drawerToggle.value = false;
  }

  const nav = [
    {
      icon: MdiHome,
      active: computed(() => route.path === "/home"),
      id: 0,
      name: "Home",
      to: "/home",
    },
    {
      icon: MdiFileTree,
      id: 4,
      active: computed(() => route.path === "/locations"),
      name: "Locations",
      to: "/locations",
    },
    {
      icon: MdiMagnify,
      id: 3,
      active: computed(() => route.path === "/items"),
      name: "Search",
      to: "/items",
    },
    {
      icon: MdiAccount,
      id: 1,
      active: computed(() => route.path === "/profile"),
      name: "Profile",
      to: "/profile",
    },
    {
      icon: MdiCog,
      id: 6,
      active: computed(() => route.path === "/tools"),
      name: "Tools",
      to: "/tools",
    },
  ];

  const labelStore = useLabelStore();

  const locationStore = useLocationStore();

  onServerEvent(ServerEvent.LabelMutation, () => {
    labelStore.refresh();
  });

  onServerEvent(ServerEvent.LocationMutation, () => {
    locationStore.refreshChildren();
    locationStore.refreshParents();
    locationStore.refreshTree();
  });

  onServerEvent(ServerEvent.ItemMutation, () => {
    // item mutations can affect locations counts
    // so we need to refresh those as well
    locationStore.refreshChildren();
    locationStore.refreshParents();
  });
</script>
