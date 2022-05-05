<script setup>
import { computed, ref } from "@vue/reactivity";
import ConnectionWizardOption from "./ConnectionWizardOption.vue";
import ConnectionWizardSelect from "./ConnectionWizardSelect.vue";

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
  price_default: {
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
const selected = ref(false);
const descriptionList = computed(() => props.description.split("\n"));
const btnText = computed(() => (selected.value ? "Выбрано" : "Выбрать"));
const btnClass = computed(() => ({ active: selected.value }));

function submitHandler() {
  selected.value = !selected.value;
}
</script>

<template>
  <div class="wizard-variant">
    <div class="wizard-variant__header">
      <h2 class="wizard-variant__title">{{ props.title }}</h2>
      <p class="wizard-variant__price">{{ props.price_default }} &#8381;</p>
    </div>
    <div class="wizard-variant__wrapper">
      <div class="wizard-variant__info">
        <template v-for="text in descriptionList" :key="text">
          <p class="wizard-variant__description">{{ text }}</p>
        </template>
      </div>
      <div class="wizard-variant__options">
        <form @submit.prevent="submitHandler">
          <template v-if="props.options.length">
            <div class="wizard-variant__options">
              <template v-for="option in props.options" :key="option.title">
                <ConnectionWizardOption v-bind="option" />
              </template>
            </div>
          </template>

          <template v-if="props.select.length">
            <div class="wizard-variant__selects">
              <template v-for="select in props.select" :key="select.title">
                <ConnectionWizardSelect v-bind="select" />
              </template>
            </div>
          </template>

          <button class="wizard-variant__btn" :class="btnClass" type="submit">
            {{ btnText }}
          </button>
        </form>
      </div>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.wizard-variant {
  position: relative;
  background-color: var(--c-basic-grey);
  border-radius: 8px;
  padding: 20px 20px 20px 24px;
  overflow: hidden;

  &::before {
    display: block;
    position: absolute;
    content: "";
    left: 0;
    top: 0;
    bottom: 0;
    width: 4px;
    background-color: v-bind("props.color");
  }

  &__header {
    margin: 0 0 8px;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  &__title {
    font-weight: 600;
    font-size: 20px;
    line-height: 24px;
  }

  &__price {
    font-weight: 400;
    font-size: 20px;
    line-height: 24px;
  }

  &__wrapper {
    display: grid;
    grid-template-columns: 1fr 200px;
    column-gap: 20px;
  }

  &__info {
    display: grid;
    row-gap: 8px;
  }

  &__description {
    font-weight: 400;
    font-size: 16px;
    line-height: 20px;
  }

  &__options {
    display: flex;
  }

  form {
    width: 100%;
    display: flex;
    flex-direction: column;
  }

  &__btn {
    margin: auto 0 0;
    display: flex;
    background-color: var(--c-light-black);
    border: none;
    justify-content: center;
    align-items: center;
    padding: 10px;
    width: 100%;
    border-radius: 4px;
    color: var(--c-basic-white);
    cursor: pointer;
    opacity: 1;
    transition: opacity 300ms ease, background-color 300ms ease;

    @media (hover: hover), screen and (min-width: 0\0) {
      &:hover,
      &:focus {
        opacity: 0.7;
      }
    }

    &.active {
      background-color: var(--c-basic-green);
    }
  }
}
</style>
