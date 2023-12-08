import { FC, useState } from "react";
import { Button, Card, Flex, Layout, List, Typography } from "antd";
import { DeleteOutlined, EditOutlined, PlusOutlined } from "@ant-design/icons";

import { useGetTasks } from "./hooks/useGetTasks";
import { EditTask } from "./EditTask";
import { useDeleteTask } from "./hooks/useDeleteTask";
import { CreateTask } from "./CreateTask";
import { Task } from "./task-api";

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
            <Typography.Title level={2} className={styles["list-title"]}>
              Tasks{" "}
              <Button
                shape="circle"
                icon={<PlusOutlined />}
                onClick={() => setIsCreate(true)}
              />
            </Typography.Title>
            <List<Task>
              grid={{
                gutter: 16,
                xs: 1,
                sm: 2,
                md: 4,
                lg: 4,
                xl: 6,
                xxl: 3,
              }}
              dataSource={tasks}
              renderItem={({ name, content, id }) => (
                <List.Item>
                  <Card
                    title={
                      <div className={styles.title}>
                        <div className={styles.name}>{name}</div>
                        <div className={styles.buttons}>
                          <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<EditOutlined />}
                            onClick={() =>
                              setTask(
                                tasks?.find((task) => id === task.id) ?? null
                              )
                            }
                          />
                          <Button
                            type="primary"
                            shape="circle"
                            size="small"
                            icon={<DeleteOutlined />}
                            onClick={() => deleteTask(id)}
                          />
                        </div>
                      </div>
                    }
                  >
                    {content}
                  </Card>
                </List.Item>
              )}
            />
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
