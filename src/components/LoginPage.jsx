import { useState } from "react";
import { useAuth } from "../contexts/AuthContext";

const PARTICLES = Array.from({ length: 30 }, (_, i) => ({
    id: i,
    x: Math.random() * 100,
    y: Math.random() * 100,
    size: Math.random() * 3 + 1,
    duration: Math.random() * 20 + 10,
    delay: Math.random() * 10,
}));

export default function LoginPage() {
    const { loginWithGoogle, loginWithGithub } = useAuth();
    const [error, setError] = useState("");
    const [hoveredBtn, setHoveredBtn] = useState(null);

    const handleGoogle = async () => {
        setError("");
        try { await loginWithGoogle(); } catch (e) { setError(e.message); }
    };

    const handleGithub = async () => {
        setError("");
        try { await loginWithGithub(); } catch (e) { setError(e.message); }
    };

    return (
        <div style={styles.root}>
            <style>{loginCSS}</style>

            {/* Animated background particles */}
            <div style={styles.particleContainer}>
                {PARTICLES.map((p) => (
                    <div
                        key={p.id}
                        className="login-particle"
                        style={{
                            left: `${p.x}%`,
                            top: `${p.y}%`,
                            width: p.size,
                            height: p.size,
                            animationDuration: `${p.duration}s`,
                            animationDelay: `${p.delay}s`,
                        }}
                    />
                ))}
            </div>

            {/* Gradient orbs */}
            <div className="login-orb login-orb-1" />
            <div className="login-orb login-orb-2" />
            <div className="login-orb login-orb-3" />

            {/* Login card */}
            <div style={styles.card} className="login-card">
                {/* Logo */}
                <div style={styles.logoArea}>
                    <div style={styles.logoIcon}>⌨️</div>
                    <div>
                        <div style={styles.logoText}>
                            DEV<span style={styles.logoAccent}> DECK</span>
                        </div>
                        <div style={styles.logoSub}>crack the coding interview</div>
                    </div>
                </div>

                <h1 style={styles.title}>Welcome back</h1>
                <p style={styles.subtitle}>
                    Sign in to save your progress, sync across devices, and track your interview prep journey.
                </p>

                {error && (
                    <div style={styles.errorBox}>
                        <span>⚠️</span> {error}
                    </div>
                )}

                {/* Google Button */}
                <button
                    style={{
                        ...styles.authBtn,
                        ...styles.googleBtn,
                        ...(hoveredBtn === "google" ? styles.googleBtnHover : {}),
                    }}
                    onClick={handleGoogle}
                    onMouseEnter={() => setHoveredBtn("google")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className="login-auth-btn"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" style={{ flexShrink: 0 }}>
                        <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92a5.06 5.06 0 0 1-2.2 3.32v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.1z" />
                        <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z" />
                        <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.93l2.85-2.22.81-.62z" />
                        <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l3.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z" />
                    </svg>
                    <span>Continue with Google</span>
                </button>

                {/* GitHub Button */}
                <button
                    style={{
                        ...styles.authBtn,
                        ...styles.githubBtn,
                        ...(hoveredBtn === "github" ? styles.githubBtnHover : {}),
                    }}
                    onClick={handleGithub}
                    onMouseEnter={() => setHoveredBtn("github")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className="login-auth-btn"
                >
                    <svg width="20" height="20" viewBox="0 0 24 24" fill="white" style={{ flexShrink: 0 }}>
                        <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                    </svg>
                    <span>Continue with GitHub</span>
                </button>

                <div style={styles.divider}>
                    <div style={styles.dividerLine} />
                    <span style={styles.dividerText}>or</span>
                    <div style={styles.dividerLine} />
                </div>

                {/* Guest Button */}
                <button
                    style={{
                        ...styles.authBtn,
                        ...styles.guestBtn,
                        ...(hoveredBtn === "guest" ? styles.guestBtnHover : {}),
                    }}
                    onClick={() => {
                        // Dispatch a custom event so App.js can handle guest mode
                        window.dispatchEvent(new CustomEvent("guestLogin"));
                    }}
                    onMouseEnter={() => setHoveredBtn("guest")}
                    onMouseLeave={() => setHoveredBtn(null)}
                    className="login-auth-btn"
                >
                    <span style={{ fontSize: 18 }}>👤</span>
                    <span>Continue as Guest</span>
                </button>

                <p style={styles.disclaimer}>
                    Your progress will be saved to the cloud when signed in.
                    <br />
                    Guest mode saves locally only.
                </p>
            </div>

            {/* Footer */}
            <div style={styles.footer}>
                Built with 💚 by Krish · Open Source
            </div>
        </div>
    );
}

const styles = {
    root: {
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        flexDirection: "column",
        background: "#06060a",
        position: "relative",
        overflow: "hidden",
        fontFamily: "'Inter', -apple-system, sans-serif",
    },
    particleContainer: {
        position: "fixed",
        inset: 0,
        overflow: "hidden",
        pointerEvents: "none",
        zIndex: 0,
    },
    card: {
        position: "relative",
        zIndex: 10,
        background: "rgba(14, 14, 22, 0.8)",
        backdropFilter: "blur(40px)",
        WebkitBackdropFilter: "blur(40px)",
        border: "1px solid rgba(255,255,255,0.06)",
        borderRadius: 24,
        padding: "48px 44px",
        maxWidth: 440,
        width: "90%",
        boxShadow: "0 24px 80px rgba(0,0,0,0.6), 0 0 0 1px rgba(255,255,255,0.03) inset",
    },
    logoArea: {
        display: "flex",
        alignItems: "center",
        gap: 14,
        marginBottom: 36,
    },
    logoIcon: { fontSize: 32 },
    logoText: {
        fontSize: 20,
        fontWeight: 900,
        color: "#e4e4e7",
        letterSpacing: 3,
        fontFamily: "'Inter', sans-serif",
    },
    logoAccent: { color: "#00ff88" },
    logoSub: {
        fontSize: 10,
        color: "#52525b",
        letterSpacing: 2,
        marginTop: 2,
        textTransform: "uppercase",
    },
    title: {
        fontSize: 28,
        fontWeight: 800,
        color: "#fafafa",
        marginBottom: 10,
        letterSpacing: -0.5,
    },
    subtitle: {
        fontSize: 14,
        color: "#71717a",
        lineHeight: 1.7,
        marginBottom: 32,
    },
    errorBox: {
        background: "rgba(239,68,68,0.08)",
        border: "1px solid rgba(239,68,68,0.2)",
        borderRadius: 12,
        padding: "12px 16px",
        fontSize: 13,
        color: "#fca5a5",
        marginBottom: 20,
        display: "flex",
        alignItems: "center",
        gap: 8,
    },
    authBtn: {
        width: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        gap: 12,
        padding: "14px 20px",
        borderRadius: 14,
        fontSize: 14,
        fontWeight: 600,
        cursor: "pointer",
        border: "none",
        marginBottom: 12,
        fontFamily: "'Inter', sans-serif",
        transition: "all 0.2s ease",
        letterSpacing: 0.3,
    },
    googleBtn: {
        background: "#ffffff",
        color: "#1f2937",
    },
    googleBtnHover: {
        background: "#f3f4f6",
        transform: "translateY(-1px)",
        boxShadow: "0 8px 24px rgba(255,255,255,0.08)",
    },
    githubBtn: {
        background: "#1f2937",
        color: "#f9fafb",
        border: "1px solid rgba(255,255,255,0.08)",
    },
    githubBtnHover: {
        background: "#374151",
        transform: "translateY(-1px)",
        boxShadow: "0 8px 24px rgba(0,0,0,0.3)",
    },
    guestBtn: {
        background: "transparent",
        color: "#a1a1aa",
        border: "1px solid rgba(255,255,255,0.08)",
    },
    guestBtnHover: {
        background: "rgba(255,255,255,0.03)",
        borderColor: "rgba(255,255,255,0.12)",
        color: "#d4d4d8",
        transform: "translateY(-1px)",
    },
    divider: {
        display: "flex",
        alignItems: "center",
        gap: 16,
        margin: "8px 0 20px",
    },
    dividerLine: {
        flex: 1,
        height: 1,
        background: "rgba(255,255,255,0.06)",
    },
    dividerText: {
        fontSize: 12,
        color: "#52525b",
        textTransform: "uppercase",
        letterSpacing: 2,
        fontWeight: 600,
    },
    disclaimer: {
        fontSize: 11,
        color: "#3f3f46",
        textAlign: "center",
        lineHeight: 1.6,
        marginTop: 8,
    },
    footer: {
        position: "relative",
        zIndex: 10,
        marginTop: 40,
        fontSize: 12,
        color: "#3f3f46",
        letterSpacing: 1,
    },
};

const loginCSS = `
  @import url('https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800;900&display=swap');

  .login-particle {
    position: absolute;
    background: #00ff88;
    border-radius: 50%;
    opacity: 0.15;
    animation: loginFloat linear infinite;
  }

  .login-orb {
    position: fixed;
    border-radius: 50%;
    filter: blur(120px);
    opacity: 0.12;
    pointer-events: none;
    z-index: 1;
  }
  .login-orb-1 {
    width: 500px; height: 500px;
    background: #00ff88;
    top: -150px; right: -100px;
    animation: loginOrbFloat 12s ease-in-out infinite;
  }
  .login-orb-2 {
    width: 400px; height: 400px;
    background: #7c3aed;
    bottom: -100px; left: -100px;
    animation: loginOrbFloat 15s ease-in-out infinite reverse;
  }
  .login-orb-3 {
    width: 300px; height: 300px;
    background: #0ea5e9;
    top: 50%; left: 50%;
    transform: translate(-50%, -50%);
    animation: loginOrbFloat 18s ease-in-out infinite;
  }

  .login-card {
    animation: loginCardIn 0.6s ease-out;
  }

  .login-auth-btn {
    position: relative;
    overflow: hidden;
  }
  .login-auth-btn::after {
    content: '';
    position: absolute;
    inset: 0;
    background: linear-gradient(90deg, transparent, rgba(255,255,255,0.05), transparent);
    transform: translateX(-100%);
    transition: transform 0.4s ease;
  }
  .login-auth-btn:hover::after {
    transform: translateX(100%);
  }

  @keyframes loginFloat {
    0% { transform: translateY(0) translateX(0); opacity: 0; }
    10% { opacity: 0.15; }
    90% { opacity: 0.15; }
    100% { transform: translateY(-100vh) translateX(50px); opacity: 0; }
  }

  @keyframes loginOrbFloat {
    0%, 100% { transform: translate(0, 0) scale(1); }
    33% { transform: translate(30px, -20px) scale(1.05); }
    66% { transform: translate(-20px, 15px) scale(0.95); }
  }

  @keyframes loginCardIn {
    from { opacity: 0; transform: translateY(30px) scale(0.96); }
    to { opacity: 1; transform: translateY(0) scale(1); }
  }
`;
