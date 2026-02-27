import { useState } from "react";
import { THEMES } from "../styles/styles";

function StreakBadge({ streak, S }) {
  return (
    <div style={S.statCard}>
      <span style={{ fontSize: 22 }}>🔥</span>
      <div>
        <div style={S.statNum}>{streak.current}</div>
        <div style={S.statLabel}>day streak</div>
      </div>
      {streak.longest > 0 && <div style={S.statBest}>best {streak.longest}</div>}
    </div>
  );
}

function ScoreBadge({ score, S }) {
  const pct = score.total > 0 ? Math.round((score.correct / score.total) * 100) : null;
  return (
    <div style={S.statCard}>
      <div style={{
        ...S.statNum,
        color: pct === null ? "#555" : pct >= 70 ? "#00ff88" : pct >= 40 ? "#ffd700" : "#ff4444",
      }}>
        {pct === null ? "--" : `${pct}%`}
      </div>
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
      <button
        style={S.themeBtn}
        onClick={() => setOpen(o => !o)}
      >
        🎨 THEME ▾
      </button>

      {open && (
        <>
          {/* backdrop to close on outside click */}
          <div
            style={{ position: "fixed", inset: 0, zIndex: 199 }}
            onClick={() => setOpen(false)}
          />
          <div style={S.themeMenu}>
            <div style={S.themeMenuTitle}>CHOOSE THEME</div>
            {Object.entries(THEMES).map(([key, t]) => (
              <button
                key={key}
                style={{
                  ...S.themeMenuItem,
                  ...(theme === key ? S.themeMenuItemActive : {}),
                }}
                onClick={() => { setTheme(key); setOpen(false); }}
              >
                <span style={{ width: 12, height: 12, borderRadius: "50%", background: t.accent, display: "inline-block", flexShrink: 0 }} />
                <span>{t.name}</span>
                {theme === key && <span style={{ marginLeft: "auto", color: t.accent }}>✓</span>}
              </button>
            ))}
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
          <div style={{ ...S.statCard, borderColor: "#440000", background: "#0d0000" }}>
            <span style={{ fontSize: 20 }}>💀</span>
            <div>
              <div style={{ ...S.statNum, color: "#ff4444" }}>{weakCount}</div>
              <div style={S.statLabel}>weak spots</div>
            </div>
          </div>
        )}
        <ThemeMenu theme={theme} setTheme={setTheme} S={S} />
      </div>
    </header>
  );
}