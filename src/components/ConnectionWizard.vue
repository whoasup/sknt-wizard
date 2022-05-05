<script setup>
import { computed } from "@vue/reactivity";
import { onMounted } from "vue";
import { useWizardStore } from "../stores/wizard";
import ConnectionWizardStep from "./ConnectionWizardStep.vue";

const wizardStore = useWizardStore();

const steps = computed(() => wizardStore.steps);
const totalPrice = computed(() => wizardStore.totalPrice);

onMounted(() => {
  wizardStore.fetchSteps();
});
</script>

<template>
  <div class="wizard">
    <h2 class="wizard__title">Выберите опции</h2>
    <template v-for="step in steps" :key="step.title">
      <ConnectionWizardStep :title="step.title" :variants="step.variants" />
    </template>
    <p class="wizard__total">
      <span class="wizard__sum">Итого к оплате</span>
      <span>{{ totalPrice }} &#8381;</span>
    </p>
  </div>
</template>

<style lang="scss" scoped>
.wizard {
  &__title {
    margin: 0 0 8px;

    font-weight: 600;
    font-size: 30px;
    line-height: 34px;
  }

  &__total {
    display: flex;
    justify-content: space-between;
    padding: 8px 20px;

    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
    color: var(--c-basic-white);
    text-transform: uppercase;

    background-color: var(--c-basic-green);
    border-radius: 4px;
  }
}
</style>
