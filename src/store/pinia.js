import { createPinia } from "pinia";
import { useCatsStore } from "./modules/cats";

export const pinia = createPinia();

// Load saved state on store creation
pinia.use(() => {
  useCatsStore().restoreState();
});
