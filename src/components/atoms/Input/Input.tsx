import React, { ChangeEvent, FC, useState } from "react";
import { Input as AntdInput, Typography, InputProps as AntdInputProps } from "antd";
import { UserOutlined } from "@ant-design/icons";

const { Title, Text } = Typography;

export interface InputProps extends AntdInputProps {
  label?: string;
  required?: boolean;
}

export const Input: FC<InputProps> = ({ label, placeholder, id, required }) => {
  const [value, setValue] = useState("");
  const [error, setError] = useState<string | undefined>(undefined);

  const handleBlur = () => {
    if (required) {
      if (value === "") {
        setError("This field is required");
      } else {
        setError(undefined);
      }
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setValue(e.target.value);
  };

  return (
    <div>
      {label && <Title level={3}>{label}</Title>}
      <AntdInput
        id={id}
        size="large"
        value={value}
        data-testid={id}
        onBlur={handleBlur}
        onChange={handleChange}
        prefix={<UserOutlined />}
        placeholder={placeholder}
        status={error ? "error" : ""}
      />
      {error && <Text type="danger">{error}</Text>}
    </div>
  );
};
