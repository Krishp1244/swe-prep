import { useState, useRef, useEffect } from "react";

const GEMINI_API_KEY = process.env.REACT_APP_GEMINI_API_KEY;
const GEMINI_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-2.0-flash:generateContent?key=${GEMINI_API_KEY}`;

const SYSTEM = `You are Dev Deck — an elite software engineering interview coach. Expert in DSA, system design, OOP, OS, networking, concurrency, and databases.
Personality: sharp, direct, like a senior FAANG engineer mentoring a strong candidate. No fluff. Use code examples in triple backticks when helpful.`;

const PROMPTS = [
  "Explain dynamic programming with a classic example",
  "How do I design a URL shortener at scale?",
  "Quiz me on system design — 3 rapid-fire questions",
  "What's the difference between a mutex and a semaphore?",
  "Walk me through how you'd solve Two Sum optimally",
  "Explain the difference between SQL and NoSQL databases",
];

function renderMsg(text) {
  const parts = text.split(/(```[\s\S]*?```|`[^`\n]+`)/g);
  return parts.map((p, i) => {
    if (p.startsWith("```") && p.endsWith("```")) {
      return <pre key={i} style={{ background: "#050505", border: "1px solid #1a1a1a", borderRadius: 4, padding: "14px 16px", fontSize: 12, overflowX: "auto", margin: "10px 0", color: "#00ff88", fontFamily: "inherit" }}><code>{p.slice(3, -3).replace(/^\w+\n/, "")}</code></pre>;
    }
    if (p.startsWith("`") && p.endsWith("`")) {
      return <code key={i} style={{ background: "#050505", border: "1px solid #1a1a1a", borderRadius: 3, padding: "1px 5px", fontSize: 12, color: "#00ff88" }}>{p.slice(1, -1)}</code>;
    }
    return <span key={i}>{p.split(/(\*\*[^*]+\*\*)/g).map((bp, j) =>
      bp.startsWith("**") && bp.endsWith("**")
        ? <strong key={j}>{bp.slice(2, -2)}</strong>
        : bp
    )}</span>;
  });
}

export default function ChatPanel({ history, setHistory, S }) {
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef(null);
  const taRef = useRef(null);

  useEffect(() => { bottomRef.current?.scrollIntoView({ behavior: "smooth" }); }, [history, loading]);

  const send = async (text) => {
    const msg = (text || input).trim();
    if (!msg || loading) return;
    setInput("");
    const next = [...history, { role: "user", content: msg }];
    setHistory(next);
    setLoading(true);
    try {
      const res = await fetch(GEMINI_URL, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          system_instruction: { parts: [{ text: SYSTEM }] },
          contents: next.map(m => ({ role: m.role === "user" ? "user" : "model", parts: [{ text: m.content }] })),
          generationConfig: { temperature: 0.7, maxOutputTokens: 1024 },
        }),
      });
      const data = await res.json();
      const reply = data?.candidates?.[0]?.content?.parts?.[0]?.text || (data?.error ? `⚠️ API Error: ${data.error.message}` : "⚠️ No response.");
      setHistory(h => [...h, { role: "model", content: reply }]);
    } catch {
      setHistory(h => [...h, { role: "model", content: "⚠️ Network error. Check your .env API key." }]);
    }
    setLoading(false);
  };

  const onKey = (e) => { if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); send(); } };

  return (
    <div style={S.chatWrap}>
      <div style={S.msgs}>
        {history.length === 0 && (
          <div style={S.welcome}>
            <div style={{ fontSize: 48, marginBottom: 12 }}>🤖</div>
            <p style={{ color: "#555", fontSize: 14, lineHeight: 1.8, marginBottom: 24 }}>
              Your AI interview coach is online.<br />Ask anything — concepts, problems, mock interviews.
            </p>
            <div style={S.suggGrid}>
              {PROMPTS.map((p, i) => (
                <button key={i} className="sugg-btn" style={S.suggBtn} onClick={() => send(p)}>{p}</button>
              ))}
            </div>
          </div>
        )}
        {history.map((m, i) => (
          <div key={i} style={{ ...S.msgRow, ...(m.role === "user" ? S.msgRowUser : {}), animation: "slideIn .2s ease" }}>
            <div style={m.role === "user" ? S.labelUser : S.labelBot}>{m.role === "user" ? "YOU" : "AI COACH"}</div>
            <div style={S.msgBubble}>{renderMsg(m.content)}</div>
          </div>
        ))}
        {loading && (
          <div style={S.msgRow}>
            <div style={S.labelBot}>AI COACH</div>
            <div style={S.msgBubble}>
              <div style={{ display: "flex", gap: 4, alignItems: "center", padding: "4px 0" }}>
                {[0, 1, 2].map(i => <span key={i} style={{ width: 6, height: 6, borderRadius: "50%", background: "#00aa55", display: "inline-block", animation: `dot 1.2s ${i * 0.2}s infinite` }} />)}
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>
      <div style={S.inputRow}>
        <div style={{ position: "relative", flex: 1 }}>
          <span style={S.inputPrefix}>&gt;</span>
          <textarea ref={taRef} style={S.ta} value={input} onChange={e => setInput(e.target.value)} onKeyDown={onKey} placeholder="Ask about algorithms, system design, OOP... (Enter to send)" rows={2} />
        </div>
        <button style={loading || !input.trim() ? S.sendOff : S.sendBtn} onClick={() => send()} disabled={loading || !input.trim()}>▶</button>
      </div>
    </div>
  );
}