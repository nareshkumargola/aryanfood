import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import FormValidators from "./FormValidators";
import api from "../../api/axiosConfig";

export default function SignupPage() {
  let [data, setData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    cpassword: "",
  });

  let [errorMessage, setErrorMessage] = useState({
    name: "Name Field is Mendatory",
    email: "Email Address Field is Mendatory",
    phone: "Phone Number Field is Mendatory",
    password: "Password Field is Mendatory",
    cpassword: "",
  });

  let [show, setShow] = useState(false);
  let navigate = useNavigate();

  function getInputData(e) {
    let { name, value } = e.target;
    setData({ ...data, [name]: value });
    let validationError = FormValidators(e);
    
    // Special handling for confirm password
    if (name === "cpassword") {
      if (value !== data.password) {
        validationError = "Passwords do not match";
      } else {
        validationError = "";
      }
    }
    if (name === "password") {
      // Also revalidate cpassword if it already has a value
      if (data.cpassword && data.cpassword !== value) {
        setErrorMessage(prev => ({ ...prev, cpassword: "Passwords do not match" }));
      } else if (data.cpassword && data.cpassword === value) {
        setErrorMessage(prev => ({ ...prev, cpassword: "" }));
      }
    }
    
    setErrorMessage({ ...errorMessage, [name]: validationError });
  }

  async function postData(e) {
    e.preventDefault();

    // Also check if passwords match
    if (data.password !== data.cpassword) {
      setErrorMessage(prev => ({ ...prev, cpassword: "Passwords do not match" }));
      setShow(true);
      return;
    }

    let error = Object.values(errorMessage).find((x) => x !== "");
    if (error) {
      setShow(true);
      return;
    }

    try {
      let res = await api.post("/signup", {
        name: data.name,
        email: data.email,
        phone: data.phone,
        password: data.password,
      });
      alert(res.data.message);
      navigate("/");
    } catch (err) {
      alert(err.response?.data?.message || "Error");
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

        .signup-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f4f2;
          padding: 24px;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
        }

        .signup-card {
          display: flex;
          width: 100%;
          max-width: 900px;
          min-height: 600px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        /* LEFT WHITE PANEL */
        .form-panel {
          flex: 1;
          background: #ffffff;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* RIGHT DARK PANEL */
        .brand-panel {
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
          bottom: -80px;
          right: -80px;
          pointer-events: none;
        }

        .deco-circle-2 {
          position: absolute;
          width: 200px;
          height: 200px;
          border-radius: 50%;
          border: 0.5px solid rgba(255,255,255,0.05);
          bottom: 60px;
          left: -40px;
          pointer-events: none;
        }

        .bg-letter {
          font-family: 'Playfair Display', serif;
          font-size: 96px;
          font-weight: 600;
          color: rgba(255,255,255,0.06);
          position: absolute;
          top: 28px;
          right: 36px;
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

        .brand-title {
          font-family: 'Playfair Display', serif;
          font-size: 34px;
          font-weight: 600;
          color: #ffffff;
          line-height: 1.25;
          margin: 0 0 14px 0;
        }

        .brand-desc {
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

        .perk-item {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .perk-icon {
          width: 20px;
          height: 20px;
          border-radius: 50%;
          background: rgba(255,255,255,0.08);
          border: 0.5px solid rgba(255,255,255,0.15);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .perk-text {
          font-size: 13px;
          color: rgba(255,255,255,0.55);
          font-weight: 300;
        }

        /* Form elements */
        .input-group {
          margin-bottom: 18px;
        }

        .input-row {
          display: flex;
          gap: 16px;
          margin-bottom: 18px;
        }

        .input-row .input-group {
          flex: 1;
          margin-bottom: 0;
        }

        .form-label {
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

        .form-input {
          width: 100%;
          height: 44px;
          border: 1px solid rgba(0,0,0,0.1);
          border-radius: 10px;
          padding: 0 14px;
          font-family: 'DM Sans', sans-serif;
          font-size: 13px;
          color: #0f0f0f;
          background: #fafafa;
          outline: none;
          transition: all 0.2s;
        }

        .form-input:focus {
          border-color: #0f0f0f;
          background: #fff;
        }

        .form-input.input-error {
          border-color: #e74c3c;
          background: #fff9f9;
        }

        .error-text {
          font-size: 11px;
          color: #c0392b;
          margin: 4px 0 0 0;
        }

        .signup-btn {
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
          transition: background 0.2s;
        }

        .signup-btn:hover {
          background: #2c2c2c;
        }

        /* Top bar */
        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 36px;
        }

        .logo {
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

        .new-badge {
          font-size: 11px;
          color: rgba(0,0,0,0.35);
          letter-spacing: 0.06em;
          text-transform: uppercase;
        }

        /* Responsive */
        @media (max-width: 768px) {
          .signup-card {
            flex-direction: column;
            max-width: 500px;
          }
          
          .brand-panel {
            order: -1; /* Dark panel upar aayega */
            padding: 32px 28px;
            text-align: center;
            align-items: center;
            justify-content: center;
          }
          
          .brand-desc {
            max-width: 100%;
          }
          
          .divider-line {
            margin-left: auto;
            margin-right: auto;
          }
          
          .perk-item {
            justify-content: center;
          }
          
          .form-panel {
            padding: 36px 28px;
          }
          
          .input-row {
            flex-direction: column;
            gap: 18px;
            margin-bottom: 0;
          }
          
          .input-row .input-group {
            margin-bottom: 18px;
          }
          
          .deco-circle-1, .deco-circle-2, .bg-letter {
            display: none;
          }
        }

        @media (max-width: 480px) {
          .signup-root {
            padding: 16px;
          }
          .brand-panel, .form-panel {
            padding: 24px 20px;
          }
          .brand-title {
            font-size: 28px;
          }
          .form-input {
            height: 42px;
            font-size: 13px;
          }
          .signup-btn {
            height: 44px;
          }
          .top-bar {
            margin-bottom: 28px;
          }
        }
      `}</style>

      <div className="signup-root">
        <div className="signup-card">
          {/* LEFT WHITE PANEL - FORM */}
          <div className="form-panel">
            <div className="top-bar">
              <div className="logo">
                <div className="logo-box">A</div>
                <span className="logo-text">Aryan Group</span>
              </div>
              <span className="new-badge">New Account</span>
            </div>

            <h2 className="brand-title" style={{ fontSize: "26px", margin: "0 0 6px 0" }}>
              Create your account
            </h2>
            <p style={{ fontSize: "13px", color: "rgba(0,0,0,0.45)", fontWeight: 300, margin: "0 0 28px 0" }}>
              Join the Aryan Group portal today
            </p>

            <form onSubmit={postData} noValidate>
              {/* Row: Name + Phone */}
              <div className="input-row">
                {/* Name */}
                <div className="input-group">
                  <label className="form-label">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                      <circle cx="8" cy="5" r="3.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M2 14c0-3.3 2.7-6 6-6s6 2.7 6 6" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Full Name
                  </label>
                  <input
                    type="text"
                    name="name"
                    placeholder="Full Name"
                    onChange={getInputData}
                    className={`form-input ${show && errorMessage.name ? "input-error" : ""}`}
                  />
                  {show && errorMessage.name && <p className="error-text">{errorMessage.name}</p>}
                </div>

                {/* Phone */}
                <div className="input-group">
                  <label className="form-label">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                      <rect x="4" y="1" width="8" height="14" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <circle cx="8" cy="12" r="0.8" fill="currentColor" />
                    </svg>
                    Phone
                  </label>
                  <input
                    type="text"
                    name="phone"
                    placeholder="Phone Number"
                    onChange={getInputData}
                    className={`form-input ${show && errorMessage.phone ? "input-error" : ""}`}
                  />
                  {show && errorMessage.phone && <p className="error-text">{errorMessage.phone}</p>}
                </div>
              </div>

              {/* Email */}
              <div className="input-group">
                <label className="form-label">
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                    <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                    <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                  </svg>
                  Email Address
                </label>
                <input
                  type="email"
                  name="email"
                  placeholder="Email Address"
                  onChange={getInputData}
                  className={`form-input ${show && errorMessage.email ? "input-error" : ""}`}
                />
                {show && errorMessage.email && <p className="error-text">{errorMessage.email}</p>}
              </div>

              {/* Row: Password + Confirm Password */}
              <div className="input-row">
                {/* Password */}
                <div className="input-group">
                  <label className="form-label">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                    </svg>
                    Password
                  </label>
                  <input
                    type="password"
                    name="password"
                    placeholder="Enter Password"
                    onChange={getInputData}
                    className={`form-input ${show && errorMessage.password ? "input-error" : ""}`}
                  />
                  {show && errorMessage.password && <p className="error-text">{errorMessage.password}</p>}
                </div>

                {/* Confirm Password */}
                <div className="input-group">
                  <label className="form-label">
                    <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                      <rect x="3" y="7" width="10" height="7" rx="1.5" stroke="currentColor" strokeWidth="1.2" />
                      <path d="M5.5 7V5a2.5 2.5 0 015 0v2" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" />
                      <path d="M6 11l1.5 1.5L10 9.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                    Confirm
                  </label>
                  <input
                    type="password"
                    name="cpassword"
                    placeholder="Confirm Password"
                    onChange={getInputData}
                    className={`form-input ${show && errorMessage.cpassword ? "input-error" : ""}`}
                  />
                  {show && errorMessage.cpassword && <p className="error-text">{errorMessage.cpassword}</p>}
                </div>
              </div>

              <button type="submit" className="signup-btn">
                Create Account
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M3 8h10M9 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
              </button>
            </form>

            <div className="divider" style={{ display: "flex", alignItems: "center", gap: "12px", margin: "22px 0" }}>
              <span style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
              <span style={{ fontSize: "11px", color: "rgba(0,0,0,0.3)", textTransform: "uppercase", letterSpacing: "0.06em" }}>or</span>
              <span style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
            </div>

            <p style={{ textAlign: "center", fontSize: "13px", color: "rgba(0,0,0,0.4)", margin: 0 }}>
              Already have an account?{" "}
              <Link to="/" style={{ color: "#0f0f0f", fontWeight: 500, textDecoration: "underline", textUnderlineOffset: "2px" }}>
                Login
              </Link>
            </p>
          </div>

          {/* RIGHT DARK PANEL - BRANDING */}
          <div className="brand-panel">
            <div className="deco-circle-1"></div>
            <div className="deco-circle-2"></div>
            <div className="bg-letter">A</div>

            <div style={{ position: "relative", zIndex: 1 }}>
              <div className="tag-pill">
                <span className="tag-dot"></span>
                Join Us Today
              </div>
              <h1 className="brand-title">
                Aryan Group<br />of Companies
              </h1>
              <p className="brand-desc">
                Become part of a growing enterprise with access to world-class tools and teams.
              </p>
              <div className="divider-line"></div>
              {["Instant portal access", "Dedicated support team", "Secure & encrypted data"].map((perk) => (
                <div key={perk} className="perk-item">
                  <div className="perk-icon">
                    <svg width="10" height="10" viewBox="0 0 10 10" fill="none">
                      <path d="M2 5l2.5 2.5L8 3" stroke="rgba(255,255,255,0.7)" strokeWidth="1.3" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  </div>
                  <span className="perk-text">{perk}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
}