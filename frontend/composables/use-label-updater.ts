import type { LabelCreate } from "~/lib/api/types/data-contracts";

export function useLabelUpdater() {
  const api = useUserApi();
  const toast = useNotifier();

  return {
    save: async (label: string) => {
      const form: LabelCreate = {
        name: label,
        description: "",
        color: "gray",
      };
      const { error, data } = await api.labels.create(form);
      if (error) {
        toast.error("Couldn't create label");
        return;
      }

      toast.success(`Label created" ${data.name}`);

      return data;
    },
  };
}
