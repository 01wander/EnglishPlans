import React, { useState } from 'react';
import styled from 'styled-components';
import { Navigate } from 'react-router-dom';

const Container = styled.div`
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: white;
  border-radius: 8px;
  box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
`;

const Title = styled.h1`
  color: #333;
  margin-bottom: 30px;
`;

const Section = styled.section`
  margin-bottom: 30px;
`;

const SectionTitle = styled.h2`
  color: #666;
  font-size: 1.2rem;
  margin-bottom: 15px;
`;

const SettingItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
`;

const Label = styled.label`
  flex: 1;
  color: #333;
`;

const Input = styled.input`
  width: 200px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Select = styled.select`
  width: 200px;
  padding: 8px;
  border: 1px solid #ddd;
  border-radius: 4px;
`;

const Button = styled.button`
  background-color: #4CAF50;
  color: white;
  padding: 10px 20px;
  border: none;
  border-radius: 4px;
  cursor: pointer;
  font-size: 1rem;

  &:hover {
    background-color: #45a049;
  }
`;

const SettingsPage = ({ user }) => {
  const [settings, setSettings] = useState({
    volume: 80,
    speechRate: 1,
    autoPlay: true,
    language: 'zh',
    theme: 'light',
  });

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setSettings(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: 保存设置到后端
    console.log('保存设置:', settings);
  };

  if (!user) {
    return <Navigate to="/login" />;
  }

  return (
    <Container>
      <Title>设置</Title>
      <form onSubmit={handleSubmit}>
        <Section>
          <SectionTitle>音频设置</SectionTitle>
          <SettingItem>
            <Label>音量</Label>
            <Input
              type="range"
              name="volume"
              min="0"
              max="100"
              value={settings.volume}
              onChange={handleChange}
            />
            <span>{settings.volume}%</span>
          </SettingItem>
          <SettingItem>
            <Label>语速</Label>
            <Input
              type="range"
              name="speechRate"
              min="0.5"
              max="2"
              step="0.1"
              value={settings.speechRate}
              onChange={handleChange}
            />
            <span>{settings.speechRate}x</span>
          </SettingItem>
          <SettingItem>
            <Label>自动播放</Label>
            <Input
              type="checkbox"
              name="autoPlay"
              checked={settings.autoPlay}
              onChange={handleChange}
            />
          </SettingItem>
        </Section>

        <Section>
          <SectionTitle>界面设置</SectionTitle>
          <SettingItem>
            <Label>界面语言</Label>
            <Select
              name="language"
              value={settings.language}
              onChange={handleChange}
            >
              <option value="zh">中文</option>
              <option value="en">English</option>
            </Select>
          </SettingItem>
          <SettingItem>
            <Label>主题</Label>
            <Select
              name="theme"
              value={settings.theme}
              onChange={handleChange}
            >
              <option value="light">浅色</option>
              <option value="dark">深色</option>
            </Select>
          </SettingItem>
        </Section>

        <Button type="submit">保存设置</Button>
      </form>
    </Container>
  );
};

export default SettingsPage; 