"use client";

import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { PERSONAL_INFO, START_MENU_ITEMS } from "@/lib/data.tsx";
import { useWindows } from "@/hooks/use-windows";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import Image from "next/image";
import type { NavItem } from "@/lib/types";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Moon, RefreshCw, Power } from "lucide-react";

const iconColors = [
    'bg-sky-500', 'bg-green-500', 'bg-amber-500', 'bg-violet-500', 
    'bg-rose-500', 'bg-cyan-500', 'bg-orange-500'
];

export default function StartMenu({ children }: { children: React.ReactNode }) {
    const { openWindow, sleep, restart, shutdown } = useWindows();

    const handleItemClick = (item: NavItem, event: React.MouseEvent) => {
        if (item.type === 'app') {
            openWindow(item.appId);
        } else if (item.type === 'link') {
            event.preventDefault();
            window.open(item.path, "_blank", "noopener noreferrer");
        }
    };

    const resumeItem = {
        name: 'CurrentResume',
        description: 'Sunday at 10:14 AM',
        icon: '/icons/file-text.svg',
        action: () => window.open(PERSONAL_INFO.resume, '_blank', 'noopener,noreferrer')
    }
    const projectsItem = {
        name: 'Recent Projects',
        description: 'August 25',
        icon: '/icons/briefcase.svg',
        action: () => openWindow('Projects')
    }

    return (
        <Popover>
            <PopoverTrigger asChild>{children}</PopoverTrigger>
            <PopoverContent side="top" align="center" className="w-full sm:w-[600px] h-full sm:h-[700px] mb-2 bg-background/80 backdrop-blur-2xl border rounded-lg shadow-2xl p-6 flex flex-col">
                <Input placeholder="Type here to search" className="bg-muted border-border focus-visible:ring-primary mb-6" />

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Pinned</h3>
                    <Button variant="ghost" size="sm">All Apps <ArrowRight size={16} className="ml-2" /></Button>
                </div>

                <div className="grid grid-cols-4 sm:grid-cols-6 gap-4 mb-8">
                    {START_MENU_ITEMS.map((item, index) => {
                        const colorClass = iconColors[index % iconColors.length];
                        return (
                            <div
                                key={item.id}
                                onClick={(e) => handleItemClick(item, e)}
                                className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer text-center"
                            >
                                <div className={`w-14 h-14 ${colorClass} flex items-center justify-center rounded-lg`}>
                                    <Image src={item.icon} alt={item.name} width={28} height={28} />
                                </div>
                                <span className="text-xs font-medium w-full break-words">{item.name}</span>
                            </div>
                        )
                    })}
                </div>

                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-semibold">Recommended</h3>
                     <Button variant="ghost" size="sm">More <ArrowRight size={16} className="ml-2" /></Button>
                </div>
                
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div onClick={resumeItem.action} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer">
                        <Image src={resumeItem.icon} alt={resumeItem.name} width={32} height={32} className="text-primary flex-shrink-0" />
                        <div>
                            <p className="font-semibold">{resumeItem.name}</p>
                            <p className="text-xs text-muted-foreground">{resumeItem.description}</p>
                        </div>
                    </div>
                     <div onClick={projectsItem.action} className="flex items-center gap-4 p-3 rounded-lg hover:bg-accent cursor-pointer">
                        <Image src={projectsItem.icon} alt={projectsItem.name} width={32} height={32} className="text-primary flex-shrink-0" />
                        <div>
                            <p className="font-semibold">{projectsItem.name}</p>
                            <p className="text-xs text-muted-foreground">{projectsItem.description}</p>
                        </div>
                    </div>
                </div>

                <div className="mt-auto flex items-center gap-3 p-3 -m-3 rounded-md hover:bg-accent">
                    <Avatar>
                        <AvatarFallback>{PERSONAL_INFO.name.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <span className="font-semibold">{PERSONAL_INFO.name}</span>
                    
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" size="icon" className="ml-auto">
                                <Power size={20} className="opacity-70" />
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end" side="top" className="mb-2 w-48">
                            <DropdownMenuItem onSelect={sleep}>
                                <Moon size={16} className="mr-2" />
                                <span>Sleep</span>
                            </DropdownMenuItem>
                             <DropdownMenuItem onSelect={restart}>
                                <RefreshCw size={16} className="mr-2" />
                                <span>Restart</span>
                            </DropdownMenuItem>
                            <DropdownMenuItem onSelect={shutdown}>
                                <Power size={16} className="mr-2" />
                                <span>Shutdown</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>
                </div>
            </PopoverContent>
        </Popover>
    );
}
