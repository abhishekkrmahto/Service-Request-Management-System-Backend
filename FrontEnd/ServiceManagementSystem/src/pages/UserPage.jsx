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
  warning: "#f59e0b",
  danger: "#ef4444",
  purple: "#a855f7",
};

const glass = {
  background: "rgba(30,41,59,0.7)",
  border: "1px solid rgba(99,118,160,0.2)",
  backdropFilter: "blur(16px)",
  borderRadius: "1rem",
};

const inputStyle = {
  width: "100%",
  padding: "0.7rem 1rem",
  background: "rgba(15,23,42,0.8)",
  border: `1px solid ${COLORS.border}`,
  borderRadius: "0.625rem",
  color: COLORS.text,
  fontSize: "0.9rem",
  outline: "none",
  boxSizing: "border-box",
  fontFamily: "'DM Sans', sans-serif",
  transition: "border-color 0.2s",
};

const CATEGORIES = [
  { id: "electronics", label: "Electronics", icon: "💻", desc: "Laptop, TV, Phone, AC repairs" },
  { id: "plumbing", label: "Plumbing", icon: "🔧", desc: "Pipes, taps, drainage, leaks" },
  { id: "electrical", label: "Electrical", icon: "⚡", desc: "Wiring, fans, switches, fixtures" },
  { id: "carpentry", label: "Carpentry", icon: "🪚", desc: "Doors, windows, furniture repair" },
  { id: "cleaning", label: "Cleaning", icon: "🧹", desc: "Home, office, deep cleaning" },
  { id: "painting", label: "Painting", icon: "🎨", desc: "Wall painting, touch-ups" },
  { id: "appliance", label: "Appliances", icon: "🏠", desc: "Fridge, washing machine, geyser" },
  { id: "other", label: "Other", icon: "🛠️", desc: "Any other service need" },
];

const INIT_REQUESTS = [
  { id: "SRV-001", service: "Laptop Repair", category: "Electronics", description: "Need a laptop repairing serviceman — keyboard not working after spill.", status: "pending", createdAt: "2025-06-10 09:14", priority: "high", assignedTo: null, updatedAt: "2025-06-10 09:14" },
  { id: "SRV-008", service: "Geyser Not Working", category: "Appliances", description: "Hot water geyser stopped heating. No hot water since 2 days.", status: "assigned", createdAt: "2025-06-09 16:00", priority: "medium", assignedTo: "Vikram Nair", updatedAt: "2025-06-10 08:30" },
  { id: "SRV-009", service: "Paint Living Room", category: "Painting", description: "Living room walls need fresh coat of paint. Area ~400 sq ft.", status: "completed", createdAt: "2025-06-05 10:00", priority: "low", assignedTo: "Rahul Verma", updatedAt: "2025-06-07 17:00" },
];

const STATUS_META = {
  pending: { label: "Pending Review", color: COLORS.warning, bg: "rgba(245,158,11,0.12)", icon: "⏳", step: 1 },
  assigned: { label: "Serviceman Assigned", color: COLORS.accent2, bg: "rgba(59,130,246,0.12)", icon: "👨‍🔧", step: 2 },
  in_progress: { label: "Work In Progress", color: COLORS.purple, bg: "rgba(168,85,247,0.12)", icon: "⚙️", step: 3 },
  completed: { label: "Completed", color: COLORS.success, bg: "rgba(16,185,129,0.12)", icon: "✅", step: 4 },
  cancelled: { label: "Cancelled", color: COLORS.danger, bg: "rgba(239,68,68,0.12)", icon: "❌", step: 0 },
};

const PRIORITY_META = {
  urgent: { label: "Urgent", color: COLORS.danger },
  high: { label: "High", color: COLORS.warning },
  medium: { label: "Medium", color: COLORS.accent },
  low: { label: "Low", color: COLORS.muted },
};

function Badge({ label, color, bg }) {
  return <span style={{ background: bg, color, padding: "0.22rem 0.65rem", borderRadius: "2rem", fontSize: "0.73rem", fontWeight: 700 }}>{label}</span>;
}

