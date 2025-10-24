
"use client";

import Image from "next/image";

const Spinner = () => (
    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
);

export default function LoadingScreen() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center gap-12">
            <Image src="/icons/windows.svg" alt="Windows Logo" width={60} height={60} unoptimized />
            <div className="absolute bottom-20">
                <Spinner />
            </div>
        </div>
    );
}
