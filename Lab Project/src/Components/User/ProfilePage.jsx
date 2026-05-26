import React, { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  FaEdit,
  FaCamera,
  FaArrowLeft,
  FaCheck,
  FaTimes,
  FaUser,
  FaEnvelope,
  FaPhone,
  FaCalendar,
  FaVenusMars,
  FaCity,
  FaFlag,
  FaAddressCard,
  FaInfoCircle,
} from "react-icons/fa";
import api from "../../api/axiosConfig";
import { baseURL } from "../../api/axiosConfig";

export default function ProfilePage() {
  const navigate = useNavigate();
  const fileRef = useRef(null);

  const [profileData, setProfileData] = useState({
    name: "",
    email: "",
    phone: "",
    dob: "",
    gender: "",
    address: "",
    city: "",
    state: "",
    bio: "",
    photo: null,
  });

  const [editMode, setEditMode] = useState(false);
  const [loading, setLoading] = useState(true);
  const [preview, setPreview] = useState(null);
  const [imageVersion, setImageVersion] = useState(Date.now());
  const [updateLoading, setUpdateLoading] = useState(false);

  async function loadProfile() {
    try {
      setLoading(true);
      const res = await api.get("/profile");
      setProfileData({
        name: res.data.full_name || "",
        email: res.data.email || "",
        phone: res.data.phone || "",
        dob: res.data.dob ? new Date(res.data.dob).toISOString().split("T")[0] : "",
        gender: res.data.gender || "",
        city: res.data.city || "",
        state: res.data.state || "",
        address: res.data.address || "",
        bio: res.data.bio || "",
        photo: res.data.photo || null,
      });
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadProfile();
  }, []);

  const initials =
    profileData.name
      ?.split(" ")
      .map((n) => n[0])
      .join("")
      .toUpperCase()
      .slice(0, 2) || "?";

  function handleChange(e) {
    setProfileData({ ...profileData, [e.target.name]: e.target.value });
  }

  function handlePhotoChange(e) {
    const file = e.target.files[0];
    if (!file) return;
    setPreview(URL.createObjectURL(file));
    setProfileData({ ...profileData, photo: file });
  }

  async function handleUpdate() {
    try {
      setUpdateLoading(true);
      const formData = new FormData();
      formData.append("full_name", profileData.name);
      formData.append("dob", profileData.dob);
      formData.append("gender", profileData.gender);
      formData.append("city", profileData.city);
      formData.append("state", profileData.state);
      formData.append("address", profileData.address);
      formData.append("bio", profileData.bio);
      if (fileRef.current.files[0]) {
        formData.append("photo", fileRef.current.files[0]);
      }
      const res = await api.put("/profile", formData);
      alert(res.data.message);
      setPreview(null);
      setImageVersion(Date.now());
      await loadProfile();
      setEditMode(false);
    } catch (err) {
      console.log(err);
      alert("Failed to update profile");
    } finally {
      setUpdateLoading(false);
    }
  }

  if (loading) {
    return (
      <div style={styles.loadingContainer}>
        <div style={styles.spinner}></div>
        <p style={styles.loadingText}>Loading profile...</p>
      </div>
    );
  }

  return (
    <div style={styles.container}>
      <div style={styles.card}>
        <div style={styles.header}>
          <h1 style={styles.headerTitle}>Profile</h1>
          <p style={styles.headerSubtitle}>Manage your personal information</p>
        </div>

        <div style={styles.content}>
          <div style={styles.profileSection}>
            <div style={styles.avatarWrapper}>
              {profileData.photo || preview ? (
                <img
                  src={preview ? preview : `${baseURL}${profileData.photo}?v=${imageVersion}`}
                  alt="profile"
                  style={styles.avatar}
                />
              ) : (
                <div style={styles.avatarPlaceholder}>
                  <span style={styles.initials}>{initials}</span>
                </div>
              )}
              {editMode && (
                <button onClick={() => fileRef.current.click()} style={styles.changePhotoBtn}>
                  <FaCamera size={12} />
                  <span style={{ marginLeft: "4px" }}>Change</span>
                </button>
              )}
              <input
                ref={fileRef}
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handlePhotoChange}
              />
            </div>
            <div style={styles.userInfo}>
              <h2 style={styles.userName}>{profileData.name || "Your Name"}</h2>
              <p style={styles.userEmail}>{profileData.email}</p>
            </div>
            {!editMode && (
              <button onClick={() => setEditMode(true)} style={styles.editProfileBtn}>
                <FaEdit size={12} />
                Edit Profile
              </button>
            )}
          </div>

          {!editMode ? (
            <div className="profile-details-grid" style={styles.detailsGrid}>
              <DetailCard icon={<FaUser />} label="Full Name" value={profileData.name} />
              <DetailCard icon={<FaEnvelope />} label="Email" value={profileData.email} />
              <DetailCard icon={<FaPhone />} label="Contact" value={profileData.phone} />
              <DetailCard icon={<FaCalendar />} label="Date of Birth" value={profileData.dob} />
              <DetailCard icon={<FaVenusMars />} label="Gender" value={profileData.gender} />
              <DetailCard icon={<FaCity />} label="City" value={profileData.city} />
              <DetailCard icon={<FaFlag />} label="State" value={profileData.state} />
              <DetailCard icon={<FaAddressCard />} label="Address" value={profileData.address} fullWidth />
              <DetailCard icon={<FaInfoCircle />} label="Bio" value={profileData.bio} fullWidth />
            </div>
          ) : (
            <div style={styles.editForm}>
              <div className="profile-form-grid" style={styles.formGrid}>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Full Name *</label>
                  <input
                    type="text"
                    name="name"
                    value={profileData.name}
                    onChange={handleChange}
                    placeholder="Enter your full name"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Email</label>
                  <input
                    type="email"
                    value={profileData.email}
                    readOnly
                    disabled
                    style={{ ...styles.input, ...styles.inputReadonly }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Phone Number</label>
                  <input
                    type="text"
                    value={profileData.phone}
                    readOnly
                    disabled
                    style={{ ...styles.input, ...styles.inputReadonly }}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Date of Birth</label>
                  <input
                    type="date"
                    name="dob"
                    value={profileData.dob}
                    onChange={handleChange}
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>Gender</label>
                  <select
                    name="gender"
                    value={profileData.gender}
                    onChange={handleChange}
                    style={styles.input}
                  >
                    <option value="">Select gender</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                    <option value="Prefer not to say">Prefer not to say</option>
                  </select>
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>City</label>
                  <input
                    type="text"
                    name="city"
                    value={profileData.city}
                    onChange={handleChange}
                    placeholder="Enter your city"
                    style={styles.input}
                  />
                </div>
                <div style={styles.formGroup}>
                  <label style={styles.label}>State</label>
                  <input
                    type="text"
                    name="state"
                    value={profileData.state}
                    onChange={handleChange}
                    placeholder="Enter your state"
                    style={styles.input}
                  />
                </div>
                <div style={{ ...styles.formGroup, gridColumn: "span 2" }}>
                  <label style={styles.label}>Address</label>
                  <input
                    type="text"
                    name="address"
                    value={profileData.address}
                    onChange={handleChange}
                    placeholder="Enter your full address"
                    style={styles.input}
                  />
                </div>
                <div style={{ ...styles.formGroup, gridColumn: "span 2" }}>
                  <label style={styles.label}>Bio</label>
                  <textarea
                    name="bio"
                    value={profileData.bio}
                    onChange={handleChange}
                    rows={2}
                    placeholder="Write something about yourself..."
                    style={{ ...styles.input, ...styles.textarea }}
                  />
                </div>
              </div>
              <div style={styles.formActions}>
                <button onClick={() => setEditMode(false)} style={styles.cancelBtn}>
                  <FaTimes size={12} />
                  Cancel
                </button>
                <button onClick={handleUpdate} disabled={updateLoading} style={styles.saveBtn}>
                  {updateLoading ? "Saving..." : <><FaCheck size={12} /> Save Changes</>}
                </button>
              </div>
            </div>
          )}

          {!editMode && (
            <button onClick={() => navigate(-1)} style={styles.backBtn}>
              <FaArrowLeft size={12} />
              Go Back
            </button>
          )}
        </div>
      </div>

      {/* Global responsive styles */}
      <style>{`
        @media (max-width: 640px) {
          .profile-details-grid {
            grid-template-columns: 1fr !important;
          }
          .profile-form-grid {
            grid-template-columns: 1fr !important;
          }
          .profile-details-grid .detail-card-full {
            grid-column: span 1 !important;
          }
        }
      `}</style>
    </div>
  );
}

