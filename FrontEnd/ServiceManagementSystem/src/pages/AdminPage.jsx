import { useEffect, useState } from "react";

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

const SERVICEMEN = [
  {
    id: 1,
    name: "Rajan Kumar",
    specialty: "Electronics",
    rating: 4.8,
    active: 2,
  },
  { id: 2, name: "Amit Sharma", specialty: "Plumbing", rating: 4.6, active: 1 },
  {
    id: 3,
    name: "Priya Singh",
    specialty: "Electrical",
    rating: 4.9,
    active: 0,
  },
  {
    id: 4,
    name: "Vikram Nair",
    specialty: "Carpentry",
    rating: 4.5,
    active: 3,
  },
  { id: 5, name: "Sita Devi", specialty: "Cleaning", rating: 4.7, active: 1 },
];

const INIT_REQUESTS = [
  {
    id: "SRV-001",
    user: "Arjun Reddy",
    service: "Laptop Repair",
    description: "Need a laptop repairing serviceman — keyboard not working.",
    category: "Electronics",
    status: "pending",
    assignedTo: null,
    createdAt: "2025-06-10 09:14",
    priority: "high",
  },
  {
    id: "SRV-002",
    user: "Meena Iyer",
    service: "Pipe Leakage Fix",
    description: "Bathroom pipe leaking since yesterday, causing flooding.",
    category: "Plumbing",
    status: "assigned",
    assignedTo: 2,
    createdAt: "2025-06-10 10:30",
    priority: "urgent",
  },
  {
    id: "SRV-003",
    user: "Rohan Gupta",
    service: "AC Installation",
    description: "New 1.5 ton AC needs to be installed in bedroom.",
    category: "Electrical",
    status: "in_progress",
    assignedTo: 3,
    createdAt: "2025-06-09 15:00",
    priority: "medium",
  },
  {
    id: "SRV-004",
    user: "Deepa Nair",
    service: "House Cleaning",
    description: "Full house cleaning required before family function.",
    category: "Cleaning",
    status: "completed",
    assignedTo: 5,
    createdAt: "2025-06-08 08:00",
    priority: "low",
  },
  {
    id: "SRV-005",
    user: "Suresh Babu",
    service: "Door Repair",
    description: "Main door hinge broken, door not closing properly.",
    category: "Carpentry",
    status: "pending",
    assignedTo: null,
    createdAt: "2025-06-10 11:45",
    priority: "medium",
  },
  {
    id: "SRV-006",
    user: "Kavya Rao",
    service: "Wiring Issue",
    description: "Frequent power trips in kitchen area. Needs inspection.",
    category: "Electrical",
    status: "pending",
    assignedTo: null,
    createdAt: "2025-06-10 12:00",
    priority: "high",
  },
];

const STATUS_META = {
  pending: {
    label: "Pending",
    color: COLORS.warning,
    bg: "rgba(245,158,11,0.12)",
  },
  assigned: {
    label: "Assigned",
    color: COLORS.accent2,
    bg: "rgba(59,130,246,0.12)",
  },
  in_progress: {
    label: "In Progress",
    color: COLORS.purple,
    bg: "rgba(168,85,247,0.12)",
  },
  completed: {
    label: "Completed",
    color: COLORS.success,
    bg: "rgba(16,185,129,0.12)",
  },
  cancelled: {
    label: "Cancelled",
    color: COLORS.danger,
    bg: "rgba(239,68,68,0.12)",
  },
};

const PRIORITY_META = {
  urgent: { label: "Urgent", color: COLORS.danger },
  high: { label: "High", color: COLORS.warning },
  medium: { label: "Medium", color: COLORS.accent },
  low: { label: "Low", color: COLORS.muted },
};

function StatusBadge({ status }) {
  const m = STATUS_META[status] || STATUS_META.pending;
  return (
    <span
      style={{
        background: m.bg,
        color: m.color,
        padding: "0.25rem 0.7rem",
        borderRadius: "2rem",
        fontSize: "0.75rem",
        fontWeight: 600,
        letterSpacing: "0.03em",
      }}
    >
      {m.label}
    </span>
  );
}

