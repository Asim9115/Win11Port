"use client";

import React, { createContext, useContext, useState, useCallback, useMemo, useEffect } from "react";
import { useWindows } from '@/hooks/use-windows';

type HistoryEntry = {
    name: string;
    path: string;
};

type AppHistory = {
    [windowId: string]: {
        history: HistoryEntry[];
        currentIndex: number;
    }
};

type AppHistoryContextType = {
    appHistories: AppHistory;
    setAppHistories: React.Dispatch<React.SetStateAction<AppHistory>>;
};

const AppHistoryContext = createContext<AppHistoryContextType | null>(null);

export const AppHistoryProvider = ({ children, windowId, appId }: { children: React.ReactNode, windowId: string, appId: string }) => {
    const [appHistories, setAppHistories] = useState<AppHistory>({});

    useEffect(() => {
        try {
            const storedHistories = localStorage.getItem("appHistories");
            if (storedHistories) {
                setAppHistories(JSON.parse(storedHistories));
            }
        } catch (error) {
            console.error("Failed to parse app histories from localStorage", error);
        }
    }, []);

    useEffect(() => {
        if (Object.keys(appHistories).length > 0) {
            try {
                localStorage.setItem("appHistories", JSON.stringify(appHistories));
            } catch (error) {
                console.error("Failed to save app histories to localStorage", error);
            }
        }
    }, [appHistories]);
    
    // Initialize history for the window if it doesn't exist
    useEffect(() => {
        if (!appHistories[windowId]) {
            const initialEntry = { name: 'Home', path: 'Home' };
            setAppHistories(prev => ({
                ...prev,
                [windowId]: {
                    history: [initialEntry],
                    currentIndex: 0,
                }
            }));
        }
    }, [windowId, appHistories]);


    const value = useMemo(() => ({ appHistories, setAppHistories }), [appHistories]);

    return React.createElement(AppHistoryContext.Provider, { value }, children);
}


export const useAppHistory = (windowId: string | undefined) => {
    const context = useContext(AppHistoryContext);
    
    const navigate = useCallback((name: string, path: string) => {
        if (!context || !windowId) return;
        const { setAppHistories } = context;
        setAppHistories(prev => {
            const current = prev[windowId];
            if (current) {
                const newHistory = [...current.history.slice(0, current.currentIndex + 1), { name, path }];
                return {
                    ...prev,
                    [windowId]: {
                        ...current,
                        history: newHistory,
                        currentIndex: newHistory.length - 1
                    }
                };
            }
            const initialEntry = { name: 'Home', path: 'Home' };
            const newHistory = [initialEntry, { name, path }];
            return {
                ...prev,
                [windowId]: {
                    history: newHistory,
                    currentIndex: 1,
                }
            }
        });
    }, [windowId, context]);

    const back = useCallback(() => {
        if (!context || !windowId) return;
        const { setAppHistories } = context;
        setAppHistories(prev => {
            const current = prev[windowId];
            if (current && current.currentIndex > 0) {
                return { ...prev, [windowId]: { ...current, currentIndex: current.currentIndex - 1 } };
            }
            return prev;
        });
    }, [windowId, context]);

    const forward = useCallback(() => {
        if (!context || !windowId) return;
        const { setAppHistories } = context;
        setAppHistories(prev => {
            const current = prev[windowId];
            if (current && current.currentIndex < current.history.length - 1) {
                return { ...prev, [windowId]: { ...current, currentIndex: current.currentIndex + 1 } };
            }
            return prev;
        });
    }, [windowId, context]);

    const up = useCallback(() => {
        if (!context || !windowId) return;
        const { setAppHistories } = context;
        setAppHistories(prev => {
            const current = prev[windowId];
            if (current) {
                const currentPath = current.history[current.currentIndex].path;
                const parentPath = currentPath.substring(0, currentPath.lastIndexOf('/'));
                
                if (parentPath) {
                    const newEntry = { name: parentPath.split('/').pop() || 'Home', path: parentPath };
                    const newHistory = [...current.history.slice(0, current.currentIndex + 1), newEntry];
                    return {
                        ...prev,
                        [windowId]: {
                            ...current,
                            history: newHistory,
                            currentIndex: newHistory.length - 1,
                        }
                    };
                } else if (currentPath !== 'Home') {
                    const newEntry = { name: 'Home', path: 'Home' };
                    const newHistory = [...current.history.slice(0, current.currentIndex + 1), newEntry];
                     return {
                        ...prev,
                        [windowId]: {
                            ...current,
                            history: newHistory,
                            currentIndex: newHistory.length - 1,
                        }
                    };
                }
            }
            return prev;
        })
    }, [windowId, context]);

    if (!context || !windowId) {
        return { 
            history: [{ name: 'Home', path: 'Home' }], 
            back: () => {}, 
            forward: () => {}, 
            up: () => {},
            navigate,
            canGoBack: false, 
            canGoForward: false,
            canGoUp: false
        };
    }
    
    const { appHistories } = context;
    const windowHistory = appHistories[windowId];

    const canGoBack = windowHistory ? windowHistory.currentIndex > 0 : false;
    const canGoForward = windowHistory ? windowHistory.currentIndex < windowHistory.history.length - 1 : false;
    const currentPath = windowHistory ? windowHistory.history[windowHistory.currentIndex]?.path : '';
    const canGoUp = currentPath !== 'Home';

    return {
        history: windowHistory?.history || [{ name: 'Home', path: 'Home' }],
        back,
        forward,
        up,
        navigate,
        canGoBack,
        canGoForward,
        canGoUp,
    };
}


export const useAppView = (appId: string) => {
    const { openWindow, windows } = useWindows();
    const context = useContext(AppHistoryContext);

    const activeWindow = useMemo(() => {
      return windows.length > 0 ? windows.reduce((a, b) => a.zIndex > b.zIndex ? a : b) : null;
    }, [windows]);

    const windowId = activeWindow?.appId === appId ? activeWindow.id : windows.find(w => w.appId === appId)?.id;
    
    const { navigate: navFunc } = useAppHistory(windowId);

    const navigate = useCallback((name: string, path: string) => {
        navFunc(name, path);
    }, [navFunc]);

    const windowHistory = windowId ? context?.appHistories[windowId] : null;

    const currentView = useMemo(() => {
        if (!windowHistory || !windowHistory.history[windowHistory.currentIndex]) {
            return { name: 'Home', path: 'Home' };
        }
        return windowHistory.history[windowHistory.currentIndex];
    }, [windowHistory]);

    if (!context || !windowId) {
        return {
            currentView: { name: 'Home', path: 'Home' },
            navigate: (name: string, path: string) => navFunc(name, path),
            open: openWindow,
        }
    }

    return {
        currentView,
        navigate,
        open: openWindow,
    };
};
