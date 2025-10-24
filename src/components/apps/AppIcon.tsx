import Image from "next/image";

const iconMap: Record<string, string> = {
    MyPC: '/icons/monitor.svg',
    Projects: '/icons/briefcase.svg',
    Skills: '/icons/code.svg',
    Education: '/icons/graduation-cap.svg',
    About: '/icons/user.svg',
};

export default function AppIcon({ appId, className }: { appId: string, className?: string }) {
    if (appId === "About Me") appId = "About";
    const iconSrc = iconMap[appId] || '/icons/monitor.svg';
    return <Image src={iconSrc} alt={`${appId} icon`} width={24} height={24} className={className} />;
}
