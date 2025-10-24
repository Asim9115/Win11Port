
"use client";

const WindowsLogo = () => (
    <svg width="60" height="60" viewBox="0 0 20 20" fill="white">
        <path d="M0 0H8.75V8.75H0V0ZM11.25 0H20V8.75H11.25V0ZM0 11.25H8.75V20H0V11.25ZM11.25 11.25H20V20H11.25V11.25Z" />
    </svg>
);

const Spinner = () => (
    <div className="w-12 h-12 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
);

export default function LoadingScreen() {
    return (
        <div className="h-screen w-screen bg-black flex flex-col items-center justify-center gap-12">
            <WindowsLogo />
            <div className="absolute bottom-20">
                <Spinner />
            </div>
        </div>
    );
}
