<template>
  <v-autocomplete
    v-model="value"
    v-model:search="search"
    :disabled="isUpdating"
    :items="items"
    :allow-new="true"
    auto-select-first
    color="blue-grey-lighten-2"
    :label="props.label"
    chips
    closable-chips
    return-object
    multiple
    :custom-filter="customFilter"
    @keydown.enter="handleEnter"
  >
    <template #chip="{ props, item }">
      <v-chip v-bind="props" :text="item.raw.name"></v-chip>
    </template>

    <template #item="{ props, item }">
      <v-list-item v-bind="props" :subtitle="item.raw.description" :title="item.raw.name"></v-list-item>
    </template>

    <template #no-data>
      <v-list-item>
        <v-list-item-title v-if="search">
          No results matching "<strong>{{ search }}</strong
          >". Press <kbd>enter</kbd> to create a new one
        </v-list-item-title>
        <v-list-item-title v-else
          >Input your own value and press <kbd>enter</kbd> to create a new one
        </v-list-item-title>
      </v-list-item>
    </template>
  </v-autocomplete>
</template>

<script lang="ts" setup>
  import type { LabelOut } from "~~/lib/api/types/data-contracts";
  const updater = useLabelUpdater();
  const emit = defineEmits(["update:modelValue"]);

  const props = defineProps({
    label: {
      type: String,
      default: "",
    },
    modelValue: {
      type: Array as () => any[],
      default: null,
    },
    items: {
      type: Array as () => any[],
      required: true,
    },
    name: {
      type: String,
      default: "name",
    },
  });

  function customFilter(value: any, queryText: any, item?: { value: { name: string; description: string } }): boolean {
    console.log("customFilter", { value, queryText, item });
    const textOne = item?.value.name.toLowerCase() || "";
    const textTwo = item?.value.description.toLowerCase() || "";
    const searchText = queryText.toLowerCase();
    return textOne.includes(searchText) || textTwo.includes(searchText);
  }

  async function handleEnter(): Promise<void> {
    // Check if the item is already in the list
    if (!props.items.includes(search.value)) {
      // Add the item after the async operation completes
      console.log("Adding item", search.value);
      const updatedLabel = await updater.save(search.value);
      console.log("Updated label", updatedLabel);
      emit("update:modelValue", [...props.modelValue, updatedLabel]);
    }
    search.value = "";
  }

  const value = useVModel(props, "modelValue", emit);

  const search = ref("");

  const isUpdating = ref(false);
</script>
