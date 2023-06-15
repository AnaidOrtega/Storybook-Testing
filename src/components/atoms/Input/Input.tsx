import React, { FC } from "react";
import { Input as AntdInput, Typography, InputProps as AntdInputProps } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export interface InputProps extends AntdInputProps {
  label?: string;
  required?: boolean;
  error?: string;
}

export const Input: FC<InputProps> = ({ label, placeholder, id, error, onChange }) => (
  <div>
    {label && <Title level={3}>{label}</Title>}
    <AntdInput
      id={id}
      size="large"
      data-testid={id}
      onChange={onChange}
      prefix={<UserOutlined />}
      placeholder={placeholder}
      status={error ? "error" : ""}
    />
    {error && <Text type="danger">{error}</Text>}
  </div>
);
