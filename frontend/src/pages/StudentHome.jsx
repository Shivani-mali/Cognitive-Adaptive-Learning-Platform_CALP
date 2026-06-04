import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import DashboardLayout from '../components/DashboardLayout';

const StudentHome = () => {
  const navigate = useNavigate();
  const [stats, setStats] = useState({ topicsCompleted: 0, streakDays: 0, progressPercent: 0 });

  useEffect(() => {
    import('../services/progressService').then(({ getUserStats }) => {
      getUserStats().then(data => {
        if (data) {
          setStats(data);
        }
      });
    });
  }, []);

  return (
    <DashboardLayout>
      <div className="student-home-wrapper">
        {/* Subtle Ambient Background */}
        <div className="ambient-glow bg-purple"></div>
        <div className="ambient-glow bg-blue"></div>

        <div className="animate-in student-home-container">
          <div className="header-section">
            <h1 className="home-title">Welcome back.</h1>
            <p className="home-subtitle">Ready to continue your learning journey?</p>
          </div>

          {/* Premium Hero Banner: Continue Learning */}
          <div className="premium-hero-card">
            <div className="hero-content">
              <div className="hero-label">
                <span className="pulse-dot"></span>
                Continue Learning
              </div>
              <h2 className="hero-title">Daily Cognitive Practice</h2>
              
              <div className="hero-progress-section">
                <div className="hero-progress-track">
                  <div className="hero-progress-fill" style={{ width: `${stats.progressPercent}%` }}></div>
                </div>
                <span className="hero-progress-text">{stats.progressPercent}% Complete</span>
              </div>
            </div>
            
            <button className="hero-resume-btn" onClick={() => navigate('/learning')}>
              Resume
              <svg width="18" height="18" viewBox="0 0 24 24" fill="currentColor" stroke="none" style={{ marginLeft: '8px' }}>
                <polygon points="5 3 19 12 5 21 5 3"></polygon>
              </svg>
            </button>
          </div>

          <div className="dashboard-grid">
            {/* Suggested Topics */}
            <div className="dashboard-column">
               <h3 className="section-title">What would you like help learning today?</h3>
               <div className="topics-list">
                 {['Memory Improvement', 'Reading Support', 'Focus Training', 'Communication Skills'].map(topic => (
                   <button key={topic} className="topic-glass-card" onClick={() => navigate('/learning')}>
                     <div className="topic-name">{topic}</div>
                     <div className="topic-arrow">
                       <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                         <line x1="5" y1="12" x2="19" y2="12"></line>
                         <polyline points="12 5 19 12 12 19"></polyline>
                       </svg>
                     </div>
                   </button>
                 ))}
               </div>
            </div>

            {/* Progress Stats */}
            <div className="dashboard-column">
               <h3 className="section-title">Your Progress</h3>
               <div className="stats-grid">
                 <div className="stat-glass-card">
                   <div className="stat-icon-wrapper bg-indigo-light">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#4F46E5" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
                       <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
                     </svg>
                   </div>
                   <div className="stat-info">
                     <div className="stat-value">{stats.topicsCompleted}</div>
                     <div className="stat-label">Topics Completed</div>
                   </div>
                 </div>
                 
                 <div className="stat-glass-card">
                   <div className="stat-icon-wrapper bg-orange-light">
                     <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="#F97316" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                       <path d="M8.5 14.5A2.5 2.5 0 0011 12c0-1.38-.5-2-1-3-1.072-2.143-.224-4.054 2-6 .5 2.5 2 4.9 4 6.5 2 1.6 3 3.5 3 5.5a7 7 0 11-14 0c0-1.153.433-2.294 1-3a2.5 2.5 0 002.5 2.5z"></path>
                     </svg>
                   </div>
                   <div className="stat-info">
                     <div className="stat-value">{stats.streakDays} Days</div>
                     <div className="stat-label">Learning Streak</div>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        .student-home-wrapper {
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

        .bg-blue {
          background: radial-gradient(circle, rgba(59, 130, 246, 0.1) 0%, transparent 70%);
          bottom: 10%;
          left: -10%;
        }

        .student-home-container {
          position: relative;
          z-index: 10;
          padding: 3rem;
          max-width: 1100px;
          margin: 0 auto;
          width: 100%;
          box-sizing: border-box;
          font-family: 'Inter', sans-serif;
        }

        .header-section {
          margin-bottom: 2.5rem;
        }

        .home-title {
          font-size: 2.4rem;
          font-weight: 800;
          margin: 0 0 0.5rem 0;
          color: #0f172a;
          letter-spacing: -0.02em;
        }

        .home-subtitle {
          color: #64748b;
          font-size: 1.1rem;
          margin: 0;
        }

        /* Hero Banner */
        .premium-hero-card {
          position: relative;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 2.5rem 3rem;
          background: linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%);
          border-radius: 24px;
          box-shadow: 0 20px 40px -10px rgba(79, 70, 229, 0.4);
          margin-bottom: 3rem;
          overflow: hidden;
          color: white;
        }

        .premium-hero-card::before {
          content: '';
          position: absolute;
          top: 0; right: 0; bottom: 0; left: 0;
          background: url('data:image/svg+xml;utf8,<svg viewBox="0 0 100 100" xmlns="http://www.w3.org/2000/svg"><rect width="100" height="100" fill="url(%23grid)"/><defs><pattern id="grid" width="10" height="10" patternUnits="userSpaceOnUse"><path d="M 10 0 L 0 0 0 10" fill="none" stroke="rgba(255,255,255,0.1)" stroke-width="0.5"/></pattern></defs></svg>');
          opacity: 0.4;
          pointer-events: none;
        }

        .hero-content {
          position: relative;
          z-index: 2;
          flex: 1;
        }

        .hero-label {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          background: rgba(255, 255, 255, 0.2);
          padding: 4px 12px;
          border-radius: 99px;
          font-size: 0.8rem;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.05em;
          margin-bottom: 1rem;
          backdrop-filter: blur(10px);
        }

        .pulse-dot {
          width: 8px;
          height: 8px;
          background-color: #34d399;
          border-radius: 50%;
          box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7);
          animation: pulse 2s infinite;
        }

        @keyframes pulse {
          0% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0.7); }
          70% { box-shadow: 0 0 0 6px rgba(52, 211, 153, 0); }
          100% { box-shadow: 0 0 0 0 rgba(52, 211, 153, 0); }
        }

        .hero-title {
          margin: 0 0 1.5rem 0;
          font-size: 2rem;
          font-weight: 700;
          letter-spacing: -0.02em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.1);
        }

        .hero-progress-section {
          display: flex;
          align-items: center;
          gap: 1rem;
          max-width: 400px;
        }

        .hero-progress-track {
          flex: 1;
          height: 8px;
          background-color: rgba(255, 255, 255, 0.2);
          border-radius: 10px;
          overflow: hidden;
          backdrop-filter: blur(5px);
        }

        .hero-progress-fill {
          height: 100%;
          background: #ffffff;
          border-radius: 10px;
          box-shadow: 0 0 10px rgba(255,255,255,0.5);
        }

        .hero-progress-text {
          font-size: 0.9rem;
          font-weight: 600;
          opacity: 0.9;
          white-space: nowrap;
        }

        .hero-resume-btn {
          position: relative;
          z-index: 2;
          padding: 1.2rem 2.5rem;
          font-size: 1.05rem;
          font-weight: 600;
          border-radius: 16px;
          background: #ffffff;
          color: #4F46E5;
          border: none;
          cursor: pointer;
          display: flex;
          align-items: center;
          gap: 8px;
          transition: all 0.3s ease;
          box-shadow: 0 10px 25px rgba(0,0,0,0.15);
          flex-shrink: 0;
        }

        .hero-resume-btn:hover {
          transform: translateY(-3px);
          box-shadow: 0 15px 30px rgba(0,0,0,0.2);
          background: #f8fafc;
        }

        /* Dashboard Grid */
        .dashboard-grid {
          display: grid;
          grid-template-columns: 1.2fr 1fr;
          gap: 3rem;
        }

        .section-title {
          font-size: 1.2rem;
          color: #0f172a;
          margin: 0 0 1.5rem 0;
          font-weight: 700;
          letter-spacing: -0.01em;
        }

        .topics-list {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .topic-glass-card {
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 1.2rem 1.5rem;
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 16px;
          color: #1e293b;
          font-weight: 600;
          font-size: 1rem;
          box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.02);
          transition: all 0.2s ease;
          cursor: pointer;
        }

        .topic-glass-card:hover {
          border-color: #a78bfa;
          background: #fcfaff;
          transform: translateY(-2px);
          box-shadow: 0 10px 20px rgba(0,0,0,0.04);
        }

        .topic-arrow {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 32px;
          height: 32px;
          border-radius: 50%;
          background: #f1f5f9;
          color: #64748b;
          transition: all 0.3s ease;
        }

        .topic-glass-card:hover .topic-arrow {
          background: #8B5CF6;
          color: #ffffff;
          transform: translateX(4px);
        }

        /* Progress Stats */
        .stats-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.5rem;
        }

        .stat-glass-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 20px;
          padding: 2rem 1.5rem;
          display: flex;
          flex-direction: column;
          align-items: center;
          text-align: center;
          box-shadow: 0 10px 30px rgba(0,0,0,0.03);
          transition: transform 0.3s ease;
        }

        .stat-glass-card:hover {
          transform: translateY(-3px);
        }

        .stat-icon-wrapper {
          width: 56px;
          height: 56px;
          border-radius: 16px;
          display: flex;
          align-items: center;
          justify-content: center;
          margin-bottom: 1.2rem;
        }

        .bg-indigo-light {
          background: #e0e7ff;
        }

        .bg-orange-light {
          background: #ffedd5;
        }

        .stat-value {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          line-height: 1.2;
          margin-bottom: 0.2rem;
        }

        .stat-label {
          font-size: 0.9rem;
          color: #64748b;
          font-weight: 500;
        }

        /* Mobile Responsiveness */
        @media (max-width: 900px) {
          .dashboard-grid {
            grid-template-columns: 1fr;
            gap: 2.5rem;
          }
        }

        @media (max-width: 600px) {
          .student-home-container {
            padding: 2rem 1.5rem;
          }
          
          .home-title {
            font-size: 2rem;
          }

          .premium-hero-card {
            flex-direction: column;
            align-items: flex-start;
            padding: 2rem;
            gap: 2rem;
          }

          .hero-resume-btn {
            width: 100%;
            justify-content: center;
          }
          
          .stats-grid {
            grid-template-columns: 1fr;
          }
        }
      `}</style>
    </DashboardLayout>
  );
};

export default StudentHome;
