'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

export default function LoginPage() {
  const router = useRouter();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const res = await fetch('/api/auth/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || 'Login failed');
        return;
      }

     localStorage.setItem('userId', data.userId);
localStorage.setItem('name', data.name);    // ✅ needed for dashboard
localStorage.setItem('email', data.email);  // ✅ needed for profile

      router.push('/dashboard');
    } catch (err) {
      setError('Something went wrong. Please try again.');
    }
  };

  return (
    <div className="container">
      <h2>Login</h2>
      <form onSubmit={handleLogin}>
        <input
          type="email"
          placeholder="Email"
          value={email}
          required
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          required
          onChange={(e) => setPassword(e.target.value)}
        />
        {error && <p style={{ color: 'red' }}>{error}</p>}
        <button type="submit">Login</button>
      </form>
      <p style={{ marginTop: '1rem' }}>
        New user? <Link href="/register" style={{ color: '#4FC3F7' }}>Register here</Link>
      </p>
      <p style={{ marginTop: '0.5rem' }}>Forgot-Password
  <Link href="/forgot-password" style={{ color: '#4FC3F7' }}>Forgot Password?</Link>
</p>
    </div>
  );
}
