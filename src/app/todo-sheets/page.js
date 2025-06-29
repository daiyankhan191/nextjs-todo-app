'use client';

import { useEffect, useState } from 'react';
import jsPDF from 'jspdf';

export default function TodoSheetsPage() {
  const [sheets, setSheets] = useState([]);
  const [title, setTitle] = useState('');
  const [deadline, setDeadline] = useState('');
  const [taskInput, setTaskInput] = useState('');
  const [tasks, setTasks] = useState([]);
  const [userId, setUserId] = useState('');
  const [activeSheet, setActiveSheet] = useState(null);

  useEffect(() => {
    const uid = localStorage.getItem('userId');
    if (!uid) {
      window.location.href = '/login';
      return;
    }
    setUserId(uid);
    fetchSheets(uid);
  }, []);

  const fetchSheets = async (uid) => {
    try {
      const res = await fetch('/api/sheets/list', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ userId: uid }),
      });
      const data = await res.json();
      if (data?.sheets) setSheets(data.sheets);
    } catch (error) {
      console.error('Error fetching sheets:', error);
    }
  };

  const handleAddTask = () => {
    if (taskInput.trim() !== '') {
      setTasks([...tasks, taskInput]);
      setTaskInput('');
    }
  };

  const handleSaveSheet = async () => {
    if (title && deadline && tasks.length > 0) {
      const newSheet = { userId, title, deadline, tasks };
      const res = await fetch('/api/sheets/save', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newSheet),
      });

      const data = await res.json();
      if (data.success) {
        setSheets([data.sheet, ...sheets]);
        setTitle('');
        setDeadline('');
        setTasks([]);
      }
    }
  };

  const handleDownload = (sheet) => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text(`To-Do Sheet: ${sheet.title}`, 10, 20);
    doc.setFontSize(12);
    doc.text(`Deadline: ${sheet.deadline}`, 10, 30);
    doc.text('Tasks:', 10, 40);
    sheet.tasks.forEach((task, index) => {
      doc.text(`${index + 1}. ${task}`, 15, 50 + index * 10);
    });
    doc.save(`${sheet.title}-sheet.pdf`);
  };

  const handleDelete = async (sheetId) => {
    try {
      const res = await fetch('/api/sheets/delete', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id: sheetId }),
      });

      const data = await res.json();
      if (data.success) {
        setSheets(prev => prev.filter(sheet => sheet._id !== sheetId));
        setActiveSheet(null);
      }
    } catch (error) {
      console.error('Delete error:', error);
    }
  };

  return (
    <div className="page-wrapper">
      {/* Back to Dashboard Button */}
      <button onClick={() => window.location.href = '/dashboard'} className="back-button">
        ← Back to Dashboard
      </button>

      <div className="card">
        <h2>Create a To-Do Sheet</h2>
        <input type="text" placeholder="Sheet Title" value={title} onChange={(e) => setTitle(e.target.value)} />
        <input type="date" value={deadline} onChange={(e) => setDeadline(e.target.value)} />
        <div className="task-input-row">
          <input type="text" placeholder="Add Task" value={taskInput} onChange={(e) => setTaskInput(e.target.value)} />
          <button onClick={handleAddTask}>➕</button>
        </div>
        <ul>
          {tasks.map((task, idx) => (
            <li key={idx}>{task}</li>
          ))}
        </ul>
        <button className="primary-button" onClick={handleSaveSheet}>💾 Save Sheet</button>
      </div>

      <div className="card">
        <h2>Saved Sheets</h2>
        <div className="sheet-grid">
          {sheets.map((sheet) => (
            <div key={sheet._id} className="sheet-card" onClick={() => setActiveSheet(sheet)}>
              <h4>{sheet.title}</h4>
              <p>{sheet.deadline}</p>
            </div>
          ))}
        </div>
      </div>

      {activeSheet && (
        <div className="modal-overlay">
          <div className="modal-content">
            <h3>{activeSheet.title}</h3>
            <p><strong>Deadline:</strong> {activeSheet.deadline}</p>
            <ul>
              {activeSheet.tasks.map((task, i) => <li key={i}>{task}</li>)}
            </ul>
            <div className="modal-actions">
              <button onClick={() => handleDownload(activeSheet)}>📄 Download</button>
              <button onClick={() => handleDelete(activeSheet._id)} className="danger-button">🗑️ Delete</button>
              <button onClick={() => setActiveSheet(null)}>✖ Close</button>
            </div>
          </div>
        </div>
      )}

      <style jsx>{`
        .page-wrapper {
          padding: 2rem;
          font-family: 'Segoe UI', sans-serif;
          background: rgb(24, 55, 74);
          color: #fff;
        }
        .back-button {
          background: transparent;
          border: 1px solid #888;
          color: #fff;
          padding: 0.4rem 0.8rem;
          border-radius: 5px;
          margin-bottom: 1.5rem;
          cursor: pointer;
          transition: all 0.2s ease;
        }
        .back-button:hover {
          background: #222;
        }
        .card {
          background: linear-gradient(145deg,rgb(18, 66, 96),rgb(18, 74, 63));
          border-radius: 10px;
          padding: 1.5rem;
          margin-bottom: 2rem;
          box-shadow: 0 0 10px #00000088;
        }
        .card input {
          width: 100%;
          padding: 0.5rem;
          margin-bottom: 0.5rem;
          background: rgb(19, 48, 53);
          border: 1px solid #444;
          border-radius: 5px;
          color: #fff;
        }
        .task-input-row {
          display: flex;
          gap: 0.5rem;
          align-items: center;
        }
        .task-input-row input {
          flex: 1;
        }
        .task-input-row button {
          padding: 0.4rem 0.7rem;
          font-size: 0.9rem;
          background: #3a3a3a;
          color: white;
          border: none;
          border-radius: 5px;
          cursor: pointer;
        }
        .primary-button {
          padding: 0.5rem 1rem;
          margin-top: 1rem;
          background-color: rgb(21, 53, 53);
          color: #fff;
          border: none;
          border-radius: 5px;
        }
        .sheet-grid {
          display: grid;
          grid-template-columns: repeat(auto-fill, minmax(180px, 1fr));
          gap: 1rem;
        }
        .sheet-card {
          padding: 1rem;
          border-radius: 8px;
          background: rgb(24, 71, 91);
          border: 1px solid #444;
          cursor: pointer;
          transition: 0.3s;
        }
        .sheet-card:hover {
          background: rgb(42, 34, 92);
        }
        .modal-overlay {
          position: fixed;
          top: 0; left: 0;
          width: 100%; height: 100%;
          background: rgba(0,0,0,0.7);
          display: flex;
          justify-content: center;
          align-items: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          color: #000;
          padding: 2rem;
          border-radius: 10px;
          width: 90%;
          max-width: 500px;
        }
        .modal-actions {
          display: flex;
          gap: 1rem;
          margin-top: 1rem;
        }
        .modal-actions button {
          padding: 0.5rem 0.8rem;
          border: none;
          border-radius: 4px;
          cursor: pointer;
        }
        .danger-button {
          background-color: #d9534f;
          color: white;
        }
      `}</style>
    </div>
  );
}
