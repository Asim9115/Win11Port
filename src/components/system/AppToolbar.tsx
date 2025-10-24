"use client";

import React from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { useAppHistory } from "@/hooks/use-app-history";
import { useWindows } from "@/hooks/use-windows";
import { Home, ArrowLeft, ArrowRight, ArrowUp, RefreshCw } from "lucide-react";
import Image from "next/image";

export default function AppToolbar() {
    const { windows } = useWindows();
    const activeWindow = windows.reduce((prev, current) => (prev.zIndex > current.zIndex) ? prev : current, windows[0]);
    const { history, back, forward, up, canGoBack, canGoForward, canGoUp } = useAppHistory(activeWindow?.id);

    const breadcrumbs = history.at(-1)?.path.split('/').filter(Boolean) || ['Home'];
    
    return (
        <div className="flex-shrink-0 h-14 flex items-center px-2 md:px-4 gap-1 md:gap-2 border-b bg-background/30">
            <div className="flex items-center gap-1">
                <Button variant="ghost" size="icon" onClick={back} disabled={!canGoBack}><ArrowLeft size={20} /></Button>
                <Button variant="ghost" size="icon" onClick={forward} disabled={!canGoForward}><ArrowRight size={20} /></Button>
                <Button variant="ghost" size="icon" onClick={up} disabled={!canGoUp}><ArrowUp size={20} /></Button>
                <Button variant="ghost" size="icon" className="hidden md:inline-flex"><RefreshCw size={20} /></Button>
            </div>
            <div className="flex-grow flex items-center ml-2 md:ml-4 overflow-hidden">
                 <Button variant="ghost" size="icon" className="mr-2">
                    <Home size={20} />
                </Button>
                 <div className="hidden md:flex items-center gap-1 text-sm font-medium truncate">
                    {breadcrumbs.map((crumb, index) => (
                        <React.Fragment key={index}>
                            <span>&gt;</span>
                            <span className="px-2 py-1 rounded hover:bg-accent cursor-pointer truncate">{crumb}</span>
                        </React.Fragment>
                    ))}
                </div>
            </div>
             <div className="relative w-32 md:w-64">
                <Image src="/icons/search.svg" alt="Search" width={16} height={16} className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
                <Input placeholder="Search" className="bg-muted pl-9" />
            </div>
        </div>
    );
}
