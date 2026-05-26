import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import api from "../../api/axiosConfig";

export default function LoginPage() {
  const navigate = useNavigate();

  const [form, setForm] = useState({ email: "", password: "" });
  const [errors, setErrors] = useState({ email: "", password: "", general: "" });
  const [showPassword, setShowPassword] = useState(false);
  const [remember, setRemember] = useState(false);

  function handleChange(e) {
    const { name, value } = e.target;
    setForm({ ...form, [name]: value });
    if (errors[name]) {
      setErrors({ ...errors, [name]: "", general: "" });
    }
  }

  async function handleSubmit(e) {
    e.preventDefault();

    try {
      const res = await api.post("/login", 
        { email: form.email, password: form.password },
        { withCredentials: true }
      );

      if (res.data.otpRequired) {
        localStorage.setItem("email", form.email);
        navigate("/otp");
      } else {
        localStorage.setItem("token", res.data.accessToken);
        navigate("/alltrf");
      }
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Login failed";
      if (errorMessage.toLowerCase().includes("email") || errorMessage.toLowerCase().includes("not found")) {
        setErrors({ ...errors, email: errorMessage, password: "", general: "" });
      } else if (errorMessage.toLowerCase().includes("password")) {
        setErrors({ ...errors, password: errorMessage, email: "", general: "" });
      } else {
        setErrors({ ...errors, general: errorMessage, email: "", password: "" });
      }
    }
  }

  return (
    <>
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      <style>{`
        * {
          margin: 0;
          padding: 0;
          box-sizing: border-box;
        }

        .login-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f4f2;
          padding: 24px;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
        }

        .login-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 560px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        /* LEFT DARK PANEL */
        .dark-panel {
          flex: 1.1;
          background: #0f0f0f;
          display: flex;
          flex-direction: column;
          justify-content: flex-end;
          padding: 48px 44px;
          position: relative;
          overflow: hidden;
        }

        .deco-circle-1 {
          position: absolute;
          width: 340px;
          height: 340px;
          border-radius: 50%;
          border: 0.5px solid rgba(255,255,255,0.07);
          top: -80px;
          left: -80px;
          pointer-events: none;
        }

        .deco-circle-2 {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 0.5px solid rgba(255,255,255,0.05);
          top: 60px;
          right: -40px;
          pointer-events: none;
        }

        .bg-letter {
          font-family: 'Playfair Display', serif;
          font-size: 96px;
          font-weight: 600;
          color: rgba(255,255,255,0.06);
          position: absolute;
          top: 28px;
          left: 36px;
          line-height: 1;
          letter-spacing: -4px;
          user-select: none;
          pointer-events: none;
        }

        .tag-pill {
          display: inline-flex;
          align-items: center;
          gap: 7px;
          background: rgba(255,255,255,0.08);
          border: 0.5px solid rgba(255,255,255,0.12);
          border-radius: 100px;
          padding: 6px 14px;
          font-size: 11px;
          color: rgba(255,255,255,0.55);
          letter-spacing: 0.08em;
          text-transform: uppercase;
          font-weight: 500;
          margin-bottom: 20px;
        }

        .tag-dot {
          width: 6px;
          height: 6px;
          background: #fff;
          border-radius: 50%;
          opacity: 0.7;
        }

        .dark-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 14px 0;
        }

        .dark-desc {
          font-size: 13px;
          color: rgba(255,255,255,0.45);
          font-weight: 300;
          line-height: 1.7;
          max-width: 260px;
          margin: 0 0 24px 0;
        }

        .divider-line {
          width: 32px;
          height: 1px;
          background: rgba(255,255,255,0.2);
          margin-bottom: 24px;
        }

        .stats-container {
          display: flex;
          gap: 32px;
        }

        .stat-number {
          display: block;
          font-family: 'Playfair Display', serif;
          font-size: 22px;
          color: #fff;
          font-weight: 600;
        }

        .stat-label {
          display: block;
          font-size: 11px;
          color: rgba(255,255,255,0.35);
          text-transform: uppercase;
          letter-spacing: 0.06em;
          margin-top: 2px;
        }

        /* RIGHT LIGHT PANEL */
        .light-panel {
          flex: 1;
          background: #ffffff;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 44px;
        }

        .logo-wrapper {
          display: flex;
          align-items: center;
          gap: 10px;
        }

        .logo-box {
          width: 30px;
          height: 30px;
          background: #0f0f0f;
          border-radius: 7px;
          display: flex;
          align-items: center;
          justify-content: center;
          font-family: 'Playfair Display', serif;
          color: #fff;
          font-size: 14px;
          font-weight: 600;
        }

        .logo-text {
          font-family: 'Playfair Display', serif;
          font-size: 15px;
          color: #0f0f0f;
          font-weight: 600;
        }

        .secure-badge {
          font-size: 11px;
          color: rgba(0,0,0,0.35);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        .welcome-title {
          font-family: 'Playfair Display', serif;
          font-size: 28px;
          font-weight: 600;
          color: #0f0f0f;
          margin: 0 0 6px 0;
          line-height: 1.2;
        }

        .welcome-sub {
          font-size: 13px;
          color: rgba(0,0,0,0.45);
          font-weight: 300;
          margin: 0 0 32px 0;
        }

        .error-general {
          background: #fff2f2;
          border: 0.5px solid #f5c6c6;
          border-radius: 8px;
          padding: 10px 14px;
          font-size: 13px;
          color: #c0392b;
          margin-bottom: 20px;
        }

        .input-group {
          margin-bottom: 20px;
        }

        .input-label {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          font-weight: 500;
          color: rgba(0,0,0,0.5);
          text-transform: uppercase;
          letter-spacing: 0.07em;
          margin-bottom: 8px;
        }

        /* FIXED: Same height for both inputs */
        .input-field {
          width: 100%;
          height: 48px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 0 16px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          color: #0f0f0f;
          background: #fafafa;
          outline: none;
          transition: all 0.2s ease;
        }

        .input-field:focus {
          border-color: #0f0f0f;
          background: #ffffff;
        }

        .input-field.input-error {
          border-color: #e74c3c;
          background: #fff9f9;
        }

        /* Password wrapper - no extra height issues */
        .password-wrapper {
          position: relative;
          width: 100%;
        }

        .password-input {
          padding-right: 44px; /* space for eye button */
        }

        .eye-btn {
          position: absolute;
          right: 14px;
          top: 50%;
          transform: translateY(-50%);
          background: none;
          border: none;
          padding: 0;
          cursor: pointer;
          opacity: 0.45;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 24px;
          height: 24px;
        }

        .error-text {
          font-size: 11px;
          color: #c0392b;
          margin: 5px 0 0 0;
        }

        .options-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin: 4px 0 28px 0;
        }

        .remember-check {
          display: flex;
          align-items: center;
          gap: 8px;
          cursor: pointer;
          user-select: none;
        }

        .checkbox-custom {
          width: 16px;
          height: 16px;
          border: 1px solid rgba(0,0,0,0.2);
          border-radius: 4px;
          background: #fff;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .checkbox-custom.checked {
          background: #0f0f0f;
          border-color: #0f0f0f;
        }

        .forgot-link {
          font-size: 12px;
          color: rgba(0,0,0,0.5);
          text-decoration: none;
        }

        .signin-btn {
          width: 100%;
          height: 48px;
          background: #0f0f0f;
          color: #fff;
          border: none;
          border-radius: 10px;
          font-family: 'DM Sans', sans-serif;
          font-size: 14px;
          font-weight: 500;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
        }

        .signin-btn:hover {
          background: #2c2c2c;
        }

        .divider {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 24px 0;
        }

        .divider-line-hr {
          flex: 1;
          height: 0.5px;
          background: rgba(0,0,0,0.1);
        }

        .divider-text {
          font-size: 11px;
          color: rgba(0,0,0,0.3);
          text-transform: uppercase;
          letter-spacing: 0.06em;
        }

        .signup-text {
          text-align: center;
          font-size: 13px;
          color: rgba(0,0,0,0.4);
          margin: 0;
        }

        .signup-link {
          color: #0f0f0f;
          font-weight: 500;
          text-decoration: underline;
          text-underline-offset: 2px;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .login-card {
            flex-direction: column;
            max-width: 500px;
          }
          .dark-panel {
            padding: 32px 28px;
            text-align: center;
            align-items: center;
          }
          .dark-desc {
            max-width: 100%;
          }
          .stats-container {
            justify-content: center;
            flex-wrap: wrap;
          }
          .light-panel {
            padding: 36px 28px;
          }
          .deco-circle-1, .deco-circle-2, .bg-letter {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .login-root {
            padding: 16px;
          }
          .dark-panel, .light-panel {
            padding: 24px 20px;
          }
          .welcome-title {
            font-size: 24px;
          }
          .input-field {
            height: 44px;
          }
        }
      `}</style>

      <div className="login-root">
        <div className="login-card">
          {/* LEFT DARK PANEL */}
          <div className="dark-panel">
            <div className="deco-circle-1"></div>
            <div className="deco-circle-2"></div>
            <div className="bg-letter">A</div>
            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="tag-pill">
                <span className="tag-dot"></span>
                Enterprise Portal
              </div>
              <h1 className="dark-title">
                Aryan Group<br />of Companies
              </h1>
              <p className="dark-desc">
                Streamlined access to your workspace, tools, and resources.
              </p>
              <div className="divider-line"></div>
              <div className="stats-container">
                <div><span className="stat-number">12+</span><span className="stat-label">Divisions</span></div>
                <div><span className="stat-number">500+</span><span className="stat-label">Employees</span></div>
                <div><span className="stat-number">24/7</span><span className="stat-label">Support</span></div>
              </div>
            </div>
          </div>

          {/* RIGHT LIGHT PANEL */}
          <div className="light-panel">
            <div className="top-bar">
              <div className="logo-wrapper">
                <div className="logo-box">A</div>
                <span className="logo-text">Aryan Group</span>
              </div>
              <span className="secure-badge">Secure Login</span>
            </div>

            <h2 className="welcome-title">Welcome back</h2>
            <p className="welcome-sub">Sign in to access your account</p>

            {errors.general && (
              <div className="error-general">{errors.general}</div>
            )}

            <form onSubmit={handleSubmit} noValidate>
              {/* Email Field */}
              <div className="input-group">
                <label className="input-label">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                    <circle cx="8" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Email address
                </label>
                <input
                  type="text"
                  name="email"
                  placeholder="you@aryangroup.com"
                  value={form.email}
                  onChange={handleChange}
                  autoComplete="off"
                  className={`input-field ${errors.email ? 'input-error' : ''}`}
                />
                {errors.email && <p className="error-text">{errors.email}</p>}
              </div>

              {/* Password Field - FIXED size */}
              <div className="input-group">
                <label className="input-label">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                    <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Password
                </label>
                <div className="password-wrapper">
                  <input
                    type={showPassword ? "text" : "password"}
                    name="password"
                    placeholder="Enter your password"
                    value={form.password}
                    onChange={handleChange}
                    autoComplete="off"
                    className={`input-field password-input ${errors.password ? 'input-error' : ''}`}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    tabIndex={-1}
                    className="eye-btn"
                    aria-label="Toggle password visibility"
                  >
                    {showPassword ? (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <path d="M3 3l14 14M8.5 8.6a2.5 2.5 0 003.4 3.4" stroke="#888" strokeWidth="1.3" strokeLinecap="round" />
                        <path d="M4.3 6.5C2.6 7.8 1.5 9.3 1.5 10s2.7 5 8.5 5c1.5 0 2.8-.3 4-.8M7 4.3C7.9 4.1 8.9 4 10 4c5.8 0 8.5 4.3 8.5 5s-.8 1.9-2.3 3" stroke="#888" strokeWidth="1.3" strokeLinecap="round" />
                      </svg>
                    ) : (
                      <svg width="16" height="16" viewBox="0 0 20 20" fill="none">
                        <ellipse cx="10" cy="10" rx="8.5" ry="5" stroke="#888" strokeWidth="1.3" />
                        <circle cx="10" cy="10" r="2.5" stroke="#888" strokeWidth="1.3" />
                      </svg>
                    )}
                  </button>
                </div>
                {errors.password && <p className="error-text">{errors.password}</p>}
              </div>

              {/* Remember & Forgot */}
              <div className="options-row">
                <div onClick={() => setRemember(!remember)} className="remember-check">
                  <div className={`checkbox-custom ${remember ? 'checked' : ''}`}>
                    {remember && (
                      <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                        <path d="M2 5l2.5 2.5L8 3" stroke="#fff" strokeWidth="1.4" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    )}
                  </div>
                  <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.45)" }}>Remember me</span>
                </div>
                <Link to="/forgot-password" className="forgot-link">Forgot password?</Link>
              </div>

              {/* Submit Button */}
              <button type="submit" className="signin-btn">
                Sign In
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <div className="divider">
              <span className="divider-line-hr"></span>
              <span className="divider-text">or</span>
              <span className="divider-line-hr"></span>
            </div>

            <p className="signup-text">
              New to Aryan Group?{" "}
              <Link to="/signup" className="signup-link">Signup</Link>
            </p>
          </div>
        </div>
      </div>
    </>
  );
}