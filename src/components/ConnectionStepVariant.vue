<script setup>
const props = defineProps({
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    color: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    options: {
        type: Array,
        required: true,
    },
    select: {
        type: Array,
        required: true,
    },
});
</script>

<template>
    <div class="wizard-variant">
        <h2 class="wizard-variant__title">{{ props.title }}</h2>
    </div>
</template>

<style lang="scss" scoped></style>
