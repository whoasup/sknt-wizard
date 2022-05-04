<script setup>
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
        <h2 class="wizard-step__title">{{ props.title }}</h2>
    </div>
</template>

<style lang="scss" scoped>
.wizard-step {
    padding: 8px 0;

    border-top: 1px solid var(--c-dark-grey);
}
</style>
