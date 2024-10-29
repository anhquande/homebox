import { defineStore } from "pinia";

export type ModalState = {
  item: boolean;
  location: boolean;
  label: boolean;
};

export const useModalStore = defineStore("modals", {
  state: (): ModalState => ({
    item: false,
    location: false,
    label: false,
  }),
  getters: {
    modals(state): ModalState {
      return state;
    },
  },
  actions: {
    openCreateItemModal() {
      this.item = true;
    },
    closeCreateItemModal() {
      this.item = false;
    },
    openCreateLocationModal() {
      this.location = true;
    },
    closeCreateLocationModal() {
      this.location = false;
    },
    openCreateLabelModal() {
      this.label = true;
    },
    closeCreateLabelModal() {
      this.label = false;
    },
  },
});
