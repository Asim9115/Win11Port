import type { Window } from "@/lib/types";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { useToast } from "./use-toast";

const APP_CONFIG: Record<string, { title: string; size: { width: number; height: number } }> = {
    MyPC: { title: "This PC", size: { width: 800, height: 600 } },
    Projects: { title: "Projects", size: { width: 880, height: 600 } },
    Skills: { title: "Skills", size: { width: 720, height: 500 } },
    Education: { title: "Education", size: { width: 720, height: 500 } },
    About: { title: "About Me", size: { width: 720, height: 500 } },
};

type WindowContextType = {
  windows: Window[];
  openWindow: (appId: string) => void;
  closeWindow: (id: string) => void;
  focusWindow: (id:string) => void;
  toggleMinimize: (id: string) => void;
  toggleMaximize: (id: string) => void;
  updateWindowPosition: (id: string, position: { x: number; y: number }) => void;
  brightness: number;
  setBrightness: (level: number) => void;
  isSleeping: boolean;
  sleep: () => void;
  restart: () => void;
  shutdown: () => void;
};

const WindowContext = createContext<WindowContextType | null>(null);

export const useWindows = () => {
  const context = useContext(WindowContext);
  if (!context) {
    throw new Error("useWindows must be used within a WindowProvider");
  }
  return context;
};

export const WindowProvider = ({ children }: { children: React.ReactNode }) => {
  const [windows, setWindows] = useState<Window[]>([]);
  const [zIndexCounter, setZIndexCounter] = useState(10);
  const [brightness, setBrightness] = useState(100);
  const [isSleeping, setIsSleeping] = useState(false);
  const { toast } = useToast();
  const [isMobile, setIsMobile] = useState(false);

  useEffect(() => {
    try {
      const storedWindows = localStorage.getItem("windows");
      if (storedWindows) {
        setWindows(JSON.parse(storedWindows));
      }
      const storedZIndex = localStorage.getItem("zIndexCounter");
      if (storedZIndex) {
        setZIndexCounter(JSON.parse(storedZIndex));
      }
       const storedBrightness = localStorage.getItem("brightness");
      if (storedBrightness) {
        setBrightness(JSON.parse(storedBrightness));
      }
    } catch (error) {
        console.error("Failed to parse state from localStorage", error);
    }
  }, []);

  useEffect(() => {
      try {
        localStorage.setItem("windows", JSON.stringify(windows));
      } catch (error) {
          console.error("Failed to save windows to localStorage", error);
      }
  }, [windows]);

  useEffect(() => {
      try {
        localStorage.setItem("zIndexCounter", JSON.stringify(zIndexCounter));
      } catch (error) {
          console.error("Failed to save zIndexCounter to localStorage", error);
      }
  }, [zIndexCounter]);
  
  useEffect(() => {
      try {
        localStorage.setItem("brightness", JSON.stringify(brightness));
      } catch (error) {
          console.error("Failed to save brightness to localStorage", error);
      }
  }, [brightness]);


  useEffect(() => {
    const checkMobile = () => setIsMobile(window.innerWidth < 768);
    checkMobile();
    window.addEventListener('resize', checkMobile);
    return () => window.removeEventListener('resize', checkMobile);
  }, []);

  const openWindow = useCallback((appId: string) => {
    setWindows(prev => {
        const existingWindow = prev.find((w) => w.appId === appId);
        const newZIndex = zIndexCounter + 1;
        setZIndexCounter(newZIndex);

        if (existingWindow) {
            return prev.map((w) => 
                w.appId === appId 
                    ? { ...w, zIndex: newZIndex, minimized: false } 
                    : w
            );
        } else {
            const config = APP_CONFIG[appId];
            if (!config) return prev;

            const newWindow: Window = {
                id: `${appId}-${Date.now()}`,
                appId,
                title: config.title,
                position: { x: 150 + prev.length * 20, y: 150 + prev.length * 20 },
                size: config.size,
                zIndex: newZIndex,
                minimized: false,
                maximized: isMobile,
            };
            return [...prev, newWindow];
        }
    });
  }, [zIndexCounter, isMobile]);
  
  const focusWindow = useCallback((id: string) => {
      const newZIndex = zIndexCounter + 1;
      setZIndexCounter(newZIndex);
      setWindows((prev) => 
          prev.map((w) => w.id === id ? { ...w, zIndex: newZIndex, minimized: false } : w)
      );
  }, [zIndexCounter]);


  const closeWindow = useCallback((id: string) => {
    setWindows((prev) => prev.filter((w) => w.id !== id));
  }, []);

  const toggleMinimize = useCallback((id: string) => {
      setWindows((prev) => {
          const activeWindow = prev.reduce((a, b) => a.zIndex > b.zIndex ? a : b, prev[0]);
          if (!activeWindow) return prev;

          return prev.map((w) => {
              if (w.id === id) {
                  // If we are minimizing the active window, we need to find the next highest window to focus.
                  if (!w.minimized && w.id === activeWindow.id) {
                      const nextHighestWindow = prev
                          .filter(win => win.id !== id && !win.minimized)
                          .sort((a,b) => b.zIndex - a.zIndex)[0];
                      if (nextHighestWindow) {
                         focusWindow(nextHighestWindow.id);
                      }
                  }
                  return { ...w, minimized: !w.minimized };
              }
              return w;
          });
      });
  }, [focusWindow]);

  const toggleMaximize = useCallback((id: string) => {
    setWindows(prev => prev.map(w => {
      if (w.id === id) {
        const isMaximized = !w.maximized;
        if (isMaximized) {
          return {
            ...w,
            maximized: true,
            originalPosition: w.position,
            originalSize: w.size,
            position: { x: 0, y: 0 },
            size: { width: window.innerWidth, height: window.innerHeight - 48 }, // 48px for taskbar
          };
        } else {
          return {
            ...w,
            maximized: false,
            position: w.originalPosition || w.position,
            size: w.originalSize || w.size,
          };
        }
      }
      return w;
    }));
  }, []);

  const updateWindowPosition = useCallback((id: string, position: { x: number; y: number }) => {
      setWindows(prev => prev.map(w => w.id === id ? { ...w, position } : w));
  }, []);
  
  const sleep = useCallback(() => {
    setIsSleeping(true);
    setTimeout(() => {
        setIsSleeping(false);
    }, 5000);
  }, []);

  const restart = useCallback(() => {
    toast({
        title: "Restarting...",
        description: "The system will restart shortly.",
    });
    setTimeout(() => {
        try {
            localStorage.clear();
        } catch(e) {
            console.error("Could not clear local storage")
        }
        window.location.reload();
    }, 3000);
  }, [toast]);

  const shutdown = useCallback(() => {
      try {
        localStorage.clear();
      } catch(e) {
        console.error("Could not clear local storage")
      }
      document.body.innerHTML = '<div style="height:100vh;width:100vw;background:black;color:white;display:flex;align-items:center;justify-content:center;">It is now safe to turn off your computer.</div>';

  }, []);


  const value = {
    windows,
    openWindow,
    closeWindow,
    focusWindow,
    toggleMinimize,
    toggleMaximize,
    updateWindowPosition,
    brightness,
    setBrightness,
    isSleeping,
    sleep,
    restart,
    shutdown
  };

  return React.createElement(WindowContext.Provider, { value: value }, children);
};
