'use client';

import React, { useEffect, useState } from 'react';

export default function WordsPage() {
  const [words, setWords] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [newWord, setNewWord] = useState('');
  const [editWordId, setEditWordId] = useState<number | null>(null);
  const [editWordContent, setEditWordContent] = useState('');

  useEffect(() => {
    fetchWords();
  }, []);

  // 获取所有单词
  async function fetchWords() {
    try {
      const res = await fetch('http://localhost:3001/words');
      if (!res.ok) {
        throw new Error('获取单词列表失败');
      }
      const data = await res.json();
      setWords(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 添加新单词
  async function handleAddWord(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/words', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: newWord }),
      });
      if (!res.ok) {
        throw new Error('添加单词失败');
      }
      setNewWord('');
      fetchWords();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 删除单词
  async function handleDeleteWord(id: number) {
    try {
      const res = await fetch(`http://localhost:3001/words/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('删除单词失败');
      }
      fetchWords();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 进入编辑状态
  function handleEditWord(word: any) {
    setEditWordId(word.id);
    setEditWordContent(word.content);
  }

  // 更新单词
  async function handleUpdateWord(e: React.FormEvent) {
    e.preventDefault();
    if (editWordId == null) return;
    try {
      const res = await fetch(`http://localhost:3001/words/${editWordId}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ content: editWordContent }),
      });
      if (!res.ok) {
        throw new Error('更新单词失败');
      }
      setEditWordId(null);
      setEditWordContent('');
      fetchWords();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>单词管理</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 添加单词 */}
      <form onSubmit={handleAddWord} style={{ marginBottom: '1rem' }}>
        <input
          type="text"
          value={newWord}
          onChange={(e) => setNewWord(e.target.value)}
          placeholder="输入新单词"
          required
        />
        <button type="submit" style={{ marginLeft: '8px' }}>
          添加
        </button>
      </form>

      {/* 如果正在编辑，则显示编辑区域 */}
      {editWordId && (
        <form onSubmit={handleUpdateWord} style={{ marginBottom: '1rem' }}>
          <input
            type="text"
            value={editWordContent}
            onChange={(e) => setEditWordContent(e.target.value)}
            required
          />
          <button type="submit" style={{ marginLeft: '8px' }}>
            更新
          </button>
          <button
            type="button"
            style={{ marginLeft: '8px' }}
            onClick={() => {
              setEditWordId(null);
              setEditWordContent('');
            }}
          >
            取消
          </button>
        </form>
      )}

      {/* 显示单词列表 */}
      <table style={{ borderCollapse: 'collapse', width: '100%', maxWidth: 600 }}>
        <thead>
          <tr>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>ID</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>单词内容</th>
            <th style={{ borderBottom: '1px solid #ccc', padding: '8px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {words.map((word) => (
            <tr key={word.id}>
              <td style={{ padding: '8px' }}>{word.id}</td>
              <td style={{ padding: '8px' }}>{word.content}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => handleEditWord(word)}>编辑</button>
                <button
                  onClick={() => handleDeleteWord(word.id)}
                  style={{ marginLeft: '8px' }}
                >
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </main>
  );
} 