import { Button, Typography } from "antd";
import { FC } from "react";
import { PlusOutlined } from "@ant-design/icons";

import styles from "./Title.module.scss";

interface Props {
  onClick: () => void;
}

const Title: FC<Props> = ({ onClick }) => (
  <Typography.Title level={2} className={styles["list-title"]}>
    Tasks <Button shape="circle" icon={<PlusOutlined />} onClick={onClick} />
  </Typography.Title>
);

export default Title;
