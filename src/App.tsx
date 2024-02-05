import { FC, useState } from "react";
import { Flex, Layout, Typography } from "antd";

import { useGetTasks } from "./hooks/useGetTasks";
import { EditTask } from "./components/EditTask";
import { useDeleteTask } from "./hooks/useDeleteTask";
import { CreateTask } from "./components/CreateTask";
import { Task } from "./task-api";
import Title from "./components/Title";
import TaskList from "./components/TaskList";

import styles from "./App.module.scss";

const App: FC = () => {
  const { data: tasks } = useGetTasks();
  const { mutate: deleteTask } = useDeleteTask();

  const [task, setTask] = useState<Task | null>(null);
  const [isCreate, setIsCreate] = useState(false);

  return (
    <Flex gap="middle" wrap="wrap">
      <Layout>
        <Layout.Header className={styles.header}>
          <Typography.Title>Open API: test</Typography.Title>
        </Layout.Header>
        <Layout.Content className={styles.content}>
          <div className={styles.list}>
            <Title onClick={() => setIsCreate(true)} />
            <TaskList tasks={tasks} deleteTask={deleteTask} setTask={setTask} />
          </div>
          {task !== null && (
            <EditTask task={task} onCancel={() => setTask(null)} />
          )}
          {isCreate && (
            <CreateTask
              onCancel={() => setIsCreate(false)}
              maxId={Math.max(...(tasks ?? []).map(({ id }) => id ?? 0))}
            />
          )}
        </Layout.Content>
      </Layout>
    </Flex>
  );
};

export { App };
