import { AxiosError } from "axios";
import { useMutation, useQueryClient } from "@tanstack/react-query";

import { NewTaskRequest, TaskApi, Task } from "../task-api";

export const useCreateTask = () => {
  const queryClient = useQueryClient();

  return useMutation<Task, AxiosError, NewTaskRequest>({
    mutationFn: async (task) => (await new TaskApi().tasksPost(task)).data,
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ["tasks"] }),
  });
};
