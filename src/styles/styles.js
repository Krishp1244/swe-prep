export const THEMES = {
  dark: {
    accent: "#00ff88",
    accentDim: "#00cc6a",
    accentGlow: "rgba(0,255,136,0.15)",
    bg: "#06060a",
    surface: "rgba(14,14,22,0.7)",
    surfaceSolid: "#0e0e16",
    border: "rgba(255,255,255,0.06)",
    borderHover: "rgba(255,255,255,0.12)",
    text: "#e4e4e7",
    textSecondary: "#a1a1aa",
    muted: "#52525b",
    danger: "#ef4444",
    dangerBg: "rgba(239,68,68,0.08)",
    dangerBorder: "rgba(239,68,68,0.15)",
    warning: "#f59e0b",
    success: "#00ff88",
    cardBg: "rgba(14,14,22,0.6)",
    gradient1: "#00ff88",
    gradient2: "#0ea5e9",
    name: "🌑 Midnight",
  },
  blue: {
    accent: "#38bdf8",
    accentDim: "#0284c7",
    accentGlow: "rgba(56,189,248,0.15)",
    bg: "#020617",
    surface: "rgba(15,23,42,0.7)",
    surfaceSolid: "#0f172a",
    border: "rgba(148,163,184,0.08)",
    borderHover: "rgba(148,163,184,0.15)",
    text: "#e2e8f0",
    textSecondary: "#94a3b8",
    muted: "#475569",
    danger: "#f87171",
    dangerBg: "rgba(248,113,113,0.08)",
    dangerBorder: "rgba(248,113,113,0.15)",
    warning: "#fbbf24",
    success: "#34d399",
    cardBg: "rgba(15,23,42,0.6)",
    gradient1: "#38bdf8",
    gradient2: "#818cf8",
    name: "🌊 Ocean",
  },
  purple: {
    accent: "#a78bfa",
    accentDim: "#7c3aed",
    accentGlow: "rgba(167,139,250,0.15)",
    bg: "#0a0118",
    surface: "rgba(15,5,30,0.7)",
    surfaceSolid: "#0f051e",
    border: "rgba(167,139,250,0.08)",
    borderHover: "rgba(167,139,250,0.15)",
    text: "#e4e0ed",
    textSecondary: "#a39bb8",
    muted: "#6b5f80",
    danger: "#fb7185",
    dangerBg: "rgba(251,113,133,0.08)",
    dangerBorder: "rgba(251,113,133,0.15)",
    warning: "#fbbf24",
    success: "#34d399",
    cardBg: "rgba(15,5,30,0.6)",
    gradient1: "#a78bfa",
    gradient2: "#f472b6",
    name: "💜 Cosmos",
  },
  light: {
    accent: "#2563eb",
    accentDim: "#1d4ed8",
    accentGlow: "rgba(37,99,235,0.1)",
    bg: "#fafafa",
    surface: "rgba(255,255,255,0.8)",
    surfaceSolid: "#ffffff",
    border: "rgba(0,0,0,0.06)",
    borderHover: "rgba(0,0,0,0.12)",
    text: "#18181b",
    textSecondary: "#52525b",
    muted: "#a1a1aa",
    danger: "#dc2626",
    dangerBg: "rgba(220,38,38,0.06)",
    dangerBorder: "rgba(220,38,38,0.12)",
    warning: "#d97706",
    success: "#16a34a",
    cardBg: "rgba(255,255,255,0.6)",
    gradient1: "#2563eb",
    gradient2: "#7c3aed",
    name: "☀️ Light",
  },
};

