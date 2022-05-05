<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  title: {
    type: String,
    required: true,
  },
  items: {
    type: Array,
    required: true,
  },
  disabled: Boolean,
  modelValue: Number,
});

const emit = defineEmits(["update:modelValue"]);

const value = computed({
  get() {
    return props.modelValue;
  },
  set(value) {
    emit("update:modelValue", value);
  },
});

const classObject = computed(() => ({
  disabled: props.disabled,
}));
</script>

<template>
  <label class="wizard-select" :class="classObject">
    <span class="wizard-select__label">
      {{ props.title }}
    </span>

    <select required v-model="value">
      <template v-for="option in props.items" :key="option.title">
        <option :value="option.price">{{ option.title }}</option>
      </template>
    </select>
  </label>
</template>

<style lang="scss" scoped>
.wizard-select {
  display: flex;
  flex-direction: column;

  &.disabled {
    opacity: 0.7;

    pointer-events: none;
  }

  &__label {
    margin: 0 0 8px;
  }

  select {
    width: 100%;
    padding: 8px;

    border: 2px solid var(--c-dark-grey);
    border-radius: 4px;
  }
}
</style>
