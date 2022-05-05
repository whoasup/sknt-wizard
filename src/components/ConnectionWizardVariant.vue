<script setup>
import { computed, ref, reactive } from "@vue/reactivity";
import { useWizardStore } from "../stores/wizard";
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

const options = reactive(
  props.options.map((opt) => {
    return {
      ...opt,
      active: false,
    };
  })
);

const selects = reactive(
  props.select.map((sel) => {
    return {
      ...sel,
      value: 0,
    };
  })
);

const optionsPrice = computed(() => {
  let price = 0;
  options.forEach((option) => {
    option.active ? (price += option.price) : price;
  });

  return price;
});

const selectsPrice = computed(() => {
  let price = 0;
  selects.forEach((select) => {
    price += select.value;
  });

  return price;
});

const totalPrice = computed(
  () => props.price_default + optionsPrice.value + selectsPrice.value
);

const descriptionList = computed(() => props.description.split("\n"));
const btnText = computed(() => (selected.value ? "Выбрано" : "Выбрать"));
const btnClass = computed(() => ({ active: selected.value }));

const wizardStore = useWizardStore();

function submitHandler() {
  selected.value = !selected.value;
  selected.value
    ? wizardStore.addPrice(props.title, totalPrice.value)
    : wizardStore.deletePrice(props.title);
}
</script>

<template>
  <div class="wizard-variant">
    <div class="wizard-variant__header">
      <h2 class="wizard-variant__title">{{ props.title }}</h2>
      <p class="wizard-variant__price">{{ totalPrice }} &#8381;</p>
    </div>
    <div class="wizard-variant__wrapper">
      <div class="wizard-variant__info">
        <template v-for="text in descriptionList" :key="text">
          <p class="wizard-variant__description">{{ text }}</p>
        </template>
      </div>
      <div class="wizard-variant__form">
        <form @submit.prevent="submitHandler">
          <!-- options -->
          <template v-if="options.length">
            <div class="wizard-variant__options">
              <template v-for="option in options" :key="option.title">
                <ConnectionWizardOption
                  v-bind="option"
                  v-model="option.active"
                  :disabled="selected"
                />
              </template>
            </div>
          </template>
          <!-- selects -->
          <template v-if="selects">
            <div class="wizard-variant__selects">
              <template v-for="select in selects" :key="select.title">
                <ConnectionWizardSelect
                  v-bind="select"
                  v-model="select.value"
                  :disabled="selected"
                />
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

  padding: 20px 20px 20px 24px;
  overflow: hidden;

  background-color: var(--c-basic-grey);
  border-radius: 8px;

  &::before {
    content: "";
    position: absolute;
    top: 0;
    bottom: 0;
    left: 0;

    display: block;
    width: 4px;

    background-color: v-bind("props.color");
  }

  &__header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin: 0 0 8px;
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

    column-gap: 20px;

    grid-template-columns: 1fr 200px;
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

  &__options,
  &__selects {
    display: grid;
    margin: 0 0 8px;

    row-gap: 8px;
  }

  &__form {
    display: flex;
  }

  form {
    display: flex;
    flex-direction: column;
    width: 100%;
  }

  &__btn {
    display: flex;
    justify-content: center;
    align-items: center;
    width: 100%;
    margin: auto 0 0;
    padding: 10px;

    color: var(--c-basic-white);

    background-color: var(--c-light-black);
    border: none;
    border-radius: 4px;
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
