import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { signUpWithEmail, loginWithEmail, loginWithGoogle, enableGuestMode } from '../services/authService';

const Login = () => {
  const navigate = useNavigate();
  const [isLogin, setIsLogin] = useState(true);
  const [role, setRole] = useState('student');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null);
    setLoading(true);
    try {
      if (isLogin) {
        await loginWithEmail(email, password);
      } else {
        await signUpWithEmail(email, password, role);
      }
      navigate(role === 'student' ? '/loader' : '/parent-dashboard');
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async () => {
    try {
      await loginWithGoogle(role);
      navigate(role === 'student' ? '/loader' : '/parent-dashboard');
    } catch (err) {
      setError(err.message);
    }
  };

  const handleGuestMode = () => {
    enableGuestMode();
    navigate('/loader');
  };

  return (
    <div className="login-page">
      
      {/* Background Ambience */}
      <div className="bg-gradient"></div>
      <div className="glow-circle-1"></div>
      <div className="glow-circle-2"></div>
      
      {/* Floating Particles */}
      <div className="particles-layer">
        <div className="particle p1"></div>
        <div className="particle p2"></div>
        <div className="particle p3"></div>
        <div className="particle p4"></div>
      </div>

      <div className="login-card-container">
        <div className="login-card">
          
          <div className="card-header">
            <img src="/calpLogo.png" alt="CALP Logo" className="calp-logo" />
            <h1 className="card-title">{isLogin ? 'Welcome Back' : 'Join CALP'}</h1>
            <p className="card-subtitle">
              {isLogin ? 'Continue your personalized learning journey.' : 'Start your personalized learning journey today.'}
            </p>
          </div>

          <form onSubmit={handleSubmit} className="login-form">
            {error && (
              <div className="error-message">
                {error}
              </div>
            )}

            <div className="input-group">
              <label htmlFor="email">Email Address</label>
              <input
                id="email"
                type="email"
                placeholder="name@example.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="premium-input"
              />
            </div>

            <div className="input-group">
              <label htmlFor="password">Password</label>
              <input
                id="password"
                type="password"
                placeholder="Enter your password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="premium-input"
              />
            </div>

            {!isLogin && (
              <div className="input-group">
                <label htmlFor="role">I am a</label>
                <select 
                  id="role" 
                  value={role} 
                  onChange={(e) => setRole(e.target.value)} 
                  className="premium-input"
                >
                  <option value="student">Student</option>
                  <option value="parent">Parent/Guardian</option>
                </select>
              </div>
            )}

            <button type="submit" disabled={loading} className="premium-btn-primary">
              {loading ? 'Processing...' : (isLogin ? 'Login' : 'Create Account')}
            </button>
          </form>

          <div className="divider-container">
            <div className="divider-line"></div>
            <span className="divider-text">Or continue with</span>
            <div className="divider-line"></div>
          </div>

          <div className="secondary-actions">
            <button type="button" onClick={handleGoogleLogin} className="premium-btn-secondary">
              <svg viewBox="0 0 24 24" width="20" height="20" xmlns="http://www.w3.org/2000/svg">
                <path d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z" fill="#4285F4"/>
                <path d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" fill="#34A853"/>
                <path d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" fill="#FBBC05"/>
                <path d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" fill="#EA4335"/>
              </svg>
              Continue with Google
            </button>

            <button type="button" onClick={handleGuestMode} className="premium-btn-secondary outline-dashed">
              Continue as Guest
            </button>
          </div>

          <div className="toggle-mode">
            <button onClick={() => setIsLogin(!isLogin)} className="toggle-btn">
              {isLogin ? "Don't have an account? Sign Up" : "Already have an account? Login"}
            </button>
          </div>

        </div>
      </div>

      <style>{`
        .login-page {
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
        .p4 { width: 10px; height: 10px; left: 10%; top: 60%; animation-duration: 25s; animation-delay: 8s; }

        @keyframes floatUp {
          0% { transform: translateY(0) scale(1); opacity: 0; }
          20% { opacity: 0.6; }
          80% { opacity: 0.6; }
          100% { transform: translateY(-100vh) scale(1.5); opacity: 0; }
        }

        .login-card-container {
          position: relative;
          z-index: 10;
          width: 100%;
          max-width: 460px;
          padding: 1rem;
          animation: fadeUp 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards;
        }

        @keyframes fadeUp {
          from { opacity: 0; transform: translateY(30px); }
          to { opacity: 1; transform: translateY(0); }
        }

        .login-card {
          background: rgba(255, 255, 255, 0.85);
          backdrop-filter: blur(15px);
          -webkit-backdrop-filter: blur(15px);
          border: 1px solid rgba(255, 255, 255, 0.6);
          border-radius: 20px;
          padding: 2.5rem;
          box-shadow: 0 20px 60px rgba(0, 0, 0, 0.08);
          display: flex;
          flex-direction: column;
        }

        .card-header {
          text-align: center;
          margin-bottom: 1.5rem;
        }

        .calp-logo {
          height: 36px;
          object-fit: contain;
          margin-bottom: 1rem;
        }

        .card-title {
          font-size: 1.7rem;
          font-weight: 700;
          color: #0f172a;
          margin: 0 0 0.25rem 0;
          letter-spacing: -0.02em;
        }

        .card-subtitle {
          font-size: 0.9rem;
          color: #64748b;
          margin: 0;
        }

        .login-form {
          display: flex;
          flex-direction: column;
          gap: 1rem;
        }

        .error-message {
          padding: 0.8rem;
          background-color: #fef2f2;
          color: #ef4444;
          border-radius: 10px;
          border: 1px solid #f87171;
          font-size: 0.9rem;
          text-align: center;
        }

        .input-group {
          display: flex;
          flex-direction: column;
          gap: 0.4rem;
        }

        .input-group label {
          font-size: 0.85rem;
          font-weight: 500;
          color: #1e293b;
        }

        .premium-input {
          width: 100%;
          height: 46px;
          padding: 0 1rem;
          border-radius: 10px;
          border: 1px solid #cbd5e1;
          background: rgba(255, 255, 255, 0.9);
          font-size: 0.95rem;
          color: #0f172a;
          outline: none;
          transition: all 0.3s ease;
          box-sizing: border-box;
        }

        .premium-input:focus {
          border-color: #8B5CF6;
          box-shadow: 0 0 0 4px rgba(139, 92, 246, 0.15);
          background: #ffffff;
        }

        .premium-btn-primary {
          width: 100%;
          height: 46px;
          border-radius: 10px;
          background: linear-gradient(135deg, #4F46E5 0%, #8B5CF6 100%);
          color: #ffffff;
          font-size: 1rem;
          font-weight: 600;
          border: none;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          box-shadow: 0 10px 25px -5px rgba(79, 70, 229, 0.4);
        }

        .premium-btn-primary:hover {
          transform: translateY(-2px);
          box-shadow: 0 15px 30px -5px rgba(79, 70, 229, 0.5);
        }

        .divider-container {
          display: flex;
          align-items: center;
          justify-content: center;
          margin: 1.5rem 0;
          gap: 1rem;
        }

        .divider-line {
          flex: 1;
          height: 1px;
          background-color: #e2e8f0;
        }

        .divider-text {
          color: #94a3b8;
          font-size: 0.8rem;
          text-transform: uppercase;
          letter-spacing: 0.05em;
        }

        .secondary-actions {
          display: flex;
          flex-direction: column;
          gap: 0.8rem;
        }

        .premium-btn-secondary {
          width: 100%;
          height: 46px;
          border-radius: 10px;
          background: #ffffff;
          color: #334155;
          font-size: 0.95rem;
          font-weight: 500;
          border: 1px solid #cbd5e1;
          cursor: pointer;
          transition: all 0.3s ease;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .premium-btn-secondary:hover {
          background: #f8fafc;
          border-color: #94a3b8;
        }

        .outline-dashed {
          border: 1px dashed #cbd5e1;
          background: transparent;
        }

        .toggle-mode {
          text-align: center;
          margin-top: 1.5rem;
        }

        .toggle-btn {
          background: none;
          border: none;
          color: #64748b;
          font-size: 0.9rem;
          font-weight: 500;
          cursor: pointer;
          text-decoration: underline;
          transition: color 0.3s ease;
        }
        
        .toggle-btn:hover {
          color: #4F46E5;
        }

        /* Responsive Layouts */
        @media (max-width: 768px) {
          .login-card-container {
            max-width: 420px;
            padding: 1rem;
          }
          .login-card {
            padding: 2rem;
            border-radius: 16px;
          }
        }

        @media (max-width: 480px) {
          .login-card-container {
            max-width: 100%;
            padding: 1rem;
          }
          .login-card {
            padding: 1.5rem;
            border-radius: 16px;
          }
          .card-title {
            font-size: 1.5rem;
          }
          .card-subtitle {
            font-size: 0.85rem;
          }
          .premium-input, .premium-btn-primary, .premium-btn-secondary {
            height: 44px;
            font-size: 0.9rem;
          }
          .calp-logo {
            height: 32px;
          }
        }
      `}</style>
    </div>
  );
};

export default Login;
