import React, { FC, useState } from "react";
import { Input } from "../../atoms";
import { Alert, Button, Typography } from "antd";

const { Title } = Typography

export interface FormInputProps {
    [key: string]: string;
}

export interface LoginFormProps {
    onSubmit?: (values: FormInputProps) => void;
    title?: string;
}

export const LoginForm: FC<LoginFormProps> = ({ onSubmit, title }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);


    const validateFields = (values: FormInputProps) => {
        const v: boolean[] = [];
        for (const i in values) {
            v.push(values[i] !== '');
        }
        return v.every((item) => item)
    }

    const submitValues = () => {
        setIsSubmitted(true)
        const isValid = validateFields({ email, password })
        if (isValid) {
            if (onSubmit) onSubmit({ email, password });
            setIsSuccess(true)
        } else {
            setIsSuccess(false)
        }
    };

    return (
        <div data-testid="form-test">
            {title && <Title>{title}</Title>}
            <Input
                id="email"
                label="Email"
                style={{ marginBottom: 10 }}
                placeholder="exmaple@mail.com"
                onChange={(e) => setEmail(e.target.value)}
                error={isSubmitted && email === '' ? 'Email Required' : undefined}
            />
            <Input
                id="password"
                type="password"
                name="Password"
                label="Password"
                placeholder="password"
                style={{ marginBottom: 10 }}
                onChange={(e) => setPassword(e.target.value)}
                error={isSubmitted && email === '' ? 'Password Required' : undefined}
            />
            <Button type='primary' data-testId='submit' onClick={submitValues} block style={{ background: '#70a6af', margin: '20px 0' }}>
                SUBMIT
            </Button>
            {isSubmitted && <Alert message={isSuccess ? "Login Successful" : 'Login Failed'} type={isSuccess ? "success" : 'error'} />}
        </div>
    );
};

