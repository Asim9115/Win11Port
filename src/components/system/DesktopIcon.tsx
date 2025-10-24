"use client";

import type { DesktopItem } from "@/lib/types";
import { useWindows } from "@/hooks/use-windows";
import { useDoubleTap } from 'use-double-tap';

const MyPCIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-monitor"><rect width="20" height="14" x="2" y="3" rx="2"/><line x1="8" x2="16" y1="21" y2="21"/><line x1="12" x2="12" y1="17" y2="21"/></svg>
)

interface DesktopIconProps {
  item: DesktopItem;
  onMouseDown: (e: React.MouseEvent<HTMLDivElement>) => void;
  onTouchStart: (e: React.TouchEvent<HTMLDivElement>) => void;
}

export default function DesktopIcon({ item, onMouseDown, onTouchStart }: DesktopIconProps) {
  const { openWindow } = useWindows();

  const handleDoubleClick = () => {
    if (item.type === "app") {
      openWindow(item.appId);
    } else if (item.type === "link") {
      window.open(item.path, "_blank", "noopener noreferrer");
    }
  };
  
  const bind = useDoubleTap(handleDoubleClick);


  const IconComponent = item.icon === 'mypc' ? MyPCIcon : item.icon;

  return (
    <div
      {...bind}
      style={{
        left: `${item.position?.x ?? 0}px`,
        top: `${item.position?.y ?? 0}px`,
      }}
      className="sm:absolute flex flex-col items-center justify-start text-center p-2 rounded-md hover:bg-accent/50 active:bg-accent/80 cursor-pointer w-[80px] h-[90px] touch-none"
      onMouseDown={onMouseDown}
      onTouchStart={onTouchStart}
      onDoubleClick={handleDoubleClick}
    >
      <IconComponent className="h-8 w-8 text-white drop-shadow-lg mb-1" />
      <span className="text-white text-xs font-medium shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">
        {item.name}
      </span>
    </div>
  );
}
