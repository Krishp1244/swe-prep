import { useState, useEffect, useCallback } from "react";

const defaultState = () => ({
  score: { correct: 0, total: 0 },
  streak: { current: 0, longest: 0, lastDate: null },
  wrongIds: {},
  chatHistory: [],
});

const loadState = () => {
  try {
    const s = localStorage.getItem("sweprep_v3");
    return s ? JSON.parse(s) : null;
  } catch {
    return null;
  }
};

const saveState = (st) => {
  try {
    localStorage.setItem("sweprep_v3", JSON.stringify(st));
  } catch {}
};

export function useAppState() {
  const [appState, setAppState] = useState(() => loadState() || defaultState());

  // persist on every change
  useEffect(() => {
    saveState(appState);
  }, [appState]);

  // check streak continuity on load
  useEffect(() => {
    const today = new Date().toDateString();
    const last = appState.streak.lastDate;
    if (last && last !== today) {
      const diff = (new Date(today) - new Date(last)) / 86400000;
      if (diff > 1) {
        setAppState((s) => ({ ...s, streak: { ...s.streak, current: 0 } }));
      }
    }
  }, []); // eslint-disable-line

  const updateStreak = useCallback(() => {
    const today = new Date().toDateString();
    setAppState((s) => {
      if (s.streak.lastDate === today) return s;
      const newCurrent = s.streak.current + 1;
      return {
        ...s,
        streak: {
          current: newCurrent,
          longest: Math.max(newCurrent, s.streak.longest),
          lastDate: today,
        },
      };
    });
  }, []);

  const recordAnswer = useCallback(
    (qId, correct) => {
      updateStreak();
      setAppState((s) => {
        const w = { ...s.wrongIds };
        if (!correct) {
          w[qId] = (w[qId] || 0) + 1;
        } else {
          if (w[qId]) {
            w[qId]--;
            if (w[qId] <= 0) delete w[qId];
          }
        }
        return {
          ...s,
          score: {
            correct: s.score.correct + (correct ? 1 : 0),
            total: s.score.total + 1,
          },
          wrongIds: w,
        };
      });
    },
    [updateStreak]
  );

  const setChatHistory = useCallback((h) => {
    setAppState((s) => ({
      ...s,
      chatHistory: typeof h === "function" ? h(s.chatHistory) : h,
    }));
  }, []);

  return { appState, recordAnswer, setChatHistory };
}