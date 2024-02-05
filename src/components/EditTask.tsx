import { FC } from "react";
import { Form, Input, Modal } from "antd";

import { useEditTask } from "../hooks/useEditTask";
import { EditTaskRequest, Task } from "../task-api";

interface Props {
  task: Task;
  onCancel: () => void;
}

const EditTask: FC<Props> = ({ task, onCancel }) => {
  const { mutate } = useEditTask();

  const [form] = Form.useForm<EditTaskRequest>();

  const values = Form.useWatch([], form);

  const onSave = () => {
    const { name, content } = values;

    mutate({ id: task.id, name, content });

    onCancel();
  };

  return (
    <Modal title="Edit task" open onOk={onSave} onCancel={onCancel}>
      <Form form={form} layout="vertical" initialValues={task}>
        <Form.Item name="name" label="Name">
          <Input />
        </Form.Item>
        <Form.Item name="content" label="Content">
          <Input.TextArea autoSize={{ minRows: 2, maxRows: 6 }} />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export { EditTask };
