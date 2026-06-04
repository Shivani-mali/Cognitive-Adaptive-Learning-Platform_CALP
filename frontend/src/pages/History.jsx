import React, { useState, useEffect } from 'react';
import DashboardLayout from '../components/DashboardLayout';

const History = () => {
  const [history, setHistory] = useState([]);

  useEffect(() => {
    import('../services/progressService').then(({ getChatHistory }) => {
      getChatHistory().then(data => setHistory(data || []));
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="history-wrapper">
        <div className="ambient-glow bg-purple"></div>
        <div className="animate-in history-container">
          <div className="header-section">
            <h1 className="page-title">Learning History</h1>
            <p className="page-subtitle">Review your past learning sessions and topics.</p>
          </div>

          {history.length === 0 ? (
            <div className="empty-state-card">
              <div className="icon-wrapper bg-indigo-light">
                <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"></circle>
                  <polyline points="12 6 12 12 16 14"></polyline>
                </svg>
              </div>
              <h2>No History Yet</h2>
              <p>Your recent learning sessions will appear here once you start exploring topics.</p>
              <button className="start-btn" onClick={() => window.location.href='/learning'}>
                Start Learning
              </button>
            </div>
          ) : (
            <div className="history-list">
              {history.map((item, idx) => (
                <div key={idx} className="history-card">
                  <div className="history-icon bg-indigo-light">
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10"></circle>
                      <polyline points="12 6 12 12 16 14"></polyline>
                    </svg>
                  </div>
                  <div className="history-content">
                    <h3>{item.title}</h3>
                    <p>{new Date(item.timestamp).toLocaleString()}</p>
                  </div>
                  <button className="resume-btn" onClick={() => window.location.href='/learning'}>
                    Review
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      <style>{`
        .history-wrapper {
          position: relative;
          min-height: 100%;
          width: 100%;
          overflow: hidden;
          background: #f8fafc;
        }

        .ambient-glow {
          position: absolute;
          width: 50vw;
          height: 50vw;
          max-width: 600px;
          max-height: 600px;
          border-radius: 50%;
          filter: blur(80px);
          z-index: 0;
          opacity: 0.4;
          pointer-events: none;
        }

        .bg-purple {
          background: radial-gradient(circle, rgba(139, 92, 246, 0.15) 0%, transparent 70%);
          top: -10%;
          right: -10%;
        }

        .history-container {
          position: relative;
          z-index: 10;
          padding: 3rem;
          max-width: 900px;
          margin: 0 auto;
          width: 100%;
          font-family: 'Inter', sans-serif;
        }

        .header-section {
          margin-bottom: 2.5rem;
        }

        .page-title {
          font-size: 2.4rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .page-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          margin: 0;
        }

        .empty-state-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 4rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
        }

        .icon-wrapper {
          width: 80px;
          height: 80px;
          border-radius: 20px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .bg-indigo-light {
          background: #e0e7ff;
        }

        .empty-state-card h2 {
          font-size: 1.5rem;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
        }

        .empty-state-card p {
          color: #64748b;
          margin: 0 0 2rem 0;
          max-width: 400px;
        }

        .start-btn {
          padding: 1rem 2.5rem;
          background: #4F46E5;
          color: white;
          border: none;
          border-radius: 50px;
          font-size: 1.05rem;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
          box-shadow: 0 4px 15px rgba(79, 70, 229, 0.3);
        }

        .start-btn:hover {
          transform: translateY(-2px);
          box-shadow: 0 8px 25px rgba(79, 70, 229, 0.4);
        }

        /* History List Styles */
        .history-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .history-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: center;
          gap: 1.5rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          transition: all 0.2s ease;
        }

        .history-card:hover {
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.04);
          border-color: #a78bfa;
        }

        .history-icon {
          width: 48px;
          height: 48px;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .history-content {
          flex: 1;
        }

        .history-content h3 {
          margin: 0 0 0.25rem 0;
          font-size: 1.1rem;
          color: #0f172a;
          font-weight: 600;
        }

        .history-content p {
          margin: 0;
          font-size: 0.9rem;
          color: #64748b;
        }

        .resume-btn {
          padding: 0.6rem 1.2rem;
          background: #f1f5f9;
          color: #4F46E5;
          border: none;
          border-radius: 8px;
          font-weight: 600;
          cursor: pointer;
          transition: all 0.2s ease;
        }

        .resume-btn:hover {
          background: #e0e7ff;
        }

        @media (max-width: 600px) {
          .history-container { padding: 2rem 1.5rem; }
          .page-title { font-size: 2rem; }
          .history-card {
            flex-direction: column;
            align-items: flex-start;
            gap: 1rem;
          }
          .resume-btn {
            width: 100%;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default History;
