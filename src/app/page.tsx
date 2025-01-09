import Image from "next/image";
import styles from "./page.module.css";

export default function HomePage() {
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
          placeholder="请输入用户名"
          style={{
            padding: '8px 12px',
            fontSize: '16px',
          }}
        />
        <input
          type="password"
          placeholder="请输入密码"
          style={{
            padding: '8px 12px',
            fontSize: '16px',
          }}
        />
      </div>
      
      <button
        style={{
          marginTop: '24px',
          padding: '12px 24px',
          fontSize: '16px',
          cursor: 'pointer',
        }}
      >
        确认
      </button>
    </main>
  );
}