function ProgressTracker({ status }) {
  const steps = [
    { label: "Submitted", step: 1 },
    { label: "Assigned", step: 2 },
    { label: "In Progress", step: 3 },
    { label: "Completed", step: 4 },
  ];
  const current = STATUS_META[status]?.step || 0;
  if (status === "cancelled") return (
    <div style={{ background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.625rem", padding: "0.6rem 1rem", fontSize: "0.8rem", color: COLORS.danger, textAlign: "center" }}>❌ This request was cancelled</div>
  );
  return (
    <div style={{ display: "flex", alignItems: "center", gap: 0 }}>
      {steps.map((s, i) => (
        <div key={s.step} style={{ display: "flex", alignItems: "center", flex: i < steps.length - 1 ? 1 : 0 }}>
          <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: "0.3rem" }}>
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: current >= s.step ? `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})` : "rgba(51,65,85,0.5)", display: "flex", alignItems: "center", justifyContent: "center", fontSize: "0.7rem", fontWeight: 700, color: current >= s.step ? "#fff" : COLORS.muted, flexShrink: 0 }}>
              {current >= s.step ? "✓" : s.step}
            </div>
            <div style={{ fontSize: "0.65rem", color: current >= s.step ? COLORS.accent : COLORS.muted, whiteSpace: "nowrap", textAlign: "center" }}>{s.label}</div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 2, background: current > s.step ? `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})` : "rgba(51,65,85,0.5)", margin: "0 4px", marginBottom: "1.2rem" }} />
          )}
        </div>
      ))}
    </div>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button onClick={onClick}
      style={{ width: "100%", display: "flex", alignItems: "center", gap: "0.75rem", padding: "0.65rem 0.75rem", borderRadius: "0.6rem", border: "none", background: active ? "rgba(6,182,212,0.12)" : "transparent", color: active ? COLORS.accent : COLORS.muted, fontSize: "0.88rem", fontWeight: active ? 600 : 400, cursor: "pointer", marginBottom: "0.2rem", textAlign: "left", fontFamily: "'DM Sans', sans-serif", transition: "all 0.15s", borderLeft: active ? `3px solid ${COLORS.accent}` : "3px solid transparent" }}>
      <span>{icon}</span>{label}
    </button>
  );
}

