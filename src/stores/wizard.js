import { defineStore } from "pinia";

export const useWizardStore = defineStore({
    id: "wizard",
    state: () => ({
        steps: [],
        activeSteps: new Map(),
    }),
    getters: {
        totalPrice: (state) => {
            let price = 0;
            state.activeSteps.forEach((step) => {
                price += step;
            });

            return price;
        },
    },
    actions: {
        async fetchSteps() {
            try {
                const response = await fetch("/data/steps.json");
                const steps = await response.json();
                this.steps = steps;
            } catch (error) {
                alert(error);
                console.log(error);
            }
        },

        addPrice(title, price) {
            this.activeSteps.set(title, price);
        },
        deletePrice(title) {
            this.activeSteps.delete(title);
        },
    },
});
