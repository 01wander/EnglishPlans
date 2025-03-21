import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import styled from 'styled-components';
import { theme } from '../styles/theme';
import { login, register } from '../api/auth';

const Overlay = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  background: rgba(0, 0, 0, 0.5);
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 1000;
`;

const Modal = styled.div`
  background: white;
  padding: 30px;
  border-radius: 15px;
  width: 90%;
  max-width: 400px;
  position: relative;
  box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
`;

const CloseButton = styled.button`
  position: absolute;
  top: 10px;
  right: 10px;
  background: none;
  border: none;
  font-size: 20px;
  cursor: pointer;
  color: ${theme.colors.text};
  
  &:hover {
    color: ${theme.colors.primary};
  }
`;

const Title = styled.h2`
  color: ${theme.colors.primary};
  margin-bottom: 20px;
  text-align: center;
`;

const Form = styled.form`
  display: flex;
  flex-direction: column;
  gap: 15px;
`;

const FormGroup = styled.div`
  display: flex;
  flex-direction: column;
  gap: 5px;
`;

const Label = styled.label`
  color: ${theme.colors.text};
  font-size: 14px;
`;

const Input = styled.input`
  padding: 8px 12px;
  border: 1px solid ${theme.colors.border};
  border-radius: 8px;
  font-size: 14px;
  
  &:focus {
    outline: none;
    border-color: ${theme.colors.primary};
  }
`;

const Button = styled.button`
  background: ${theme.colors.primary};
  color: white;
  border: none;
  border-radius: 8px;
  padding: 10px;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.3s;
  
  &:hover {
    background: ${theme.colors.primaryDark};
  }
  
  &:disabled {
    background: ${theme.colors.border};
    cursor: not-allowed;
  }
`;

const SwitchButton = styled.button`
  background: none;
  border: none;
  color: ${theme.colors.primary};
  text-decoration: underline;
  cursor: pointer;
  margin-top: 10px;
  
  &:hover {
    color: ${theme.colors.primaryDark};
  }
`;

const ErrorMessage = styled.div`
  color: red;
  font-size: 14px;
  margin-top: 10px;
`;

const LoginModal = ({ onClose, onLogin }) => {
  const [isRegistering, setIsRegistering] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setIsLoading(true);

    try {
      if (!formData.username || !formData.password) {
        setError('请填写所有必填字段');
        return;
      }

      let response;
      if (isRegistering) {
        if (formData.password !== formData.confirmPassword) {
          setError('两次输入的密码不一致');
          return;
        }
        response = await register(formData.username, formData.password, formData.confirmPassword);
      } else {
        response = await login(formData.username, formData.password);
      }

      if (response.user) {
        await onLogin(response.user);
        onClose();
        navigate('/');
      } else {
        setError(response.error || '登录失败，请重试');
      }
    } catch (error) {
      console.error('登录/注册错误:', error);
      setError(error.message || '操作失败，请重试');
    } finally {
      setIsLoading(false);
    }
  };

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  return (
    <Overlay onClick={onClose}>
      <Modal onClick={e => e.stopPropagation()}>
        <CloseButton onClick={onClose}>×</CloseButton>
        <Title>{isRegistering ? '注册' : '登录'}</Title>
        <Form onSubmit={handleSubmit}>
          <FormGroup>
            <Label>用户名</Label>
            <Input
              type="text"
              name="username"
              value={formData.username}
              onChange={handleChange}
              placeholder="请输入用户名"
              disabled={isLoading}
            />
          </FormGroup>
          <FormGroup>
            <Label>密码</Label>
            <Input
              type="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder="请输入密码"
              disabled={isLoading}
            />
          </FormGroup>
          {isRegistering && (
            <FormGroup>
              <Label>确认密码</Label>
              <Input
                type="password"
                name="confirmPassword"
                value={formData.confirmPassword}
                onChange={handleChange}
                placeholder="请再次输入密码"
                disabled={isLoading}
              />
            </FormGroup>
          )}
          {error && <ErrorMessage>{error}</ErrorMessage>}
          <Button type="submit" disabled={isLoading}>
            {isLoading ? '处理中...' : (isRegistering ? '注册' : '登录')}
          </Button>
        </Form>
        <SwitchButton
          type="button"
          onClick={() => {
            setIsRegistering(!isRegistering);
            setError('');
            setFormData({
              username: '',
              password: '',
              confirmPassword: ''
            });
          }}
          disabled={isLoading}
        >
          {isRegistering ? '已有账号？点击登录' : '没有账号？点击注册'}
        </SwitchButton>
      </Modal>
    </Overlay>
  );
};

export default LoginModal; 