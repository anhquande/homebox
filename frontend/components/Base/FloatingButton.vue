<template>
  <div class="floating-button" :title="props.label">
    <button @click="handleClick">+</button>
  </div>
</template>

<script setup lang="ts">
  const emit = defineEmits(["click"]);
  const props = defineProps({
    label: {
      type: String,
      required: true,
    },
  });

  function handleClick() {
    console.log("[BaseFloatingButton] clicked label = ", props.label);
    emit("click");
  }
</script>

<style scoped>
  .floating-button {
    position: fixed;
    bottom: 20px;
    right: 20px;
    width: 56px;
    height: 56px;
    background-color: #a4375b;
    color: white;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.3);
    cursor: pointer;
    font-size: 24px;
  }
</style>
