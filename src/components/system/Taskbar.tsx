
"use client";

import { useWindows } from "@/hooks/use-windows";
import { cn } from "@/lib/utils";
import Clock from "./Clock";
import StartMenu from "./StartMenu";
import Search from "./Search";
import AppIcon from "../apps/AppIcon";
import Image from "next/image";
import { PERSONAL_INFO } from "@/lib/data.tsx";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import QuickSettings from "./QuickSettings";
import { useMemo } from "react";
import { ChevronUp, Wifi, Volume2, Battery } from "lucide-react";

const TaskbarIcon = ({ children, onClick }: { children: React.ReactNode, onClick?: () => void }) => (
    <button
        onClick={onClick}
        className="relative p-2 rounded-md hover:bg-accent transition-colors flex flex-col items-center justify-center gap-1 group h-12 w-12"
    >
        {children}
    </button>
)

export default function Taskbar() {
  const { windows, focusWindow, toggleMinimize } = useWindows();

  const activeWindow = useMemo(() => {
    if (windows.length === 0) return null;
    return windows.reduce((a, b) => a.zIndex > b.zIndex ? a : b);
  }, [windows]);

  const handleTaskbarIconClick = (id: string, minimized: boolean) => {
    // If the window is currently active and not minimized, minimize it.
    if (activeWindow?.id === id && !minimized) {
      toggleMinimize(id);
    } else {
      // Otherwise, focus the window (which also un-minimizes it).
      focusWindow(id);
    }
  };

  const handleLinkClick = (url: string) => {
    window.open(url, '_blank', 'noopener,noreferrer');
  }

  return (
    <footer className="absolute bottom-0 left-0 right-0 h-12 bg-background/80 backdrop-blur-xl border-t flex justify-center items-center shadow-2xl z-50">
      <div className="flex items-center gap-1 md:gap-2">
        <StartMenu>
            <button className="p-3 rounded-md hover:bg-accent transition-colors">
                <Image src="/icons/windows.svg" alt="Start Menu" width={20} height={20} />
            </button>
        </StartMenu>
        <div className="hidden sm:block">
            <Search />
        </div>
        
        <div className="hidden sm:flex">
            <TaskbarIcon onClick={() => handleLinkClick(PERSONAL_INFO.github)}>
                <Image src="/icons/github.svg" alt="GitHub" width={24} height={24} />
            </TaskbarIcon>
            <TaskbarIcon onClick={() => handleLinkClick(PERSONAL_INFO.linkedin)}>
                <Image src="/icons/linkedin.svg" alt="LinkedIn" width={24} height={24} />
            </TaskbarIcon>
        </div>

        {windows.map((win) => (
            <button
                key={win.id}
                onClick={() => handleTaskbarIconClick(win.id, win.minimized)}
                className={cn(
                    "relative p-2 rounded-md hover:bg-accent transition-colors flex-col items-center justify-center gap-1 group h-12 w-12 hidden sm:flex",
                    activeWindow?.id === win.id && !win.minimized ? "bg-accent" : ""
                )}
            >
                <AppIcon appId={win.appId} className="h-6 w-6" />
                <div className={cn(
                    "absolute bottom-0 h-1 w-4 rounded-t-full bg-primary",
                    win.minimized ? "w-2" : "w-4",
                    activeWindow?.id === win.id && !win.minimized ? "w-6" : ""
                )}></div>
            </button>
        ))}

      </div>

      <div className="absolute right-0 flex items-center h-full">
        <Popover>
            <PopoverTrigger asChild>
                <div className="flex items-center h-full px-2 md:px-4 rounded-md hover:bg-accent cursor-pointer transition-colors">
                   <div className="hidden md:flex items-center gap-2 mr-2">
                        <ChevronUp size={16} />
                        <Wifi size={16} />
                        <Volume2 size={16} />
                        <Battery size={16} />
                    </div>
                    <Clock />
                </div>
            </PopoverTrigger>
            <PopoverContent side="top" align="end" className="w-screen sm:w-auto p-4 sm:p-0 mb-2 bg-transparent border-none shadow-none">
                <QuickSettings />
            </PopoverContent>
        </Popover>
      </div>
    </footer>
  );
}
