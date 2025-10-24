"use client";

import { Badge } from "@/components/ui/badge";
import { SKILLS } from "@/lib/data.tsx";
import Image from "next/image";
import type { SkillCategory } from "@/lib/types";
import { useAppView } from "@/hooks/use-app-history";

function FolderView({ onOpen }: { onOpen: (category: SkillCategory) => void }) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {SKILLS.map((category) => (
                 <div 
                    key={category.title}
                    onDoubleClick={() => onOpen(category)}
                    className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer text-center"
                >
                    <Image src="/icons/folder.svg" alt="Folder" width={48} height={48} className="text-primary" />
                    <span className="text-xs break-words w-full">{category.title}</span>
                </div>
            ))}
        </div>
    );
}

function SkillsDetailView({ category }: { category: SkillCategory; }) {
     return (
        <div>
            <h3 className="text-lg font-semibold mb-2 text-primary">{category.title}</h3>
            <div className="flex flex-wrap gap-2">
                {category.skills.map((skill) => (
                    <Badge key={skill} variant="default" className="text-sm py-1 px-3 bg-primary/20 text-primary hover:bg-primary/30">
                        {skill}
                    </Badge>
                ))}
            </div>
        </div>
    );
}


export default function Skills() {
    const { currentView, navigate } = useAppView('Skills');

    if (currentView.path !== 'Home') {
        const categoryTitle = currentView.path.split('/')[1];
        const category = SKILLS.find(s => s.title === categoryTitle);
        if (category) {
            return <SkillsDetailView category={category} />;
        }
    }

    return <FolderView onOpen={(category) => navigate(category.title, `Home/${category.title}`)} />;
}
