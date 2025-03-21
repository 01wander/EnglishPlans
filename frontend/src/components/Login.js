import React, { useState } from 'react';
import { login } from '../api/auth';
import styled from 'styled-components';

const LoginContainer = styled.div`
    max-width: 400px;
    margin: 50px auto;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    background-color: white;
`;

const Title = styled.h2`
    text-align: center;
    color: #333;
    margin-bottom: 20px;
`;

const Form = styled.form`
    display: flex;
    flex-direction: column;
    gap: 15px;
`;

const Input = styled.input`
    padding: 10px;
    border: 1px solid #ddd;
    border-radius: 4px;
    font-size: 16px;
`;

const Button = styled.button`
    padding: 12px;
    background-color: #4CAF50;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    font-size: 16px;
    
    &:hover {
        background-color: #45a049;
    }
`;

const ErrorMessage = styled.div`
    color: red;
    text-align: center;
    margin-top: 10px;
`;

const Login = ({ onLoginSuccess }) => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        try {
            const response = await login(username, password);
            console.log('登录成功:', response);
            if (onLoginSuccess) {
                onLoginSuccess(response.user);
            }
        } catch (error) {
            setError(error.message);
        }
    };

    return (
        <LoginContainer>
            <Title>登录</Title>
            <Form onSubmit={handleSubmit}>
                <Input
                    type="text"
                    placeholder="用户名"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                />
                <Input
                    type="password"
                    placeholder="密码"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <Button type="submit">登录</Button>
                {error && <ErrorMessage>{error}</ErrorMessage>}
            </Form>
        </LoginContainer>
    );
};

export default Login; 