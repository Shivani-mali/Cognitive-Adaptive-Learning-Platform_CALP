import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Preferences = () => {
  const [pref, setPref] = useState('');
  const navigate = useNavigate();

  const modes = [
    {
      title: 'Step-by-Step',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M11 6h9" />
          <path d="M11 12h9" />
          <path d="M11 18h9" />
          <path d="M3 6l2 2 4-4" />
          <path d="M3 12l2 2 4-4" />
          <path d="M3 18l2 2 4-4" />
        </svg>
      ),
      recommendedFor: ['ADHD', 'Cognitive Overload']
    },
    {
      title: 'Focus',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <circle cx="12" cy="12" r="10"></circle>
          <circle cx="12" cy="12" r="4"></circle>
          <line x1="12" y1="2" x2="12" y2="6"></line>
          <line x1="12" y1="18" x2="12" y2="22"></line>
          <line x1="2" y1="12" x2="6" y2="12"></line>
          <line x1="18" y1="12" x2="22" y2="12"></line>
        </svg>
      ),
      recommendedFor: ['ADHD', 'Attention Deficits']
    },
    {
      title: 'Easy Read',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M2 3h6a4 4 0 0 1 4 4v14a3 3 0 0 0-3-3H2z"></path>
          <path d="M22 3h-6a4 4 0 0 0-4 4v14a3 3 0 0 1 3-3h7z"></path>
        </svg>
      ),
      recommendedFor: ['Dyslexia', 'Cognitive Fatigue']
    },
    {
      title: 'Structured',
      icon: (
        <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <polygon points="12 2 2 7 12 12 22 7 12 2"></polygon>
          <polyline points="2 12 12 17 22 12"></polyline>
          <polyline points="2 17 12 22 22 17"></polyline>
        </svg>
      ),
      recommendedFor: ['Autism', 'Memory Challenges']
    }
  ];

  const handleSave = () => {
    if (pref) {
      localStorage.setItem('learning_preference', pref);
      navigate('/student-home');
    }
  };

  return (
    <div className="pref-page">
      {/* Background Ambience */}
      <div className="bg-gradient"></div>
      <div className="glow-circle-1"></div>
      <div className="glow-circle-2"></div>
      
      {/* Floating Particles */}
      <div className="particles-layer">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
      </div>

      <div className="pref-container">
        <div className="pref-card">
          <div className="header-section">
            <h1 className="pref-title">How do you learn best?</h1>
            <p className="pref-subtitle">Select a learning mode. Each is optimized for specific cognitive needs.</p>
          </div>
          
          <div className="modes-grid">
            {modes.map(m => {
              const isSelected = pref === m.title;
              return (
                <button 
                  key={m.title}
                  onClick={() => setPref(m.title)}
                  className={`mode-btn ${isSelected ? 'selected' : ''}`}
                >
                  <div className="mode-icon-wrapper">
                    {m.icon}
                  </div>
                  <div className="mode-content">
                    <div className="mode-title">{m.title}</div>
                    
                    {/* Disease/Condition Recommendations */}
                    <div className="tags-container">
                      <span className="tag-label">Best for:</span>
                      {m.recommendedFor.map(tag => (
                        <span key={tag} className="tag">{tag}</span>
                      ))}
                    </div>
                  </div>
                  
                  {/* Selection Indicator */}
                  <div className="selection-ring">
                    {isSelected && (
                      <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="#ffffff" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                        <polyline points="20 6 9 17 4 12"></polyline>
                      </svg>
                    )}
                  </div>
                </button>
              );
            })}
          </div>
          
          <button 
            className={`premium-btn-primary ${!pref ? 'disabled' : ''}`} 
            onClick={handleSave} 
            disabled={!pref}
          >
            Continue to Dashboard
            <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" style={{ marginLeft: '8px' }}>
              <line x1="5" y1="12" x2="19" y2="12"></line>
              <polyline points="12 5 19 12 12 19"></polyline>
            </svg>
          </button>
        </div>
      </div>

      <style>{`
        .pref-page {
          min-height: 100vh;
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          background: #f8fafc;
          font-family: 'Inter', sans-serif;
        }

        .bg-gradient {
          position: absolute;
          inset: 0;
          background: linear-gradient(135deg, rgba(79, 70, 229, 0.03) 0%, rgba(139, 92, 246, 0.03) 100%);
          z-index: 0;
        }

        .glow-circle-1 {
          position: absolute;
          width: 60vw;
          height: 60vw;
          max-width: 800px;
          max-height: 800px;
          background: radial-gradient(circle, rgba(79, 70, 229, 0.12) 0%, transparent 70%);
          top: -20%;
          left: -10%;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 1;
          animation: float1 20s infinite ease-in-out alternate;
        }

        .glow-circle-2 {
          position: absolute;
          width: 50vw;
          height: 50vw;
          max-width: 700px;
          max-height: 700px;
          background: radial-gradient(circle, rgba(139, 92, 246, 0.12) 0%, transparent 70%);
          bottom: -20%;
          right: -10%;
          border-radius: 50%;
          filter: blur(60px);
          z-index: 1;
          animation: float2 25s infinite ease-in-out alternate;
        }

        @keyframes float1 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(5%, 5%) scale(1.05); }
        }
        @keyframes float2 {
          0% { transform: translate(0, 0) scale(1); }
          100% { transform: translate(-5%, -5%) scale(1.05); }
        }

        .particles-layer {
          position: absolute;
          inset: 0;
          z-index: 2;
          pointer-events: none;
        }
        .particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(139, 92, 246, 0.3);
          filter: blur(2px);
          animation: floatUp 15s infinite linear;
        }
        .p1 { width: 8px; height: 8px; left: 20%; top: 80%; animation-duration: 22s; }
        .p2 { width: 12px; height: 12px; left: 80%; top: 90%; animation-duration: 28s; animation-delay: 5s; }
        .p3 { width: 6px; height: 6px; left: 50%; top: 70%; animation-duration: 18s; animation-delay: 2s; }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }

        .pref-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 700px;
          padding: 2rem;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .pref-card {
          background: #ffffff;
          border: 1px solid #e2e8f0;
          border-radius: 24px;
          padding: 3rem;
          box-shadow: 0 20px 40px rgba(0, 0, 0, 0.05);
          display: flex;
          flex-direction: column;
        }

        .header-section {
          text-align: center;
          margin-bottom: 2.5rem;
        }

        .pref-title {
          font-size: 2rem;
          font-weight: 800;
          color: #0f172a;
          margin: 0 0 0.5rem 0;
          letter-spacing: -0.02em;
        }

        .pref-subtitle {
          font-size: 1rem;
          color: #64748b;
          margin: 0;
        }

        .modes-grid {
          display: grid;
          grid-template-columns: repeat(2, 1fr);
          gap: 1.2rem;
          margin-bottom: 2.5rem;
        }

        .mode-btn {
          position: relative;
          background: #ffffff;
          border: 2px solid #e2e8f0;
          border-radius: 16px;
          padding: 1.5rem;
          display: flex;
          align-items: flex-start;
          text-align: left;
          gap: 1rem;
          transition: all 0.2s ease;
          cursor: pointer;
          min-height: 110px;
          box-shadow: none;
        }

        .mode-btn:hover {
          border-color: #cbd5e1;
          background: #f8fafc;
        }

        .mode-btn.selected {
          border-color: #7c3aed !important;
          background: #f5f3ff !important;
        }

        .mode-icon-wrapper {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 44px;
          height: 44px;
          border-radius: 12px;
          background: #f1f5f9;
          color: #64748b;
          flex-shrink: 0;
          transition: all 0.3s ease;
        }

        .mode-btn.selected .mode-icon-wrapper {
          background: #7c3aed !important;
          color: #ffffff !important;
        }

        .mode-content {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
          padding-right: 1.5rem;
        }

        .mode-title {
          font-weight: 700;
          font-size: 1.05rem;
          color: #0f172a !important;
          margin-bottom: 0.5rem;
        }

        .tags-container {
          display: flex;
          flex-wrap: wrap;
          gap: 6px;
          align-items: center;
          margin-top: auto;
        }

        .tag-label {
          font-size: 0.7rem;
          font-weight: 600;
          color: #94a3b8 !important;
          text-transform: uppercase;
        }

        .tag {
          font-size: 0.7rem;
          font-weight: 500;
          color: #4f46e5 !important;
          background: #eef2ff !important;
          padding: 2px 8px;
          border-radius: 99px;
          border: 1px solid #c7d2fe !important;
        }

        .mode-btn.selected .tag {
          background: #ede9fe !important;
          border-color: #ddd6fe !important;
          color: #6d28d9 !important;
        }

        .selection-ring {
          position: absolute;
          top: 1.5rem;
          right: 1.5rem;
          width: 24px;
          height: 24px;
          border-radius: 50%;
          border: 2px solid #cbd5e1;
          display: flex;
          align-items: center;
          justify-content: center;
          transition: all 0.3s ease;
          background: #ffffff;
        }

        .mode-btn.selected .selection-ring {
          background: #7c3aed !important;
          border-color: #7c3aed !important;
        }

        .premium-btn-primary {
          width: 100%;
          height: 54px;
          border-radius: 14px;
          background: linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%);
          color: #ffffff;
          font-size: 1.1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }

        .premium-btn-primary:hover:not(.disabled) {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
        }

        .premium-btn-primary.disabled {
          background: #e2e8f0;
          color: #94a3b8;
          box-shadow: none;
          cursor: not-allowed;
          transform: none;
        }

        /* Responsive Layouts */
        @media (max-width: 768px) {
          .pref-container {
            padding: 1.5rem 1rem;
          }
          .pref-card {
            padding: 2rem 1.5rem;
            border-radius: 20px;
          }
          .modes-grid {
            grid-template-columns: 1fr;
          }
          .pref-title {
            font-size: 1.6rem;
          }
          .mode-btn {
            min-height: auto;
          }
        }
      `}</style>
    </div>
  );
};

export default Preferences;