function PriorityDot({ priority }) {
  const m = PRIORITY_META[priority] || PRIORITY_META.medium;
  return (
    <span
      style={{
        display: "flex",
        alignItems: "center",
        gap: "0.3rem",
        fontSize: "0.78rem",
        color: m.color,
        fontWeight: 600,
      }}
    >
      <span
        style={{
          width: 8,
          height: 8,
          borderRadius: "50%",
          background: m.color,
          display: "inline-block",
        }}
      />
      {m.label}
    </span>
  );
}

function Sidebar({ activeTab, setActiveTab, onLogout }) {
  const navItems = [
    { id: "dashboard", icon: "📊", label: "Dashboard" },
    { id: "requests", icon: "📋", label: "Service Requests" },
    { id: "servicemen", icon: "👨‍🔧", label: "Servicemen" },
    { id: "users", icon: "👥", label: "Users" },
    { id: "reports", icon: "📈", label: "Reports" },
    { id: "settings", icon: "⚙️", label: "Settings" },
  ];
  return (
    <div
      style={{
        width: 230,
        minHeight: "100vh",
        background: COLORS.surface,
        borderRight: `1px solid ${COLORS.border}`,
        display: "flex",
        flexDirection: "column",
        flexShrink: 0,
      }}
    >
      <div
        style={{
          padding: "1.5rem 1.25rem",
          borderBottom: `1px solid ${COLORS.border}`,
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: "0.5rem" }}>
          <span style={{ fontSize: "1.4rem" }}>⚙️</span>
          <span
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "1.15rem",
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
            fontSize: "0.72rem",
            color: COLORS.muted,
            marginTop: "0.25rem",
            letterSpacing: "0.08em",
          }}
        >
          ADMIN PANEL
        </div>
      </div>
      <nav style={{ flex: 1, padding: "1rem 0.75rem" }}>
        {navItems.map((item) => (
          <button
            key={item.id}
            onClick={() => setActiveTab(item.id)}
            style={{
              width: "100%",
              display: "flex",
              alignItems: "center",
              gap: "0.75rem",
              padding: "0.65rem 0.75rem",
              borderRadius: "0.6rem",
              border: "none",
              background:
                activeTab === item.id ? "rgba(6,182,212,0.12)" : "transparent",
              color: activeTab === item.id ? COLORS.accent : COLORS.muted,
              fontSize: "0.88rem",
              fontWeight: activeTab === item.id ? 600 : 400,
              cursor: "pointer",
              marginBottom: "0.2rem",
              textAlign: "left",
              fontFamily: "'DM Sans', sans-serif",
              transition: "all 0.15s",
              borderLeft:
                activeTab === item.id
                  ? `3px solid ${COLORS.accent}`
                  : "3px solid transparent",
            }}
          >
            <span>{item.icon}</span>
            {item.label}
          </button>
        ))}
      </nav>
      <div
        style={{
          padding: "1rem 1.25rem",
          borderTop: `1px solid ${COLORS.border}`,
        }}
      >
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "0.75rem",
            marginBottom: "0.75rem",
          }}
        >
          <div
            style={{
              width: 36,
              height: 36,
              borderRadius: "50%",
              background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent2})`,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              fontSize: "1rem",
            }}
          >
            👑
          </div>
          <div>
            <div style={{ fontSize: "0.85rem", fontWeight: 600 }}>Admin</div>
            <div style={{ fontSize: "0.72rem", color: COLORS.muted }}>
              admin@servicehub.com
            </div>
          </div>
        </div>
        <button
          onClick={onLogout}
          style={{
            width: "100%",
            padding: "0.5rem",
            background: "rgba(239,68,68,0.1)",
            border: "1px solid rgba(239,68,68,0.2)",
            borderRadius: "0.5rem",
            color: COLORS.danger,
            fontSize: "0.82rem",
            cursor: "pointer",
            fontFamily: "'DM Sans', sans-serif",
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}

function StatCard({ icon, label, value, sub, color }) {
  return (
    <div style={{ ...glass, padding: "1.25rem 1.5rem", flex: "1 1 160px" }}>
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
        }}
      >
        <div>
          <div
            style={{
              fontSize: "0.78rem",
              color: COLORS.muted,
              marginBottom: "0.4rem",
              letterSpacing: "0.05em",
            }}
          >
            {label}
          </div>
          <div
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "1.8rem",
              fontWeight: 800,
              color: color || COLORS.text,
            }}
          >
            {value}
          </div>
          {sub && (
            <div
              style={{
                fontSize: "0.75rem",
                color: COLORS.muted,
                marginTop: "0.25rem",
              }}
            >
              {sub}
            </div>
          )}
        </div>
        <span style={{ fontSize: "1.6rem", opacity: 0.8 }}>{icon}</span>
      </div>
    </div>
  );
}

export default function AdminPage({ onLogout }) {
  const [activeTab, setActiveTab] = useState("requests");
  const [requests, setRequests] = useState([]);
  const [filter, setFilter] = useState("all");
  const [search, setSearch] = useState("");
  const [assignModal, setAssignModal] = useState(null); // request obj
  const [selectedServiceman, setSelectedServiceman] = useState(null);
  const [detailModal, setDetailModal] = useState(null);

  // FIX 1: counts object derived from requests state
  const counts = {
    total: requests.length,
    pending: requests.filter((r) => r.status === "pending").length,
    assigned: requests.filter((r) => r.status === "assigned").length,
    in_progress: requests.filter((r) => r.status === "in_progress").length,
    completed: requests.filter((r) => r.status === "completed").length,
  };

  const filtered = requests.filter((r) => {
    const matchFilter = filter === "all" || r.status === filter;

    const matchSearch =
      (r.user || "").toLowerCase().includes(search.toLowerCase()) ||
      (r.service || "").toLowerCase().includes(search.toLowerCase()) ||
      String(r.id).includes(search);

    return matchFilter && matchSearch;
  });

  useEffect(() => {
    fetchServices();
  }, []);

  const fetchServices = async () => {
    try {
      const response = await fetch("http://localhost:8000/getAllServices");
      const data = await response.json();

      const formatted = data.map((item, index) => ({
        id: item.id || index + 1,
        user: item.userEmail,
        service: item.serviceName,
        description: item.serviceDescription,
        category: item.serviceType,
        // FIX 3: safe status fallback
        status: item.status || "pending",
        assignedTo: item.assignedTo || null,
        createdAt: item.createdAt,
        // FIX 4: safer priority mapping using String()
        priority:
          String(item.priority) === "1"
            ? "low"
            : String(item.priority) === "2"
              ? "medium"
              : String(item.priority) === "3"
                ? "high"
                : "medium",
      }));

      setRequests(formatted);
    } catch (err) {
      // If API is unavailable, fall back to initial mock data
      console.error("Failed to fetch services, using mock data:", err);
      setRequests(INIT_REQUESTS);
    }
  };

  const handleStatusChange = (id, newStatus) => {
    setRequests((prev) =>
      prev.map((r) => (r.id === id ? { ...r, status: newStatus } : r)),
    );
  };

  // FIX 2: handleAssign function
  const handleAssign = () => {
    if (!selectedServiceman || !assignModal) return;
    setRequests((prev) =>
      prev.map((r) =>
        r.id === assignModal.id
          ? { ...r, status: "assigned", assignedTo: selectedServiceman }
          : r,
      ),
    );
    setAssignModal(null);
    setSelectedServiceman(null);
  };

  return (
    <div
      style={{
        display: "flex",
        minHeight: "100vh",
        background: COLORS.bg,
        fontFamily: "'DM Sans', sans-serif",
        color: COLORS.text,
      }}
    >
      <link
        href="https://fonts.googleapis.com/css2?family=Syne:wght@400;600;700;800&family=DM+Sans:wght@300;400;500;600&display=swap"
        rel="stylesheet"
      />

      {/* Ambient blobs */}
      <div
        style={{
          position: "fixed",
          top: "10%",
          right: "5%",
          width: 300,
          height: 300,
          background:
            "radial-gradient(circle, rgba(59,130,246,0.07) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      <Sidebar
        activeTab={activeTab}
        setActiveTab={setActiveTab}
        onLogout={onLogout}
      />

      <div
        style={{
          flex: 1,
          display: "flex",
          flexDirection: "column",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Top Header */}
        <header
          style={{
            background: "rgba(15,23,42,0.9)",
            backdropFilter: "blur(12px)",
            borderBottom: `1px solid ${COLORS.border}`,
            padding: "0.9rem 2rem",
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            gap: "1rem",
            flexWrap: "wrap",
          }}
        >
          <div>
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.25rem",
                fontWeight: 800,
                margin: 0,
              }}
            >
              Service Requests Management
            </h1>
            <p style={{ margin: 0, fontSize: "0.8rem", color: COLORS.muted }}>
              Assign, track, and manage all service requests
            </p>
          </div>
          <div
            style={{ display: "flex", alignItems: "center", gap: "0.75rem" }}
          >
            <span
              style={{
                background: "rgba(6,182,212,0.1)",
                border: `1px solid rgba(6,182,212,0.25)`,
                borderRadius: "2rem",
                padding: "0.3rem 0.9rem",
                fontSize: "0.78rem",
                color: COLORS.accent,
              }}
            >
              🟢 Live
            </span>
            <span style={{ fontSize: "0.82rem", color: COLORS.muted }}>
              {new Date().toLocaleDateString("en-IN", {
                weekday: "short",
                day: "numeric",
                month: "short",
              })}
            </span>
          </div>
        </header>

        <main style={{ flex: 1, padding: "1.75rem 2rem", overflowY: "auto" }}>
          {/* Stat Cards */}
          <div
            style={{
              display: "flex",
              gap: "1rem",
              flexWrap: "wrap",
              marginBottom: "1.75rem",
            }}
          >
            <StatCard
              icon="📋"
              label="TOTAL REQUESTS"
              value={counts.total}
              sub="All time"
              color={COLORS.text}
            />
            <StatCard
              icon="⏳"
              label="PENDING"
              value={counts.pending}
              sub="Needs assignment"
              color={COLORS.warning}
            />
            <StatCard
              icon="🔵"
              label="ASSIGNED"
              value={counts.assigned}
              sub="In queue"
              color={COLORS.accent2}
            />
            <StatCard
              icon="⚙️"
              label="IN PROGRESS"
              value={counts.in_progress}
              sub="Active work"
              color={COLORS.purple}
            />
            <StatCard
              icon="✅"
              label="COMPLETED"
              value={counts.completed}
              sub="Resolved"
              color={COLORS.success}
            />
          </div>

          {/* Filters + Search */}
          <div
            style={{
              display: "flex",
              gap: "0.75rem",
              flexWrap: "wrap",
              marginBottom: "1.25rem",
              alignItems: "center",
            }}
          >
            <input
              placeholder="🔍  Search by user, service, ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              style={{
                flex: "1 1 220px",
                padding: "0.6rem 1rem",
                background: "rgba(15,23,42,0.8)",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "0.625rem",
                color: COLORS.text,
                fontSize: "0.88rem",
                outline: "none",
                fontFamily: "'DM Sans', sans-serif",
              }}
            />
            {["all", "pending", "assigned", "in_progress", "completed"].map(
              (f) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "0.5rem 1rem",
                    border: `1px solid ${filter === f ? COLORS.accent : COLORS.border}`,
                    borderRadius: "0.5rem",
                    background:
                      filter === f ? "rgba(6,182,212,0.12)" : "transparent",
                    color: filter === f ? COLORS.accent : COLORS.muted,
                    fontSize: "0.8rem",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: filter === f ? 600 : 400,
                    textTransform: "capitalize",
                  }}
                >
                  {f === "all" ? "All" : f.replace("_", " ")}
                </button>
              ),
            )}
          </div>

          {/* Requests Table */}
          {activeTab === "requests" && (
            <div style={{ ...glass, overflow: "hidden" }}>
              <div style={{ overflowX: "auto" }}>
                <table
                  style={{
                    width: "100%",
                    borderCollapse: "collapse",
                    fontSize: "0.87rem",
                  }}
                >
                  <thead>
                    <tr style={{ borderBottom: `1px solid ${COLORS.border}` }}>
                      {[
                        "ID",
                        "User",
                        "Service",
                        "Category",
                        "Priority",
                        "Status",
                        "Assigned To",
                        "Raised On",
                        "Actions",
                      ].map((h) => (
                        <th
                          key={h}
                          style={{
                            padding: "0.9rem 1rem",
                            textAlign: "left",
                            color: COLORS.muted,
                            fontSize: "0.75rem",
                            fontWeight: 600,
                            letterSpacing: "0.07em",
                            whiteSpace: "nowrap",
                          }}
                        >
                          {h.toUpperCase()}
                        </th>
                      ))}
                    </tr>
                  </thead>
                  <tbody>
                    {filtered.map((req, i) => {
                      const sm = SERVICEMEN.find(
                        (s) => s.id === req.assignedTo,
                      );
                      return (
                        <tr
                          key={req.id}
                          style={{
                            borderBottom: `1px solid rgba(51,65,85,0.5)`,
                            background:
                              i % 2 === 0
                                ? "transparent"
                                : "rgba(15,23,42,0.3)",
                            transition: "background 0.15s",
                          }}
                          onMouseEnter={(e) =>
                            (e.currentTarget.style.background =
                              "rgba(6,182,212,0.05)")
                          }
                          onMouseLeave={(e) =>
                            (e.currentTarget.style.background =
                              i % 2 === 0
                                ? "transparent"
                                : "rgba(15,23,42,0.3)")
                          }
                        >
                          <td
                            style={{
                              padding: "0.85rem 1rem",
                              color: COLORS.accent,
                              fontWeight: 700,
                              whiteSpace: "nowrap",
                            }}
                          >
                            {req.id}
                          </td>
                          <td
                            style={{
                              padding: "0.85rem 1rem",
                              whiteSpace: "nowrap",
                            }}
                          >
                            <div
                              style={{
                                display: "flex",
                                alignItems: "center",
                                gap: "0.5rem",
                              }}
                            >
                              <div
                                style={{
                                  width: 28,
                                  height: 28,
                                  borderRadius: "50%",
                                  background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`,
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  fontSize: "0.7rem",
                                  fontWeight: 700,
                                  flexShrink: 0,
                                }}
                              >
                                {req.user
                                  .split(" ")
                                  .map((n) => n[0])
                                  .join("")}
                              </div>
                              {req.user}
                            </div>
                          </td>
                          <td
                            style={{ padding: "0.85rem 1rem", maxWidth: 180 }}
                          >
                            <div style={{ fontWeight: 600 }}>{req.service}</div>
                            <div
                              style={{
                                fontSize: "0.75rem",
                                color: COLORS.muted,
                                overflow: "hidden",
                                textOverflow: "ellipsis",
                                whiteSpace: "nowrap",
                                maxWidth: 160,
                              }}
                            >
                              {req.description}
                            </div>
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <span
                              style={{
                                background: "rgba(99,118,160,0.15)",
                                color: COLORS.muted,
                                padding: "0.2rem 0.6rem",
                                borderRadius: "0.4rem",
                                fontSize: "0.75rem",
                              }}
                            >
                              {req.category}
                            </span>
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <PriorityDot priority={req.priority} />
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <StatusBadge status={req.status} />
                          </td>
                          <td
                            style={{
                              padding: "0.85rem 1rem",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {sm ? (
                              <span
                                style={{
                                  color: COLORS.success,
                                  fontSize: "0.82rem",
                                }}
                              >
                                🔧 {sm.name}
                              </span>
                            ) : (
                              <span
                                style={{
                                  color: COLORS.muted,
                                  fontSize: "0.8rem",
                                }}
                              >
                                — Unassigned
                              </span>
                            )}
                          </td>
                          <td
                            style={{
                              padding: "0.85rem 1rem",
                              color: COLORS.muted,
                              fontSize: "0.78rem",
                              whiteSpace: "nowrap",
                            }}
                          >
                            {req.createdAt}
                          </td>
                          <td style={{ padding: "0.85rem 1rem" }}>
                            <div
                              style={{
                                display: "flex",
                                gap: "0.4rem",
                                flexWrap: "wrap",
                              }}
                            >
                              <button
                                onClick={() => setDetailModal(req)}
                                style={{
                                  padding: "0.3rem 0.65rem",
                                  border: `1px solid ${COLORS.border}`,
                                  borderRadius: "0.4rem",
                                  background: "transparent",
                                  color: COLORS.muted,
                                  fontSize: "0.75rem",
                                  cursor: "pointer",
                                  fontFamily: "'DM Sans', sans-serif",
                                }}
                              >
                                View
                              </button>
                              {req.status === "pending" && (
                                <button
                                  onClick={() => setAssignModal(req)}
                                  style={{
                                    padding: "0.3rem 0.65rem",
                                    border: `1px solid ${COLORS.accent2}`,
                                    borderRadius: "0.4rem",
                                    background: "rgba(59,130,246,0.12)",
                                    color: COLORS.accent2,
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    fontWeight: 600,
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  Assign
                                </button>
                              )}
                              {req.status === "assigned" && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(req.id, "in_progress")
                                  }
                                  style={{
                                    padding: "0.3rem 0.65rem",
                                    border: `1px solid ${COLORS.purple}`,
                                    borderRadius: "0.4rem",
                                    background: "rgba(168,85,247,0.1)",
                                    color: COLORS.purple,
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  Start
                                </button>
                              )}
                              {(req.status === "pending" ||
                                req.status === "assigned") && (
                                <button
                                  onClick={() =>
                                    handleStatusChange(req.id, "cancelled")
                                  }
                                  style={{
                                    padding: "0.3rem 0.65rem",
                                    border: `1px solid rgba(239,68,68,0.3)`,
                                    borderRadius: "0.4rem",
                                    background: "transparent",
                                    color: COLORS.danger,
                                    fontSize: "0.75rem",
                                    cursor: "pointer",
                                    fontFamily: "'DM Sans', sans-serif",
                                  }}
                                >
                                  Cancel
                                </button>
                              )}
                            </div>
                          </td>
                        </tr>
                      );
                    })}
                    {filtered.length === 0 && (
                      <tr>
                        <td
                          colSpan={9}
                          style={{
                            textAlign: "center",
                            padding: "3rem",
                            color: COLORS.muted,
                          }}
                        >
                          No requests found
                        </td>
                      </tr>
                    )}
                  </tbody>
                </table>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Assign Modal */}
      {assignModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              ...glass,
              padding: "2rem",
              width: "100%",
              maxWidth: 480,
              background: "rgba(15,23,42,0.97)",
            }}
          >
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.15rem",
                fontWeight: 800,
                marginBottom: "0.25rem",
              }}
            >
              Assign Serviceman
            </h2>
            <p
              style={{
                color: COLORS.muted,
                fontSize: "0.85rem",
                marginBottom: "1.5rem",
              }}
            >
              {assignModal.service} —{" "}
              <strong style={{ color: COLORS.text }}>{assignModal.user}</strong>
            </p>
            <div style={{ marginBottom: "1.25rem" }}>
              <div
                style={{
                  fontSize: "0.8rem",
                  color: COLORS.muted,
                  marginBottom: "0.75rem",
                }}
              >
                Select a serviceman:
              </div>
              <div
                style={{
                  display: "flex",
                  flexDirection: "column",
                  gap: "0.6rem",
                }}
              >
                {SERVICEMEN.map((sm) => (
                  <div
                    key={sm.id}
                    onClick={() => setSelectedServiceman(sm.id)}
                    style={{
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "space-between",
                      padding: "0.85rem 1rem",
                      border: `1px solid ${selectedServiceman === sm.id ? COLORS.accent : COLORS.border}`,
                      borderRadius: "0.625rem",
                      background:
                        selectedServiceman === sm.id
                          ? "rgba(6,182,212,0.1)"
                          : "rgba(15,23,42,0.5)",
                      cursor: "pointer",
                      transition: "all 0.15s",
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        alignItems: "center",
                        gap: "0.75rem",
                      }}
                    >
                      <div
                        style={{
                          width: 34,
                          height: 34,
                          borderRadius: "50%",
                          background: `linear-gradient(135deg, ${COLORS.success}, ${COLORS.accent})`,
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          fontSize: "0.75rem",
                          fontWeight: 700,
                        }}
                      >
                        {sm.name
                          .split(" ")
                          .map((n) => n[0])
                          .join("")}
                      </div>
                      <div>
                        <div style={{ fontWeight: 600, fontSize: "0.9rem" }}>
                          {sm.name}
                        </div>
                        <div
                          style={{ fontSize: "0.75rem", color: COLORS.muted }}
                        >
                          {sm.specialty}
                        </div>
                      </div>
                    </div>
                    <div style={{ textAlign: "right" }}>
                      <div
                        style={{ fontSize: "0.78rem", color: COLORS.warning }}
                      >
                        ⭐ {sm.rating}
                      </div>
                      <div style={{ fontSize: "0.72rem", color: COLORS.muted }}>
                        {sm.active} active jobs
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => {
                  setAssignModal(null);
                  setSelectedServiceman(null);
                }}
                style={{
                  flex: 1,
                  padding: "0.7rem",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "0.625rem",
                  background: "transparent",
                  color: COLORS.muted,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleAssign}
                disabled={!selectedServiceman}
                style={{
                  flex: 1,
                  padding: "0.7rem",
                  border: "none",
                  borderRadius: "0.625rem",
                  background: selectedServiceman
                    ? `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`
                    : COLORS.border,
                  color: "#fff",
                  fontWeight: 700,
                  cursor: selectedServiceman ? "pointer" : "not-allowed",
                  fontFamily: "'Syne', sans-serif",
                  opacity: selectedServiceman ? 1 : 0.5,
                }}
              >
                Confirm Assignment
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Detail Modal */}
      {detailModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.7)",
            zIndex: 100,
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            padding: "1rem",
          }}
        >
          <div
            style={{
              ...glass,
              padding: "2rem",
              width: "100%",
              maxWidth: 460,
              background: "rgba(15,23,42,0.97)",
            }}
          >
            <div
              style={{
                display: "flex",
                justifyContent: "space-between",
                marginBottom: "1.25rem",
                alignItems: "flex-start",
              }}
            >
              <div>
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "1.1rem",
                  }}
                >
                  {detailModal.service}
                </div>
                <div
                  style={{
                    color: COLORS.accent,
                    fontSize: "0.8rem",
                    marginTop: 2,
                  }}
                >
                  {detailModal.id}
                </div>
              </div>
              <button
                onClick={() => setDetailModal(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.muted,
                  fontSize: "1.2rem",
                  cursor: "pointer",
                }}
              >
                ✕
              </button>
            </div>
            {[
              ["User", detailModal.user],
              ["Category", detailModal.category],
              ["Priority", detailModal.priority],
              ["Status", detailModal.status],
              ["Raised On", detailModal.createdAt],
              [
                "Assigned To",
                SERVICEMEN.find((s) => s.id === detailModal.assignedTo)?.name ||
                  "Unassigned",
              ],
            ].map(([label, value]) => (
              <div
                key={label}
                style={{
                  display: "flex",
                  justifyContent: "space-between",
                  padding: "0.6rem 0",
                  borderBottom: `1px solid rgba(51,65,85,0.4)`,
                }}
              >
                <span style={{ color: COLORS.muted, fontSize: "0.85rem" }}>
                  {label}
                </span>
                <span
                  style={{
                    fontSize: "0.85rem",
                    fontWeight: 600,
                    textTransform: "capitalize",
                  }}
                >
                  {value}
                </span>
              </div>
            ))}
            <div
              style={{
                marginTop: "1rem",
                padding: "0.9rem",
                background: "rgba(15,23,42,0.6)",
                borderRadius: "0.625rem",
                border: `1px solid ${COLORS.border}`,
              }}
            >
              <div
                style={{
                  fontSize: "0.75rem",
                  color: COLORS.muted,
                  marginBottom: "0.4rem",
                }}
              >
                DESCRIPTION
              </div>
              <div style={{ fontSize: "0.88rem", lineHeight: 1.6 }}>
                {detailModal.description}
              </div>
            </div>
            <button
              onClick={() => setDetailModal(null)}
              style={{
                width: "100%",
                marginTop: "1.25rem",
                padding: "0.7rem",
                border: `1px solid ${COLORS.border}`,
                borderRadius: "0.625rem",
                background: "transparent",
                color: COLORS.muted,
                cursor: "pointer",
                fontFamily: "'DM Sans', sans-serif",
              }}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
