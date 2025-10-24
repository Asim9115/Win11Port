"use client";

import type { Window as WindowType } from "@/lib/types";
import { useWindows } from "@/hooks/use-windows";
import { Card } from "@/components/ui/card";
import { useEffect, useRef, useState } from "react";
import AppRenderer from "../apps/AppRenderer";
import { cn } from "@/lib/utils";
import { Minus, Square, Copy, X } from "lucide-react";

export default function Window(props: WindowType) {
    const { id, appId, title, position, size, zIndex, minimized, maximized } = props;
    const { closeWindow, focusWindow, toggleMinimize, updateWindowPosition, toggleMaximize } = useWindows();
    
    const headerRef = useRef<HTMLDivElement>(null);
    const [isDragging, setIsDragging] = useState(false);
    const dragOffset = useRef({ x: 0, y: 0 });
    const [isClosing, setIsClosing] = useState(false);
    const [isMobile, setIsMobile] = useState(false);

    useEffect(() => {
        const checkMobile = () => setIsMobile(window.innerWidth < 768);
        checkMobile();
        window.addEventListener('resize', checkMobile);
        return () => window.removeEventListener('resize', checkMobile);
    }, []);

    useEffect(() => {
        const handleMouseMove = (e: MouseEvent) => {
            if (!isDragging || maximized || isMobile) return;
            const newX = e.clientX - dragOffset.current.x;
            const newY = e.clientY - dragOffset.current.y;
            updateWindowPosition(id, { x: newX, y: newY });
        };

        const handleMouseUp = () => {
            setIsDragging(false);
        };

        if (isDragging) {
            document.addEventListener('mousemove', handleMouseMove);
            document.addEventListener('mouseup', handleMouseUp);
        }

        return () => {
            document.removeEventListener('mousemove', handleMouseMove);
            document.removeEventListener('mouseup', handleMouseUp);
        };
    }, [isDragging, id, updateWindowPosition, maximized, isMobile]);

    const handleMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
        if (e.target !== headerRef.current && !(headerRef.current?.contains(e.target as Node))) return;
        if (maximized || isMobile) return;
        focusWindow(id);
        setIsDragging(true);
        dragOffset.current = {
            x: e.clientX - position.x,
            y: e.clientY - position.y
        };
    };
    
    const handleDoubleClick = () => {
        if (isMobile) return;
        toggleMaximize(id);
    }

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => closeWindow(id), 150);
    }

    if (minimized && !isMobile) {
        return null;
    }

    const MaximizeIcon = maximized ? Copy : Square;

    return (
        <Card
            onMouseDown={() => focusWindow(id)}
            className={cn(
                "absolute bg-card/80 backdrop-blur-xl shadow-2xl border flex flex-col transition-all duration-200 overflow-hidden data-[state=open]:animate-zoom-in data-[state=closed]:animate-zoom-out",
                isDragging ? "opacity-80" : "",
                maximized || isMobile ? "rounded-none" : "rounded-lg"
            )}
            data-state={isClosing ? 'closed' : 'open'}
            style={{
                top: isMobile ? 0 : position.y,
                left: isMobile ? 0 : position.x,
                width: isMobile ? '100%' : size.width,
                height: isMobile ? `calc(100% - 48px)` : size.height,
                zIndex,
                display: minimized ? 'none' : 'flex'
            }}
        >
            <div
                ref={headerRef}
                onMouseDown={handleMouseDown}
                onDoubleClick={handleDoubleClick}
                className={cn(
                    "h-9 flex items-center justify-between px-2 bg-background/30 flex-shrink-0", 
                    (maximized || isMobile) ? "cursor-default rounded-t-none" : "cursor-move rounded-t-lg"
                )}
            >
                <span className="text-sm font-medium pl-2">{title}</span>
                <div className="flex items-center">
                    <button onClick={() => toggleMinimize(id)} className="p-2 rounded hover:bg-accent hidden md:block"><Minus size={16} /></button>
                    <button onClick={() => toggleMaximize(id)} className="p-2 rounded hover:bg-accent hidden md:block"><MaximizeIcon size={14} /></button>
                    <button onClick={handleClose} className="p-2 rounded hover:bg-destructive/80"><X size={16} /></button>
                </div>
            </div>
            <div className="flex-grow overflow-hidden">
                <AppRenderer appId={appId} windowId={id} />
            </div>
        </Card>
    );
}
