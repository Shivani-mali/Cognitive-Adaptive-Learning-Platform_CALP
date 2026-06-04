import React from 'react';
import DashboardLayout from '../components/DashboardLayout';

const Progress = () => {
  return (
    <DashboardLayout>
      <div className="progress-wrapper">
        <div className="ambient-glow bg-blue"></div>
        <div className="animate-in progress-container">
          <div className="header-section">
            <h1 className="page-title">Your Progress</h1>
            <p className="page-subtitle">Track your learning achievements and streaks.</p>
          </div>

          <div className="stats-grid">
            <div className="stat-glass-card">
              <div className="stat-icon-wrapper bg-indigo-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                  <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                </svg>
              </div>
              <div className="stat-value">0</div>
              <div className="stat-label">Topics Completed</div>
            </div>

            <div className="stat-glass-card">
              <div className="stat-icon-wrapper bg-orange-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
                </svg>
              </div>
              <div className="stat-value">0 Days</div>
              <div className="stat-label">Learning Streak</div>
            </div>

            <div className="stat-glass-card">
              <div className="stat-icon-wrapper bg-green-light">
                <svg width="28" height="28" viewBox="0 0 24 24" fill="none" stroke="#10B981" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2"></polygon>
                </svg>
              </div>
              <div className="stat-value">0</div>
              <div className="stat-label">Badges Earned</div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .progress-wrapper {
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

        .bg-blue {
          background: radial-gradient(circle, rgba(59, 130, 246, 0.15) 0%, transparent 70%);
          top: -10%;
          right: -10%;
        }

        .progress-container {
          position: relative;
          z-index: 10;
          padding: 3rem;
          max-width: 1000px;
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

        .stats-grid {
          display: grid;
          grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));
          gap: 2rem;
        }

        .stat-glass-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2.5rem 2rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }

        .stat-glass-card:hover {
          transform: translateY(-4px);
          box-shadow: 0 15px 35px rgba(0,0,0,0.05);
        }

        .stat-icon-wrapper {
          width: 64px;
          height: 64px;
          border-radius: 18px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.5rem;
        }

        .bg-indigo-light { background: #e0e7ff; }
        .bg-orange-light { background: #ffedd5; }
        .bg-green-light { background: #d1fae5; }

        .stat-value {
          font-size: 2.5rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.5rem;
        }

        .stat-label {
          font-size: 1rem;
          color: #64748b;
          font-weight: 500;
        }

        @media (max-width: 600px) {
          .progress-container { padding: 2rem 1.5rem; }
          .page-title { font-size: 2rem; }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default Progress;
