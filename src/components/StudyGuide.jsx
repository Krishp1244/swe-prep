import { useState } from "react";
import { ALL_QUESTIONS, CATEGORIES } from "../data/questions";

export default function StudyGuide({ S }) {
  const categories = CATEGORIES.filter(c => c !== "All" && c !== "💀 Weak Spots");
  const [expanded, setExpanded] = useState({});

  const toggleQ = (id) => {
    setExpanded(prev => ({ ...prev, [id]: !prev[id] }));
  };

  return (
    <div style={{ animation: "slideIn .3s ease" }}>
      {/* Quick jump links */}
      <div style={{
        display: "flex", gap: 8, flexWrap: "wrap", marginBottom: 32,
        padding: "16px 20px",
        background: S.card?.background || "rgba(14,14,22,0.6)",
        backdropFilter: "blur(12px)",
        borderRadius: 16,
        border: `1px solid ${S.card?.border || "rgba(255,255,255,0.06)"}`,
      }}>
        <span style={{
          fontSize: 10, fontWeight: 800, color: S.progLabel?.color || "#52525b",
          letterSpacing: 2, textTransform: "uppercase",
          display: "flex", alignItems: "center", marginRight: 8,
        }}>
          JUMP TO:
        </span>
        {categories.map(c => (
          <a key={c} href={`#cat-${c}`} style={{
            background: "rgba(255,255,255,0.03)",
            border: `1px solid ${S.card?.border || "rgba(255,255,255,0.06)"}`,
            borderRadius: 20,
            color: S.logoGreen?.color || "#00ff88",
            padding: "5px 14px",
            fontSize: 10,
            fontFamily: "inherit",
            fontWeight: 700,
            letterSpacing: 1.5,
            textDecoration: "none",
            transition: "all .2s",
          }}>
            {c}
          </a>
        ))}
      </div>

      {/* Questions by category */}
      {categories.map(cat => {
        const qs = ALL_QUESTIONS.filter(q => q.category === cat);
        return (
          <div key={cat} id={`cat-${cat}`} style={{ marginBottom: 48 }}>
            {/* Category header */}
            <div style={{
              display: "flex", alignItems: "center", gap: 14,
              marginBottom: 18, paddingBottom: 14,
              borderBottom: `1px solid ${S.card?.border || "rgba(255,255,255,0.06)"}`,
            }}>
              <span style={{
                fontSize: 10, fontWeight: 800, letterSpacing: 2,
                color: S.logoGreen?.color || "#00ff88",
                background: "rgba(0,255,136,0.06)",
                border: `1px solid rgba(0,255,136,0.15)`,
                borderRadius: 24, padding: "6px 16px",
                textTransform: "uppercase",
              }}>
                {cat}
              </span>
              <span style={{ fontSize: 12, color: S.progLabel?.color || "#52525b", fontWeight: 600 }}>
                {qs.length} questions
              </span>
            </div>

            {/* Question list */}
            <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
              {qs.map((q, i) => {
                const isOpen = expanded[q.id];
                return (
                  <div key={q.id} style={{
                    background: S.card?.background || "rgba(14,14,22,0.6)",
                    backdropFilter: "blur(12px)",
                    border: `1px solid ${S.card?.border || "rgba(255,255,255,0.06)"}`,
                    borderRadius: 16,
                    overflow: "hidden",
                    transition: "all 0.2s ease",
                  }}>
                    {/* Question header (clickable) */}
                    <button
                      onClick={() => toggleQ(q.id)}
                      style={{
                        display: "flex", gap: 12, alignItems: "center",
                        padding: "16px 20px",
                        width: "100%", background: "none", border: "none",
                        cursor: "pointer", textAlign: "left",
                        fontFamily: "inherit",
                        transition: "all 0.2s",
                      }}
                    >
                      <span style={{
                        fontSize: 10, color: S.qNum?.color || "#52525b",
                        fontWeight: 800, minWidth: 28, letterSpacing: 2,
                      }}>
                        {String(i + 1).padStart(2, "0")}
                      </span>
                      <p style={{
                        fontSize: 14, lineHeight: 1.6,
                        color: S.qText?.color || "#e4e4e7",
                        margin: 0, fontWeight: 500, flex: 1,
                      }}>
                        {q.question}
                      </p>
                      <span style={{
                        fontSize: 12, color: S.progLabel?.color || "#52525b",
                        transform: isOpen ? "rotate(90deg)" : "none",
                        transition: "transform 0.2s",
                        flexShrink: 0,
                      }}>
                        ▶
                      </span>
                    </button>

                    {/* Expandable answer */}
                    {isOpen && (
                      <div style={{
                        padding: "0 20px 18px",
                        borderTop: `1px solid ${S.card?.border || "rgba(255,255,255,0.04)"}`,
                        paddingTop: 16,
                        animation: "slideIn .2s ease",
                      }}>
                        {/* Options */}
                        <div style={{ display: "flex", flexDirection: "column", gap: 6, marginBottom: 14, paddingLeft: 40 }}>
                          {q.options.map((opt, idx) => {
                            const isCorrect = idx === q.answer;
                            return (
                              <div key={idx} style={{
                                display: "flex", alignItems: "center", gap: 10,
                                background: isCorrect ? "rgba(0,255,136,0.04)" : "rgba(255,255,255,0.01)",
                                border: `1px solid ${isCorrect ? "rgba(0,255,136,0.2)" : S.card?.border || "rgba(255,255,255,0.04)"}`,
                                borderRadius: 10,
                                padding: "10px 14px",
                                opacity: isCorrect ? 1 : 0.45,
                              }}>
                                <span style={{
                                  fontSize: 10, fontWeight: 900,
                                  color: isCorrect ? "#00ff88" : (S.optLetter?.color || "#52525b"),
                                  minWidth: 16,
                                }}>
                                  {["A", "B", "C", "D"][idx]}
                                </span>
                                <span style={{
                                  fontSize: 13,
                                  color: isCorrect ? "#00ff88" : (S.opt?.color || "#e4e4e7"),
                                  flex: 1,
                                }}>
                                  {opt}
                                </span>
                                {isCorrect && <span style={{ fontSize: 13, color: "#00ff88" }}>✓</span>}
                              </div>
                            );
                          })}
                        </div>
                        {/* Explanation */}
                        <div style={{
                          paddingLeft: 40,
                          fontSize: 13, lineHeight: 1.8,
                          color: S.expText?.color || "#a1a1aa",
                          fontStyle: "italic",
                        }}>
                          💡 {q.explanation}
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </div>
  );
}