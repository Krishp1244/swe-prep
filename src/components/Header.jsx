import { useState } from "react";
import { THEMES } from "../styles/styles";
import { useAuth } from "../contexts/AuthContext";

function StreakBadge({ streak, S }) {
  return (
    <div style={S.statCard} className="stat-card">
      <span style={{ fontSize: 20 }}>🔥</span>
      <div>
        <div style={S.statNum}>{streak.current}</div>
        <div style={S.statLabel}>streak</div>
      </div>
      {streak.longest > 0 && <div style={S.statBest}>best {streak.longest}</div>}
    </div>
  );
}

function ScoreBadge({ score, S }) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : null;
  const color = pct === null ? "#52525b" : pct >= 70 ? "#00ff88" : pct >= 40 ? "#fbbf24" : "#f87171";
  return (
    <div style={S.statCard} className="stat-card">
      <div style={{ ...S.statNum, color }}>{pct === null ? "—" : `${pct}%`}</div>
      <div>
        <div style={S.statLabel}>{score.correct}/{score.total}</div>
        <div style={S.statLabel}>accuracy</div>
      </div>
    </div>
  );
}

function ThemeMenu({ theme, setTheme, S }) {
  const [open, setOpen] = useState(false);
  return (
    <div style={{ position: "relative" }}>
      <button style={S.themeBtn} onClick={() => setOpen(o => !o)}>
        {THEMES[theme]?.name?.split(" ")[0] || "🌑"} THEME
      </button>
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setOpen(false)} />
          <div style={S.themeMenu}>
            <div style={S.themeMenuTitle}>Choose Theme</div>
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                style={{ ...S.themeMenuItem, ...(theme === key ? S.themeMenuItemActive : {}) }}
                onClick={() => { setTheme(key); setOpen(false); }}
              >
                <span style={{
                  width: 14, height: 14, borderRadius: "50%",
                  background: `linear-gradient(135deg, ${t.gradient1}, ${t.gradient2})`,
                  display: "inline-block", flexShrink: 0,
                  boxShadow: `0 0 8px ${t.gradient1}44`,
                }} />
                <span>{t.name}</span>
                {theme === key && <span style={{ marginLeft: "auto", color: t.accent, fontSize: 14 }}>✓</span>}
              </button>
            ))}
          </div>
        </>
      )}
    </div>
  );
}

function UserMenu({ S }) {
  const { user, logout } = useAuth();
  const [open, setOpen] = useState(false);

  if (!user) return null;

  return (
    <div style={{ position: "relative" }}>
      <img
        src={user.photoURL || `https://ui-avatars.com/api/?name=${encodeURIComponent(user.displayName || "U")}&background=00ff88&color=000&size=64`}
        alt="avatar"
        style={S.avatar}
        onClick={() => setOpen(o => !o)}
        referrerPolicy="no-referrer"
      />
      {open && (
        <>
          <div style={{ position: "fixed", inset: 0, zIndex: 199 }} onClick={() => setOpen(false)} />
          <div style={S.userMenu}>
            <div style={S.userMenuHeader}>
              <div style={S.userMenuName}>{user.displayName || "User"}</div>
              <div style={S.userMenuEmail}>{user.email}</div>
            </div>
            <button
              style={S.userMenuItem}
              onClick={() => { logout(); setOpen(false); }}
              onMouseEnter={e => e.target.style.background = "rgba(239,68,68,0.06)"}
              onMouseLeave={e => e.target.style.background = "none"}
            >
              <span>🚪</span>
              <span>Sign out</span>
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default function Header({ streak, score, weakCount, theme, setTheme, S }) {
  return (
    <header style={S.header}>
      <div style={S.headerLeft}>
        <span style={S.logo}>⌨️</span>
        <div>
          <div style={S.logoText}>DEV<span style={S.logoGreen}> DECK</span></div>
          <div style={S.logoSub}>crack the coding interview</div>
        </div>
      </div>
      <div style={S.stats}>
        <StreakBadge streak={streak} S={S} />
        <ScoreBadge score={score} S={S} />
        {weakCount > 0 && (
          <div style={{
            ...S.statCard,
            borderColor: "rgba(239,68,68,0.15)",
            background: "rgba(239,68,68,0.04)",
          }} className="stat-card">
            <span style={{ fontSize: 18 }}>💀</span>
            <div>
              <div style={{ ...S.statNum, color: "#f87171" }}>{weakCount}</div>
              <div style={S.statLabel}>weak</div>
            </div>
          </div>
        )}
        <ThemeMenu theme={theme} setTheme={setTheme} S={S} />
        <UserMenu S={S} />
      </div>
    </header>
  );
}