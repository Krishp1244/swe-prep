import { useState } from "react";

export default function Feedback({ S }) {
  const [submitted, setSubmitted] = useState(false);

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 24, animation: "slideIn .3s ease" }}>
      <div style={S.card}>
        <div style={{ display: "flex", alignItems: "center", gap: 14, marginBottom: 24 }}>
          <span style={{
            fontSize: 28, width: 52, height: 52, borderRadius: 14,
            background: "linear-gradient(135deg, rgba(0,255,136,0.1), rgba(14,165,233,0.1))",
            display: "flex", alignItems: "center", justifyContent: "center",
            border: "1px solid rgba(0,255,136,0.1)",
          }}>
            💬
          </span>
          <div>
            <h1 style={{ fontSize: 22, fontWeight: 800, color: S.qText?.color || "#e4e4e7", marginBottom: 4 }}>
              We'd love your feedback
            </h1>
            <p style={{ fontSize: 13, color: S.logoSub?.color || "#52525b", lineHeight: 1.6 }}>
              Help us make Dev Deck even better for everyone
            </p>
          </div>
        </div>

        {!submitted ? (
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            <div>
              <label style={{
                fontSize: 11, fontWeight: 700, color: S.progLabel?.color || "#52525b",
                letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 8,
              }}>
                What type of feedback?
              </label>
              <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
                {["🐛 Bug Report", "💡 Feature Request", "🎨 Design", "📝 Content", "🙌 Praise"].map(tag => (
                  <button
                    key={tag}
                    style={{
                      ...S.catBtn,
                      padding: "8px 16px",
                      fontSize: 12,
                      cursor: "pointer",
                    }}
                    onClick={e => {
                      document.querySelectorAll('.fb-tag').forEach(b => b.style.borderColor = S.catBtn?.border || "rgba(255,255,255,0.06)");
                      e.target.style.borderColor = S.logoGreen?.color || "#00ff88";
                    }}
                    className="fb-tag"
                  >
                    {tag}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label style={{
                fontSize: 11, fontWeight: 700, color: S.progLabel?.color || "#52525b",
                letterSpacing: 1.5, textTransform: "uppercase", display: "block", marginBottom: 8,
              }}>
                Your message
              </label>
              <textarea
                placeholder="Tell us what's on your mind..."
                rows={5}
                style={{
                  ...S.ta,
                  paddingLeft: 16,
                  fontSize: 14,
                  lineHeight: 1.7,
                  borderRadius: 14,
                }}
              />
            </div>

            <button
              style={{
                ...S.revealBtn,
                marginTop: 4,
              }}
              onClick={() => setSubmitted(true)}
            >
              SEND FEEDBACK →
            </button>
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: "40px 20px", animation: "slideIn .3s ease" }}>
            <div style={{ fontSize: 56, marginBottom: 16 }}>🎉</div>
            <h2 style={{ fontSize: 20, fontWeight: 800, color: S.logoGreen?.color || "#00ff88", marginBottom: 10 }}>
              Thank you!
            </h2>
            <p style={{ fontSize: 14, color: S.logoSub?.color || "#52525b", lineHeight: 1.7, maxWidth: 360, margin: "0 auto" }}>
              Your feedback means a lot. We're always working to make Dev Deck better.
            </p>
            <button
              style={{ ...S.nextBtn, maxWidth: 200, margin: "24px auto 0" }}
              onClick={() => setSubmitted(false)}
            >
              SEND MORE
            </button>
          </div>
        )}
      </div>
    </div>
  );
}