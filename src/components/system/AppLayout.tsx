"use client"

import Sidebar from "./Sidebar";
import AppToolbar from "./AppToolbar";

export default function AppLayout({ children }: { children: React.ReactNode }) {
    return (
        <div className="flex h-full w-full">
            <Sidebar />
            <div className="flex-grow flex flex-col overflow-hidden">
                <AppToolbar />
                <div className="flex-grow p-4 overflow-auto">
                    {children}
                </div>
            </div>
        </div>
    )
}
