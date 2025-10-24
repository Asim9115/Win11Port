import type { DesktopItem } from "@/lib/types";
import React, { createContext, useContext, useState, useCallback, useEffect } from "react";
import { DESKTOP_ITEMS } from "@/lib/data.tsx";

const getInitialIconPositions = () => {
    if (typeof window !== 'undefined' && window.innerWidth < 640) {
        return DESKTOP_ITEMS.map((item) => ({ ...item, position: undefined }));
    }
    return DESKTOP_ITEMS.map((item, index) => ({
        ...item,
        position: {
            x: 20,
            y: 20 + index * 100,
        }
    }));
};

type DesktopContextType = {
  icons: DesktopItem[];
  updateIconPosition: (id: string, position: { x: number; y: number }) => void;
};

const DesktopContext = createContext<DesktopContextType | null>(null);

export const useDesktop = () => {
  const context = useContext(DesktopContext);
  if (!context) {
    throw new Error("useDesktop must be used within a DesktopProvider");
  }
  return context;
};

export const DesktopProvider = ({ children }: { children: React.ReactNode }) => {
  const [icons, setIcons] = useState<DesktopItem[]>([]);
  
  useEffect(() => {
     if (typeof window !== 'undefined') {
        try {
            const storedIcons = localStorage.getItem('desktopIcons');
            if (storedIcons) {
                const parsedIcons = JSON.parse(storedIcons) as DesktopItem[];
                // Re-assign the icon component from the original data source
                // as functions can't be serialized in JSON.
                const hydratedIcons = parsedIcons.map(icon => {
                    const originalIcon = DESKTOP_ITEMS.find(item => item.id === icon.id);
                    return { ...icon, icon: originalIcon ? originalIcon.icon : null };
                }).filter(icon => icon.icon !== null);
                setIcons(hydratedIcons);
            } else {
                setIcons(getInitialIconPositions());
            }
        } catch (error) {
            console.error("Failed to parse icons from localStorage", error);
            setIcons(getInitialIconPositions());
        }
     }
  }, []);

  useEffect(() => {
    if (icons.length > 0 && typeof window !== 'undefined') {
        try {
            localStorage.setItem('desktopIcons', JSON.stringify(icons));
        } catch (error) {
            console.error("Failed to save icons to localStorage", error);
        }
    }
  }, [icons]);
  
  useEffect(() => {
    const handleResize = () => {
        if (typeof window === 'undefined') return;
        const isMobile = window.innerWidth < 640;
        const isCurrentlyDesktop = icons.some(icon => icon.position !== undefined);

        if (isMobile && isCurrentlyDesktop) {
             setIcons(prevIcons => prevIcons.map(icon => ({...icon, position: undefined})));
        } else if (!isMobile && !isCurrentlyDesktop) {
            setIcons(getInitialIconPositions());
        }
    };
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, [icons]);

  const updateIconPosition = useCallback((id: string, position: { x: number; y: number }) => {
    setIcons(prev => 
        prev.map(icon => icon.id === id ? { ...icon, position } : icon)
    );
  }, []);

  const value = {
    icons,
    updateIconPosition,
  };

  return React.createElement(DesktopContext.Provider, { value }, children);
};
