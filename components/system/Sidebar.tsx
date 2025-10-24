"use client"

import { useWindows } from "@/hooks/use-windows";
import { START_MENU_ITEMS } from "@/lib/data.tsx";
import { cn } from "@/lib/utils";

export default function Sidebar() {
    const { openWindow, windows } = useWindows();

    // Find the currently active (top-most) window's appId
    const activeWindow = windows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current, windows[0]);
    const activeAppId = activeWindow?.appId;

    const handleItemClick = (appId: string) => {
        openWindow(appId);
    };

    return (
        <nav className="w-48 h-full bg-background/50 border-r p-2 flex-col gap-1 hidden md:flex">
            {START_MENU_ITEMS.map((item) => (
                <button
                    key={item.id}
                    onClick={() => handleItemClick(item.appId)}
                    className={cn(
                        "flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-md text-left w-full transition-colors",
                        activeAppId === item.appId 
                            ? "bg-primary/20 text-primary" 
                            : "hover:bg-accent"
                    )}
                >
                    <item.icon className="h-4 w-4" />
                    <span>{item.name}</span>
                </button>
            ))}
        </nav>
    );
}
