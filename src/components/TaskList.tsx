import { Button, Card, List } from "antd";
import { Dispatch, FC, SetStateAction } from "react";
import { DeleteOutlined, EditOutlined } from "@ant-design/icons";
import { UseMutateFunction } from "@tanstack/react-query";
import { AxiosError } from "axios";

import { Task } from "../task-api";

import styles from "./TaskList.module.scss";

interface Props {
  tasks: Task[] | undefined;

  setTask: Dispatch<SetStateAction<Task | null>>;
  deleteTask: UseMutateFunction<
    void,
    AxiosError<unknown, any>,
    number | undefined,
    unknown
  >;
}

const TaskList: FC<Props> = ({ tasks, setTask, deleteTask }) => {
  return (
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
                      setTask(tasks?.find((task) => id === task.id) ?? null)
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
  );
};

export default TaskList;
