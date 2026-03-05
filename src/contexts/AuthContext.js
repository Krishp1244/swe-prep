import { createContext, useContext, useState, useEffect } from "react";
import { auth, db, googleProvider, githubProvider, hasFirebaseConfig } from "../firebase";

const AuthContext = createContext();

export function useAuth() {
    return useContext(AuthContext);
}

export function AuthProvider({ children }) {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        if (!hasFirebaseConfig || !auth) {
            setLoading(false);
            return;
        }

        // Dynamically import to avoid errors when Firebase isn't configured
        import("firebase/auth").then(({ onAuthStateChanged }) => {
            const unsubscribe = onAuthStateChanged(auth, (u) => {
                setUser(u);
                setLoading(false);
            });
            return () => unsubscribe();
        }).catch(() => {
            setLoading(false);
        });
    }, []);

    const loginWithGoogle = async () => {
        if (!auth || !googleProvider) throw new Error("Firebase not configured");
        const { signInWithPopup } = await import("firebase/auth");
        try {
            const result = await signInWithPopup(auth, googleProvider);
            await ensureUserDoc(result.user);
            return result.user;
        } catch (err) {
            console.error("Google login error:", err);
            throw err;
        }
    };

    const loginWithGithub = async () => {
        if (!auth || !githubProvider) throw new Error("Firebase not configured");
        const { signInWithPopup } = await import("firebase/auth");
        try {
            const result = await signInWithPopup(auth, githubProvider);
            await ensureUserDoc(result.user);
            return result.user;
        } catch (err) {
            console.error("GitHub login error:", err);
            throw err;
        }
    };

    const logout = async () => {
        if (!auth) return;
        const { signOut } = await import("firebase/auth");
        return signOut(auth);
    };

    const ensureUserDoc = async (u) => {
        if (!db) return;
        try {
            const { doc, setDoc, getDoc } = await import("firebase/firestore");
            const ref = doc(db, "users", u.uid);
            const snap = await getDoc(ref);
            if (!snap.exists()) {
                await setDoc(ref, {
                    displayName: u.displayName,
                    email: u.email,
                    photoURL: u.photoURL,
                    createdAt: new Date().toISOString(),
                });
            }
        } catch (err) {
            console.error("Error creating user doc:", err);
        }
    };

    const saveProgress = async (appState) => {
        if (!user || !db) return;
        try {
            const { doc, setDoc } = await import("firebase/firestore");
            await setDoc(doc(db, "users", user.uid, "progress", "current"), {
                ...appState,
                updatedAt: new Date().toISOString(),
            });
        } catch (err) {
            console.error("Save progress error:", err);
        }
    };

    const loadProgress = async () => {
        if (!user || !db) return null;
        try {
            const { doc, getDoc } = await import("firebase/firestore");
            const snap = await getDoc(doc(db, "users", user.uid, "progress", "current"));
            if (snap.exists()) {
                const data = snap.data();
                delete data.updatedAt;
                return data;
            }
        } catch (err) {
            console.error("Load progress error:", err);
        }
        return null;
    };

    const value = {
        user,
        loading,
        loginWithGoogle,
        loginWithGithub,
        logout,
        saveProgress,
        loadProgress,
    };

    return (
        <AuthContext.Provider value={value}>
            {children}
        </AuthContext.Provider>
    );
}
