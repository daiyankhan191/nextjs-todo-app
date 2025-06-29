'use client';

import { useEffect, useState } from 'react';
import { useRouter } from 'next/navigation';

export default function DashboardPage() {
  const router = useRouter();
  const [todos, setTodos] = useState([]);
  const [task, setTask] = useState('');
  const [loading, setLoading] = useState(true);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [userId, setUserId] = useState('');
  const [showProfile, setShowProfile] = useState(false);
  const [showProfileCard, setShowProfileCard] = useState(false);
  const [showSettingsCard, setShowSettingsCard] = useState(false);

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    const storedName = localStorage.getItem('name');
    const storedEmail = localStorage.getItem('email');

    if (!uid) {
      router.push('/login');
      return;
    }

    setUserId(uid);
    setName(storedName || '');
    setEmail(storedEmail || '');

    const fetchTodos = async () => {
      try {
        const res = await fetch('/api/todo/list', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: uid }),
        });

        const data = await res.json();
        setTodos(data.todos);
      } catch (error) {
        console.error('Failed to fetch todos:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchTodos();
  }, [router]);

  const handleAdd = async () => {
    const uid = localStorage.getItem('userId');
    if (!task) return;

    const res = await fetch('/api/todo/add', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: uid, task }),
    });

    const data = await res.json();
    setTodos([data.todo, ...todos]);
    setTask('');
  };

  const handleDelete = async (id) => {
    await fetch('/api/todo/delete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setTodos(todos.filter(todo => todo._id !== id));
  };

  const handleComplete = async (id) => {
    await fetch('/api/todo/complete', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ id }),
    });

    setTodos(todos.map(todo =>
      todo._id === id ? { ...todo, completed: true } : todo
    ));
  };

  const handleAskAI = async (taskText) => {
    try {
      const res = await fetch('/api/ask-ai', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ task: taskText }),
      });

      const data = await res.json();
      if (data.result) {
        alert(`AI Suggestion:\n\n${data.result}`);
      } else {
        alert('Failed to get AI suggestion');
      }
    } catch (err) {
      console.error('Error calling AI:', err);
      alert('Something went wrong while contacting AI');
    }
  };

  const handleLogout = () => {
    localStorage.clear();
    router.push('/login');
  };

  const toggleProfile = () => {
    setShowProfile(prev => !prev);
  };

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (!event.target.closest('.dropdown-container-new')) {
        setShowProfile(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <div className="dashboard">
      {/* Welcome Card */}
      <div className="todo-card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div>
            <h2>Welcome {name}</h2>
            <p>Happy to see you back!</p>
          </div>

          {/* Dropdown */}
          <div className="dropdown-container-new">
            <button
              className="dropdown-toggle-new"
              onClick={toggleProfile}
              aria-label="Open profile menu"
            >
              ⋮
            </button>

            {showProfile && (
              <div className="dropdown-menu-new">
                <button className="dropdown-item-new" onClick={() => {
                  setShowProfileCard(true);
                  setShowSettingsCard(false);
                  setShowProfile(false);
                }}>
                  👤 My Profile
                </button>
                <button className="dropdown-item-new" onClick={() => {
                  setShowSettingsCard(true);
                  setShowProfileCard(false);
                  setShowProfile(false);
                }}>
                  ⚙️ Settings
                </button>
                <button className="dropdown-item-new logout" onClick={handleLogout}>
                  🚪 Logout
                </button>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* My Profile Card */}
      {showProfileCard && (
        <div className="todo-card profile-card-new">
          <h3>👤 My Profile</h3>
          <p><strong>Name:</strong> {name}</p>
          <p><strong>Email:</strong> {email}</p>
          <p><strong>User ID:</strong> {userId}</p>
          <button onClick={() => setShowProfileCard(false)} className="todo-button">Close</button>
        </div>
      )}

      {/* Settings Card */}
      {showSettingsCard && (
        <div className="todo-card profile-card-new">
          <h3>⚙️ Settings</h3>
          <button className="todo-button" style={{ marginBottom: '10px' }} onClick={() => router.push('/change-password')}>
            🔒 Change Password
          </button>
          <button className="todo-button" onClick={() => router.push('/forgot-password')}>
            ❓ Forgot Password
          </button>
          <button onClick={() => setShowSettingsCard(false)} className="todo-button" style={{ marginTop: '20px' }}>
            Close
          </button>
        </div>
      )}

      {/* To-Do Section */}
      <div className="todo-card">
        <h2>My To-Do Dashboard</h2>
        

        {loading ? (
          <p>Loading...</p>
        ) : (
          <>
            <input
              className="todo-input"
              placeholder="New task"
              value={task}
              onChange={(e) => setTask(e.target.value)}
            />
            <button className="todo-button" onClick={handleAdd}>Add</button>
            <button className="todo-button" onClick={() => router.push('/todo-sheets')}>
  📄 To-Do Sheets
</button>


            <ul className="todo-list">
              {todos.map(todo => (
                <li key={todo._id} className="todo-item" style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '8px 0' }}>
                  {/* Left: Ask AI */}
                  <div>
                    <button onClick={() => handleAskAI(todo.task)}>🤖 AI</button>
                  </div>

                  {/* Center: Task */}
                  <div style={{ flexGrow: 1, margin: '0 10px' }}>
                    <span className={todo.completed ? 'completed' : ''}>{todo.task}</span>
                  </div>

                  {/* Right: Actions */}
                  <div style={{ display: 'flex', gap: '6px' }}>
                    {!todo.completed && (
                      <button onClick={() => handleComplete(todo._id)}>✅</button>
                    )}
                    <button onClick={() => handleDelete(todo._id)} >❌</button>
                  </div>
                </li>
              ))}
            </ul>
          </>
        )}
      </div>
    </div>
  );
}
