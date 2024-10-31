<script setup lang="ts">
  import { useLabelStore } from "~~/stores/labels";

  definePageMeta({
    middleware: ["auth"],
  });
  useHead({
    title: "Homebox | Labels",
  });

  const labelsStore = useLabelStore();
  const labels = computed(() => labelsStore.labels);
  console.log(labels);
</script>

<template>
  <div>
    <BaseContainer class="flex flex-col gap-12 pb-16">
      <section>
        <Subtitle> Labels ({{ labels.length }})</Subtitle>
        <div class="flex gap-4 flex-wrap">
          <LabelChip v-for="label in labels" :key="label.id" size="lg" :label="label" class="shadow-md" />
        </div>
      </section>
    </BaseContainer>
  </div>
</template>
