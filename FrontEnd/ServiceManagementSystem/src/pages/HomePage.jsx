import { useState } from "react";

const COLORS = {
  bg: "#0a0f1e",
  surface: "#0f172a",
  card: "#1e293b",
  border: "#334155",
  accent: "#06b6d4",
  accent2: "#3b82f6",
  text: "#f1f5f9",
  muted: "#94a3b8",
  success: "#10b981",
  danger: "#ef4444",
};

const glassCard = {
  background: "rgba(30,41,59,0.7)",
  border: `1px solid rgba(99,118,160,0.25)`,
  backdropFilter: "blur(16px)",
  borderRadius: "1.25rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.75rem 1rem",
  background: "rgba(15,23,42,0.8)",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "0.625rem",
  color: COLORS.text,
  fontSize: "0.95rem",
  outline: "none",
  boxSizing: "border-box",
  transition: "border-color 0.2s",
  fontFamily: "'DM Sans', sans-serif",
};

const btnPrimary = {
  width: "100%",
  padding: "0.8rem",
  background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`,
  border: "none",
  borderRadius: "0.625rem",
  color: "#fff",
  fontSize: "1rem",
  fontWeight: 600,
  cursor: "pointer",
  letterSpacing: "0.02em",
  transition: "opacity 0.2s, transform 0.15s",
  fontFamily: "'Syne', sans-serif",
};

const features = [
  {
    icon: "🛠️",
    title: "Raise Service Requests",
    desc: "Submit any service need — laptop, plumbing, electrical and more. Track it in real time.",
  },
  {
    icon: "👨‍💼",
    title: "Admin Dashboard",
    desc: "Admins review, assign, and manage all service requests from a central control panel.",
  },
  {
    icon: "⚡",
    title: "Serviceman Portal",
    desc: "Assigned servicemen see their tasks, update status, and mark jobs complete.",
  },
  {
    icon: "📊",
    title: "Live Status Tracking",
    desc: "Real-time updates on every service request from submission to completion.",
  },
];

const stats = [
  { value: "12,400+", label: "Services Completed" },
  { value: "980+", label: "Verified Servicemen" },
  { value: "99.2%", label: "Satisfaction Rate" },
  { value: "< 2hr", label: "Avg. Response Time" },
];

export default function HomePage({ onLogin }) {
  const [tab, setTab] = useState("login"); // "login" | "register"
  const [role, setRole] = useState("user"); // "user" | "admin" | "serviceman"
  const [form, setForm] = useState({
    name: "",
    email: "",
    password: "",
    confirm: "",
    address: "",
    phone: "",
    skill: "",
    experience: "",
  });
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const [focusField, setFocusField] = useState("");

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError("");
    setSuccess("");
  };

  const handleTabSwitch = (t) => {
    setTab(t);
    setError("");
    setSuccess("");
    // Default role when switching tabs
    if (t === "register") {
      setRole("user");
    } else {
      setRole("user");
    }
    setForm({
      name: "",
      email: "",
      password: "",
      confirm: "",
      address: "",
      phone: "",
      skill: "",
      experience: "",
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");

    // Basic validation
    if (!form.email || !form.password) {
      setError("Email and password are required.");
      setLoading(false);
      return;
    }

    if (tab === "register") {
      if (!form.name) {
        setError("Full name is required.");
        setLoading(false);
        return;
      }
      if (form.password !== form.confirm) {
        setError("Passwords do not match.");
        setLoading(false);
        return;
      }
      if (form.password.length < 6) {
        setError("Password must be at least 6 characters.");
        setLoading(false);
        return;
      }
    }

    try {
      if (tab === "register") {
        let url = "";
        let body = {};

        if (role === "user") {
          url = "http://127.0.0.1:8000/registerUser";
          body = {
            name: form.name,
            email: form.email,
            password: form.password,
            address: form.address,
            phone: Number(form.phone),
            assignedServiceman: "",
            role: "user",
          };
        } else if (role === "serviceman") {
          url = "http://127.0.0.1:8000/registerServiceMan";
          body = {
            name: form.name,
            email: form.email,
            password: form.password,
            address: form.address,
            phone: Number(form.phone),
            skill: form.skill,
            experience: Number(form.experience),
            role: "serviceman",
          };
        }

        const response = await fetch(url, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(body),
        });

        const data = await response.json();

        if (response.ok) {
          if (data.jwt) localStorage.setItem("token", data.jwt);
          localStorage.setItem("role", role);
          setSuccess("Registration successful! You can now sign in.");
          alert("account created")
          handleTabSwitch("login");
        } else {
          setError(data.message || "Registration failed. Please try again.");
        }
      } else {
        // Login
        let loginUrl = "";
        if (role === "user") loginUrl = "http://127.0.0.1:8000/signinUser";
        else if (role === "admin")
          loginUrl = "http://127.0.0.1:8000/signinAdmin";
        else if (role === "serviceman")
          loginUrl = "http://127.0.0.1:8000/signinServiceMan";

        const response = await fetch(loginUrl, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            email: form.email,
            password: form.password,
            role: role,
          }),
        });

        const data = await response.json();

        if (response.ok && data.jwt) {
          localStorage.setItem("token", data.jwt);
          localStorage.setItem("role", role);
          setSuccess("Login successful!");
          if (onLogin) onLogin(role);
        } else {
          setError(data.message || "Invalid credentials. Please try again.");
        }
      }
    } catch (err) {
      console.error(err);
      setError("Cannot connect to server. Make sure the backend is running.");
    }

    setLoading(false);
  };

  const labelStyle = {
    fontSize: "0.8rem",
    color: COLORS.muted,
    marginBottom: "0.4rem",
    display: "block",
  };

  const fieldWrap = { marginBottom: "1rem" };

  const getInputStyle = (field) => ({
    ...inputStyle,
    borderColor: focusField === field ? COLORS.accent : COLORS.border,
  });

  return (
    <div
      style={{
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "'DM Sans', sans-serif",
        color: COLORS.text,
        overflowX: "hidden",
      }}
    >
      {/* Google Fonts */}
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Ambient background blobs */}
      <div
        style={{
          position: "fixed",
          top: "-20%",
          left: "-10%",
          width: "500px",
          height: "500px",
          background:
            "radial-gradient(circle, rgba(6,182,212,0.12) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />
      <div
        style={{
          position: "fixed",
          bottom: "-15%",
          right: "-5%",
          width: "450px",
          height: "450px",
          background:
            "radial-gradient(circle, rgba(59,130,246,0.10) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Navbar */}
      <nav
        style={{
          position: "sticky",
          top: 0,
          zIndex: 50,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "1rem 2.5rem",
          background: "rgba(10,15,30,0.85)",
          backdropFilter: "blur(12px)",
          borderBottom: `1px solid rgba(51,65,85,0.5)`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
          <span style={{ fontSize: "1.6rem" }}>⚙️</span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.3rem",
              background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            ServiceHub
          </span>
        </div>
        <div
          style={{
            display: "flex",
            gap: "1.5rem",
            fontSize: "0.9rem",
            color: COLORS.muted,
          }}
        >
          <a
            href="#features"
            style={{ color: COLORS.muted, textDecoration: "none" }}
          >
            Features
          </a>
          <a
            href="#stats"
            style={{ color: COLORS.muted, textDecoration: "none" }}
          >
            Stats
          </a>
          <a
            href="#auth"
            style={{
              color: COLORS.accent,
              textDecoration: "none",
              fontWeight: 600,
            }}
          >
            Login
          </a>
        </div>
      </nav>

      {/* Hero Section */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          textAlign: "center",
          padding: "5rem 1.5rem 3rem",
        }}
      >
        <div
          style={{
            display: "inline-block",
            padding: "0.35rem 1rem",
            background: "rgba(6,182,212,0.1)",
            border: `1px solid rgba(6,182,212,0.3)`,
            borderRadius: "2rem",
            fontSize: "0.8rem",
            color: COLORS.accent,
            marginBottom: "1.5rem",
            letterSpacing: "0.08em",
            fontWeight: 600,
          }}
        >
          ✦ SMART SERVICE MANAGEMENT PLATFORM
        </div>
        <h1
          style={{
            fontFamily: "'Syne', sans-serif",
            fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
            fontWeight: 800,
            lineHeight: 1.1,
            marginBottom: "1.25rem",
            maxWidth: "780px",
          }}
        >
          One Platform.{" "}
          <span
            style={{
              background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
              WebkitBackgroundClip: "text",
              WebkitTextFillColor: "transparent",
            }}
          >
            Every Service.
          </span>{" "}
          Resolved Fast.
        </h1>
        <p
          style={{
            color: COLORS.muted,
            fontSize: "1.1rem",
            maxWidth: "540px",
            lineHeight: 1.7,
            marginBottom: "2.5rem",
          }}
        >
          ServiceHub connects users, admins, and servicemen in a seamless
          workflow — from raising a request to marking it complete.
        </p>

        {/* Stats Row */}
        <div
          id="stats"
          style={{
            display: "flex",
            flexWrap: "wrap",
            gap: "1.5rem",
            justifyContent: "center",
            marginBottom: "4rem",
          }}
        >
          {stats.map((s) => (
            <div
              key={s.label}
              style={{
                ...glassCard,
                padding: "1.1rem 1.8rem",
                textAlign: "center",
                minWidth: "130px",
              }}
            >
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.6rem",
                  fontWeight: 800,
                  background: `linear-gradient(135deg, ${COLORS.accent}, ${COLORS.accent2})`,
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                {s.value}
              </div>
              <div
                style={{
                  color: COLORS.muted,
                  fontSize: "0.8rem",
                  marginTop: "0.25rem",
                }}
              >
                {s.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Main Content: Features + Auth */}
      <section
        style={{
          position: "relative",
          zIndex: 1,
          display: "flex",
          flexWrap: "wrap",
          gap: "2.5rem",
          maxWidth: "1200px",
          margin: "0 auto",
          padding: "0 1.5rem 5rem",
          alignItems: "flex-start",
        }}
      >
        {/* Features Grid */}
        <div id="features" style={{ flex: "1 1 420px" }}>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.5rem",
              fontWeight: 700,
              marginBottom: "1.5rem",
              color: COLORS.text,
            }}
          >
            Everything you need, built in.
          </h2>
          <div
            style={{
              display: "grid",
              gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))",
              gap: "1rem",
            }}
          >
            {features.map((f) => (
              <div
                key={f.title}
                style={{
                  ...glassCard,
                  padding: "1.4rem",
                  transition: "transform 0.2s, border-color 0.2s",
                  cursor: "default",
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.transform = "translateY(-4px)";
                  e.currentTarget.style.borderColor = `rgba(6,182,212,0.4)`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.transform = "translateY(0)";
                  e.currentTarget.style.borderColor = `rgba(99,118,160,0.25)`;
                }}
              >
                <div style={{ fontSize: "1.8rem", marginBottom: "0.75rem" }}>
                  {f.icon}
                </div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.95rem",
                    marginBottom: "0.5rem",
                  }}
                >
                  {f.title}
                </div>
                <div
                  style={{
                    color: COLORS.muted,
                    fontSize: "0.85rem",
                    lineHeight: 1.6,
                  }}
                >
                  {f.desc}
                </div>
              </div>
            ))}
          </div>

          {/* Role Legend */}
          <div
            style={{
              marginTop: "2rem",
              ...glassCard,
              padding: "1.25rem 1.5rem",
            }}
          >
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 700,
                marginBottom: "1rem",
                fontSize: "0.95rem",
              }}
            >
              Platform Roles
            </div>
            {[
              {
                role: "User",
                color: COLORS.accent2,
                desc: "Raise and track service requests",
              },
              {
                role: "Admin",
                color: "#a855f7",
                desc: "Manage requests, assign servicemen",
              },
              {
                role: "Serviceman",
                color: COLORS.success,
                desc: "View tasks, update completion status",
              },
            ].map((r) => (
              <div
                key={r.role}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "0.75rem",
                  marginBottom: "0.6rem",
                }}
              >
                <span
                  style={{
                    width: "8px",
                    height: "8px",
                    borderRadius: "50%",
                    background: r.color,
                    flexShrink: 0,
                  }}
                />
                <span
                  style={{
                    fontWeight: 600,
                    fontSize: "0.88rem",
                    minWidth: "90px",
                    color: r.color,
                  }}
                >
                  {r.role}
                </span>
                <span style={{ color: COLORS.muted, fontSize: "0.85rem" }}>
                  {r.desc}
                </span>
              </div>
            ))}
          </div>
        </div>

        {/* ── Auth Card ── */}
        <div id="auth" style={{ flex: "0 0 400px", maxWidth: "100%" }}>
          <div style={{ ...glassCard, padding: "2rem" }}>
            {/* Tab switcher */}
            <div
              style={{
                display: "flex",
                background: "rgba(15,23,42,0.7)",
                borderRadius: "0.75rem",
                padding: "4px",
                marginBottom: "1.75rem",
              }}
            >
              {["login", "register"].map((t) => (
                <button
                  key={t}
                  onClick={() => handleTabSwitch(t)}
                  style={{
                    flex: 1,
                    padding: "0.55rem",
                    border: "none",
                    borderRadius: "0.6rem",
                    background:
                      tab === t
                        ? `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`
                        : "transparent",
                    color: tab === t ? "#fff" : COLORS.muted,
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "0.9rem",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    textTransform: "capitalize",
                  }}
                >
                  {t === "login" ? "Sign In" : "Register"}
                </button>
              ))}
            </div>

            {/* Role selector */}
            <div style={{ marginBottom: "1.25rem" }}>
              <label style={labelStyle}>
                {tab === "login" ? "Sign in as" : "Register as"}
              </label>
              <div style={{ display: "flex", gap: "0.5rem" }}>
                {(tab === "register"
                  ? ["user", "serviceman"]
                  : ["user", "admin", "serviceman"]
                ).map((r) => {
                  const colors = {
                    user: COLORS.accent2,
                    admin: "#a855f7",
                    serviceman: COLORS.success,
                  };
                  return (
                    <button
                      key={r}
                      onClick={() => {
                        setRole(r);
                        setError("");
                      }}
                      style={{
                        flex: 1,
                        padding: "0.5rem 0.4rem",
                        border: `1px solid ${role === r ? colors[r] : COLORS.border}`,
                        borderRadius: "0.5rem",
                        background:
                          role === r ? `${colors[r]}18` : "transparent",
                        color: role === r ? colors[r] : COLORS.muted,
                        fontSize: "0.78rem",
                        fontWeight: 600,
                        cursor: "pointer",
                        transition: "all 0.18s",
                        textTransform: "capitalize",
                        fontFamily: "'DM Sans', sans-serif",
                      }}
                    >
                      {r === "user"
                        ? "👤 User"
                        : r === "admin"
                          ? "👑 Admin"
                          : "🔧 Serviceman"}
                    </button>
                  );
                })}
              </div>
            </div>

            {/* ── FORM ── */}
            <form onSubmit={handleSubmit}>
              {/* ── Register fields ── */}
              {tab === "register" && (
                <>
                  {/* Full Name */}
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Full Name</label>
                    <input
                      name="name"
                      placeholder="John Doe"
                      value={form.name}
                      onChange={handleChange}
                      onFocus={() => setFocusField("name")}
                      onBlur={() => setFocusField("")}
                      style={getInputStyle("name")}
                      required
                    />
                  </div>

                  {/* Phone */}
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Phone Number</label>
                    <input
                      name="phone"
                      type="tel"
                      placeholder="9876543210"
                      value={form.phone}
                      onChange={handleChange}
                      onFocus={() => setFocusField("phone")}
                      onBlur={() => setFocusField("")}
                      style={getInputStyle("phone")}
                    />
                  </div>

                  {/* Address */}
                  <div style={fieldWrap}>
                    <label style={labelStyle}>Address</label>
                    <input
                      name="address"
                      placeholder="Your address"
                      value={form.address}
                      onChange={handleChange}
                      onFocus={() => setFocusField("address")}
                      onBlur={() => setFocusField("")}
                      style={getInputStyle("address")}
                    />
                  </div>

                  {/* Serviceman-only fields */}
                  {role === "serviceman" && (
                    <>
                      <div style={fieldWrap}>
                        <label style={labelStyle}>Skill / Specialisation</label>
                        <input
                          name="skill"
                          placeholder="e.g. Electrician, Plumber"
                          value={form.skill}
                          onChange={handleChange}
                          onFocus={() => setFocusField("skill")}
                          onBlur={() => setFocusField("")}
                          style={getInputStyle("skill")}
                          required
                        />
                      </div>
                      <div style={fieldWrap}>
                        <label style={labelStyle}>Years of Experience</label>
                        <input
                          name="experience"
                          type="number"
                          min="0"
                          placeholder="e.g. 3"
                          value={form.experience}
                          onChange={handleChange}
                          onFocus={() => setFocusField("experience")}
                          onBlur={() => setFocusField("")}
                          style={getInputStyle("experience")}
                        />
                      </div>
                    </>
                  )}
                </>
              )}

              {/* Email */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Email Address</label>
                <input
                  name="email"
                  type="email"
                  placeholder="you@example.com"
                  value={form.email}
                  onChange={handleChange}
                  onFocus={() => setFocusField("email")}
                  onBlur={() => setFocusField("")}
                  style={getInputStyle("email")}
                  required
                />
              </div>

              {/* Password */}
              <div style={fieldWrap}>
                <label style={labelStyle}>Password</label>
                <input
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  value={form.password}
                  onChange={handleChange}
                  onFocus={() => setFocusField("password")}
                  onBlur={() => setFocusField("")}
                  style={getInputStyle("password")}
                  required
                />
              </div>

              {/* Confirm Password (register only) */}
              {tab === "register" && (
                <div style={fieldWrap}>
                  <label style={labelStyle}>Confirm Password</label>
                  <input
                    name="confirm"
                    type="password"
                    placeholder="••••••••"
                    value={form.confirm}
                    onChange={handleChange}
                    onFocus={() => setFocusField("confirm")}
                    onBlur={() => setFocusField("")}
                    style={getInputStyle("confirm")}
                    required
                  />
                </div>
              )}

              {/* Forgot password link */}
              {tab === "login" && (
                <div style={{ textAlign: "right", marginBottom: "1rem" }}>
                  <a
                    href="#"
                    style={{
                      fontSize: "0.82rem",
                      color: COLORS.accent,
                      textDecoration: "none",
                    }}
                  >
                    Forgot password?
                  </a>
                </div>
              )}

              {/* Error message */}
              {error && (
                <div
                  style={{
                    background: "rgba(239,68,68,0.1)",
                    border: "1px solid rgba(239,68,68,0.3)",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 0.9rem",
                    color: COLORS.danger,
                    fontSize: "0.85rem",
                    marginBottom: "1rem",
                  }}
                >
                  ⚠️ {error}
                </div>
              )}

              {/* Success message */}
              {success && (
                <div
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "0.5rem",
                    padding: "0.6rem 0.9rem",
                    color: COLORS.success,
                    fontSize: "0.85rem",
                    marginBottom: "1rem",
                  }}
                >
                  ✅ {success}
                </div>
              )}

              {/* Submit button */}
              <button
                type="submit"
                disabled={loading}
                style={{
                  ...btnPrimary,
                  opacity: loading ? 0.7 : 1,
                  transform: loading ? "scale(0.98)" : "scale(1)",
                }}
              >
                {loading
                  ? "Please wait..."
                  : tab === "login"
                    ? "Sign In →"
                    : "Create Account →"}
              </button>
            </form>

            {/* Switch tab link */}
            <div
              style={{
                marginTop: "1.25rem",
                textAlign: "center",
                fontSize: "0.85rem",
                color: COLORS.muted,
              }}
            >
              {tab === "login"
                ? "Don't have an account? "
                : "Already registered? "}
              <button
                onClick={() =>
                  handleTabSwitch(tab === "login" ? "register" : "login")
                }
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.accent,
                  cursor: "pointer",
                  fontWeight: 600,
                  fontSize: "0.85rem",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                {tab === "login" ? "Register here" : "Sign in"}
              </button>
            </div>
          </div>

          {/* Demo hint */}
          <div
            style={{
              marginTop: "1rem",
              padding: "0.75rem 1rem",
              background: "rgba(6,182,212,0.07)",
              border: "1px solid rgba(6,182,212,0.2)",
              borderRadius: "0.75rem",
              fontSize: "0.8rem",
              color: COLORS.muted,
              textAlign: "center",
            }}
          >
            💡 Register as{" "}
            <strong style={{ color: COLORS.accent2 }}>User</strong> or{" "}
            <strong style={{ color: COLORS.success }}>Serviceman</strong>.
            Admins are pre-configured.
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer
        style={{
          borderTop: `1px solid ${COLORS.border}`,
          padding: "1.5rem 2.5rem",
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          color: COLORS.muted,
          fontSize: "0.82rem",
          flexWrap: "wrap",
          gap: "0.5rem",
        }}
      >
        <span>© 2025 ServiceHub. All rights reserved.</span>
        <span style={{ display: "flex", gap: "1.5rem" }}>
          <a href="#" style={{ color: COLORS.muted, textDecoration: "none" }}>
            Privacy
          </a>
          <a href="#" style={{ color: COLORS.muted, textDecoration: "none" }}>
            Terms
          </a>
          <a href="#" style={{ color: COLORS.muted, textDecoration: "none" }}>
            Support
          </a>
        </span>
      </footer>
    </div>
  );
}
