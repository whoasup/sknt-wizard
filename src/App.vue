<script setup>
import ConnectionWizard from "./components/ConnectionWizard.vue";
</script>

<template>
    <main>
        <ConnectionWizard></ConnectionWizard>
    </main>
</template>

<style lang="scss">
@import "./assets/base.scss";

#app {
    max-width: 1280px;
    margin: 0 auto;
    padding: 2rem;

    font-weight: 400;
}
</style>
