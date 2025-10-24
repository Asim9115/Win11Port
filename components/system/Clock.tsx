
"use client";

import { useState, useEffect } from "react";

export default function Clock() {
  const [time, setTime] = useState<Date | null>(null);

  useEffect(() => {
    setTime(new Date());
    const timer = setInterval(() => {
      setTime(new Date());
    }, 60000); // Update every minute

    return () => {
      clearInterval(timer);
    };
  }, []);

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: "numeric", minute: "2-digit" });
  };

  const formatDate = (date: Date) => {
    return date.toLocaleDateString([], {
      month: "numeric",
      day: "numeric",
      year: "numeric",
    });
  };

  if (!time) {
    return (
        <div className="text-xs text-right h-[38px] w-[88px]">
            <div className="h-4"></div>
            <div className="h-4"></div>
        </div>
    );
  }

  return (
    <div className="text-xs text-right">
      <div>{formatTime(time)}</div>
      <div>{formatDate(time)}</div>
    </div>
  );
}
