'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';

export default function ArticlesListPage() {
  const [articles, setArticles] = useState<any[]>([]);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchArticles();
  }, []);

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

  return (
    <main style={{ padding: '1rem' }}>
      <h1>文章列表</h1>
      {error && <p style={{ color: 'red' }}>{error}</p>}

      {articles.map((article) => (
        <div key={article.id} style={{ margin: '8px 0' }}>
          <Link href={`/articles/${article.id}`}>
            {article.title}
          </Link>
        </div>
      ))}
    </main>
  );
} 