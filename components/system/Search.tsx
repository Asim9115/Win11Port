"use client";

import { useState } from "react";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Input } from "@/components/ui/input";
import Image from "next/image";
import { PROJECTS, SKILLS } from "@/lib/data.tsx";
import { useWindows } from "@/hooks/use-windows";

export default function Search() {
    const [query, setQuery] = useState("");
    const { openWindow } = useWindows();

    const allSkills = SKILLS.flatMap(category => category.skills.map(skill => ({ name: skill, type: 'skill' })));
    const allProjects = PROJECTS.map(project => ({ name: project.title, type: 'project' }));
    
    const searchables = [...allProjects, ...allSkills];

    const filteredResults = query
        ? searchables.filter(item => item.name.toLowerCase().includes(query.toLowerCase()))
        : [];
    
    const handleResultClick = (type: 'project' | 'skill') => {
        if(type === 'project') openWindow('Projects');
        if(type === 'skill') openWindow('Skills');
    }

    return (
        <Popover>
            <PopoverTrigger asChild>
                <button className="p-3 rounded-md hover:bg-accent transition-colors">
                    <Image src="/icons/search.svg" alt="Search" width={20} height={20} />
                </button>
            </PopoverTrigger>
            <PopoverContent side="top" align="center" className="w-[500px] h-auto max-h-[600px] mb-2 bg-background/70 backdrop-blur-xl border rounded-lg shadow-2xl p-4 flex flex-col gap-4">
                <Input 
                    placeholder="Type to search..." 
                    className="bg-muted border-border placeholder:text-muted-foreground/80"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                />
                {query && (
                     <div className="flex flex-col gap-2 overflow-y-auto">
                        {filteredResults.length > 0 ? (
                            filteredResults.map((result, index) => (
                                <div key={index} onClick={() => handleResultClick(result.type as 'project' | 'skill')} className="flex items-center gap-3 p-2 rounded-md hover:bg-accent cursor-pointer">
                                    {result.type === 'project' ? <Image src="/icons/briefcase.svg" alt="Project" width={20} height={20} className="text-accent-foreground" /> : <Image src="/icons/code.svg" alt="Skill" width={20} height={20} className="text-accent-foreground"/>}
                                    <span className="font-medium">{result.name}</span>
                                    <span className="ml-auto text-xs text-muted-foreground capitalize">{result.type}</span>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-muted-foreground py-4">No results found.</p>
                        )}
                    </div>
                )}
            </PopoverContent>
        </Popover>
    );
}
