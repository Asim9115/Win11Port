import type { Project, SkillCategory, Education, NavItem, DesktopItem } from "@/lib/types";
import React from 'react';
import { Briefcase, Code, GraduationCap, Mail, Github, Linkedin, FileText, User, Monitor } from "lucide-react";
import Image from "next/image";
import Win11 from "@public/win11.png";
const YouTubeIcon = (props: React.HTMLAttributes<HTMLImageElement>) => (
  <Image
    src={Win11}
    alt="YouTube"
    width={28}    // adjust size as needed
    height={28}
    {...props}    // optional: to allow passing className, style, etc.
  />
);

const LeetCodeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" {...props}>
        <path d="M21.23,8.35,14.54,4.2a2.83,2.83,0,0,0-2.83,0l-6.68,4.15a2.83,2.83,0,0,0-1.42,2.45V14.1a2.83,2.83,0,0,0,1.42,2.45l6.68,4.15a2.83,2.83,0,0,0,2.83,0l6.68-4.15a2.83,2.83,0,0,0,1.42-2.45V10.8A2.83,2.83,0,0,0,21.23,8.35ZM12.11,18.88,6.86,15.65V12l5.25-3.26L17.36,12v3.68Z" />
    </svg>
);


export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Full Stack Developer",
  linkedin: "https://www.linkedin.com/in/your-username",
  github: "https://github.com/your-username",
  email: "your.email@example.com",
  resume: "/resume.pdf",
};

export const DESKTOP_ITEMS: DesktopItem[] = [
  { id: 'mypc', name: 'This PC', icon: 'mypc', type: 'app', appId: 'MyPC' },
  { id: 'resume', name: 'Resume.pdf', icon: FileText, type: 'link', path: PERSONAL_INFO.resume },
  { id: 'skills', name: 'Skills', icon: Code, type: 'app', appId: 'Skills' },
  { id: 'projects', name: 'Projects', icon: Briefcase, type: 'app', appId: 'Projects' },
  { id: 'linkedin', name: 'LinkedIn', icon: Linkedin, type: 'link', path: PERSONAL_INFO.linkedin },
  { id: 'github', name: 'GitHub', icon: Github, type: 'link', path: PERSONAL_INFO.github },
  { id: 'email', name: 'Email Me', icon: Mail, type: 'link', path: `mailto:${PERSONAL_INFO.email}` },
];

export const PROJECTS: Project[] = [
  {
    id: "project-1",
    title: "E-commerce Platform",
    description: "A full-featured e-commerce platform with a modern UI, product management, and payment integration.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "Stripe"],
    link: "#",
  },
  {
    id: "project-2",
    title: "Task Management App",
    description: "A collaborative task management tool with real-time updates and a drag-and-drop interface.",
    technologies: ["React", "Firebase", "Zustand"],
    link: "#",
  },
  {
    id: "project-3",
    title: "Portfolio Website",
    description: "This very portfolio website, built to resemble the Windows 11 operating system.",
    technologies: ["Next.js", "TypeScript", "Tailwind CSS", "ShadCN UI"],
    link: "#",
  },
];

export const SKILLS: SkillCategory[] = [
  {
    title: "Frontend",
    skills: ["React", "Next.js", "TypeScript", "JavaScript (ES6+)", "HTML5", "CSS3", "Tailwind CSS"],
  },
  {
    title: "Backend",
    skills: ["Node.js", "Express", "Firebase", "PostgreSQL", "REST APIs"],
  },
  {
    title: "Tools & Others",
    skills: ["Git", "GitHub", "Docker", "Webpack", "Vite", "Figma"],
  },
];

export const EDUCATION: Education[] = [
  {
    institution: "University of Technology",
    degree: "Bachelor of Science in Computer Science",
    period: "2018 - 2022",
  },
  {
    institution: "Code Academy",
    degree: "Full Stack Web Development Bootcamp",
    period: "2022",
  },
];

export const START_MENU_ITEMS: NavItem[] = [
    { id: 'mypc', name: 'This PC', icon: Monitor, type: 'app', appId: 'MyPC' },
    { id: 'projects', name: 'Projects', icon: Briefcase, type: 'app', appId: 'Projects' },
    { id: 'skills', name: 'Skills', icon: Code, type: 'app', appId: 'Skills' },
    { id: 'education', name: 'Education', icon: GraduationCap, type: 'app', appId: 'Education' },
    { id: 'about', name: 'About Me', icon: User, type: 'app', appId: 'About' },
    { id: 'youtube', name: 'YouTube', icon: YouTubeIcon, type: 'link', path: 'https://youtube.com' },
    { id: 'leetcode', name: 'LeetCode', icon: LeetCodeIcon, type: 'link', path: 'https://leetcode.com' },
];

export const MY_PC_ITEMS = [
    { id: 'projects', name: 'Projects', icon: Briefcase, type: 'app', appId: 'Projects' },
    { id: 'skills', name: 'Skills', icon: Code, type: 'app', appId: 'Skills' },
    { id: 'education', name: 'Education', icon: GraduationCap, type: 'app', appId: 'Education' },
]
