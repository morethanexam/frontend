'use client';

import React, { useState } from 'react';

export default function LoginPage() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');

  async function handleLogin(e: React.FormEvent) {
    e.preventDefault();
    try {
      // 简单示例：获取所有用户再对比用户名密码。实际项目中应使用专用接口进行登录验证！
      const res = await fetch('http://localhost:3001/users');
      if (!res.ok) {
        throw new Error('无法从服务器获取用户数据');
      }
      const users = await res.json();
      const foundUser = users.find(
        (user: any) => user.username === username && user.password === password
      );
      if (foundUser) {
        setMessage('登录成功！');
        // 可以自行保存 token 或跳转到其他页面
      } else {
        setMessage('用户名或密码错误');
      }
    } catch (err) {
      console.error(err);
      setMessage('网络错误，请稍后重试。');
    }
  }

  return (
    <div style={{ padding: '1rem' }}>
      <h2>登录</h2>
      <form onSubmit={handleLogin} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
        <label>用户名</label>
        <input
          type="text"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />

        <label>密码</label>
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: '1rem' }}>登录</button>
      </form>
      {message && <p>{message}</p>}
    </div>
  );
} 