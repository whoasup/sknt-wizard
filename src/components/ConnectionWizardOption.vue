<script setup>
import { computed } from "@vue/reactivity";

const props = defineProps({
  price: {
    type: Number,
    required: true,
  },
  title: {
    type: String,
    required: true,
  },
  disabled: Boolean,
  modelValue: Boolean,
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
  <div>
    <label class="wizard-option" :class="classObject">
      <input type="checkbox" v-model="value" />
      <span class="wizard-option__label">
        {{ props.title }}
      </span>
    </label>
  </div>
</template>

<style lang="scss" scoped>
.wizard-option {
  display: flex;
  align-items: center;
  padding: 8px;

  background-color: var(--c-basic-white);
  border: 2px solid var(--c-dark-grey);
  border-radius: 4px;
  cursor: pointer;
  opacity: 1;

  transition: opacity 300ms ease;

  &.disabled {
    opacity: 0.7;

    pointer-events: none;
  }

  &__label {
    flex-grow: 1;

    text-align: center;
  }
}
</style>
