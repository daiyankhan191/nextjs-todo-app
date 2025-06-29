'use client';

import { useState } from 'react';

export default function ForgotPasswordPage() {
  const [email, setEmail] = useState('');
  const [message, setMessage] = useState('');

  const handleReset = async () => {
    const res = await fetch('/api/auth/forgot-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('📧 Reset instructions sent to your email.');
    } else {
      setMessage('❌ ' + data.message || 'Failed to send reset email.');
    }
  };

  return (
    <div className="dashboard">
      <div className="todo-card">
        <h2>Forgot Password</h2>

        <input
          type="email"
          placeholder="Your registered email"
          className="todo-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <button className="todo-button" onClick={handleReset}>
          Send Reset Link
        </button>

        {message && <p style={{ marginTop: '1rem', color: '#ccc' }}>{message}</p>}
      </div>
    </div>
  );
}
