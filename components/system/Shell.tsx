
"use client";

import { WindowProvider, useWindows } from '@/hooks/use-windows';
import { DesktopProvider } from '@/hooks/use-desktop';
import Desktop from '@/components/system/Desktop';
import Taskbar from '@/components/system/Taskbar';
import Window from '@/components/system/Window';
import { cn } from '@/lib/utils';
import LoadingScreen from './LoadingScreen';
import { useState, useEffect } from 'react';

function WindowRenderer() {
  const { windows } = useWindows();
  return (
    <>
      {windows.map(window => (
        <Window key={window.id} {...window} />
      ))}
    </>
  );
}

function ShellComponent() {
    const { brightness, isSleeping } = useWindows();

    return (
        <main 
            className="h-screen w-screen overflow-hidden font-sans relative"
        >
            <div 
                className="h-full w-full transition-all duration-300"
                style={{ filter: `brightness(${brightness}%)`}}
            >
                <Desktop />
            </div>
            <WindowRenderer />
            <Taskbar />
             <div className={cn(
                "absolute inset-0 bg-black transition-opacity duration-1000 z-[100]",
                isSleeping ? "opacity-100" : "opacity-0 pointer-events-none"
            )}></div>
        </main>
    )
}

export default function Shell() {
  return (
    <WindowProvider>
      <DesktopProvider>
        <ShellComponent />
      </DesktopProvider>
    </WindowProvider>
  );
}
