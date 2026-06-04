import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Loader = () => {
  const navigate = useNavigate();
  const [progress, setProgress] = useState(0);
  const [messageIndex, setMessageIndex] = useState(0);

  const messages = [
    "🧠 Analyzing Learning Preferences...",
    "📚 Building Personalized Learning Path...",
    "🎯 Adapting Teaching Style...",
    "🚀 Preparing Your Dashboard..."
  ];

  useEffect(() => {
    // Reduced loading time: 2.5 seconds total
    const totalTime = 2500;
    const messageDuration = totalTime / messages.length; // ~625ms per message
    
    // Timer for navigation
    const navTimer = setTimeout(() => {
      navigate('/preferences');
    }, totalTime);

    // Timer for progress bar
    const progressInterval = setInterval(() => {
      setProgress(prev => {
        if (prev >= 100) {
          clearInterval(progressInterval);
          return 100;
        }
        // Update more frequently for smoother counting
        return Math.min(prev + (100 / (totalTime / 30)), 100);
      });
    }, 30);

    // Timer for messages
    const messageInterval = setInterval(() => {
      setMessageIndex(prev => (prev + 1) % messages.length);
    }, messageDuration);

    return () => {
      clearTimeout(navTimer);
      clearInterval(progressInterval);
      clearInterval(messageInterval);
    };
  }, [navigate]);

  return (
    <div className="animate-in" style={{ 
      position: 'relative',
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      textAlign: 'center',
      width: '100%',
      padding: '0 20px',
      boxSizing: 'border-box',
      backgroundColor: '#f8fafc',
      overflow: 'hidden'
    }}>
      {/* AI Background Animation */}
      <div style={{
        position: 'absolute',
        top: '10%',
        left: '15%',
        width: '300px',
        height: '300px',
        background: 'radial-gradient(circle, rgba(139, 92, 246, 0.08) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(40px)',
        zIndex: 0,
        animation: 'float 6s ease-in-out infinite'
      }} />
      <div style={{
        position: 'absolute',
        bottom: '10%',
        right: '15%',
        width: '400px',
        height: '400px',
        background: 'radial-gradient(circle, rgba(59, 130, 246, 0.08) 0%, rgba(255,255,255,0) 70%)',
        borderRadius: '50%',
        filter: 'blur(60px)',
        zIndex: 0,
        animation: 'float 8s ease-in-out infinite reverse'
      }} />

      <div style={{ position: 'relative', zIndex: 10, display: 'flex', flexDirection: 'column', alignItems: 'center', width: '100%', maxWidth: '500px' }}>
        
        {/* Animated CALP Logo */}
        <div className="logo-container" style={{ marginBottom: '3rem', position: 'relative' }}>
          <div className="glow-aura"></div>
          <div style={{
            position: 'relative',
            width: '100px',
            height: '100px',
            backgroundColor: '#ffffff',
            borderRadius: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            boxShadow: '0 0 20px rgba(99,102,241,0.3), 0 0 40px rgba(139,92,246,0.2)',
            zIndex: 2,
            border: '1px solid rgba(139,92,246,0.1)'
          }}>
            <img src="/calpLogo.png" alt="CALP Logo" style={{ width: '65%', height: '65%', objectFit: 'contain' }} />
          </div>
        </div>
        
        <h2 style={{ color: '#0f172a', fontSize: 'clamp(1.5rem, 5vw, 1.8rem)', fontWeight: '800', marginBottom: '1.2rem', letterSpacing: '-0.02em' }}>
          Setting up your learning environment
        </h2>
        
        <div style={{ height: '24px', marginBottom: '2.5rem', position: 'relative', width: '100%', display: 'flex', justifyContent: 'center' }}>
          {messages.map((msg, index) => (
             <p key={index} style={{ 
               position: 'absolute',
               color: '#64748b', 
               fontSize: 'clamp(1rem, 3vw, 1.1rem)', 
               margin: 0, 
               fontWeight: '500',
               opacity: index === messageIndex ? 1 : 0,
               transition: 'opacity 0.4s ease-in-out',
               width: '100%'
             }}>
               {msg}
             </p>
          ))}
        </div>

        {/* Progress Bar */}
        <div style={{ width: '100%', maxWidth: '320px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '0.6rem', color: '#64748b', fontSize: '0.85rem', fontWeight: '600' }}>
            <span>Loading...</span>
            <span style={{ transition: 'opacity 0.2s', opacity: progress > 0 ? 1 : 0 }}>{Math.floor(progress)}%</span>
          </div>
          <div style={{ width: '100%', height: '6px', backgroundColor: '#e2e8f0', borderRadius: '10px', overflow: 'hidden' }}>
            <div style={{ 
              width: `${progress}%`, 
              height: '100%', 
              background: 'linear-gradient(90deg, #3b82f6, #8b5cf6)', 
              borderRadius: '10px',
              transition: 'width 0.1s linear' 
            }}></div>
          </div>
        </div>
      </div>

      <style>{`
        .logo-container {
          animation: gentleFloat 3s ease-in-out infinite alternate;
        }

        .glow-aura {
          position: absolute;
          inset: -15px;
          border-radius: 35px;
          background: linear-gradient(135deg, rgba(59,130,246,0.3) 0%, rgba(167,139,250,0.3) 100%);
          filter: blur(20px);
          animation: pulseAura 2s ease-in-out infinite alternate;
          z-index: 1;
        }

        @keyframes gentleFloat {
          0% { transform: translateY(0); }
          100% { transform: translateY(-10px); }
        }

        @keyframes pulseAura {
          0% { transform: scale(1); opacity: 0.5; }
          100% { transform: scale(1.1); opacity: 0.9; }
        }

        @keyframes float {
          0% { transform: translateY(0px) rotate(0deg); }
          50% { transform: translateY(-20px) rotate(5deg); }
          100% { transform: translateY(0px) rotate(0deg); }
        }
      `}</style>
    </div>
  );
};

export default Loader;
