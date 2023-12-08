import { useQuery } from "@tanstack/react-query";

import { Task, TaskApi } from "../task-api";

export const useGetTasks = () =>
  useQuery<Task[]>({
    queryKey: ["tasks"],
    queryFn: async () => {
      return (await new TaskApi().tasksGet()).data;
    },
    refetchOnWindowFocus: false,
  });
