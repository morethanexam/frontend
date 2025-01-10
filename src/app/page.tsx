'use client';
import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';
import styles from "./page.module.css";

export default function HomePage() {
  const router = useRouter();
  const [loginPhone, setLoginPhone] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [loginMessage, setLoginMessage] = useState('');

  async function handleLogin() {
    try {
      const res = await fetch('http://localhost:3001/users');
      if (!res.ok) {
        throw new Error('无法从服务器获取用户数据');
      }
      const users = await res.json();
      const foundUser = users.find(
        (user: any) => user.phone === loginPhone && user.password === loginPassword
      );
      if (foundUser) {
        setLoginMessage('登录成功！');
        router.push(`/user?username=${foundUser.username}&phone=${foundUser.phone}`);
      } else {
        setLoginMessage('手机号或密码错误');
      }
    } catch (error) {
      console.error(error);
      setLoginMessage('网络错误，请稍后重试。');
    }
  }

  return (
    <main
      style={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '100vh',
        fontFamily: 'sans-serif',
      }}
    >
      <h1 style={{ fontSize: '48px', marginBottom: '32px' }}>Passexam</h1>
      
      <div style={{ display: 'flex', flexDirection: 'column', gap: '16px', width: '220px' }}>
        <input
          type="text"
          placeholder="请输入手机号"
          value={loginPhone}
          onChange={(e) => setLoginPhone(e.target.value)}
        />
        <input
          type="password"
          placeholder="请输入密码"
          value={loginPassword}
          onChange={(e) => setLoginPassword(e.target.value)}
        />
      </div>
      
      <button
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
        onClick={handleLogin}
      >
        登录
      </button>
      
      {loginMessage && <p>{loginMessage}</p>}
      
      <Link href="/register" style={{ marginTop: '12px' }}>
        注册
      </Link>

      <Link href="/admin" style={{ marginTop: '12px' }}>
        管理页面
      </Link>

      <Link href="/articles" style={{ marginTop: '12px' }}>
        文章管理
      </Link>
    </main>
  );
}
