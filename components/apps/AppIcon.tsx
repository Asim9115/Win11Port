import { Briefcase, Code, GraduationCap, Monitor, User, type LucideProps } from "lucide-react";
import type { ForwardRefExoticComponent, RefAttributes } from 'react';

type IconComponent = ForwardRefExoticComponent<Omit<LucideProps, "ref"> & RefAttributes<SVGSVGElement>>;

const iconMap: Record<string, IconComponent> = {
    MyPC: Monitor,
    Projects: Briefcase,
    Skills: Code,
    Education: GraduationCap,
    About: User,
};

export default function AppIcon({ appId, className }: { appId: string, className?: string }) {
    if (appId === "About Me") appId = "About";
    const Icon = iconMap[appId] || Monitor;
    return <Icon className={className} />;
}
