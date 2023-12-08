import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { TaskApi } from "../task-api";

export const useDeleteTask = () => {
  const queryClient = useQueryClient();

  return useMutation<void, AxiosError, number | undefined>({
    mutationFn: async (id) =>
      id !== undefined
        ? (await new TaskApi().tasksIdDelete(id)).data
        : undefined,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
