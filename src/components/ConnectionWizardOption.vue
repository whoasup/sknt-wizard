<script setup>
const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="wizard-option"></div>
</template>

<style lang="scss" scoped></style>
