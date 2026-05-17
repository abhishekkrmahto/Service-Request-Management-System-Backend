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

const INIT_TASKS = [
  {
    id: "SRV-002",
    user: "Meena Iyer",
    phone: "+91 98765 43210",
    address: "12A, Rose Garden, Vijayawada",
    service: "Pipe Leakage Fix",
    description:
      "Bathroom pipe leaking since yesterday, causing flooding in the ground floor.",
    category: "Plumbing",
    status: "assigned",
    assignedAt: "2025-06-10 10:45",
    priority: "urgent",
    notes: "",
  },
  {
    id: "SRV-007",
    user: "Priya Rao",
    phone: "+91 87654 32109",
    address: "45, Green Lane, Vijayawada",
    service: "Fan Installation",
    description:
      "Two ceiling fans need to be installed in living room and bedroom.",
    category: "Electrical",
    status: "in_progress",
    assignedAt: "2025-06-09 14:00",
    priority: "medium",
    notes: "Collected tools. Wiring check pending.",
  },
  {
    id: "SRV-010",
    user: "Rajesh Babu",
    phone: "+91 76543 21098",
    address: "78, Palm Street, Vijayawada",
    service: "Refrigerator Repair",
    description: "Fridge not cooling, compressor making loud noise.",
    category: "Electronics",
    status: "assigned",
    assignedAt: "2025-06-10 09:30",
    priority: "high",
    notes: "",
  },
  {
    id: "SRV-004",
    user: "Deepa Nair",
    phone: "+91 65432 10987",
    address: "23, Lake View, Vijayawada",
    service: "House Cleaning",
    description: "Full house cleaning required before family function.",
    category: "Cleaning",
    status: "completed",
    assignedAt: "2025-06-08 08:00",
    priority: "low",
    notes: "All rooms cleaned. Customer satisfied.",
  },
  {
    id: "SRV-011",
    user: "Arun Shetty",
    phone: "+91 54321 09876",
    address: "9, Hill Top, Vijayawada",
    service: "Door Lock Replacement",
    description: "Main door lock broken. Need full lock set replacement.",
    category: "Carpentry",
    status: "completed",
    assignedAt: "2025-06-07 11:00",
    priority: "medium",
    notes: "Lock replaced successfully. Key handed over.",
  },
];

const STATUS_META = {
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
};

const PRIORITY_META = {
  urgent: { label: "Urgent", color: COLORS.danger, bg: "rgba(239,68,68,0.1)" },
  high: { label: "High", color: COLORS.warning, bg: "rgba(245,158,11,0.1)" },
  medium: { label: "Medium", color: COLORS.accent, bg: "rgba(6,182,212,0.1)" },
  low: { label: "Low", color: COLORS.muted, bg: "rgba(148,163,184,0.1)" },
};

function Badge({ label, color, bg }) {
  return (
    <span
      style={{
        background: bg,
        color,
        padding: "0.22rem 0.65rem",
        borderRadius: "2rem",
        fontSize: "0.73rem",
        fontWeight: 700,
        letterSpacing: "0.04em",
      }}
    >
      {label}
    </span>
  );
}

function NavItem({ icon, label, active, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        width: "100%",
        display: "flex",
        alignItems: "center",
        gap: "0.75rem",
        padding: "0.65rem 0.75rem",
        borderRadius: "0.6rem",
        border: "none",
        background: active ? "rgba(6,182,212,0.12)" : "transparent",
        color: active ? COLORS.accent : COLORS.muted,
        fontSize: "0.88rem",
        fontWeight: active ? 600 : 400,
        cursor: "pointer",
        marginBottom: "0.2rem",
        textAlign: "left",
        fontFamily: "'DM Sans', sans-serif",
        transition: "all 0.15s",
        borderLeft: active
          ? `3px solid ${COLORS.accent}`
          : "3px solid transparent",
      }}
    >
      <span>{icon}</span>
      {label}
    </button>
  );
}

