"use client";

import { GraduationCap, Folder } from "lucide-react";
import type { Education as EducationType } from "@/lib/types";
import { EDUCATION } from "@/lib/data.tsx";
import { useAppView } from "@/hooks/use-app-history";

function FolderView({ onOpen }: { onOpen: (edu: EducationType) => void }) {
    return (
        <div className="grid grid-cols-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
            {EDUCATION.map((edu, index) => (
                 <div 
                    key={index}
                    onDoubleClick={() => onOpen(edu)}
                    className="flex flex-col items-center gap-2 p-2 rounded-md hover:bg-accent cursor-pointer text-center"
                >
                    <Folder className="h-12 w-12 text-primary" />
                    <span className="text-xs break-words w-full">{edu.institution}</span>
                </div>
            ))}
        </div>
    );
}

function EducationDetailView({ edu }: { edu: EducationType; }) {
    return (
        <div className="flex gap-4">
            <div className="mt-1">
                <GraduationCap className="h-6 w-6 text-primary" />
            </div>
            <div>
                <h3 className="font-semibold">{edu.institution}</h3>
                <p className="text-sm text-muted-foreground">{edu.degree}</p>
                <p className="text-xs text-muted-foreground">{edu.period}</p>
            </div>
        </div>
    );
}

export default function Education() {
    const { currentView, navigate } = useAppView('Education');
    
    if (currentView.path !== 'Home') {
        const institution = currentView.path.split('/')[1];
        const edu = EDUCATION.find(e => e.institution === institution);
        if (edu) {
            return <EducationDetailView edu={edu} />;
        }
    }

    return <FolderView onOpen={(edu) => navigate(edu.institution, `Home/${edu.institution}`)} />;
}
