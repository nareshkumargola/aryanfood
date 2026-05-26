import { useNavigate } from "react-router-dom";
import { useState } from "react";
import api from "../../api/axiosConfig";

export default function ForgotPassword() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  async function handleSendLink(e) {
    e.preventDefault();
    setError("");

    try {
      const res = await api.post("/forgot-password", { email });
      alert(res.data.message);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
  }

  return (
    <>
      {/* Google Fonts + Keyframe Animations + Responsive Styles */}
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@400;600;700&family=DM+Sans:wght@300;400;500;600&display=swap');

        @keyframes floatUp {
          0%   { transform: translateY(0px);   opacity: 0.5; }
          50%  { transform: translateY(-14px); opacity: 1;   }
          100% { transform: translateY(0px);   opacity: 0.5; }
        }

        @keyframes spinSlow {
          from { transform: rotate(0deg);   }
          to   { transform: rotate(360deg); }
        }

        @keyframes pulseDot {
          0%, 100% { transform: scale(1);   opacity: 0.7; }
          50%       { transform: scale(1.5); opacity: 1;   }
        }

        @keyframes fadeInUp {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0);    }
        }

        .fp-float  { animation: floatUp   3.5s ease-in-out infinite; }
        .fp-spin   { animation: spinSlow  10s linear infinite;        }
        .fp-pulse  { animation: pulseDot  2s ease-in-out infinite;    }
        .fp-fadein { animation: fadeInUp  0.6s ease forwards;         }

        .fp-submit:hover { opacity: 0.85; }
        .fp-submit:active { transform: scale(0.985); }
        .fp-back:hover { color: #0f0f0f !important; }

        /* Responsive Styles */
        .forgot-root {
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          background: #f4f4f2;
          padding: 24px;
          font-family: 'DM Sans', 'Segoe UI', sans-serif;
        }

        .forgot-card {
          display: flex;
          width: 100%;
          max-width: 860px;
          min-height: 500px;
          border-radius: 20px;
          overflow: hidden;
          box-shadow: 0 20px 60px rgba(0,0,0,0.12);
        }

        /* Left Dark Panel */
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

        /* Right White Panel */
        .light-panel {
          flex: 1;
          background: #ffffff;
          padding: 48px;
          display: flex;
          flex-direction: column;
          justify-content: center;
        }

        /* Responsive Breakpoints */
        @media (max-width: 768px) {
          .forgot-card {
            flex-direction: column;
            max-width: 500px;
          }
          .dark-panel {
            order: -1;
            padding: 32px 28px;
            text-align: center;
            align-items: center;
            justify-content: center;
          }
          .light-panel {
            padding: 36px 28px;
          }
          .dark-panel .fp-float,
          .dark-panel .fp-spin,
          .dark-panel .fp-pulse,
          .dark-panel .bg-letter {
            display: none;
          }
          .dark-panel .dark-desc {
            max-width: 100%;
          }
          .dark-panel .divider-line {
            margin-left: auto;
            margin-right: auto;
          }
          .dark-panel .steps-container {
            align-items: center;
          }
        }

        @media (max-width: 480px) {
          .forgot-root {
            padding: 16px;
          }
          .dark-panel, .light-panel {
            padding: 24px 20px;
          }
          .dark-panel h1 {
            font-size: 28px !important;
          }
          .light-panel h2 {
            font-size: 24px !important;
          }
          .light-panel input {
            height: 44px !important;
            font-size: 13px !important;
          }
          .light-panel button {
            height: 44px !important;
          }
        }
      `}</style>

      <div className="forgot-root">
        <div className="forgot-card">
          {/* LEFT DARK PANEL — ANIMATED */}
          <div className="dark-panel">
            {/* Diagonal line texture */}
            <div style={{
              position: "absolute", inset: 0,
              backgroundImage: "repeating-linear-gradient(-45deg, rgba(255,255,255,0.015) 0px, rgba(255,255,255,0.015) 1px, transparent 1px, transparent 28px)",
              pointerEvents: "none",
            }} />

            {/* Spinning outer ring */}
            <div className="fp-spin" style={{
              position: "absolute",
              width: "320px", height: "320px",
              borderRadius: "50%",
              border: "0.5px dashed rgba(255,255,255,0.1)",
              top: "-60px", left: "-60px",
              pointerEvents: "none",
            }} />

            {/* Static inner ring */}
            <div style={{
              position: "absolute",
              width: "200px", height: "200px",
              borderRadius: "50%",
              border: "0.5px solid rgba(255,255,255,0.06)",
              top: "40px", left: "20px",
              pointerEvents: "none",
            }} />

            {/* Floating lock icon */}
            <div className="fp-float" style={{
              position: "absolute",
              top: "60px", right: "44px",
              pointerEvents: "none",
            }}>
              <div style={{
                width: "56px", height: "56px",
                background: "rgba(255,255,255,0.06)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: "14px",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <svg width="24" height="24" viewBox="0 0 24 24" fill="none">
                  <rect x="4" y="11" width="16" height="11" rx="2" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4"/>
                  <path d="M8 11V7a4 4 0 018 0v4" stroke="rgba(255,255,255,0.5)" strokeWidth="1.4" strokeLinecap="round"/>
                  <circle cx="12" cy="16" r="1.5" fill="rgba(255,255,255,0.5)"/>
                </svg>
              </div>
            </div>

            {/* Floating small dots */}
            <div className="fp-pulse" style={{
              position: "absolute", top: "140px", right: "80px",
              width: "6px", height: "6px",
              borderRadius: "50%", background: "rgba(255,255,255,0.25)",
              pointerEvents: "none",
            }} />
            <div className="fp-pulse" style={{
              position: "absolute", top: "180px", right: "120px",
              width: "4px", height: "4px",
              borderRadius: "50%", background: "rgba(255,255,255,0.15)",
              animationDelay: "0.8s",
              pointerEvents: "none",
            }} />
            <div className="fp-pulse" style={{
              position: "absolute", top: "110px", right: "140px",
              width: "5px", height: "5px",
              borderRadius: "50%", background: "rgba(255,255,255,0.2)",
              animationDelay: "1.4s",
              pointerEvents: "none",
            }} />

            {/* Large background letter */}
            <span className="bg-letter" style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "96px", fontWeight: 600,
              color: "rgba(255,255,255,0.05)",
              position: "absolute", top: "28px", left: "36px",
              lineHeight: 1, letterSpacing: "-4px",
              userSelect: "none", pointerEvents: "none",
            }}>A</span>

            {/* Bottom content */}
            <div className="fp-fadein" style={{ position: "relative", zIndex: 1 }}>
              <div style={{
                display: "inline-flex", alignItems: "center", gap: "7px",
                background: "rgba(255,255,255,0.08)",
                border: "0.5px solid rgba(255,255,255,0.12)",
                borderRadius: "100px", padding: "6px 14px",
                fontSize: "11px", color: "rgba(255,255,255,0.55)",
                letterSpacing: "0.08em", textTransform: "uppercase",
                fontWeight: 500, marginBottom: "20px",
              }}>
                <span className="fp-pulse" style={{
                  width: "6px", height: "6px",
                  background: "#fff", borderRadius: "50%",
                }} />
                Account Recovery
              </div>

              <h1 style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "32px", fontWeight: 600,
                color: "#ffffff", lineHeight: 1.25,
                margin: "0 0 14px 0",
              }}>
                Forgot your<br />password?
              </h1>

              <p className="dark-desc" style={{
                fontSize: "13px", color: "rgba(255,255,255,0.45)",
                fontWeight: 300, lineHeight: 1.7,
                maxWidth: "240px", margin: "0 0 24px 0",
              }}>
                No worries — enter your registered email and we'll send you a secure reset link.
              </p>

              <div className="divider-line" style={{
                width: "32px", height: "1px",
                background: "rgba(255,255,255,0.2)",
                marginBottom: "24px",
              }} />

              {/* Steps */}
              <div className="steps-container" style={{ display: "flex", flexDirection: "column", alignItems: "flex-start" }}>
                {[
                  ["01", "Enter your email address"],
                  ["02", "Check your inbox for the link"],
                  ["03", "Reset and sign back in"],
                ].map(([num, text]) => (
                  <div key={num} style={{
                    display: "flex", alignItems: "center",
                    gap: "12px", marginBottom: "12px",
                  }}>
                    <span style={{
                      fontFamily: "'Playfair Display', serif",
                      fontSize: "11px", color: "rgba(255,255,255,0.25)",
                      fontWeight: 600, minWidth: "20px",
                    }}>{num}</span>
                    <span style={{
                      fontSize: "13px", color: "rgba(255,255,255,0.5)",
                      fontWeight: 300,
                    }}>{text}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* RIGHT WHITE PANEL — FORM */}
          <div className="light-panel">
            <div style={{
              display: "flex", alignItems: "center",
              justifyContent: "space-between", marginBottom: "44px",
            }}>
              <div style={{ display: "flex", alignItems: "center", gap: "10px" }}>
                <div style={{
                  width: "30px", height: "30px", background: "#0f0f0f",
                  borderRadius: "7px", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  fontFamily: "'Playfair Display', serif",
                  color: "#fff", fontSize: "14px", fontWeight: 600,
                }}>A</div>
                <span style={{
                  fontFamily: "'Playfair Display', serif",
                  fontSize: "15px", color: "#0f0f0f", fontWeight: 600,
                }}>Aryan Group</span>
              </div>
              <span style={{
                fontSize: "11px", color: "rgba(0,0,0,0.35)",
                letterSpacing: "0.06em", textTransform: "uppercase",
              }}>Password Reset</span>
            </div>

            <h2 style={{
              fontFamily: "'Playfair Display', serif",
              fontSize: "26px", fontWeight: 600,
              color: "#0f0f0f", margin: "0 0 6px 0", lineHeight: 1.2,
            }}>Reset your password</h2>
            <p style={{
              fontSize: "13px", color: "rgba(0,0,0,0.45)",
              fontWeight: 300, margin: "0 0 32px 0",
            }}>We'll send a reset link to your inbox</p>

            <form onSubmit={handleSendLink} noValidate>
              <div style={{ marginBottom: "24px" }}>
                <label style={{
                  display: "flex", alignItems: "center", gap: "6px",
                  fontSize: "11px", fontWeight: 500, color: "rgba(0,0,0,0.5)",
                  textTransform: "uppercase", letterSpacing: "0.07em", marginBottom: "8px",
                }}>
                  <svg width="12" height="12" viewBox="0 0 16 16" fill="none" style={{ opacity: 0.45 }}>
                    <rect x="1" y="3" width="14" height="10" rx="1.5" stroke="currentColor" strokeWidth="1.2"/>
                    <path d="M1.5 4l6.5 5 6.5-5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                  </svg>
                  Registered Email
                </label>
                <input
                  type="email"
                  placeholder="Enter your registered email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  style={{
                    width: "100%", height: "46px",
                    border: error ? "1px solid #e74c3c" : "1px solid rgba(0,0,0,0.1)",
                    borderRadius: "10px", padding: "0 16px",
                    fontFamily: "'DM Sans', sans-serif",
                    fontSize: "14px", color: "#0f0f0f",
                    background: error ? "#fff9f9" : "#fafafa",
                    outline: "none", boxSizing: "border-box",
                  }}
                />
                {error && (
                  <p style={{ fontSize: "11px", color: "#c0392b", margin: "5px 0 0 0" }}>{error}</p>
                )}
              </div>

              <div style={{
                display: "flex", alignItems: "flex-start", gap: "10px",
                background: "#f8f8f6", border: "0.5px solid rgba(0,0,0,0.07)",
                borderRadius: "10px", padding: "12px 14px", marginBottom: "28px",
              }}>
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none" style={{ marginTop: "1px", flexShrink: 0, opacity: 0.4 }}>
                  <circle cx="8" cy="8" r="6.5" stroke="currentColor" strokeWidth="1.2"/>
                  <path d="M8 7v4M8 5.5v.5" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round"/>
                </svg>
                <span style={{ fontSize: "12px", color: "rgba(0,0,0,0.45)", lineHeight: 1.6 }}>
                  Make sure this email is linked to your Aryan Group account. Check your spam folder if you don't see it.
                </span>
              </div>

              <button
                type="submit"
                className="fp-submit"
                style={{
                  width: "100%", height: "48px",
                  background: "#0f0f0f", color: "#fff",
                  border: "none", borderRadius: "10px",
                  fontFamily: "'DM Sans', sans-serif",
                  fontSize: "14px", fontWeight: 500,
                  cursor: "pointer", display: "flex",
                  alignItems: "center", justifyContent: "center",
                  gap: "10px", letterSpacing: "0.02em",
                  transition: "opacity 0.2s, transform 0.1s",
                }}
              >
                Send Reset Link
                <svg width="14" height="14" viewBox="0 0 16 16" fill="none">
                  <path d="M2 8h10M8 4l4 4-4 4" stroke="#fff" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </button>
            </form>

            <div style={{ display: "flex", alignItems: "center", gap: "12px", margin: "24px 0" }}>
              <span style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
              <span style={{
                fontSize: "11px", color: "rgba(0,0,0,0.3)",
                textTransform: "uppercase", letterSpacing: "0.06em",
              }}>or</span>
              <span style={{ flex: 1, height: "0.5px", background: "rgba(0,0,0,0.1)" }} />
            </div>

            <p
              className="fp-back"
              onClick={() => navigate("/")}
              style={{
                textAlign: "center", fontSize: "13px",
                color: "rgba(0,0,0,0.4)", margin: 0,
                cursor: "pointer", transition: "color 0.15s",
              }}
            >
              ← Back to Login
            </p>
          </div>
        </div>
      </div>
    </>
  );
}