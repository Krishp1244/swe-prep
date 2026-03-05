export default function Announcements({ S }) {
  const updates = [
    { icon: "🔐", title: "Google & GitHub Login", desc: "Sign in to save your progress across devices and never lose your streak." },
    { icon: "📱", title: "Mobile Support", desc: "Full responsive design so you can study on the go — coming soon." },
    { icon: "🎯", title: "Topic Quizzes", desc: "Deep dive into specific categories with focused quiz sessions." },
    { icon: "📊", title: "Analytics Dashboard", desc: "Track your performance over time with detailed analytics — in development." },
  ];

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideIn .3s ease" }}>

      {/* Hero */}
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 20 }}>
          <div style={{
            width: 56, height: 56, borderRadius: 16,
            background: "linear-gradient(135deg, #00ff88, #0ea5e9)",
            display: "flex", alignItems: "center", justifyContent: "center",
            fontSize: 28, flexShrink: 0,
          }}>
            👋
          </div>
          <div>
            <h1 style={{ fontSize: 24, fontWeight: 800, color: S.logoGreen?.color || "#00ff88", marginBottom: 4 }}>
              Hey, I'm Krish
            </h1>
            <p style={{ fontSize: 12, color: S.logoSub?.color || "#52525b", letterSpacing: 1.5, textTransform: "uppercase", fontWeight: 700 }}>
              Creator of Dev Deck
            </p>
          </div>
        </div>

        <p style={{ fontSize: 15, lineHeight: 1.9, color: S.qText?.color || "#e4e4e7", marginBottom: 28 }}>
          I'm a software engineering student who built Dev Deck to help
          myself and others prep for technical interviews. This app is
          completely <strong>free</strong> and always will be. Here's what's coming next:
        </p>

        {/* Links */}
        <div style={{ display: "flex", gap: 10, flexWrap: "wrap" }}>
          <a
            href="https://www.linkedin.com/in/krish-patel-1517b9395/"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #0077b5, #005f8f)",
              color: "#fff", padding: "10px 20px",
              borderRadius: 14, fontFamily: "inherit",
              fontWeight: 700, fontSize: 13,
              textDecoration: "none",
              transition: "all 0.2s",
              boxShadow: "0 4px 16px rgba(0,119,181,0.2)",
            }}
          >
            💼 LinkedIn
          </a>
          <a
            href="https://github.com/Krishp1244"
            target="_blank"
            rel="noreferrer"
            style={{
              display: "flex", alignItems: "center", gap: 8,
              background: "linear-gradient(135deg, #333, #1a1a1a)",
              color: "#fff", padding: "10px 20px",
              borderRadius: 14, fontFamily: "inherit",
              fontWeight: 700, fontSize: 13,
              textDecoration: "none",
              transition: "all 0.2s",
              border: "1px solid rgba(255,255,255,0.08)",
            }}
          >
            🐙 GitHub
          </a>
        </div>
      </div>

      {/* Updates */}
      <div style={S.card}>
        <h2 style={{
          fontSize: 18, fontWeight: 800,
          color: S.logoGreen?.color || "#00ff88",
          marginBottom: 24, letterSpacing: 1,
        }}>
          🚀 What's New & Coming Soon
        </h2>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {updates.map((item, i) => (
            <div
              key={i}
              style={{
                display: "flex", gap: 16, alignItems: "flex-start",
                padding: "16px 18px",
                background: S.card?.background ? "rgba(255,255,255,0.02)" : "rgba(0,0,0,0.02)",
                borderRadius: 14,
                border: `1px solid ${S.card?.border || "rgba(255,255,255,0.04)"}`,
                animation: `slideIn ${0.3 + i * 0.1}s ease`,
              }}
            >
              <span style={{
                fontSize: 24, flexShrink: 0,
                width: 44, height: 44, borderRadius: 12,
                background: "rgba(255,255,255,0.03)",
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                {item.icon}
              </span>
              <div>
                <p style={{ fontWeight: 700, color: S.qText?.color || "#e4e4e7", marginBottom: 4, fontSize: 15 }}>
                  {item.title}
                </p>
                <p style={{ fontSize: 13, color: S.logoSub?.color || "#52525b", lineHeight: 1.7 }}>
                  {item.desc}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}