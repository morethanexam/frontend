'use client';

import React, { useEffect, useState } from 'react';
import { useParams } from 'next/navigation';

export default function ArticleDetailPage() {
  const params = useParams();
  const articleId = params.id;

  const [articleDetail, setArticleDetail] = useState({
    originalTitle: '',
    originalType: '',
    rewrittenContent: '',
  });
  const [error, setError] = useState('');

  useEffect(() => {
    if (articleId) {
      fetchRewrittenArticle();
    }
  }, [articleId]);

  async function fetchRewrittenArticle() {
    try {
      const res = await fetch(`http://localhost:3001/articles/${articleId}/rewrite`);
      if (!res.ok) {
        throw new Error('获取改写后的文章内容失败');
      }
      const data = await res.json();
      setArticleDetail(data);
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

  return (
    <main style={{ padding: '1rem' }}>
      <h2>标题：{articleDetail.originalTitle}</h2>
      <p>分类：{articleDetail.originalType}</p>
      <hr style={{ margin: '1rem 0' }} />
      <div
        dangerouslySetInnerHTML={{ __html: articleDetail.rewrittenContent }}
        style={{ color: 'black' }} // 默认文本颜色
      />
    </main>
  );
} 