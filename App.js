import { useState } from "react";
import { useAppState } from "./hooks/useAppState";
import { ALL_QUESTIONS, CATEGORIES } from "./data/questions";
import Header from "./components/Header";
import TabBar from "./components/TabBar";
import CategoryFilter from "./components/CategoryFilter";
import QuizPanel from "./components/QuizPanel";
import ChatPanel from "./components/ChatPanel";
import { makeStyles, GLOBAL_CSS } from "./styles/styles";
import { THEMES } from "./styles/styles";

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
          <button
            key={c}
            className="cat-btn"
            style={{
              ...S.sidebarBtn,
              ...(active ? S.sidebarBtnActive : {}),
              ...(isWeak ? (active ? S.sidebarWeakBtnActive : S.sidebarWeakBtn) : {}),
            }}
            onClick={() => setCategory(c)}
          >
            {isWeak ? `💀 Weak (${weakCount})` : c}
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
  const { appState, recordAnswer, setChatHistory } = useAppState();

  const S = makeStyles(THEMES[theme]);
  const weakCount = Object.keys(appState.wrongIds).length;

  const filteredQs =
    category === "All" ? ALL_QUESTIONS
    : category === "💀 Weak Spots" ? ALL_QUESTIONS.filter((q) => appState.wrongIds[q.id])
    : ALL_QUESTIONS.filter((q) => q.category === category);

  return (
    <div style={S.root}>
      <style>{GLOBAL_CSS}</style>
      <div style={S.scanlines} />

      <Header
        streak={appState.streak}
        score={appState.score}
        weakCount={weakCount}
        theme={theme}
        setTheme={setTheme}
        S={S}
      />

      <TabBar tab={tab} setTab={setTab} S={S} />

      {tab === "quiz" && layout === "top" && (
        <CategoryFilter
          category={category}
          setCategory={setCategory}
          weakCount={weakCount}
          layout={layout}
          setLayout={setLayout}
          S={S}
        />
      )}

      <div style={tab === "quiz" && layout === "side" ? S.bodyWrap : {}}>
        {tab === "quiz" && layout === "side" && (
          <Sidebar
            category={category}
            setCategory={setCategory}
            weakCount={weakCount}
            collapsed={sidebarCollapsed}
            setCollapsed={setSidebarCollapsed}
            S={S}
          />
        )}
        <div style={{ flex: 1, minWidth: 0 }}>
          {tab === "quiz" && layout === "side" && (
            <div style={{ ...S.catRow }}>
              <button style={S.layoutBtn} onClick={() => setLayout("top")}>
                ⬆ TOP BAR
              </button>
            </div>
          )}
          <main style={S.main}>
            {tab === "quiz" ? (
              <QuizPanel
                questions={filteredQs}
                category={category}
                onAnswer={recordAnswer}
                wrongIds={appState.wrongIds}
                S={S}
              />
            ) : (
              <ChatPanel
                history={appState.chatHistory}
                setHistory={setChatHistory}
                S={S}
              />
            )}
          </main>
        </div>
      </div>
    </div>
  );
}