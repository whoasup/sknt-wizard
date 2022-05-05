<script setup>
import ConnectionWizardVariant from "./ConnectionWizardVariant.vue";
const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  variants: {
    type: Array,
    required: true,
  },
});
</script>

<template>
  <div class="wizard-step">
    <h2 class="wizard-step__title">{{ props.title }}:</h2>
    <ul class="wizard-step__variants">
      <template v-for="variant in props.variants" :key="variant.title">
        <ConnectionWizardVariant v-bind="{ ...variant }" />
      </template>
    </ul>
  </div>
</template>

<style lang="scss" scoped>
.wizard-step {
  padding: 8px 0;

  border-top: 1px solid var(--c-dark-grey);

  &__title {
    margin: 0 0 16px;

    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  &__variants {
    display: flex;
    flex-direction: column;
    margin: 0;
    padding: 0;

    list-style: none;

    gap: 16px;
  }
}
</style>
