export default function TabBar({ tab, setTab, S }) {
  return (
    <nav style={S.tabBar}>
      {[["quiz", "⚡  FLASHCARDS"], ["chat", "🤖  AI COACH"]].map(([t, label]) => (
        <button
          key={t}
          style={{ ...S.tabBtn, ...(tab === t ? S.tabActive : {}) }}
          onClick={() => setTab(t)}
        >
          {label}
        </button>
      ))}
      <div style={S.tabFlex} />
      <div style={S.cursor}>█</div>
    </nav>
  );
}