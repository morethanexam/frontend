'use client';

import React, { useState, useEffect } from 'react';

export default function ArticlesPage() {
  const [title, setTitle] = useState('');
  const [type, setType] = useState('');
  const [content, setContent] = useState('');

  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState('');
  const [selectedArticle, setSelectedArticle] = useState<any>(null);

  // 初始化获取所有文章
  useEffect(() => {
    fetchArticles();
  }, []);

  // 获取文章列表
  async function fetchArticles() {
    try {
      const res = await fetch('http://localhost:3001/articles');
      if (!res.ok) {
        throw new Error('获取文章列表失败');
      }
      const data = await res.json();
      setArticles(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 添加文章
  async function handleAddArticle(e: React.FormEvent) {
    e.preventDefault();
    try {
      const res = await fetch('http://localhost:3001/articles', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ title, type, content }),
      });
      if (!res.ok) {
        throw new Error('添加文章失败');
      }
      // 清空输入框
      setTitle('');
      setType('');
      setContent('');
      // 刷新文章列表
      fetchArticles();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 删除文章
  async function handleDeleteArticle(id: number) {
    try {
      const res = await fetch(`http://localhost:3001/articles/${id}`, {
        method: 'DELETE',
      });
      if (!res.ok) {
        throw new Error('删除文章失败');
      }
      // 刷新文章列表
      fetchArticles();
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  // 点击文章标题查看文章内容
  function handleViewArticle(article: any) {
    setSelectedArticle(article);
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h1>文章管理</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {/* 表单：添加文章 */}
      <form onSubmit={handleAddArticle} style={{ marginTop: '1rem' }}>
        <div>
          <label>文章标题: </label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>文章类型: </label>
          <input
            type="text"
            value={type}
            onChange={(e) => setType(e.target.value)}
            required
          />
        </div>
        <div style={{ marginTop: '0.5rem' }}>
          <label>文章内容: </label>
          <textarea
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            style={{ width: '100%', maxWidth: '400px' }}
            required
          />
        </div>
        <button type="submit" style={{ marginTop: '1rem' }}>
          添加文章
        </button>
      </form>

      {/* 显示文章列表 */}
      <table style={{ marginTop: '2rem', border: '1px solid #ccc', width: '100%', maxWidth: '600px' }}>
        <thead>
          <tr style={{ textAlign: 'left' }}>
            <th style={{ padding: '8px' }}>ID</th>
            <th style={{ padding: '8px' }}>标题</th>
            <th style={{ padding: '8px' }}>类型</th>
            <th style={{ padding: '8px' }}>操作</th>
          </tr>
        </thead>
        <tbody>
          {articles.map((article) => (
            <tr key={article.id} style={{ borderTop: '1px solid #eee' }}>
              <td style={{ padding: '8px' }}>{article.id}</td>
              <td style={{ padding: '8px' }}>
                <a
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleViewArticle(article);
                  }}
                >
                  {article.title}
                </a>
              </td>
              <td style={{ padding: '8px' }}>{article.type}</td>
              <td style={{ padding: '8px' }}>
                <button onClick={() => handleDeleteArticle(article.id)}>
                  删除
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* 查看文章内容 */}
      {selectedArticle && (
        <div style={{ marginTop: '2rem', border: '1px solid #ccc', padding: '1rem' }}>
          <h2>文章详情</h2>
          <p>标题：{selectedArticle.title}</p>
          <p>类型：{selectedArticle.type}</p>
          <p>内容：{selectedArticle.content}</p>
          <button onClick={() => setSelectedArticle(null)}>关闭</button>
        </div>
      )}
    </main>
  );
} 