import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [isMobile, setIsMobile] = useState(window.innerWidth <= 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth <= 768);
    
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <div style={{ 
      position: 'relative',
      width: '100%',
      minHeight: '100vh',
      backgroundColor: '#000000',
      overflowX: 'hidden',
      overflowY: 'auto',
      fontFamily: "'Inter', sans-serif",
      color: '#ffffff'
    }}>
      {/* Fixed Background Video */}
      <div style={{
        position: 'absolute',
        top: 0,
        left: 0,
        width: '100vw',
        height: '100vh',
        zIndex: 0,
        overflow: 'hidden'
      }}>
        {isMobile && false ? (
          <img 
            src="/calpLogo.png" 
            alt="Background" 
            style={{ width: '100%', height: '100%', objectFit: 'cover' }} 
          />
        ) : (
          <video 
            autoPlay 
            loop 
            muted 
            playsInline
            style={{
              width: '100%',
              height: '100%',
              objectFit: 'cover',
            }}
          >
            <source src="/WhatsApp Video 2026-06-03 at 9.41.40 PM.mp4" type="video/mp4" />
          </video>
        )}
        
        {/* Subtle dark overlay */}
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundColor: 'rgba(0, 0, 0, 0.25)',
          zIndex: 1
        }}></div>

        {/* Sunlight Glow Effect */}
        <div style={{
          position: 'absolute',
          top: '-10%',
          right: '-10%',
          width: '50vw',
          height: '50vw',
          background: 'radial-gradient(circle, rgba(255, 230, 150, 0.12) 0%, transparent 60%)',
          zIndex: 1,
          pointerEvents: 'none'
        }}></div>
      </div>

      {/* Cinematic Floating Light Particles */}
      <div className="particles-container" style={{ position: 'absolute', inset: 0, zIndex: 1, pointerEvents: 'none', overflow: 'hidden' }}>
         <div className="light-particle lp1"></div>
         <div className="light-particle lp2"></div>
         <div className="light-particle lp3"></div>
         <div className="light-particle lp4"></div>
         <div className="light-particle lp5"></div>
      </div>

      {/* Hero Content Area */}
      <div className="hero-section" style={{ position: 'relative', zIndex: 10 }}>
        
        <div className="glass-panel">
          <h1 className="hero-title">CALP</h1>
          
          <h2 className="hero-subtitle">
            Cognitive Adaptive Learning Platform
          </h2>

          <div className="divider"></div>

          <h3 className="hero-tagline">
            "Adapting Learning to the Way You Think"
          </h3>
          
          <p className="hero-desc">
            Personalized learning experiences designed to support focus, memory, understanding, and cognitive growth.
          </p>

          {/* Balanced 2x2 Feature Grid */}
          <div className="features-grid">
            <span className="feature-item">
              <span className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M12 2v20M17 5H9.5a3.5 3.5 0 0 0 0 7h5a3.5 3.5 0 0 1 0 7H6"/>
                </svg>
              </span> 
              Adaptive Learning
            </span>
            <span className="feature-item">
              <span className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <path d="M4 19.5A2.5 2.5 0 0 1 6.5 17H20"/>
                  <path d="M6.5 2H20v20H6.5A2.5 2.5 0 0 1 4 19.5v-15A2.5 2.5 0 0 1 6.5 2z"/>
                </svg>
              </span> 
              Personalized Guidance
            </span>
            <span className="feature-item">
              <span className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <polyline points="22 7 13.5 15.5 8.5 10.5 2 17"/>
                  <polyline points="16 7 22 7 22 13"/>
                </svg>
              </span> 
              Progress Tracking
            </span>
            <span className="feature-item">
              <span className="feature-icon">
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <circle cx="12" cy="12" r="10"/>
                  <circle cx="12" cy="12" r="6"/>
                  <circle cx="12" cy="12" r="2"/>
                </svg>
              </span> 
              Focus-Based Learning
            </span>
          </div>

          <button 
            className="start-btn primary-btn"
            onClick={() => navigate('/login')} 
          >
            Begin Your Learning Journey <span className="arrow">→</span>
          </button>
        </div>

      </div>

      <style>{`
        /* Animations & Layout */
        .hero-section {
          min-height: 100vh;
          width: 100vw;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 2rem;
          box-sizing: border-box;
          animation: fadeUp 1s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(40px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* Premium Glass Panel */
        .glass-panel {
          background: rgba(0, 0, 0, 0.3);
          backdrop-filter: blur(16px);
          -webkit-backdrop-filter: blur(16px);
          border: 1px solid rgba(255, 255, 255, 0.1);
          border-radius: 32px;
          padding: 4rem 3rem;
          max-width: 800px;
          width: 100%;
          text-align: center;
          box-shadow: 0 25px 50px -12px rgba(0, 0, 0, 0.5), inset 0 1px 0 rgba(255,255,255,0.1);
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        /* Hero Typography */
        .hero-title {
          margin: 0 0 0.5rem 0;
          font-size: 4.5rem;
          font-weight: 800;
          color: #ffffff;
          letter-spacing: 0.05em;
          text-shadow: 0 2px 10px rgba(0,0,0,0.3);
        }
        
        .hero-subtitle {
          margin: 0 0 1.5rem 0;
          font-size: 1.4rem;
          font-weight: 400;
          color: rgba(255,255,255,0.9);
          letter-spacing: 0.05em;
          text-transform: uppercase;
        }

        .divider {
          width: 60px;
          height: 3px;
          background: linear-gradient(90deg, #4F46E5, #8B5CF6);
          border-radius: 10px;
          margin: 0 auto 2rem;
        }

        .hero-tagline {
          margin: 0 0 1rem 0;
          font-size: 1.3rem;
          font-weight: 500;
          color: #ffffff;
          letter-spacing: 0.02em;
          font-style: italic;
        }

        .hero-desc {
          margin: 0 0 2.5rem 0;
          font-size: 1.1rem;
          font-weight: 300;
          color: rgba(255, 255, 255, 0.75);
          max-width: 600px;
          line-height: 1.6;
        }

        /* Perfectly Balanced 2x2 Feature Grid */
        .features-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 1.2rem;
          margin-bottom: 3rem;
          width: 100%;
          max-width: 650px;
        }

        .feature-item {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          gap: 12px;
          font-size: 1rem;
          color: #ffffff;
          font-weight: 500;
          background: rgba(255, 255, 255, 0.05);
          padding: 1rem 1.2rem;
          border-radius: 16px;
          border: 1px solid rgba(255, 255, 255, 0.08);
          transition: all 0.3s ease;
        }

        .feature-item:hover {
          transform: translateY(-2px);
          background: rgba(255, 255, 255, 0.12);
          border-color: rgba(255, 255, 255, 0.2);
          box-shadow: 0 8px 20px rgba(0,0,0,0.2);
        }

        .feature-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          color: #8B5CF6;
        }

        /* Buttons */
        .start-btn {
          padding: 1.2rem 3.5rem;
          font-size: 1.15rem;
          font-weight: 600;
          color: #ffffff;
          border: none;
          border-radius: 50px;
          cursor: pointer;
          transition: all 0.4s cubic-bezier(0.16, 1, 0.3, 1);
          display: inline-flex;
          align-items: center;
          gap: 10px;
        }
        .primary-btn {
          background: linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%);
          box-shadow: 0 10px 30px -5px rgba(79, 70, 229, 0.4);
        }
        .primary-btn:hover {
          transform: translateY(-4px) scale(1.02);
          box-shadow: 0 15px 35px -5px rgba(79, 70, 229, 0.6), 0 0 25px rgba(139, 92, 246, 0.4);
        }
        .arrow {
          transition: transform 0.3s ease;
        }
        .primary-btn:hover .arrow {
          transform: translateX(5px);
        }

        /* Cinematic Light Particles */
        .light-particle {
          position: absolute;
          border-radius: 50%;
          background: rgba(255, 255, 255, 0.6);
          filter: blur(4px);
          animation: floatLight 15s infinite linear;
          opacity: 0;
        }
        .lp1 { width: 6px; height: 6px; top: 80%; left: 10%; animation-duration: 20s; animation-delay: 0s; }
        .lp2 { width: 4px; height: 4px; top: 90%; left: 40%; animation-duration: 18s; animation-delay: 4s; }
        .lp3 { width: 8px; height: 8px; top: 70%; right: 20%; animation-duration: 25s; animation-delay: 2s; }
        .lp4 { width: 5px; height: 5px; top: 85%; right: 40%; animation-duration: 22s; animation-delay: 7s; }
        .lp5 { width: 7px; height: 7px; top: 75%; left: 70%; animation-duration: 19s; animation-delay: 1s; }

        @keyframes floatLight {
          0% { transform: translateY(0) translateX(0); opacity: 0; }
          20% { opacity: 0.8; }
          80% { opacity: 0.8; }
          100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
        }

        /* Mobile Adjustments */
        @media (max-width: 768px) {
          .hero-section {
            padding: 1rem;
            min-height: 100vh;
            padding-top: 2rem;
            padding-bottom: 2rem;
          }
          .glass-panel {
            padding: 2rem 1.2rem;
            border-radius: 24px;
          }
          .hero-title {
            font-size: 2.8rem;
          }
          .hero-subtitle {
            font-size: 0.95rem;
            margin-bottom: 1rem;
          }
          .divider {
            margin-bottom: 1.5rem;
          }
          .hero-tagline {
            font-size: 1.05rem;
          }
          .hero-desc {
            font-size: 0.9rem;
            margin-bottom: 1.5rem;
            line-height: 1.5;
          }
          .features-grid {
            grid-template-columns: 1fr; /* Stack vertically on mobile */
            gap: 0.6rem;
            margin-bottom: 2rem;
          }
          .feature-item {
            padding: 0.8rem 1rem;
            font-size: 0.9rem;
            justify-content: flex-start;
          }
          .start-btn {
            width: 100%;
            justify-content: center;
            padding: 1rem;
            font-size: 1.05rem;
          }
        }
      `}</style>
    </div>
  );
};

export default LandingPage;

