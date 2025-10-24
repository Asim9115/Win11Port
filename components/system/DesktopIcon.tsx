"use client";

import type { DesktopItem } from "@/lib/types";
import { useWindows } from "@/hooks/use-windows";
import { useDoubleTap } from 'use-double-tap';
import Image from "next/image";

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
      <Image src={item.icon} alt={item.name} width={32} height={32} className="drop-shadow-lg mb-1" />
      <span className="text-white text-xs font-medium shadow-black [text-shadow:0_1px_2px_var(--tw-shadow-color)]">
        {item.name}
      </span>
    </div>
  );
}