function StatMini({ icon, label, value, color }) {
  return (
    <div
      style={{
        ...glass,
        padding: "1rem 1.25rem",
        flex: "1 1 130px",
        textAlign: "center",
      }}
    >
      <div style={{ fontSize: "1.5rem", marginBottom: "0.3rem" }}>{icon}</div>
      <div
        style={{
          fontFamily: "'Syne', sans-serif",
          fontSize: "1.6rem",
          fontWeight: 800,
          color: color || COLORS.text,
        }}
      >
        {value}
      </div>
      <div
        style={{
          fontSize: "0.73rem",
          color: COLORS.muted,
          marginTop: "0.1rem",
        }}
      >
        {label}
      </div>
    </div>
  );
}

export default function ServicemanPage({ onLogout }) {
  const [tasks, setTasks] = useState([]);
  const [activeTab, setActiveTab] = useState("tasks");
  const [filter, setFilter] = useState("all");
  const [selectedTask, setSelectedTask] = useState(null);
  const [noteInput, setNoteInput] = useState("");
  const [completionModal, setCompletionModal] = useState(null);
  const [completionNote, setCompletionNote] = useState("");

  useEffect(() => {
    fetch("http://127.0.0.1:8000/getServices")
      .then((res) => res.json())
      .then((data) => {
        console.log("DATA :", data);

        const formatted = data.map((item, index) => ({
          id: item.id || `SRV-${index + 1}`,

          user: item.userEmail || "Unknown User",

          phone: item.phone || "No Phone",

          address: item.serviceAddress || "No Address",

          service: item.serviceName || "Unknown Service",

          description: item.serviceDescription || "No Description",

          category: item.serviceType || "General",

          status:
            item.status &&
            ["assigned", "in_progress", "completed"].includes(
              item.status.toLowerCase(),
            )
              ? item.status.toLowerCase()
              : "assigned",

          assignedAt: item.createdAt || "N/A",

          priority:
            item.priority &&
            ["urgent", "high", "medium", "low"].includes(
              item.priority.toLowerCase(),
            )
              ? item.priority.toLowerCase()
              : "medium",

          notes: item.notes || "",
        }));

        setTasks(formatted);
      })
      .catch((err) => {
        console.log("ERROR :", err);
      });
  }, []);

  const myName = "Rajan Kumar";
  const mySpecialty = "Electronics";
  const myRating = 4.8;

  const filtered = tasks.filter((t) => filter === "all" || t.status === filter);

  const handleStartWork = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, status: "in_progress" } : t)),
    );
    if (selectedTask?.id === id)
      setSelectedTask((prev) => ({ ...prev, status: "in_progress" }));
  };

  const handleComplete = () => {
    if (!completionModal) return;
    setTasks((prev) =>
      prev.map((t) =>
        t.id === completionModal.id
          ? { ...t, status: "completed", notes: completionNote || t.notes }
          : t,
      ),
    );
    if (selectedTask?.id === completionModal.id)
      setSelectedTask((prev) => ({
        ...prev,
        status: "completed",
        notes: completionNote,
      }));
    setCompletionModal(null);
    setCompletionNote("");
  };

  const handleSaveNote = (id) => {
    setTasks((prev) =>
      prev.map((t) => (t.id === id ? { ...t, notes: noteInput } : t)),
    );
    setSelectedTask((prev) => ({ ...prev, notes: noteInput }));
  };

  const openTask = (task) => {
    setSelectedTask(task);
    setNoteInput(task.notes || "");
  };

  const counts = {
    assigned: tasks.filter((t) => t.status === "assigned").length,
    in_progress: tasks.filter((t) => t.status === "in_progress").length,
    completed: tasks.filter((t) => t.status === "completed").length,
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

      <div
        style={{
          position: "fixed",
          bottom: "10%",
          left: "5%",
          width: 250,
          height: 250,
          background:
            "radial-gradient(circle, rgba(16,185,129,0.08) 0%, transparent 70%)",
          pointerEvents: "none",
          zIndex: 0,
        }}
      />

      {/* Sidebar */}
      <div
        style={{
          width: 230,
          minHeight: "100vh",
          background: COLORS.surface,
          borderRight: `1px solid ${COLORS.border}`,
          display: "flex",
          flexDirection: "column",
          flexShrink: 0,
          position: "sticky",
          top: 0,
          height: "100vh",
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
              color: COLORS.success,
              marginTop: "0.25rem",
              letterSpacing: "0.08em",
            }}
          >
            SERVICEMAN PORTAL
          </div>
        </div>

        {/* Profile Card in Sidebar */}
        <div
          style={{
            margin: "1rem 0.75rem",
            padding: "1rem",
            background: "rgba(16,185,129,0.07)",
            border: "1px solid rgba(16,185,129,0.2)",
            borderRadius: "0.75rem",
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "0.6rem",
              marginBottom: "0.6rem",
            }}
          >
            <div
              style={{
                width: 38,
                height: 38,
                borderRadius: "50%",
                background: `linear-gradient(135deg, ${COLORS.success}, ${COLORS.accent})`,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                fontWeight: 800,
                fontSize: "0.85rem",
              }}
            >
              RK
            </div>
            <div>
              <div style={{ fontWeight: 700, fontSize: "0.88rem" }}>
                {myName}
              </div>
              <div style={{ fontSize: "0.72rem", color: COLORS.success }}>
                🟢 On Duty
              </div>
            </div>
          </div>
          <div style={{ fontSize: "0.75rem", color: COLORS.muted }}>
            {mySpecialty} Specialist
          </div>
          <div
            style={{
              fontSize: "0.75rem",
              color: COLORS.warning,
              marginTop: "0.2rem",
            }}
          >
            ⭐ {myRating} Rating
          </div>
        </div>

        <nav style={{ flex: 1, padding: "0 0.75rem" }}>
          <NavItem
            icon="📋"
            label="My Tasks"
            active={activeTab === "tasks"}
            onClick={() => setActiveTab("tasks")}
          />
          <NavItem
            icon="✅"
            label="Completed"
            active={activeTab === "completed"}
            onClick={() => {
              setActiveTab("completed");
              setFilter("completed");
            }}
          />
          <NavItem
            icon="📊"
            label="My Stats"
            active={activeTab === "stats"}
            onClick={() => setActiveTab("stats")}
          />
          <NavItem
            icon="📞"
            label="Contact Admin"
            active={activeTab === "contact"}
            onClick={() => setActiveTab("contact")}
          />
        </nav>

        <div
          style={{
            padding: "1rem 1.25rem",
            borderTop: `1px solid ${COLORS.border}`,
          }}
        >
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

      {/* Main */}
      <div
        style={{
          flex: 1,
          display: "flex",
          overflow: "hidden",
          position: "relative",
          zIndex: 1,
        }}
      >
        {/* Task List Panel */}
        <div
          style={{
            width: selectedTask ? 400 : "100%",
            minWidth: 320,
            borderRight: selectedTask ? `1px solid ${COLORS.border}` : "none",
            display: "flex",
            flexDirection: "column",
            transition: "width 0.3s",
          }}
        >
          {/* Header */}
          <header
            style={{
              background: "rgba(15,23,42,0.9)",
              backdropFilter: "blur(12px)",
              borderBottom: `1px solid ${COLORS.border}`,
              padding: "0.9rem 1.5rem",
            }}
          >
            <h1
              style={{
                fontFamily: "'Syne', sans-serif",
                fontSize: "1.2rem",
                fontWeight: 800,
                margin: 0,
              }}
            >
              My Assigned Tasks
            </h1>
            <p
              style={{
                margin: "0.1rem 0 0",
                fontSize: "0.78rem",
                color: COLORS.muted,
              }}
            >
              Track, update, and complete your work
            </p>
          </header>

          <div
            style={{
              padding: "1.25rem 1.25rem 0.75rem",
              overflowY: "auto",
              flex: 1,
            }}
          >
            {/* Mini Stats */}
            <div
              style={{
                display: "flex",
                gap: "0.75rem",
                marginBottom: "1.25rem",
                flexWrap: "wrap",
              }}
            >
              <StatMini
                icon="📌"
                label="Assigned"
                value={counts.assigned}
                color={COLORS.accent2}
              />
              <StatMini
                icon="⚙️"
                label="In Progress"
                value={counts.in_progress}
                color={COLORS.purple}
              />
              <StatMini
                icon="✅"
                label="Completed"
                value={counts.completed}
                color={COLORS.success}
              />
            </div>

            {/* Filter Tabs */}
            <div
              style={{
                display: "flex",
                gap: "0.4rem",
                marginBottom: "1rem",
                flexWrap: "wrap",
              }}
            >
              {[
                ["all", "All Tasks"],
                ["assigned", "Pending"],
                ["in_progress", "In Progress"],
                ["completed", "Done"],
              ].map(([f, label]) => (
                <button
                  key={f}
                  onClick={() => setFilter(f)}
                  style={{
                    padding: "0.4rem 0.85rem",
                    border: `1px solid ${filter === f ? COLORS.accent : COLORS.border}`,
                    borderRadius: "2rem",
                    background:
                      filter === f ? "rgba(6,182,212,0.12)" : "transparent",
                    color: filter === f ? COLORS.accent : COLORS.muted,
                    fontSize: "0.78rem",
                    cursor: "pointer",
                    fontFamily: "'DM Sans', sans-serif",
                    fontWeight: filter === f ? 600 : 400,
                  }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* Task Cards */}
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                gap: "0.75rem",
              }}
            >
              {filtered.map((task) => {
                const isSelected = selectedTask?.id === task.id;
                const sm = STATUS_META[task.status] || STATUS_META["assigned"];

                const pm =
                  PRIORITY_META[task.priority] || PRIORITY_META["medium"];
                return (
                  <div
                    key={task.id}
                    onClick={() => openTask(task)}
                    style={{
                      ...glass,
                      padding: "1.1rem 1.25rem",
                      cursor: "pointer",
                      border: `1px solid ${isSelected ? COLORS.accent : "rgba(99,118,160,0.2)"}`,
                      background: isSelected
                        ? "rgba(6,182,212,0.06)"
                        : "rgba(30,41,59,0.7)",
                      transition: "all 0.15s",
                    }}
                    onMouseEnter={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.borderColor =
                          "rgba(6,182,212,0.3)";
                    }}
                    onMouseLeave={(e) => {
                      if (!isSelected)
                        e.currentTarget.style.borderColor =
                          "rgba(99,118,160,0.2)";
                    }}
                  >
                    <div
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                        marginBottom: "0.5rem",
                      }}
                    >
                      <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                        {task.service}
                      </div>
                      <Badge label={sm.label} color={sm.color} bg={sm.bg} />
                    </div>
                    <div
                      style={{
                        fontSize: "0.8rem",
                        color: COLORS.muted,
                        marginBottom: "0.5rem",
                      }}
                    >
                      👤 {task.user || "Unknown"} · 📍{" "}
                      {(task.address || "").split(",")[0]}
                    </div>
                    <div
                      style={{
                        fontSize: "0.78rem",
                        color: COLORS.muted,
                        lineHeight: 1.5,
                        marginBottom: "0.65rem",
                        overflow: "hidden",
                        display: "-webkit-box",
                        WebkitLineClamp: 2,
                        WebkitBoxOrient: "vertical",
                      }}
                    >
                      {task.description}
                    </div>
                    <div
                      style={{
                        display: "flex",
                        gap: "0.5rem",
                        alignItems: "center",
                      }}
                    >
                      <Badge label={pm.label} color={pm.color} bg={pm.bg} />
                      <span
                        style={{ fontSize: "0.72rem", color: COLORS.muted }}
                      >
                        · Assigned {task.assignedAt}
                      </span>
                    </div>
                    {task.status === "assigned" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          handleStartWork(task.id);
                        }}
                        style={{
                          marginTop: "0.75rem",
                          width: "100%",
                          padding: "0.5rem",
                          border: `1px solid ${COLORS.purple}`,
                          borderRadius: "0.5rem",
                          background: "rgba(168,85,247,0.1)",
                          color: COLORS.purple,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        ▶ Start Work
                      </button>
                    )}
                    {task.status === "in_progress" && (
                      <button
                        onClick={(e) => {
                          e.stopPropagation();
                          setCompletionModal(task);
                          setCompletionNote(task.notes || "");
                        }}
                        style={{
                          marginTop: "0.75rem",
                          width: "100%",
                          padding: "0.5rem",
                          border: `1px solid ${COLORS.success}`,
                          borderRadius: "0.5rem",
                          background: "rgba(16,185,129,0.1)",
                          color: COLORS.success,
                          fontSize: "0.8rem",
                          fontWeight: 600,
                          cursor: "pointer",
                          fontFamily: "'DM Sans', sans-serif",
                        }}
                      >
                        ✓ Mark as Completed
                      </button>
                    )}
                  </div>
                );
              })}
              {filtered.length === 0 && (
                <div
                  style={{
                    textAlign: "center",
                    padding: "3rem 1rem",
                    color: COLORS.muted,
                  }}
                >
                  <div style={{ fontSize: "2rem", marginBottom: "0.5rem" }}>
                    🎉
                  </div>
                  <div style={{ fontWeight: 600 }}>No tasks here!</div>
                  <div style={{ fontSize: "0.82rem", marginTop: "0.25rem" }}>
                    Check another filter above.
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Task Detail Panel */}
        {selectedTask && (
          <div
            style={{
              flex: 1,
              display: "flex",
              flexDirection: "column",
              overflowY: "auto",
            }}
          >
            <div
              style={{
                background: "rgba(15,23,42,0.9)",
                backdropFilter: "blur(12px)",
                borderBottom: `1px solid ${COLORS.border}`,
                padding: "0.9rem 1.75rem",
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
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
                  {selectedTask.service}
                </div>
                <div style={{ fontSize: "0.78rem", color: COLORS.accent }}>
                  {selectedTask.id}
                </div>
              </div>
              <button
                onClick={() => setSelectedTask(null)}
                style={{
                  background: "none",
                  border: "none",
                  color: COLORS.muted,
                  fontSize: "1.3rem",
                  cursor: "pointer",
                  lineHeight: 1,
                }}
              >
                ✕
              </button>
            </div>

            <div style={{ padding: "1.75rem", flex: 1 }}>
              {/* Status Banner */}
              <div
                style={{
                  display: "flex",
                  gap: "0.75rem",
                  marginBottom: "1.5rem",
                  flexWrap: "wrap",
                }}
              >
                <Badge
                  label={STATUS_META[selectedTask.status]?.label}
                  color={STATUS_META[selectedTask.status]?.color}
                  bg={STATUS_META[selectedTask.status]?.bg}
                />
                <Badge
                  label={PRIORITY_META[selectedTask.priority]?.label}
                  color={PRIORITY_META[selectedTask.priority]?.color}
                  bg={PRIORITY_META[selectedTask.priority]?.bg}
                />
              </div>

              {/* Customer Info */}
              <div
                style={{
                  ...glass,
                  padding: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: COLORS.muted,
                    letterSpacing: "0.08em",
                    marginBottom: "0.9rem",
                  }}
                >
                  CUSTOMER DETAILS
                </div>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "0.9rem",
                    marginBottom: "0.9rem",
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: "50%",
                      background: `linear-gradient(135deg, ${COLORS.accent2}, ${COLORS.accent})`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: 800,
                      fontSize: "0.9rem",
                    }}
                  >
                    {(selectedTask.user || "U")
                      .split(" ")
                      .map((n) => n[0])
                      .join("")}
                  </div>
                  <div>
                    <div style={{ fontWeight: 700, fontSize: "0.95rem" }}>
                      {selectedTask.user}
                    </div>
                    <div style={{ fontSize: "0.8rem", color: COLORS.muted }}>
                      {selectedTask.phone}
                    </div>
                  </div>
                </div>
                <div
                  style={{
                    fontSize: "0.85rem",
                    color: COLORS.muted,
                    display: "flex",
                    gap: "0.5rem",
                  }}
                >
                  <span style={{ flexShrink: 0 }}>📍</span>
                  <span>{selectedTask.address}</span>
                </div>
              </div>

              {/* Service Details */}
              <div
                style={{
                  ...glass,
                  padding: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: COLORS.muted,
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                  }}
                >
                  SERVICE DETAILS
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.78rem", color: COLORS.muted }}>
                    Category:{" "}
                  </span>
                  <span style={{ fontSize: "0.85rem", fontWeight: 600 }}>
                    {selectedTask.category}
                  </span>
                </div>
                <div style={{ marginBottom: "0.5rem" }}>
                  <span style={{ fontSize: "0.78rem", color: COLORS.muted }}>
                    Assigned On:{" "}
                  </span>
                  <span style={{ fontSize: "0.85rem" }}>
                    {selectedTask.assignedAt}
                  </span>
                </div>
                <div
                  style={{
                    marginTop: "0.75rem",
                    padding: "0.85rem",
                    background: "rgba(15,23,42,0.6)",
                    borderRadius: "0.6rem",
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
                    PROBLEM DESCRIPTION
                  </div>
                  <div style={{ fontSize: "0.88rem", lineHeight: 1.65 }}>
                    {selectedTask.description}
                  </div>
                </div>
              </div>

              {/* Work Notes */}
              <div
                style={{
                  ...glass,
                  padding: "1.25rem",
                  marginBottom: "1.25rem",
                }}
              >
                <div
                  style={{
                    fontSize: "0.75rem",
                    color: COLORS.muted,
                    letterSpacing: "0.08em",
                    marginBottom: "0.75rem",
                  }}
                >
                  WORK NOTES
                </div>
                <textarea
                  value={noteInput}
                  onChange={(e) => setNoteInput(e.target.value)}
                  disabled={selectedTask.status === "completed"}
                  placeholder="Add notes about your work progress, parts needed, observations..."
                  rows={4}
                  style={{
                    width: "100%",
                    padding: "0.75rem",
                    background: "rgba(15,23,42,0.7)",
                    border: `1px solid ${COLORS.border}`,
                    borderRadius: "0.6rem",
                    color: COLORS.text,
                    fontSize: "0.88rem",
                    resize: "vertical",
                    outline: "none",
                    fontFamily: "'DM Sans', sans-serif",
                    boxSizing: "border-box",
                    opacity: selectedTask.status === "completed" ? 0.7 : 1,
                  }}
                />
                {selectedTask.status !== "completed" && (
                  <button
                    onClick={() => handleSaveNote(selectedTask.id)}
                    style={{
                      marginTop: "0.6rem",
                      padding: "0.55rem 1.25rem",
                      border: `1px solid ${COLORS.border}`,
                      borderRadius: "0.5rem",
                      background: "rgba(99,118,160,0.1)",
                      color: COLORS.muted,
                      fontSize: "0.82rem",
                      cursor: "pointer",
                      fontFamily: "'DM Sans', sans-serif",
                    }}
                  >
                    Save Note
                  </button>
                )}
              </div>

              {/* Action Buttons */}
              {selectedTask.status === "assigned" && (
                <button
                  onClick={() => handleStartWork(selectedTask.id)}
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    border: "none",
                    borderRadius: "0.75rem",
                    background: `linear-gradient(135deg, ${COLORS.purple}, ${COLORS.accent2})`,
                    color: "#fff",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  ▶ Start Work Now
                </button>
              )}
              {selectedTask.status === "in_progress" && (
                <button
                  onClick={() => {
                    setCompletionModal(selectedTask);
                    setCompletionNote(selectedTask.notes || "");
                  }}
                  style={{
                    width: "100%",
                    padding: "0.85rem",
                    border: "none",
                    borderRadius: "0.75rem",
                    background: `linear-gradient(135deg, ${COLORS.success}, #059669)`,
                    color: "#fff",
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 700,
                    fontSize: "1rem",
                    cursor: "pointer",
                  }}
                >
                  ✓ Mark as Completed
                </button>
              )}
              {selectedTask.status === "completed" && (
                <div
                  style={{
                    background: "rgba(16,185,129,0.1)",
                    border: "1px solid rgba(16,185,129,0.3)",
                    borderRadius: "0.75rem",
                    padding: "1rem",
                    textAlign: "center",
                    color: COLORS.success,
                    fontWeight: 600,
                    fontSize: "0.95rem",
                  }}
                >
                  ✅ This task has been completed!
                </div>
              )}
            </div>
          </div>
        )}
      </div>

      {/* Completion Confirmation Modal */}
      {completionModal && (
        <div
          style={{
            position: "fixed",
            inset: 0,
            background: "rgba(0,0,0,0.75)",
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
              maxWidth: 420,
              width: "100%",
              background: "rgba(15,23,42,0.97)",
            }}
          >
            <div style={{ textAlign: "center", marginBottom: "1.5rem" }}>
              <div style={{ fontSize: "2.5rem", marginBottom: "0.5rem" }}>
                ✅
              </div>
              <h2
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontSize: "1.2rem",
                  fontWeight: 800,
                  margin: "0 0 0.4rem",
                }}
              >
                Mark as Completed?
              </h2>
              <p
                style={{ color: COLORS.muted, fontSize: "0.85rem", margin: 0 }}
              >
                {completionModal.service} for{" "}
                <strong style={{ color: COLORS.text }}>
                  {completionModal.user}
                </strong>
              </p>
            </div>
            <div style={{ marginBottom: "1.25rem" }}>
              <label
                style={{
                  fontSize: "0.8rem",
                  color: COLORS.muted,
                  display: "block",
                  marginBottom: "0.4rem",
                }}
              >
                Completion Summary (optional)
              </label>
              <textarea
                value={completionNote}
                onChange={(e) => setCompletionNote(e.target.value)}
                placeholder="Describe what was done, parts used, etc..."
                rows={3}
                style={{
                  width: "100%",
                  padding: "0.7rem",
                  background: "rgba(15,23,42,0.8)",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "0.6rem",
                  color: COLORS.text,
                  fontSize: "0.88rem",
                  resize: "none",
                  outline: "none",
                  fontFamily: "'DM Sans', sans-serif",
                  boxSizing: "border-box",
                }}
              />
            </div>
            <div style={{ display: "flex", gap: "0.75rem" }}>
              <button
                onClick={() => {
                  setCompletionModal(null);
                  setCompletionNote("");
                }}
                style={{
                  flex: 1,
                  padding: "0.7rem",
                  border: `1px solid ${COLORS.border}`,
                  borderRadius: "0.6rem",
                  background: "transparent",
                  color: COLORS.muted,
                  cursor: "pointer",
                  fontFamily: "'DM Sans', sans-serif",
                }}
              >
                Cancel
              </button>
              <button
                onClick={handleComplete}
                style={{
                  flex: 1,
                  padding: "0.7rem",
                  border: "none",
                  borderRadius: "0.6rem",
                  background: `linear-gradient(135deg, ${COLORS.success}, #059669)`,
                  color: "#fff",
                  fontWeight: 700,
                  cursor: "pointer",
                  fontFamily: "'Syne', sans-serif",
                }}
              >
                Confirm Done ✓
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
