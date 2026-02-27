import { useState, useEffect } from "react";

export default function QuizPanel({ questions, category, onAnswer, wrongIds, S }) {
  const [shuffled, setShuffled] = useState([]);
  const [idx, setIdx] = useState(0);
  const [selected, setSelected] = useState(null);
  const [revealed, setRevealed] = useState(false);

  useEffect(() => {
    setShuffled([...questions].sort(() => Math.random() - 0.5));
    setIdx(0); setSelected(null); setRevealed(false);
  }, [category]); // eslint-disable-line

  if (shuffled.length === 0) return (
    <div style={S.empty}>
      <div style={{ fontSize: 64, marginBottom: 16 }}>💀</div>
      <div style={{ color: S.muted, fontSize: 15 }}>No weak spots yet.</div>
      <div style={{ fontSize: 13, marginTop: 8, opacity: 0.4 }}>Go get some answers wrong. We'll be waiting.</div>
    </div>
  );

  const q = shuffled[idx];
  const progress = (idx / shuffled.length) * 100;
  const handle = (i) => { if (!revealed) setSelected(i); };
  const reveal = () => { if (selected === null) return; setRevealed(true); onAnswer(q.id, selected === q.answer); };
  const next = () => { setIdx(i => (i + 1) % shuffled.length); setSelected(null); setRevealed(false); };

  const optStyle = (i) => {
    const base = S.opt;
    if (!revealed) return selected === i ? { ...base, ...S.optSel } : base;
    if (i === q.answer) return { ...base, ...S.optOk };
    if (i === selected) return { ...base, ...S.optBad };
    return { ...base, opacity: 0.4 };
  };

  return (
    <div style={{ animation: "slideIn .3s ease" }}>
      <div style={S.progBar}><div style={{ ...S.progFill, width: `${progress}%` }} /></div>
      <div style={S.progLabel}>{idx + 1} / {shuffled.length}</div>
      <div style={S.card}>
        <div style={S.cardTop}>
          <span style={S.catTag}>{q.category}</span>
          {wrongIds[q.id] && <span style={S.weakTag}>💀 WEAK ×{wrongIds[q.id]}</span>}
          <div style={S.cardTopFlex} />
          <span style={S.qNum}>Q{String(idx + 1).padStart(2, "0")}</span>
        </div>
        <p style={S.qText}>{q.question}</p>
        <div style={S.opts}>
          {q.options.map((opt, i) => (
            <button key={i} className="opt-btn" style={optStyle(i)} onClick={() => handle(i)}>
              <span style={S.optLetter}>{["A", "B", "C", "D"][i]}</span>
              <span style={{ flex: 1 }}>{opt}</span>
              {revealed && i === q.answer && <span style={{ color: "#00ff88", marginLeft: 8 }}>✓</span>}
              {revealed && i === selected && selected !== q.answer && <span style={{ color: "#ff4444", marginLeft: 8 }}>✗</span>}
            </button>
          ))}
        </div>
        {!revealed ? (
          <button style={selected !== null ? S.revealBtn : S.revealBtnOff} onClick={reveal} disabled={selected === null}>
            {selected === null ? "SELECT AN ANSWER" : "▶  REVEAL ANSWER"}
          </button>
        ) : (
          <div style={{ animation: "slideIn .25s ease" }}>
            <div style={S.explanation}>
              <span style={{ fontSize: 20 }}>{selected === q.answer ? "✅" : "❌"}</span>
              <p style={S.expText}>{q.explanation}</p>
            </div>
            <button className="next-btn" style={S.nextBtn} onClick={next}>NEXT QUESTION →</button>
          </div>
        )}
      </div>
    </div>
  );
}