'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function ChangePasswordPage() {
  const [oldPassword, setOldPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [message, setMessage] = useState('');
  const router = useRouter();

  const handleChangePassword = async () => {
    const email = localStorage.getItem('email');

    if (!email) {
      setMessage('❌ Email not found in local storage.');
      return;
    }

    const res = await fetch('/api/auth/change-password', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email, currentPassword: oldPassword, newPassword }),
    });

    const data = await res.json();

    if (data.success) {
      setMessage('✅ Password changed successfully! Redirecting to login...');
      setOldPassword('');
      setNewPassword('');

      // Redirect after 3 seconds
      setTimeout(() => {
        localStorage.clear(); // Clear session data before logout
        router.push('/login');
      }, 3000);
    } else {
      setMessage('❌ ' + (data.error || 'Failed to change password.'));
    }
  };

  return (
    <div className="dashboard">
      <div className="todo-card">
        <h2>Change Password</h2>

        <input
          type="password"
          placeholder="Old Password"
          className="todo-input"
          value={oldPassword}
          onChange={(e) => setOldPassword(e.target.value)}
        />
        <input
          type="password"
          placeholder="New Password"
          className="todo-input"
          value={newPassword}
          onChange={(e) => setNewPassword(e.target.value)}
        />
        <button className="todo-button" onClick={handleChangePassword}>
          Update Password
        </button>

        {message && (
          <p style={{ marginTop: '1rem', color: '#ccc' }}>{message}</p>
        )}
      </div>
    </div>
  );
}
