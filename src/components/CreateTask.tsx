import { FC } from "react";
import { Form, Input, Modal } from "antd";

import { useCreateTask } from "../hooks/useCreateTask";
import { NewTaskRequest } from "../task-api";

interface Props {
  maxId: number;
  onCancel: () => void;
}

const CreateTask: FC<Props> = ({ maxId, onCancel }) => {
  const { mutate } = useCreateTask();

  const [form] = Form.useForm<NewTaskRequest>();

  const values = Form.useWatch([], form);

  const onSave = () => {
    const { name, content } = values;

    mutate({ id: maxId + 1, name, content });

    onCancel();
  };

  return (
    <Modal title="Create task" open onOk={onSave} onCancel={onCancel}>
      <Form form={form} layout="vertical">
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

export default CreateTask;
