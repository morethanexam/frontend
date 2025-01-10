'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id;

  const [article, setArticle] = useState<any>(null);
  const [error, setError] = useState('');

  useEffect(() => {
    if (articleId) {
      fetchArticle();
    }
  }, [articleId]);

  async function fetchArticle() {
    try {
      const res = await fetch(`http://localhost:3001/articles/${articleId}`);
      if (!res.ok) {
        throw new Error('获取文章内容失败');
      }
      const data = await res.json();
      setArticle(data);
    } catch (err: any) {
      console.error(err);
      setError(err.message);
    }
  }

  if (error) {
    return (
      <main style={{ padding: '1rem' }}>
        <h2 style={{ color: 'red' }}>{error}</h2>
      </main>
    );
  }

  if (!article) {
    return (
      <main style={{ padding: '1rem' }}>
        <p>加载中...</p>
      </main>
    );
  }

  return (
    <main style={{ padding: '1rem' }}>
      <h2>标题：{article.title}</h2>
      <p>分类：{article.type}</p>
      <hr style={{ margin: '1rem 0' }} />
      <p>{article.content}</p>
    </main>
  );
} 