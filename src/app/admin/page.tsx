'use client';

import React, { useEffect, useState } from 'react';

export default function AdminPage() {
  const [users, setUsers] = useState<any[]>([]);
  const [error, setError] = useState('');

  // 初始化时获取所有用户
  useEffect(() => {
    fetchUsers();
  }, []);

  async function fetchUsers() {
    try {
      const res = await fetch('http://localhost:3001/users'); 
      if (!res.ok) {
        throw new Error('获取用户列表失败');
      }
      const data = await res.json();
      setUsers(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  async function handleDelete(userId: number) {
    try {
      const res = await fetch(`http://localhost:3001/users/${userId}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('删除用户失败');
      }
      // 删除成功后再重新获取用户列表，以刷新显示
      await fetchUsers();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>管理用户</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 列表显示所有用户 */}
      <table style={{ borderCollapse: 'collapse', marginTop: '1rem' }}>
        <thead>
          <tr style={{ borderBottom: '1px solid #ccc' }}>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>用户名</th>
            <th style={{ padding: '8px' }}>密码</th>
            <th style={{ padding: '8px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {users.map((user) => (
            <tr key={user.id} style={{ borderBottom: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{user.id}</td>
              <td style={{ padding: '8px' }}>{user.username}</td>
              <td style={{ padding: '8px' }}>{user.password}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => handleDelete(user.id)}>删除</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 