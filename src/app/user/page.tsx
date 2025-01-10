'use client';
import React from 'react';
import { useSearchParams } from 'next/navigation';

export default function UserPage() {
  const searchParams = useSearchParams();
  const username = searchParams.get('username');
  const phone = searchParams.get('phone');

  return (
    <main style={{ padding: '1rem' }}>
      <h2>欢迎 {username}</h2>
      <p>手机号：{phone}</p>

      <a href="/articles/list" style={{ display: 'inline-block', marginTop: '1rem' }}>
        查看所有文章
      </a>
    </main>
  );
} 