export function makeStyles(t) {
  const isLight = t.bg === "#fafafa";

  return {
    root: {
      fontFamily: "'Inter', -apple-system, BlinkMacSystemFont, sans-serif",
      background: t.bg,
      minHeight: "100vh",
      color: t.text,
      position: "relative",
    },

    // Animated background
    bgOrb1: {
      position: "fixed", width: 600, height: 600, borderRadius: "50%",
      background: t.gradient1, filter: "blur(180px)", opacity: 0.06,
      top: -200, right: -100, pointerEvents: "none", zIndex: 0,
    },
    bgOrb2: {
      position: "fixed", width: 500, height: 500, borderRadius: "50%",
      background: t.gradient2, filter: "blur(180px)", opacity: 0.04,
      bottom: -100, left: -100, pointerEvents: "none", zIndex: 0,
    },

    // Header
    header: {
      display: "flex", justifyContent: "space-between", alignItems: "center",
      padding: "14px 28px",
      borderBottom: `1px solid ${t.border}`,
      background: t.surface,
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      position: "sticky", top: 0, zIndex: 100,
    },
    headerLeft: { display: "flex", alignItems: "center", gap: 14 },
    logo: { fontSize: 28, lineHeight: 1 },
    logoText: {
      fontSize: 17, fontWeight: 800, color: t.text, letterSpacing: 3,
    },
    logoGreen: { color: t.accent },
    logoSub: { fontSize: 9, color: t.muted, letterSpacing: 2, marginTop: 2, textTransform: "uppercase" },
    stats: { display: "flex", gap: 8, alignItems: "center" },
    statCard: {
      display: "flex", gap: 10, alignItems: "center",
      background: t.cardBg,
      backdropFilter: "blur(12px)",
      border: `1px solid ${t.border}`,
      borderRadius: 14, padding: "8px 16px",
      transition: "all 0.2s ease",
    },
    statNum: { fontSize: 20, fontWeight: 800, color: t.accent, lineHeight: 1 },
    statLabel: { fontSize: 9, color: t.muted, textTransform: "uppercase", letterSpacing: 1.5, marginTop: 1, fontWeight: 600 },
    statBest: { fontSize: 10, color: t.muted, borderLeft: `1px solid ${t.border}`, paddingLeft: 10, marginLeft: 4 },

    // User area
    userArea: {
      display: "flex", alignItems: "center", gap: 12,
    },
    avatar: {
      width: 34, height: 34, borderRadius: "50%",
      border: `2px solid ${t.accent}`,
      cursor: "pointer",
      transition: "all 0.2s ease",
    },
    userMenu: {
      position: "absolute", top: "calc(100% + 12px)", right: 0,
      background: t.surfaceSolid,
      border: `1px solid ${t.border}`,
      borderRadius: 16, padding: 8, zIndex: 200, minWidth: 220,
      boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
      backdropFilter: "blur(24px)",
    },
    userMenuHeader: {
      padding: "12px 14px", borderBottom: `1px solid ${t.border}`, marginBottom: 6,
    },
    userMenuName: { fontSize: 14, fontWeight: 700, color: t.text },
    userMenuEmail: { fontSize: 11, color: t.muted, marginTop: 2 },
    userMenuItem: {
      display: "flex", alignItems: "center", gap: 10,
      width: "100%", background: "none", border: "none",
      borderRadius: 10, color: t.textSecondary,
      fontFamily: "inherit", fontSize: 13, fontWeight: 500,
      padding: "10px 14px", cursor: "pointer", textAlign: "left",
      transition: "all 0.15s ease",
    },

    // Theme menu
    themeBtn: {
      background: "none",
      border: `1px solid ${t.border}`,
      borderRadius: 12, color: t.muted,
      padding: "8px 14px", cursor: "pointer",
      fontSize: 11, fontFamily: "inherit", fontWeight: 700,
      letterSpacing: 1, whiteSpace: "nowrap",
      transition: "all .2s",
    },
    themeMenu: {
      position: "absolute", top: "calc(100% + 12px)", right: 0,
      background: t.surfaceSolid,
      border: `1px solid ${t.border}`,
      borderRadius: 16, padding: "8px", zIndex: 200, minWidth: 200,
      boxShadow: "0 16px 48px rgba(0,0,0,0.35)",
      backdropFilter: "blur(24px)",
    },
    themeMenuTitle: {
      fontSize: 9, fontWeight: 800, letterSpacing: 2,
      color: t.muted, padding: "8px 12px 10px",
      textTransform: "uppercase",
    },
    themeMenuItem: {
      display: "flex", alignItems: "center", gap: 10,
      width: "100%", background: "none", border: "none",
      borderRadius: 10, color: t.text,
      fontFamily: "inherit", fontSize: 13, fontWeight: 600,
      padding: "10px 14px", cursor: "pointer", textAlign: "left",
      transition: "all .15s",
    },
    themeMenuItemActive: { background: t.cardBg },

    // Tabs
    tabBar: {
      display: "flex", alignItems: "center",
      background: t.surface,
      backdropFilter: "blur(24px)",
      borderBottom: `1px solid ${t.border}`,
      padding: "0 28px", gap: 2,
    },
    tabBtn: {
      background: "none", border: "none",
      borderBottom: "2px solid transparent",
      color: t.muted, padding: "14px 20px",
      cursor: "pointer", fontSize: 11,
      fontFamily: "inherit", fontWeight: 700,
      letterSpacing: 2, transition: "all .2s",
      position: "relative",
    },
    tabActive: {
      color: t.accent,
      borderBottomColor: t.accent,
    },
    tabFlex: { flex: 1 },
    cursor: { color: t.accentDim, fontSize: 14, animation: "blink 1s step-end infinite" },

    // Category filter
    catRow: {
      display: "flex", gap: 8, padding: "14px 28px",
      overflowX: "auto", background: t.cardBg,
      borderBottom: `1px solid ${t.border}`,
      scrollbarWidth: "none", alignItems: "center",
      backdropFilter: "blur(12px)",
    },
    catBtn: {
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 24, color: t.muted,
      padding: "7px 16px", cursor: "pointer",
      fontSize: 10, fontFamily: "inherit",
      fontWeight: 700, letterSpacing: 1.5,
      whiteSpace: "nowrap", transition: "all .2s",
    },
    catActive: {
      background: t.accentGlow,
      borderColor: `${t.accent}44`,
      color: t.accent,
      boxShadow: `0 0 20px ${t.accent}15`,
    },
    layoutBtn: {
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 24, color: t.muted,
      padding: "7px 16px", cursor: "pointer",
      fontSize: 10, fontFamily: "inherit",
      fontWeight: 700, whiteSpace: "nowrap",
      transition: "all .2s", marginLeft: "auto", flexShrink: 0,
    },

    // Sidebar
    bodyWrap: { display: "flex", flex: 1, overflow: "hidden" },
    sidebar: {
      width: 220, background: t.surface,
      backdropFilter: "blur(12px)",
      borderRight: `1px solid ${t.border}`,
      padding: "18px 14px",
      display: "flex", flexDirection: "column", gap: 4, flexShrink: 0,
    },
    sidebarCollapsed: { width: 44, overflow: "hidden", padding: "18px 8px" },
    sidebarBtn: {
      background: "none", border: "1px solid transparent",
      borderRadius: 12, color: t.muted,
      padding: "10px 14px", cursor: "pointer",
      fontSize: 11, fontFamily: "inherit",
      fontWeight: 700, letterSpacing: 1,
      whiteSpace: "nowrap", transition: "all .2s",
      textAlign: "left", width: "100%",
    },
    sidebarBtnActive: {
      background: t.cardBg, border: `1px solid ${t.border}`, color: t.accent,
    },
    sidebarWeakBtn: { color: "#882222" },
    sidebarWeakBtnActive: { background: "rgba(220,38,38,0.05)", border: "1px solid rgba(220,38,38,0.15)", color: "#f87171" },
    collapseBtn: {
      background: "none", border: `1px solid ${t.border}`,
      borderRadius: 10, color: t.muted,
      padding: "8px", cursor: "pointer",
      fontSize: 12, fontFamily: "inherit",
      fontWeight: 700, marginBottom: 12,
      width: "100%", textAlign: "center",
      transition: "all 0.2s",
    },

    // Main content
    main: { maxWidth: 840, margin: "0 auto", padding: "32px 28px 80px", flex: 1, minWidth: 0, position: "relative", zIndex: 1 },

    // Quiz
    progBar: {
      height: 4, background: t.border,
      borderRadius: 4, marginBottom: 8, overflow: "hidden",
    },
    progFill: {
      height: "100%",
      background: `linear-gradient(90deg, ${t.accentDim}, ${t.accent})`,
      borderRadius: 4, transition: "width .5s cubic-bezier(0.4,0,0.2,1)",
    },
    progLabel: { fontSize: 11, color: t.muted, textAlign: "right", marginBottom: 22, letterSpacing: 1, fontWeight: 600 },
    card: {
      background: t.surface,
      backdropFilter: "blur(24px)", WebkitBackdropFilter: "blur(24px)",
      border: `1px solid ${t.border}`,
      borderRadius: 20, padding: "32px 36px",
      boxShadow: isLight
        ? "0 4px 24px rgba(0,0,0,0.04)"
        : "0 4px 32px rgba(0,0,0,0.2)",
      transition: "all 0.3s ease",
    },
    cardTop: { display: "flex", alignItems: "center", gap: 10, marginBottom: 24 },
    cardTopFlex: { flex: 1 },
    catTag: {
      fontSize: 9, fontWeight: 800, letterSpacing: 2,
      color: t.accent,
      background: t.accentGlow,
      border: `1px solid ${t.accent}33`,
      borderRadius: 24, padding: "5px 14px",
      textTransform: "uppercase",
    },
    weakTag: {
      fontSize: 9, fontWeight: 800, color: t.danger,
      background: t.dangerBg,
      border: `1px solid ${t.dangerBorder}`,
      borderRadius: 24, padding: "5px 14px", letterSpacing: 1.5,
    },
    qNum: { fontSize: 11, color: t.muted, letterSpacing: 3, fontWeight: 700 },
    qText: {
      fontSize: 18, lineHeight: 1.8, color: t.text,
      marginBottom: 28, fontWeight: 500,
    },
    opts: { display: "flex", flexDirection: "column", gap: 10, marginBottom: 28 },
    opt: {
      display: "flex", alignItems: "center", gap: 14,
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 14, padding: "16px 20px",
      cursor: "pointer", fontSize: 14,
      fontFamily: "inherit", color: t.text,
      textAlign: "left", transition: "all .2s",
      width: "100%",
      backdropFilter: "blur(8px)",
    },
    optSel: {
      background: t.accentGlow, borderColor: `${t.accent}55`,
      color: t.accent, boxShadow: `0 0 24px ${t.accent}15`,
    },
    optOk: {
      background: "rgba(0,255,136,0.06)", borderColor: "rgba(0,255,136,0.3)",
      color: "#00ff88", boxShadow: "0 0 20px rgba(0,255,136,0.08)", cursor: "default",
    },
    optBad: {
      background: "rgba(239,68,68,0.06)", borderColor: "rgba(239,68,68,0.3)",
      color: "#f87171", cursor: "default",
    },
    optLetter: { fontSize: 11, fontWeight: 900, opacity: .35, minWidth: 20, letterSpacing: 1 },
    revealBtn: {
      width: "100%",
      background: `linear-gradient(135deg, ${t.accentDim}, ${t.accent})`,
      color: isLight ? "#fff" : "#000",
      border: "none", borderRadius: 14,
      padding: "15px", fontSize: 12,
      fontWeight: 800, fontFamily: "inherit",
      letterSpacing: 2, cursor: "pointer",
      transition: "all .2s",
      boxShadow: `0 4px 24px ${t.accent}33`,
    },
    revealBtnOff: {
      width: "100%", background: t.border,
      color: t.muted, border: "none",
      borderRadius: 14, padding: "15px",
      fontSize: 12, fontWeight: 800,
      fontFamily: "inherit", letterSpacing: 2,
      cursor: "not-allowed",
    },
    explanation: {
      display: "flex", gap: 14,
      background: t.cardBg,
      border: `1px solid ${t.border}`,
      borderRadius: 14, padding: "18px 20px", marginBottom: 14,
      backdropFilter: "blur(8px)",
    },
    expText: { fontSize: 13, lineHeight: 1.9, color: t.textSecondary, margin: 0 },
    nextBtn: {
      width: "100%", background: "none",
      color: t.accent,
      border: `1px solid ${t.border}`,
      borderRadius: 14, padding: "15px",
      fontSize: 12, fontWeight: 700,
      fontFamily: "inherit", letterSpacing: 2,
      cursor: "pointer", transition: "all .2s",
    },
    empty: { textAlign: "center", padding: "80px 20px" },

    // Chat
    chatWrap: { display: "flex", flexDirection: "column", height: "calc(100vh - 240px)", minHeight: 400 },
    msgs: { flex: 1, overflowY: "auto", paddingBottom: 16 },
    welcome: { textAlign: "center", padding: "60px 20px" },
    suggGrid: { display: "flex", flexDirection: "column", gap: 8, maxWidth: 520, margin: "0 auto" },
    suggBtn: {
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 14, color: t.textSecondary,
      padding: "12px 18px", fontSize: 13,
      fontFamily: "inherit", cursor: "pointer",
      textAlign: "left", transition: "all .2s",
      backdropFilter: "blur(8px)",
      fontWeight: 500,
    },
    msgRow: { marginBottom: 18, marginRight: "10%" },
    msgRowUser: { marginRight: 0, marginLeft: "10%" },
    labelBot: { fontSize: 9, fontWeight: 800, letterSpacing: 2.5, color: t.muted, marginBottom: 6, textTransform: "uppercase" },
    labelUser: { fontSize: 9, fontWeight: 800, letterSpacing: 2.5, color: t.accentDim, marginBottom: 6, textAlign: "right", textTransform: "uppercase" },
    msgBubble: {
      background: t.surface, border: `1px solid ${t.border}`,
      borderRadius: 18, padding: "16px 20px",
      fontSize: 14, lineHeight: 1.8, color: t.text,
      backdropFilter: "blur(12px)",
    },
    code: {
      background: t.cardBg, border: `1px solid ${t.border}`,
      borderRadius: 12, padding: "16px 18px",
      fontSize: 13, overflowX: "auto", margin: "12px 0",
      color: t.accent, fontFamily: "'JetBrains Mono', monospace",
    },
    inlineCode: {
      background: t.cardBg, border: `1px solid ${t.border}`,
      borderRadius: 6, padding: "2px 7px",
      fontSize: 12, color: t.accent,
      fontFamily: "'JetBrains Mono', monospace",
    },
    inputRow: {
      display: "flex", gap: 10, paddingTop: 16,
      borderTop: `1px solid ${t.border}`,
      alignItems: "flex-end",
    },
    inputPrefix: { position: "absolute", left: 16, top: 12, color: t.accentDim, fontSize: 14, fontWeight: 900 },
    ta: {
      width: "100%", background: t.surface,
      border: `1px solid ${t.border}`,
      borderRadius: 14, color: t.text,
      fontFamily: "inherit", fontSize: 13,
      padding: "12px 16px 12px 32px",
      resize: "none", display: "block",
      transition: "border-color .2s",
      backdropFilter: "blur(8px)",
    },
    sendBtn: {
      background: `linear-gradient(135deg, ${t.accentDim}, ${t.accent})`,
      color: isLight ? "#fff" : "#000",
      border: "none", borderRadius: 14,
      padding: "12px 24px", fontSize: 16,
      cursor: "pointer", fontWeight: 900, flexShrink: 0,
      boxShadow: `0 4px 20px ${t.accent}33`,
      transition: "all 0.2s",
    },
    sendOff: {
      background: t.border, color: t.muted,
      border: "none", borderRadius: 14,
      padding: "12px 24px", fontSize: 16,
      cursor: "not-allowed", flexShrink: 0,
    },
  };
}

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');

  * { box-sizing: border-box; margin: 0; padding: 0; }

  ::-webkit-scrollbar { width: 5px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: rgba(255,255,255,0.08); border-radius: 4px; }
  ::-webkit-scrollbar-thumb:hover { background: rgba(255,255,255,0.12); }

  textarea:focus, input:focus { outline: none; }

  button { transition: all 0.2s ease; }
  button:hover { opacity: 0.9; }
  button:active { transform: scale(0.98); }

  .opt-btn:hover { border-color: rgba(255,255,255,0.12) !important; }
  .cat-btn:hover { border-color: rgba(255,255,255,0.12) !important; }
  .next-btn:hover { background: rgba(255,255,255,0.03) !important; }
  .sugg-btn:hover { border-color: rgba(255,255,255,0.12) !important; transform: translateX(4px); }

  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes dot { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes slideIn { from{opacity:0;transform:translateY(12px)} to{opacity:1;transform:translateY(0)} }
  @keyframes fadeIn { from{opacity:0} to{opacity:1} }
  @keyframes pulse { 0%,100%{opacity:1} 50%{opacity:0.6} }
  @keyframes orbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(40px, -30px) scale(1.05); }
    66% { transform: translate(-30px, 20px) scale(0.95); }
  }
`;