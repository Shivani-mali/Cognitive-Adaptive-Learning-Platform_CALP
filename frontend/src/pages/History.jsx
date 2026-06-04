import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const History = () => {
  return (
    <DashboardLayout>
      <div className="history-wrapper">
        <div className="ambient-glow bg-purple"></div>
        <div className="animate-in history-container">
          <div className="header-section">
            <h1 className="page-title">Learning History</h1>
            <p className="page-subtitle">Review your past learning sessions and topics.</p>
          </div>

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

        @media (max-width: 600px) {
          .history-container { padding: 2rem 1.5rem; }
          .page-title { font-size: 2rem; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default History;
