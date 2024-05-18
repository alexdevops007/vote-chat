import { pinia } from "./pinia";
import { useCatsStore } from "./modules/cats";

export const store = pinia;

export const setupStore = () => {
  pinia.use(() => ({
    cats: useCatsStore(),
  }));
};