export default function UserPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("raise"); // "raise" | "my_requests"
  const [requests, setRequests] = useState(INIT_REQUESTS);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [form, setForm] = useState({ service: "", description: "", priority: "medium", address: "" });
  const [focusField, setFocusField] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [detailReq, setDetailReq] = useState(null);
  const [filter, setFilter] = useState("all");

  const handleFormChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!selectedCategory || !form.service || !form.description) return;
    setSubmitting(true);
    await new Promise((r) => setTimeout(r, 1000));
    const newReq = {
      id: `SRV-${String(Math.floor(100 + Math.random() * 900))}`,
      service: form.service,
      category: CATEGORIES.find((c) => c.id === selectedCategory)?.label,
      description: form.description,
      status: "pending",
      priority: form.priority,
      createdAt: new Date().toLocaleString("en-IN", { day: "2-digit", month: "2-digit", year: "numeric", hour: "2-digit", minute: "2-digit" }),
      updatedAt: new Date().toISOString(),
      assignedTo: null,
      address: form.address,
    };
    setRequests((prev) => [newReq, ...prev]);
    setSuccessMsg(`Service request ${newReq.id} raised successfully!`);
    setForm({ service: "", description: "", priority: "medium", address: "" });
    setSelectedCategory(null);
    setSubmitting(false);
    setTimeout(() => { setSuccessMsg(""); setActiveTab("my_requests"); }, 2200);
  };

  const filteredReqs = requests.filter((r) => filter === "all" || r.status === filter);

  return (
    <div style={{ display: "flex", minHeight: "100vh", background: COLORS.bg, fontFamily: "'DM Sans', sans-serif", color: COLORS.text }}>
      <link href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap" rel="stylesheet" />

      <div style={{ position: "fixed", top: "30%", right: "10%", width: 300, height: 300, background: "radial-gradient(circle, rgba(6,182,212,0.07) 0%, transparent 70%)", pointerEvents: "none", zIndex: 0 }} />

      {/* Sidebar */}
      <div style={{ width: 230, minHeight: "100vh", background: COLORS.surface, borderRight: `1px solid ${COLORS.border}`, display: "flex", flexDirection: "column", flexShrink: 0, position: "sticky", top: 0, height: "100vh" }}>
        <div style={{ padding: "1.5rem 1.25rem", borderBottom: `1px solid ${COLORS.border}` }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
            <span style={{ fontSize: "1.4rem" }}>⚙️</span>
            <span style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem", background: `linear-gradient(90deg, ${COLORS.accent}, ${COLORS.accent2})`, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>ServiceHub</span>
          </div>
          <div style={{ fontSize: "0.72rem", color: COLORS.accent2, marginTop: "0.25rem", letterSpacing: "0.08em" }}>USER PORTAL</div>
        </div>

        {/* User profile */}
        <div style={{ margin: "1rem 0.75rem", padding: "1rem", background: "rgba(59,130,246,0.07)", border: "1px solid rgba(59,130,246,0.2)", borderRadius: "0.75rem" }}>
          <div style={{ display: "flex", alignItems: "center", gap: "0.6rem" }}>
            <div style={{ width: 38, height: 38, borderRadius: "50%", background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.purple})`, display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 800, fontSize: "0.85rem" }}>AR</div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>Arjun Reddy</div>
              <div style={{ fontSize: "0.72rem", color: COLORS.muted }}>arjun@example.com</div>
            </div>
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 0.75rem" }}>
          <NavItem icon="➕" label="Raise Service" active={activeTab === "raise"} onClick={() => setActiveTab("raise")} />
          <NavItem icon="📋" label="My Requests" active={activeTab === "my_requests"} onClick={() => setActiveTab("my_requests")} />
          <NavItem icon="🔔" label="Notifications" active={activeTab === "notifications"} onClick={() => setActiveTab("notifications")} />
          <NavItem icon="👤" label="My Profile" active={activeTab === "profile"} onClick={() => setActiveTab("profile")} />
        </nav>

        {/* Quick stats */}
        <div style={{ padding: "1rem", borderTop: `1px solid ${COLORS.border}`, display: "flex", gap: "0.5rem" }}>
          {[
            { label: "Open", value: requests.filter((r) => ["pending", "assigned", "in_progress"].includes(r.status)).length, color: COLORS.warning },
            { label: "Done", value: requests.filter((r) => r.status === "completed").length, color: COLORS.success },
          ].map((s) => (
            <div key={s.label} style={{ flex: 1, background: "rgba(15,23,42,0.6)", borderRadius: "0.5rem", padding: "0.5rem", textAlign: "center" }}>
              <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.25rem", color: s.color }}>{s.value}</div>
              <div style={{ fontSize: "0.68rem", color: COLORS.muted }}>{s.label}</div>
            </div>
          ))}
        </div>

        <div style={{ padding: "0.75rem 1.25rem", borderTop: `1px solid ${COLORS.border}` }}>
          <button onClick={onLogout} style={{ width: "100%", padding: "0.5rem", background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.2)", borderRadius: "0.5rem", color: COLORS.danger, fontSize: "0.82rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>Logout</button>
        </div>
      </div>

      {/* Main Content */}
      <div style={{ flex: 1, display: "flex", flexDirection: "column", overflow: "hidden", position: "relative", zIndex: 1 }}>
        <header style={{ background: "rgba(15,23,42,0.9)", backdropFilter: "blur(12px)", borderBottom: `1px solid ${COLORS.border}`, padding: "0.9rem 2rem", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
          <div>
            <h1 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1.2rem", fontWeight: 800, margin: 0 }}>
              {activeTab === "raise" ? "Raise a Service Request" : "My Service Requests"}
            </h1>
            <p style={{ margin: 0, fontSize: "0.78rem", color: COLORS.muted }}>
              {activeTab === "raise" ? "Tell us what you need — we'll send the right person" : "Track all your raised requests in one place"}
            </p>
          </div>
          {activeTab === "my_requests" && (
            <button onClick={() => setActiveTab("raise")}
              style={{ padding: "0.55rem 1.25rem", border: "none", borderRadius: "0.625rem", background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`, color: "#fff", fontSize: "0.85rem", fontWeight: 700, cursor: "pointer", fontFamily: "'Syne', sans-serif" }}>
              + New Request
            </button>
          )}
        </header>

        <main style={{ flex: 1, overflowY: "auto", padding: "1.75rem 2rem" }}>
          {/* SUCCESS MESSAGE */}
          {successMsg && (
            <div style={{ ...glass, padding: "1rem 1.5rem", marginBottom: "1.25rem", background: "rgba(16,185,129,0.12)", border: "1px solid rgba(16,185,129,0.3)", color: COLORS.success, fontSize: "0.9rem", fontWeight: 600, display: "flex", alignItems: "center", gap: "0.75rem" }}>
              ✅ {successMsg}
            </div>
          )}

          {/* RAISE SERVICE TAB */}
          {activeTab === "raise" && (
            <div style={{ maxWidth: 760 }}>
              {/* Category Selection */}
              <div style={{ marginBottom: "1.75rem" }}>
                <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "1rem", color: COLORS.text }}>1. Select Service Category</h2>
                <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(160px, 1fr))", gap: "0.75rem" }}>
                  {CATEGORIES.map((cat) => (
                    <div key={cat.id} onClick={() => setSelectedCategory(cat.id)}
                      style={{ ...glass, padding: "1rem", cursor: "pointer", border: `1px solid ${selectedCategory === cat.id ? COLORS.accent : "rgba(99,118,160,0.2)"}`, background: selectedCategory === cat.id ? "rgba(6,182,212,0.1)" : "rgba(30,41,59,0.7)", transition: "all 0.15s", textAlign: "center" }}>
                      <div style={{ fontSize: "1.8rem", marginBottom: "0.4rem" }}>{cat.icon}</div>
                      <div style={{ fontWeight: 700, fontSize: "0.88rem", marginBottom: "0.25rem", color: selectedCategory === cat.id ? COLORS.accent : COLORS.text }}>{cat.label}</div>
                      <div style={{ fontSize: "0.72rem", color: COLORS.muted, lineHeight: 1.4 }}>{cat.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Form */}
              {selectedCategory && (
                <div style={{ ...glass, padding: "1.75rem" }}>
                  <h2 style={{ fontFamily: "'Syne', sans-serif", fontSize: "1rem", fontWeight: 700, marginBottom: "1.25rem", color: COLORS.text }}>
                    2. Describe Your {CATEGORIES.find((c) => c.id === selectedCategory)?.label} Need
                  </h2>
                  <form onSubmit={handleSubmit}>
                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ fontSize: "0.8rem", color: COLORS.muted, display: "block", marginBottom: "0.4rem" }}>Service Title *</label>
                      <input name="service" required placeholder={`e.g., ${CATEGORIES.find((c) => c.id === selectedCategory)?.desc.split(",")[0]} repair`}
                        value={form.service} onChange={handleFormChange}
                        onFocus={() => setFocusField("service")} onBlur={() => setFocusField("")}
                        style={{ ...inputStyle, borderColor: focusField === "service" ? COLORS.accent : COLORS.border }} />
                    </div>

                    <div style={{ marginBottom: "1rem" }}>
                      <label style={{ fontSize: "0.8rem", color: COLORS.muted, display: "block", marginBottom: "0.4rem" }}>Problem Description *</label>
                      <textarea name="description" required rows={4}
                        placeholder="Describe the problem in detail. What is broken? Since when? Any symptoms?"
                        value={form.description} onChange={handleFormChange}
                        onFocus={() => setFocusField("description")} onBlur={() => setFocusField("")}
                        style={{ ...inputStyle, resize: "vertical", borderColor: focusField === "description" ? COLORS.accent : COLORS.border }} />
                    </div>

                    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "1rem", marginBottom: "1rem" }}>
                      <div>
                        <label style={{ fontSize: "0.8rem", color: COLORS.muted, display: "block", marginBottom: "0.4rem" }}>Priority</label>
                        <select name="priority" value={form.priority} onChange={handleFormChange}
                          style={{ ...inputStyle, cursor: "pointer" }}>
                          <option value="urgent">🔴 Urgent</option>
                          <option value="high">🟠 High</option>
                          <option value="medium">🟡 Medium</option>
                          <option value="low">🟢 Low</option>
                        </select>
                      </div>
                      <div>
                        <label style={{ fontSize: "0.8rem", color: COLORS.muted, display: "block", marginBottom: "0.4rem" }}>Service Address</label>
                        <input name="address" placeholder="Your address or landmark"
                          value={form.address} onChange={handleFormChange}
                          onFocus={() => setFocusField("address")} onBlur={() => setFocusField("")}
                          style={{ ...inputStyle, borderColor: focusField === "address" ? COLORS.accent : COLORS.border }} />
                      </div>
                    </div>

                    {/* Summary Preview */}
                    {form.service && (
                      <div style={{ marginBottom: "1.25rem", padding: "1rem", background: "rgba(6,182,212,0.05)", border: "1px solid rgba(6,182,212,0.15)", borderRadius: "0.75rem" }}>
                        <div style={{ fontSize: "0.75rem", color: COLORS.muted, marginBottom: "0.5rem", letterSpacing: "0.07em" }}>REQUEST PREVIEW</div>
                        <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", alignItems: "center" }}>
                          <span style={{ fontWeight: 700, fontSize: "0.9rem" }}>{form.service}</span>
                          <span style={{ fontSize: "0.75rem", color: COLORS.muted }}>·</span>
                          <span style={{ fontSize: "0.75rem", color: COLORS.muted }}>{CATEGORIES.find((c) => c.id === selectedCategory)?.label}</span>
                          <span style={{ fontSize: "0.75rem", color: PRIORITY_META[form.priority]?.color, fontWeight: 600 }}>· {PRIORITY_META[form.priority]?.label}</span>
                        </div>
                      </div>
                    )}

                    <button type="submit" disabled={submitting || !form.service || !form.description}
                      style={{ padding: "0.85rem 2rem", border: "none", borderRadius: "0.75rem", background: submitting || !form.service || !form.description ? COLORS.border : `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`, color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1rem", cursor: submitting || !form.service || !form.description ? "not-allowed" : "pointer", opacity: submitting ? 0.75 : 1, transition: "all 0.2s" }}>
                      {submitting ? "Submitting..." : "Submit Service Request →"}
                    </button>
                  </form>
                </div>
              )}
            </div>
          )}

          {/* MY REQUESTS TAB */}
          {activeTab === "my_requests" && (
            <div>
              {/* Filter Tabs */}
              <div style={{ display: "flex", gap: "0.5rem", marginBottom: "1.5rem", flexWrap: "wrap" }}>
                {[["all", "All"], ["pending", "Pending"], ["assigned", "Assigned"], ["in_progress", "In Progress"], ["completed", "Completed"]].map(([f, label]) => (
                  <button key={f} onClick={() => setFilter(f)}
                    style={{ padding: "0.45rem 1rem", border: `1px solid ${filter === f ? COLORS.accent : COLORS.border}`, borderRadius: "2rem", background: filter === f ? "rgba(6,182,212,0.12)" : "transparent", color: filter === f ? COLORS.accent : COLORS.muted, fontSize: "0.8rem", cursor: "pointer", fontFamily: "'DM Sans', sans-serif", fontWeight: filter === f ? 600 : 400 }}>
                    {label}
                  </button>
                ))}
              </div>

              {/* Request Cards */}
              <div style={{ display: "flex", flexDirection: "column", gap: "1rem", maxWidth: 800 }}>
                {filteredReqs.map((req) => {
                  const sm = STATUS_META[req.status];
                  const pm = PRIORITY_META[req.priority];
                  return (
                    <div key={req.id}
                      style={{ ...glass, padding: "1.4rem 1.5rem", cursor: "pointer", transition: "all 0.15s" }}
                      onClick={() => setDetailReq(req)}
                      onMouseEnter={(e) => e.currentTarget.style.borderColor = "rgba(6,182,212,0.3)"}
                      onMouseLeave={(e) => e.currentTarget.style.borderColor = "rgba(99,118,160,0.2)"}>
                      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "0.75rem", flexWrap: "wrap", gap: "0.5rem" }}>
                        <div>
                          <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 700, fontSize: "1.05rem" }}>{req.service}</div>
                          <div style={{ fontSize: "0.78rem", color: COLORS.accent, marginTop: "0.1rem" }}>{req.id} · {req.category}</div>
                        </div>
                        <div style={{ display: "flex", gap: "0.5rem", alignItems: "center" }}>
                          <Badge label={pm.label} color={pm.color} bg={`${pm.color}18`} />
                          <Badge label={sm.icon + " " + sm.label} color={sm.color} bg={sm.bg} />
                        </div>
                      </div>
                      <p style={{ fontSize: "0.85rem", color: COLORS.muted, margin: "0 0 1rem", lineHeight: 1.6, overflow: "hidden", display: "-webkit-box", WebkitLineClamp: 2, WebkitBoxOrient: "vertical" }}>{req.description}</p>
                      {/* Progress Tracker */}
                      <ProgressTracker status={req.status} />
                      <div style={{ display: "flex", justifyContent: "space-between", marginTop: "1rem", fontSize: "0.75rem", color: COLORS.muted }}>
                        <span>📅 Raised: {req.createdAt}</span>
                        {req.assignedTo && <span>🔧 Assigned to: <strong style={{ color: COLORS.success }}>{req.assignedTo}</strong></span>}
                      </div>
                    </div>
                  );
                })}
                {filteredReqs.length === 0 && (
                  <div style={{ textAlign: "center", padding: "4rem 1rem", color: COLORS.muted }}>
                    <div style={{ fontSize: "3rem", marginBottom: "0.75rem" }}>📭</div>
                    <div style={{ fontWeight: 600, fontSize: "1rem" }}>No requests here yet</div>
                    <div style={{ fontSize: "0.85rem", marginTop: "0.25rem" }}>Raise your first service request!</div>
                    <button onClick={() => setActiveTab("raise")}
                      style={{ marginTop: "1.25rem", padding: "0.65rem 1.5rem", border: "none", borderRadius: "0.625rem", background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`, color: "#fff", fontFamily: "'Syne', sans-serif", fontWeight: 700, cursor: "pointer" }}>
                      Raise Now →
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Request Detail Modal */}
      {detailReq && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.75)", zIndex: 100, display: "flex", alignItems: "center", justifyContent: "center", padding: "1rem" }}>
          <div style={{ ...glass, padding: "2rem", maxWidth: 520, width: "100%", background: "rgba(15,23,42,0.97)", maxHeight: "85vh", overflowY: "auto" }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: "1.25rem" }}>
              <div>
                <div style={{ fontFamily: "'Syne', sans-serif", fontWeight: 800, fontSize: "1.15rem" }}>{detailReq.service}</div>
                <div style={{ color: COLORS.accent, fontSize: "0.8rem" }}>{detailReq.id}</div>
              </div>
              <button onClick={() => setDetailReq(null)} style={{ background: "none", border: "none", color: COLORS.muted, fontSize: "1.3rem", cursor: "pointer" }}>✕</button>
            </div>

            <div style={{ marginBottom: "1.25rem" }}>
              <ProgressTracker status={detailReq.status} />
            </div>

            <div style={{ display: "flex", gap: "0.5rem", flexWrap: "wrap", marginBottom: "1.25rem" }}>
              <Badge label={STATUS_META[detailReq.status]?.label} color={STATUS_META[detailReq.status]?.color} bg={STATUS_META[detailReq.status]?.bg} />
              <Badge label={PRIORITY_META[detailReq.priority]?.label} color={PRIORITY_META[detailReq.priority]?.color} bg={`${PRIORITY_META[detailReq.priority]?.color}18`} />
            </div>

            {[
              ["Category", detailReq.category],
              ["Raised On", detailReq.createdAt],
              ["Assigned To", detailReq.assignedTo || "Not yet assigned"],
            ].map(([label, value]) => (
              <div key={label} style={{ display: "flex", justifyContent: "space-between", padding: "0.6rem 0", borderBottom: "1px solid rgba(51,65,85,0.4)" }}>
                <span style={{ color: COLORS.muted, fontSize: "0.85rem" }}>{label}</span>
                <span style={{ fontSize: "0.85rem", fontWeight: 600, color: label === "Assigned To" && detailReq.assignedTo ? COLORS.success : COLORS.text }}>{value}</span>
              </div>
            ))}

            <div style={{ marginTop: "1rem", padding: "0.9rem", background: "rgba(15,23,42,0.6)", borderRadius: "0.625rem", border: `1px solid ${COLORS.border}` }}>
              <div style={{ fontSize: "0.72rem", color: COLORS.muted, marginBottom: "0.4rem", letterSpacing: "0.07em" }}>DESCRIPTION</div>
              <div style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>{detailReq.description}</div>
            </div>

            {detailReq.status === "completed" && (
              <div style={{ marginTop: "1rem", background: "rgba(16,185,129,0.1)", border: "1px solid rgba(16,185,129,0.25)", borderRadius: "0.75rem", padding: "1rem", textAlign: "center", color: COLORS.success, fontWeight: 600 }}>
                🎉 Your service request was completed!
              </div>
            )}

            <button onClick={() => setDetailReq(null)}
              style={{ width: "100%", marginTop: "1.25rem", padding: "0.7rem", border: `1px solid ${COLORS.border}`, borderRadius: "0.625rem", background: "transparent", color: COLORS.muted, cursor: "pointer", fontFamily: "'DM Sans', sans-serif" }}>
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
