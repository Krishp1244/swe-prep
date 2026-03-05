import { useState, useEffect } from "react";
import { useAppState } from "./hooks/useAppState";
import { useAuth } from "./contexts/AuthContext";
import { ALL_QUESTIONS, CATEGORIES } from "./data/questions";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import CategoryFilter from "./components/CategoryFilter";
import QuizPanel from "./components/QuizPanel";
import ChatPanel from "./components/ChatPanel";
import StudyGuide from "./components/StudyGuide";
import Announcements from "./components/Announcements";
import Feedback from "./components/Feedback";
import LoginPage from "./components/LoginPage";

import { makeStyles, GLOBAL_CSS, THEMES } from "./styles/styles";

function Sidebar({ category, setCategory, weakCount, collapsed, setCollapsed, S }) {
  return (
    <div style={{ ...S.sidebar, ...(collapsed ? S.sidebarCollapsed : {}) }}>
      <button style={S.collapseBtn} onClick={() => setCollapsed(c => !c)}>
        {collapsed ? "▶" : "◀"}
      </button>
      {!collapsed && CATEGORIES.map((c) => {
        const isWeak = c === "💀 Weak Spots";
        const active = category === c;
        return (
          <button key={c} className="cat-btn" style={{
            ...S.sidebarBtn,
            ...(active ? S.sidebarBtnActive : {}),
            ...(isWeak ? (active ? S.sidebarWeakBtnActive : S.sidebarWeakBtn) : {}),
          }} onClick={() => setCategory(c)}>
            {isWeak ? "💀 Weak (" + weakCount + ")" : c}
          </button>
        );
      })}
    </div>
  );
}

export default function App() {
  const [tab, setTab] = useState("quiz");
  const [category, setCategory] = useState("All");
  const [layout, setLayout] = useState("top");
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [theme, setTheme] = useState("dark");
  const [isGuest, setIsGuest] = useState(false);
  const { appState, recordAnswer, setChatHistory, setAppState } = useAppState();
  const { user, loading, saveProgress, loadProgress } = useAuth();

  const S = makeStyles(THEMES[theme]);
  const weakCount = Object.keys(appState.wrongIds).length;

  // Handle guest login
  useEffect(() => {
    const handler = () => setIsGuest(true);
    window.addEventListener("guestLogin", handler);
    return () => window.removeEventListener("guestLogin", handler);
  }, []);

  // Auto-save progress when logged in
  useEffect(() => {
    if (user) {
      const timer = setTimeout(() => saveProgress(appState), 2000);
      return () => clearTimeout(timer);
    }
  }, [appState, user, saveProgress]);

  // Load progress on login
  useEffect(() => {
    if (user) {
      loadProgress().then(data => {
        if (data) setAppState(data);
      });
    }
  }, [user]); // eslint-disable-line

  // Show login page if not logged in and not guest
  if (loading) {
    return (
      <div style={{
        minHeight: "100vh", display: "flex", alignItems: "center",
        justifyContent: "center", background: "#06060a", color: "#00ff88",
        fontFamily: "'Inter', sans-serif",
      }}>
        <div style={{ textAlign: "center" }}>
          <div style={{ fontSize: 40, marginBottom: 16, animation: "pulse 1.5s ease infinite" }}>⌨️</div>
          <div style={{ fontSize: 14, fontWeight: 700, letterSpacing: 3 }}>LOADING...</div>
        </div>
      </div>
    );
  }

  if (!user && !isGuest) {
    return <LoginPage />;
  }

  const filteredQs =
    category === "All" ? ALL_QUESTIONS
      : category === "💀 Weak Spots" ? ALL_QUESTIONS.filter(q => appState.wrongIds[q.id])
        : ALL_QUESTIONS.filter(q => q.category === category);

  const showSidebar = tab === "quiz" && layout === "side";
  const showTopFilter = tab === "quiz" && layout === "top";

  return (
    <div style={S.root}>
      <style>{GLOBAL_CSS}</style>

      {/* Animated background orbs */}
      <div style={{ ...S.bgOrb1, animation: "orbFloat 15s ease-in-out infinite" }} />
      <div style={{ ...S.bgOrb2, animation: "orbFloat 20s ease-in-out infinite reverse" }} />

      <Header streak={appState.streak} score={appState.score} weakCount={weakCount} theme={theme} setTheme={setTheme} S={S} />
      <TabBar tab={tab} setTab={setTab} S={S} />

      {showTopFilter && (
        <CategoryFilter category={category} setCategory={setCategory} weakCount={weakCount} layout={layout} setLayout={setLayout} S={S} />
      )}

      <div style={showSidebar ? S.bodyWrap : {}}>
        {showSidebar && (
          <Sidebar category={category} setCategory={setCategory} weakCount={weakCount} collapsed={sidebarCollapsed} setCollapsed={setSidebarCollapsed} S={S} />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {showSidebar && (
            <div style={S.catRow}>
              <button style={S.layoutBtn} onClick={() => setLayout("top")}>TOP BAR</button>
            </div>
          )}
          <main style={S.main}>
            {tab === "quiz" && <QuizPanel questions={filteredQs} category={category} onAnswer={recordAnswer} wrongIds={appState.wrongIds} S={S} />}
            {tab === "chat" && <ChatPanel history={appState.chatHistory} setHistory={setChatHistory} S={S} />}
            {tab === "study" && <StudyGuide S={S} />}
            {tab === "announcements" && <Announcements S={S} />}
            {tab === "feedback" && <Feedback S={S} />}
          </main>
        </div>
      </div>
    </div>
  );
}