function DetailCard({ icon, label, value, fullWidth }) {
  return (
    <div style={{ ...styles.detailCard, ...(fullWidth && styles.detailCardFull) }} className={fullWidth ? "detail-card-full" : ""}>
      <div style={styles.detailIcon}>{icon}</div>
      <div style={styles.detailContent}>
        <p style={styles.detailLabel}>{label}</p>
        <p style={styles.detailValue}>{value || "—"}</p>
      </div>
    </div>
  );
}

// Compact & Responsive Styles
const styles = {
  container: {
    maxWidth: "900px",
    margin: "0.5rem auto",
    padding: "0 1rem",
    marginTop: "70px",
    boxSizing: "border-box",
  },
  card: {
    background: "#FFFFFF",
    borderRadius: "16px",
    boxShadow: "0 1px 3px rgba(0,0,0,0.1)",
    border: "1px solid #E0E0E0",
    overflow: "hidden",
  },
  header: {
    padding: "1.2rem 1.5rem 0 1.5rem",
    borderBottom: "1px solid #E0E0E0",
  },
  headerTitle: {
    fontSize: "24px",
    fontWeight: "500",
    margin: "0 0 0.2rem 0",
    color: "#000000",
  },
  headerSubtitle: {
    fontSize: "13px",
    color: "#666666",
    margin: "0 0 1rem 0",
  },
  content: {
    padding: "1.5rem",
  },
  profileSection: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    marginBottom: "1.5rem",
    paddingBottom: "1rem",
    borderBottom: "1px solid #F0F0F0",
  },
  avatarWrapper: {
    position: "relative",
    marginBottom: "0.75rem",
  },
  avatar: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    objectFit: "cover",
    border: "2px solid #000000",
  },
  avatarPlaceholder: {
    width: "80px",
    height: "80px",
    borderRadius: "50%",
    background: "#F5F5F5",
    border: "2px solid #000000",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
  },
  initials: {
    fontSize: "28px",
    fontWeight: "400",
    color: "#000000",
  },
  changePhotoBtn: {
    position: "absolute",
    bottom: "-5px",
    right: "-10px",
    display: "flex",
    alignItems: "center",
    padding: "4px 8px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    fontSize: "10px",
    cursor: "pointer",
    borderRadius: "20px",
    gap: "4px",
  },
  userInfo: {
    textAlign: "center",
    marginTop: "0.5rem",
  },
  userName: {
    fontSize: "18px",
    fontWeight: "600",
    margin: "0 0 0.2rem 0",
    color: "#000000",
  },
  userEmail: {
    fontSize: "12px",
    color: "#666666",
    margin: 0,
  },
  editProfileBtn: {
    marginTop: "0.75rem",
    display: "flex",
    alignItems: "center",
    gap: "6px",
    padding: "6px 16px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: "20px",
  },
  detailsGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.75rem",
    marginBottom: "1rem",
  },
  detailCard: {
    display: "flex",
    alignItems: "flex-start",
    gap: "0.75rem",
    padding: "0.75rem",
    background: "#FAFAFA",
    border: "1px solid #EEEEEE",
    borderRadius: "12px",
  },
  detailCardFull: {
    gridColumn: "span 2",
  },
  detailIcon: {
    color: "#000000",
    fontSize: "14px",
    marginTop: "2px",
  },
  detailContent: {
    flex: 1,
  },
  detailLabel: {
    fontSize: "10px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
    color: "#999999",
    marginBottom: "4px",
  },
  detailValue: {
    fontSize: "13px",
    color: "#333333",
    margin: 0,
    lineHeight: "1.4",
  },
  editForm: {
    marginBottom: "1rem",
  },
  formGrid: {
    display: "grid",
    gridTemplateColumns: "repeat(2, 1fr)",
    gap: "0.75rem",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
  },
  label: {
    fontSize: "11px",
    fontWeight: "500",
    textTransform: "uppercase",
    letterSpacing: "0.3px",
    color: "#666666",
    marginBottom: "4px",
  },
  input: {
    padding: "8px 10px",
    background: "#FFFFFF",
    border: "1px solid #CCCCCC",
    fontSize: "13px",
    fontFamily: "inherit",
    color: "#000000",
    outline: "none",
    borderRadius: "8px",
    transition: "border-color 0.2s",
  },
  inputReadonly: {
    background: "#F5F5F5",
    color: "#999999",
    cursor: "not-allowed",
    borderColor: "#E0E0E0",
  },
  textarea: {
    resize: "vertical",
    fontFamily: "inherit",
  },
  formActions: {
    display: "flex",
    gap: "0.75rem",
    marginTop: "1rem",
  },
  cancelBtn: {
    flex: 1,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "8px",
    background: "#FFFFFF",
    color: "#000000",
    border: "1px solid #CCCCCC",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: "8px",
  },
  saveBtn: {
    flex: 2,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "8px",
    background: "#000000",
    color: "#FFFFFF",
    border: "none",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: "8px",
  },
  backBtn: {
    width: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: "6px",
    padding: "8px",
    background: "#FFFFFF",
    color: "#666666",
    border: "1px solid #E0E0E0",
    fontSize: "12px",
    fontWeight: "500",
    cursor: "pointer",
    borderRadius: "8px",
    marginTop: "0.5rem",
  },
  loadingContainer: {
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    minHeight: "300px",
    marginTop: "100px",
  },
  spinner: {
    width: "28px",
    height: "28px",
    border: "2px solid #F0F0F0",
    borderTop: "2px solid #000000",
    borderRadius: "50%",
    animation: "spin 0.8s linear infinite",
  },
  loadingText: {
    marginTop: "0.75rem",
    color: "#666666",
    fontSize: "13px",
  },
};

// Add global keyframes (only once)
if (!document.querySelector("#profile-styles")) {
  const styleSheet = document.createElement("style");
  styleSheet.id = "profile-styles";
  styleSheet.textContent = `
    @keyframes spin {
      0% { transform: rotate(0deg); }
      100% { transform: rotate(360deg); }
    }
    button:hover {
      opacity: 0.85;
    }
    input:focus, select:focus, textarea:focus {
      border-color: #000000 !important;
    }
  `;
  document.head.appendChild(styleSheet);
}