<script setup>
import { computed } from "@vue/reactivity";
import { useWizardStore } from "../stores/wizard";
import ConnectionStep from "./ConnectionStep.vue";

const wizardStore = useWizardStore();

const steps = computed(() => wizardStore.steps);
</script>

<template>
    <div>
        <h1>Wizard</h1>
        <template v-for="step in steps" :key="step.title">
            <ConnectionStep :title="step.title" :variants="step.variants" />
        </template>
    </div>
</template>

<style lang="scss" scoped></style>
