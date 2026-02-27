import { CATEGORIES } from "../data/questions";

export default function CategoryFilter({ category, setCategory, weakCount, layout, setLayout, S }) {
  return (
    <div style={S.catRow}>
      {CATEGORIES.map((c) => {
        const isWeak = c === "💀 Weak Spots";
        const active = category === c;
        return (
          <button
            key={c}
            className="cat-btn"
            style={{
              ...S.catBtn,
              ...(active ? S.catActive : {}),
              ...(isWeak ? { borderColor: active ? "#ff4444" : "#2a0000", color: active ? "#ff4444" : "#882222" } : {}),
            }}
            onClick={() => setCategory(c)}
          >
            {isWeak ? `${c} (${weakCount})` : c}
          </button>
        );
      })}
      <button style={S.layoutBtn} onClick={() => setLayout(l => l === "top" ? "side" : "top")}>
        {layout === "top" ? "⬅ SIDEBAR" : "⬆ TOP BAR"}
      </button>
    </div>
  );
}