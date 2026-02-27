export const THEMES = {
  dark: {
    accent: "#00ff88",
    accentDim: "#00aa55",
    bg: "#0d0d0d",
    surface: "#161616",
    border: "#252525",
    text: "#c8c8c8",
    muted: "#555",
    name: "🟢 Dark",
  },
  blue: {
    accent: "#00cfff",
    accentDim: "#0099cc",
    bg: "#090d12",
    surface: "#0f1520",
    border: "#1e2d40",
    text: "#b8ccd8",
    muted: "#3a4a5a",
    name: "🔵 Blue",
  },
  light: {
    accent: "#0066ff",
    accentDim: "#0044cc",
    bg: "#f0f2f5",
    surface: "#ffffff",
    border: "#e2e6ea",
    text: "#2d3748",
    muted: "#a0aec0",
    name: "☀️ Light",
  },
  
};

export function makeStyles(t) {
  const G = t.accent;
  const DG = t.accentDim;
  const BG = t.bg;
  const SRF = t.surface;
  const BRD = t.border;
  const TX = t.text;
  const MUT = t.muted;

  return {
    root:        { fontFamily: "'CopperPlate',Fantasy", background: BG, minHeight: "100vh", color: TX, position: "relative" },
    scanlines:   { pointerEvents: "none", position: "fixed", inset: 0, zIndex: 999, background: "repeating-linear-gradient(0deg,transparent,transparent 2px,rgba(0,0,0,0.01) 2px,rgba(0,0,0,0.01) 4px)" },

    // Header
    header:      { display: "flex", justifyContent: "space-between", alignItems: "center", padding: "16px 28px", borderBottom: `1px solid ${BRD}`, background: SRF, position: "sticky", top: 0, zIndex: 100, boxShadow: "0 2px 12px rgba(0,0,0,0.15)" },
    headerLeft:  { display: "flex", alignItems: "center", gap: 14 },
    logo:        { fontSize: 26, color: G, fontWeight: 900 },
    logoText:    { fontSize: 16, fontWeight: 800, color: TX, letterSpacing: 2 },
    logoGreen:   { color: G },
    logoSub:     { fontSize: 10, color: MUT, letterSpacing: 1.5, marginTop: 2 },
    stats:       { display: "flex", gap: 10, alignItems: "center" },
    statCard:    { display: "flex", gap: 8, alignItems: "center", background: BG, border: `1px solid ${BRD}`, borderRadius: 12, padding: "8px 14px" },
    statNum:     { fontSize: 20, fontWeight: 900, color: G, lineHeight: 1 },
    statLabel:   { fontSize: 9, color: MUT, textTransform: "uppercase", letterSpacing: 1, marginTop: 2 },
    statBest:    { fontSize: 10, color: MUT, borderLeft: `1px solid ${BRD}`, paddingLeft: 8, marginLeft: 2 },
    themeBtn:    { background: "none", border: `1px solid ${BRD}`, borderRadius: 10, color: MUT, padding: "7px 12px", cursor: "pointer", fontSize: 11, fontFamily: "inherit", fontWeight: 700, letterSpacing: 1, whiteSpace: "nowrap", transition: "all .2s", marginLeft: 8 },
    themeMenu:       { position: "absolute", top: "calc(100% + 10px)", right: 0, background: SRF, border: `1px solid ${BRD}`, borderRadius: 14, padding: "10px", zIndex: 200, minWidth: 190, boxShadow: "0 12px 40px rgba(0,0,0,0.35)" },
    themeMenuTitle:  { fontSize: 9, fontWeight: 900, letterSpacing: 2, color: MUT, padding: "4px 10px 10px", textTransform: "uppercase" },
    themeMenuItem:   { display: "flex", alignItems: "center", gap: 10, width: "100%", background: "none", border: "none", borderRadius: 10, color: TX, fontFamily: "inherit", fontSize: 12, fontWeight: 600, padding: "9px 12px", cursor: "pointer", textAlign: "left", transition: "background .15s" },
    themeMenuItemActive: { background: BG },

    // Tabs
    tabBar:      { display: "flex", alignItems: "center", background: SRF, borderBottom: `1px solid ${BRD}`, padding: "0 28px", gap: 4 },
    tabBtn:      { background: "none", border: "none", borderBottom: "2px solid transparent", color: MUT, padding: "14px 18px", cursor: "pointer", fontSize: 11, fontFamily: "inherit", fontWeight: 700, letterSpacing: 2, transition: "all .2s" },
    tabActive:   { color: G, borderBottomColor: G },
    tabFlex:     { flex: 1 },
    cursor:      { color: DG, fontSize: 14, animation: "blink 1s step-end infinite" },

    // Category filter
    catRow:      { display: "flex", gap: 8, padding: "12px 28px", overflowX: "auto", background: BG, borderBottom: `1px solid ${BRD}`, scrollbarWidth: "none", alignItems: "center" },
    catBtn:      { background: SRF, border: `1px solid ${BRD}`, borderRadius: 20, color: MUT, padding: "6px 14px", cursor: "pointer", fontSize: 10, fontFamily: "inherit", fontWeight: 700, letterSpacing: 1, whiteSpace: "nowrap", transition: "all .2s" },
    catActive:   { background: BG, borderColor: DG, color: G, boxShadow: `0 0 10px ${DG}33` },
    layoutBtn:   { background: SRF, border: `1px solid ${BRD}`, borderRadius: 20, color: MUT, padding: "6px 14px", cursor: "pointer", fontSize: 10, fontFamily: "inherit", fontWeight: 700, whiteSpace: "nowrap", transition: "all .2s", marginLeft: "auto", flexShrink: 0 },

    // Sidebar
    bodyWrap:    { display: "flex", flex: 1, overflow: "hidden" },
    sidebar:     { width: 210, background: SRF, borderRight: `1px solid ${BRD}`, padding: "16px 12px", display: "flex", flexDirection: "column", gap: 6, flexShrink: 0 },
    sidebarCollapsed: { width: 40, overflow: "hidden", padding: "16px 6px" },
    sidebarBtn:  { background: "none", border: `1px solid transparent`, borderRadius: 10, color: MUT, padding: "9px 12px", cursor: "pointer", fontSize: 10, fontFamily: "inherit", fontWeight: 700, letterSpacing: 1, whiteSpace: "nowrap", transition: "all .2s", textAlign: "left", width: "100%" },
    sidebarBtnActive: { background: BG, border: `1px solid ${BRD}`, color: G },
    sidebarWeakBtn: { color: "#882222" },
    sidebarWeakBtnActive: { background: "#1a0000", border: "1px solid #440000", color: "#ff4444" },
    collapseBtn: { background: "none", border: `1px solid ${BRD}`, borderRadius: 10, color: MUT, padding: "7px", cursor: "pointer", fontSize: 12, fontFamily: "inherit", fontWeight: 700, marginBottom: 10, width: "100%", textAlign: "center" },

    // Main content
    main:        { maxWidth: 820, margin: "0 auto", padding: "28px 24px 80px", flex: 1, minWidth: 0 },

    // Quiz
    progBar:     { height: 4, background: BRD, borderRadius: 4, marginBottom: 8, overflow: "hidden" },
    progFill:    { height: "100%", background: `linear-gradient(90deg,${DG},${G})`, borderRadius: 4, transition: "width .4s ease" },
    progLabel:   { fontSize: 11, color: MUT, textAlign: "right", marginBottom: 20, letterSpacing: 1 },
    card:        { background: SRF, border: `1px solid ${BRD}`, borderRadius: 20, padding: "28px 32px", boxShadow: "0 4px 24px rgba(0,0,0,0.12)" },
    cardTop:     { display: "flex", alignItems: "center", gap: 8, marginBottom: 22 },
    cardTopFlex: { flex: 1 },
    catTag:      { fontSize: 9, fontWeight: 800, letterSpacing: 1.5, color: G, background: BG, border: `1px solid ${DG}`, borderRadius: 20, padding: "4px 10px" },
    weakTag:     { fontSize: 9, fontWeight: 800, color: "#ff4444", background: "#1a0000", border: "1px solid #440000", borderRadius: 20, padding: "4px 10px", letterSpacing: 1 },
    qNum:        { fontSize: 11, color: MUT, letterSpacing: 2 },
    qText:       { fontSize: 18, lineHeight: 1.7, color: TX, marginBottom: 24, fontWeight: 500 },
    opts:        { display: "flex", flexDirection: "column", gap: 12, marginBottom: 24 },
    opt:         { display: "flex", alignItems: "center", gap: 14, background: BG, border: `1px solid ${BRD}`, borderRadius: 14, padding: "14px 18px", cursor: "pointer", fontSize: 14, fontFamily: "inherit", color: TX, textAlign: "left", transition: "all .15s", width: "100%" },
    optSel:      { background: BG, borderColor: G, color: G, boxShadow: `0 0 12px ${G}22` },
    optOk:       { background: BG, borderColor: "#00ff88", color: "#00ff88", boxShadow: "0 0 12px #00ff8822", cursor: "default" },
    optBad:      { background: "#150000", borderColor: "#ff4444", color: "#ff4444", cursor: "default" },
    optLetter:   { fontSize: 11, fontWeight: 900, opacity: .4, minWidth: 18 },
    revealBtn:   { width: "100%", background: G, color: "#000", border: "none", borderRadius: 14, padding: "14px", fontSize: 12, fontWeight: 900, fontFamily: "inherit", letterSpacing: 2, cursor: "pointer", transition: "opacity .2s", boxShadow: `0 4px 20px ${G}44` },
    revealBtnOff:{ width: "100%", background: BRD, color: MUT, border: "none", borderRadius: 14, padding: "14px", fontSize: 12, fontWeight: 900, fontFamily: "inherit", letterSpacing: 2, cursor: "not-allowed" },
    explanation: { display: "flex", gap: 14, background: BG, border: `1px solid ${BRD}`, borderRadius: 14, padding: "16px", marginBottom: 14 },
    expText:     { fontSize: 13, lineHeight: 1.8, color: TX, margin: 0 },
    nextBtn:     { width: "100%", background: "none", color: G, border: `1px solid ${BRD}`, borderRadius: 14, padding: "14px", fontSize: 12, fontWeight: 700, fontFamily: "inherit", letterSpacing: 2, cursor: "pointer", transition: "all .2s" },
    empty:       { textAlign: "center", padding: "80px 20px" },

    // Chat
    chatWrap:    { display: "flex", flexDirection: "column", height: "calc(100vh - 230px)", minHeight: 400 },
    msgs:        { flex: 1, overflowY: "auto", paddingBottom: 16 },
    welcome:     { textAlign: "center", padding: "50px 20px" },
    suggGrid:    { display: "flex", flexDirection: "column", gap: 8, maxWidth: 500, margin: "0 auto" },
    suggBtn:     { background: SRF, border: `1px solid ${BRD}`, borderRadius: 12, color: MUT, padding: "10px 16px", fontSize: 12, fontFamily: "inherit", cursor: "pointer", textAlign: "left", transition: "all .2s" },
    msgRow:      { marginBottom: 16, marginRight: "10%" },
    msgRowUser:  { marginRight: 0, marginLeft: "10%" },
    labelBot:    { fontSize: 9, fontWeight: 900, letterSpacing: 2, color: MUT, marginBottom: 6 },
    labelUser:   { fontSize: 9, fontWeight: 900, letterSpacing: 2, color: DG, marginBottom: 6, textAlign: "right" },
    msgBubble:   { background: SRF, border: `1px solid ${BRD}`, borderRadius: 16, padding: "14px 18px", fontSize: 13, lineHeight: 1.8, color: TX },
    code:        { background: BG, border: `1px solid ${BRD}`, borderRadius: 10, padding: "14px 16px", fontSize: 12, overflowX: "auto", margin: "10px 0", color: G, fontFamily: "inherit" },
    inlineCode:  { background: BG, border: `1px solid ${BRD}`, borderRadius: 6, padding: "2px 6px", fontSize: 12, color: G },
    inputRow:    { display: "flex", gap: 10, paddingTop: 14, borderTop: `1px solid ${BRD}`, alignItems: "flex-end" },
    inputPrefix: { position: "absolute", left: 14, top: 11, color: DG, fontSize: 14, fontWeight: 900 },
    ta:          { width: "100%", background: SRF, border: `1px solid ${BRD}`, borderRadius: 14, color: TX, fontFamily: "inherit", fontSize: 13, padding: "11px 14px 11px 30px", resize: "none", display: "block", transition: "border-color .2s" },
    sendBtn:     { background: G, color: "#000", border: "none", borderRadius: 14, padding: "12px 22px", fontSize: 16, cursor: "pointer", fontWeight: 900, flexShrink: 0, boxShadow: `0 4px 16px ${G}44` },
    sendOff:     { background: BRD, color: MUT, border: "none", borderRadius: 14, padding: "12px 22px", fontSize: 16, cursor: "not-allowed", flexShrink: 0 },
  };
}

export const GLOBAL_CSS = `
  @import url('https://fonts.googleapis.com/css2?family=JetBrains+Mono:wght@400;600;700;800&display=swap');
  * { box-sizing: border-box; margin: 0; padding: 0; }
  ::-webkit-scrollbar { width: 4px; }
  ::-webkit-scrollbar-track { background: transparent; }
  ::-webkit-scrollbar-thumb { background: #2a2a2a; border-radius: 4px; }
  textarea:focus { outline: none; }
  button:hover { opacity: 0.85; }
  @keyframes blink { 0%,100%{opacity:1} 50%{opacity:0} }
  @keyframes dot { 0%,80%,100%{transform:scale(0.6);opacity:.4} 40%{transform:scale(1);opacity:1} }
  @keyframes slideIn { from{opacity:0;transform:translateY(10px)} to{opacity:1;transform:translateY(0)} }
`;