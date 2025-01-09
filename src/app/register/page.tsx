'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const router = useRouter();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [phone, setPhone] = useState('');
  const [message, setMessage] = useState('');

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password, phone }),
      });
      if (res.ok) {
        setMessage('注册成功，正在跳转...');
        // 2秒后跳转回主页
        setTimeout(() => {
          router.push('/');
        }, 2000);
      } else {
        setMessage('注册失败，请检查输入或稍后重试。');
      }
    } catch (err) {
      console.error(err);
      setMessage('网络错误，请稍后重试。');
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h2>注册</h2>
      <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', maxWidth: 300 }}>
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

        <label>手机号</label>
        <input
          type="text"
          value={phone}
          onChange={(e) => setPhone(e.target.value)}
          required
        />

        <button type="submit" style={{ marginTop: '1rem' }}>注册</button>
      </form>
      {message && <p>{message}</p>}
    </main>
  );
} 