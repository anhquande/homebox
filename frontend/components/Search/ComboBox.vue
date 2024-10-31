<template>
  <div class="pt-4 px-4 shadow-sm mb-1">
    <input v-model="search" type="text" placeholder="Search…" class="input input-sm input-bordered w-full mb-2" />
  </div>
  <div class="overflow-y-auto max-h-72 divide-y">
    <label v-for="v in selectedView" :key="v" class="cursor-pointer px-4 label flex justify-between hover:bg-base-200">
      <span class="label-text mr-2">
        <slot name="display" v-bind="{ item: v }">
          {{ v[display] }}
        </slot>
      </span>
      <input v-model="selected" type="checkbox" :value="v" class="checkbox checkbox-sm checkbox-primary" />
    </label>
    <label
      v-if="selectedView.length === 0"
      class="cursor-pointer px-4 label flex justify-between hover:bg-base-200"
      @click="handleCreateNew(search)"
    >
      <span class="label-text mr-2">
        <slot name="display" v-bind="{ item: search }"> Create new label "{{ search }}" </slot>
      </span>
    </label>
  </div>
</template>

<script setup lang="ts">
  type Props = {
    label: string;
    options: any[];
    display?: string;
    modelValue: any[];
  };

  const search = ref("");
  const searchFold = computed(() => search.value.toLowerCase());

  const emit = defineEmits(["update:modelValue"]);
  const props = withDefaults(defineProps<Props>(), {
    label: "",
    display: "name",
    modelValue: () => [],
  });

  const selectedView = computed(() => {
    return selected.value.filter(o => {
      if (searchFold.value.length > 0) {
        return o[props.display].toLowerCase().includes(searchFold.value);
      }
      return true;
    });
  });

  const selected = useVModel(props, "modelValue", emit);

  function handleCreateNew(search: string) {
    selected.value = [...selected.value, { id: search, name: search }];
    search = "";
  }
</script>
