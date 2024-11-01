import { defineStore } from "pinia";
import type { LocationOut } from "~/lib/api/types/data-contracts";

export type ModalState = {
  item: boolean;
  location: boolean;
  label: boolean;
  locationInitialValues?: LocationOut;
};

export const useModalStore = defineStore("modals", {
  state: (): ModalState => ({
    item: false,
    location: false,
    label: false,
    locationInitialValues: undefined,
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
    openCreateLocationModal(form?: LocationOut) {
      this.location = true;
      this.locationInitialValues = form;
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
