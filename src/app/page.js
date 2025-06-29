'use client';
import { useRouter } from 'next/navigation';

export default function HomePage() {
  const router = useRouter();
  
  return (
    <div className="home-container">
      <div className="background-overlay"></div>
      <div className="home-card">
        <div className="card-header">
          <h1 className="title">Smart To-Do</h1>
          <div className="title-underline"></div>
          <p className="subtitle">Intelligent Task Management</p>
        </div>
        
        <p className="description">
          Transform your productivity with our unified platform. Create, organize, and complete tasks with AI-powered intelligence. Never miss a deadline again.
        </p>
        
        <div className="features-grid">
          <div className="feature-item">
            <span className="feature-icon">📝</span>
            <span className="feature-text">Smart Task Creation</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📊</span>
            <span className="feature-text">Custom Sheets</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📅</span>
            <span className="feature-text">Deadline Tracking</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🤖</span>
            <span className="feature-text">AI Suggestions</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">📄</span>
            <span className="feature-text">PDF Export</span>
          </div>
          <div className="feature-item">
            <span className="feature-icon">🔐</span>
            <span className="feature-text">Secure Profile</span>
          </div>
        </div>
        
        <div className="button-container">
          <button 
            className="btn btn-primary" 
            onClick={() => router.push('/login')}
          >
            Sign In
          </button>
          <button 
            className="btn btn-secondary" 
            onClick={() => router.push('/register')}
          >
            Get Started
          </button>
        </div>
      </div>
      
      <style jsx>{`
        .home-container {
          min-height: 100vh;
          background: linear-gradient(135deg, #0f0f23 0%, #1a1a2e 25%, #16213e 50%, #0f3460 75%, #533483 100%);
          display: flex;
          justify-content: center;
          align-items: center;
          padding: 1rem;
          position: relative;
          overflow: hidden;
        }
        
        .background-overlay {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: 
            radial-gradient(circle at 20% 50%, rgba(120, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 80% 20%, rgba(255, 119, 198, 0.1) 0%, transparent 50%),
            radial-gradient(circle at 40% 80%, rgba(120, 219, 255, 0.1) 0%, transparent 50%);
          pointer-events: none;
        }
        
        .home-card {
          background: rgba(15, 15, 35, 0.95);
          backdrop-filter: blur(20px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          padding: 3rem 2rem;
          border-radius: 24px;
          max-width: 700px;
          width: 100%;
          text-align: center;
          position: relative;
          box-shadow: 
            0 25px 50px -12px rgba(0, 0, 0, 0.5),
            0 0 0 1px rgba(255, 255, 255, 0.05);
          transition: transform 0.3s ease, box-shadow 0.3s ease;
        }
        
        .home-card:hover {
          transform: translateY(-5px);
          box-shadow: 
            0 35px 60px -12px rgba(0, 0, 0, 0.6),
            0 0 0 1px rgba(255, 255, 255, 0.1);
        }
        
        .card-header {
          margin-bottom: 2rem;
        }
        
        .title {
          font-size: clamp(2.5rem, 5vw, 3.5rem);
          font-weight: 700;
          margin-bottom: 1rem;
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          -webkit-background-clip: text;
          -webkit-text-fill-color: transparent;
          background-clip: text;
          letter-spacing: -0.02em;
        }
        
        .title-underline {
          width: 80px;
          height: 4px;
          background: linear-gradient(90deg, #667eea, #764ba2);
          margin: 0 auto 1rem;
          border-radius: 2px;
        }
        
        .subtitle {
          font-size: 1.2rem;
          color: #a0a0b8;
          font-weight: 300;
          margin: 0;
        }
        
        .description {
          font-size: 1.1rem;
          line-height: 1.7;
          color: #e0e0e8;
          margin-bottom: 2.5rem;
          opacity: 0.9;
        }
        
        .features-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
          gap: 1.5rem;
          margin-bottom: 3rem;
        }
        
        .feature-item {
          display: flex;
          align-items: center;
          gap: 0.8rem;
          padding: 1rem;
          background: rgba(255, 255, 255, 0.05);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 12px;
          transition: all 0.3s ease;
        }
        
        .feature-item:hover {
          background: rgba(255, 255, 255, 0.1);
          border-color: rgba(102, 126, 234, 0.3);
          transform: translateY(-2px);
        }
        
        .feature-icon {
          font-size: 1.5rem;
          filter: grayscale(0.2);
        }
        
        .feature-text {
          color: #e0e0e8;
          font-weight: 500;
          font-size: 0.95rem;
        }
        
        .button-container {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
        }
        
        .btn {
          padding: 0.9rem 2rem;
          border: none;
          border-radius: 12px;
          font-size: 1rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.3s ease;
          position: relative;
          overflow: hidden;
          min-width: 140px;
        }
        
        .btn-primary {
          background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
          color: white;
          box-shadow: 0 8px 25px rgba(102, 126, 234, 0.3);
        }
        
        .btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 12px 35px rgba(102, 126, 234, 0.4);
        }
        
        .btn-secondary {
          background: rgba(255, 255, 255, 0.1);
          color: #e0e0e8;
          border: 1px solid rgba(255, 255, 255, 0.2);
          backdrop-filter: blur(10px);
        }
        
        .btn-secondary:hover {
          background: rgba(255, 255, 255, 0.15);
          border-color: rgba(255, 255, 255, 0.3);
          transform: translateY(-2px);
        }
        
        .btn:active {
          transform: translateY(0);
        }
        
        /* Responsive Design */
        @media (max-width: 768px) {
          .home-container {
            padding: 1rem 0.5rem;
          }
          
          .home-card {
            padding: 2rem 1.5rem;
            border-radius: 20px;
          }
          
          .features-grid {
            grid-template-columns: 1fr;
            gap: 1rem;
          }
          
          .feature-item {
            padding: 0.8rem;
          }
          
          .button-container {
            flex-direction: column;
            align-items: center;
          }
          
          .btn {
            width: 100%;
            max-width: 280px;
          }
        }
        
        @media (max-width: 480px) {
          .home-card {
            padding: 1.5rem 1rem;
          }
          
          .description {
            font-size: 1rem;
          }
          
          .feature-text {
            font-size: 0.9rem;
          }
        }
        
        /* High contrast mode support */
        @media (prefers-contrast: high) {
          .home-card {
            border: 2px solid rgba(255, 255, 255, 0.3);
          }
          
          .feature-item {
            border: 1px solid rgba(255, 255, 255, 0.3);
          }
        }
        
        /* Reduced motion support */
        @media (prefers-reduced-motion: reduce) {
          .home-card,
          .feature-item,
          .btn {
            transition: none;
          }
          
          .home-card:hover,
          .feature-item:hover,
          .btn:hover {
            transform: none;
          }
        }
      `}</style>
    </div>
  );
}