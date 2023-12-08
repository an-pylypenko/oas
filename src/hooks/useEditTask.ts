import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { Task, TaskApi } from "../task-api";

export const useEditTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task | undefined, AxiosError, Task>({
    mutationFn: async (task) =>
      task.id !== undefined
        ? (await new TaskApi().tasksIdPut(task.id, task satisfies Task)).data
        : undefined,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
