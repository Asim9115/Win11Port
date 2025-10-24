"use client";

import Image from "next/image";
import { PlaceHolderImages } from "@/lib/placeholder-images";
import DesktopIcon from "./DesktopIcon";
import { useDesktop } from "@/hooks/use-desktop";
import { useRef, useState, useEffect } from 'react';

export default function Desktop() {
  const wallpaper = PlaceHolderImages.find((img) => img.id === "wallpaper");
  const { icons, updateIconPosition } = useDesktop();

  const [dragging, setDragging] = useState<string | null>(null);
  const desktopRef = useRef<HTMLDivElement>(null);
  const dragOffset = useRef({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent | TouchEvent) => {
      if (!dragging) return;
      
      const desktopRect = desktopRef.current?.getBoundingClientRect();
      if (!desktopRect) return;

      const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
      const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;

      const newX = clientX - desktopRect.left - dragOffset.current.x;
      const newY = clientY - desktopRect.top - dragOffset.current.y;

      updateIconPosition(dragging, { x: newX, y: newY });
    };

    const handleMouseUp = () => {
      setDragging(null);
    };
    
    const handleTouchEnd = () => {
      setDragging(null);
    };

    if (dragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      document.addEventListener('touchmove', handleMouseMove);
      document.addEventListener('touchend', handleTouchEnd);
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove);
      document.removeEventListener('mouseup', handleMouseUp);
      document.removeEventListener('touchmove', handleMouseMove);
      document.removeEventListener('touchend', handleTouchEnd);
    };
  }, [dragging, updateIconPosition]);


  const handleIconMouseDown = (id: string, e: React.MouseEvent<HTMLDivElement> | React.TouchEvent<HTMLDivElement>) => {
    const icon = icons.find(i => i.id === id);
    const iconRect = e.currentTarget.getBoundingClientRect();
    const desktopRect = desktopRef.current?.getBoundingClientRect();

    if (!icon || !desktopRect) return;
    
    setDragging(id);
    const clientX = 'touches' in e ? e.touches[0].clientX : e.clientX;
    const clientY = 'touches' in e ? e.touches[0].clientY : e.clientY;
    
    dragOffset.current = {
      x: clientX - iconRect.left,
      y: clientY - iconRect.top
    };
  };

  return (
    <div className="absolute inset-0 h-full w-full" ref={desktopRef}>
      {wallpaper && (
        <Image
          src={wallpaper.imageUrl}
          alt={wallpaper.description}
          fill
          quality={100}
          className="object-cover"
          data-ai-hint={wallpaper.imageHint}
          priority
        />
      )}
      <div className="relative w-full h-full p-2 grid grid-cols-4 sm:grid-cols-none sm:block">
        {icons.map((item) => (
          <DesktopIcon 
            key={item.id} 
            item={item} 
            onMouseDown={(e) => handleIconMouseDown(item.id, e)}
            onTouchStart={(e) => handleIconMouseDown(item.id, e)}
          />
        ))}
      </div>
    </div>
  );
}
