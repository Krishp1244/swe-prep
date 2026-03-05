export default function TabBar({ tab, setTab, S }) {
  const tabs = [
    ["quiz", "⚡  FLASHCARDS"],
    ["chat", "🤖  AI COACH"],
    ["study", "📖  STUDY GUIDE"],
    ["announcements", "📢  ABOUT"],
    ["feedback", "💬  FEEDBACK"],
  ];

  return (
    <nav style={S.tabBar}>
      {tabs.map(([t, label]) => (
        <button
          key={t}
          style={{
            ...S.tabBtn,
            ...(tab === t ? S.tabActive : {}),
          }}
          onClick={() => setTab(t)}
          onMouseEnter={e => {
            if (tab !== t) e.target.style.color = S.tabActive.color;
          }}
          onMouseLeave={e => {
            if (tab !== t) e.target.style.color = S.tabBtn.color;
          }}
        >
          {label}
        </button>
      ))}
      <div style={S.tabFlex} />
      <div style={S.cursor}>█</div>
    </nav>
  );
}