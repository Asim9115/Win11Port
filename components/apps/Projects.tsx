"use client";

import { Card, CardHeader, CardTitle, CardDescription, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { PROJECTS } from "@/lib/data.tsx";
import Image from "next/image";
import type { Project } from "@/lib/types";
import { useAppView } from "@/hooks/use-app-history";

function FolderView({ onOpen }: { onOpen: (project: Project) => void }) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {PROJECTS.map((project) => (
                 <div 
                    key={project.id}
                    onDoubleClick={() => onOpen(project)}
                    className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer text-center"
                >
                    <Image src="/icons/folder.svg" alt="Folder" width={48} height={48} className="text-primary" />
                    <span className="text-xs break-words w-full">{project.title}</span>
                </div>
            ))}
        </div>
    );
}

function ProjectDetailView({ project }: { project: Project; }) {
    return (
        <Card key={project.id} className="bg-transparent border-0 shadow-none">
            <CardHeader>
                <CardTitle className="flex items-center justify-between">
                    {project.title}
                    <Button variant="ghost" size="icon" asChild>
                        <a href={project.link} target="_blank" rel="noopener noreferrer">
                            <Image src="/icons/arrow-up-right.svg" alt="Open project" width={16} height={16} />
                        </a>
                    </Button>
                </CardTitle>
                <CardDescription>{project.description}</CardDescription>
            </CardHeader>
            <CardContent>
                <div className="flex flex-wrap gap-2">
                    {project.technologies.map((tech) => (
                        <Badge key={tech} variant="secondary">{tech}</Badge>
                    ))}
                </div>
            </CardContent>
        </Card>
    );
}


export default function Projects() {
    const { currentView, navigate } = useAppView('Projects');

    if (currentView.path !== 'Home') {
        const projectId = currentView.path.split('/')[1];
        const project = PROJECTS.find(p => p.id === projectId);
        if (project) {
            return <ProjectDetailView project={project} />;
        }
    }

    return <FolderView onOpen={(project) => navigate(project.title, `Home/${project.id}`)} />;
}
