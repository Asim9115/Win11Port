import type { Project, SkillCategory, Education, NavItem, DesktopItem } from "@/lib/types";
import React from 'react';
import { Briefcase, Code, GraduationCap, Mail, Github, Linkedin, FileText, User, Monitor } from "lucide-react";

const YouTubeIcon = (props: React.SVGProps<SVGSVGElement>) => (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 28 28" fill="currentColor" {...props}>
        <path d="M27.5,7.58c-0.27-1-1.04-1.78-2.04-2.05C23.58,5,14,5,14,5s-9.58,0-11.46,0.53 c-1,0.27-1.77,1.05-2.04,2.05C0,9.45,0,14,0,14s0,4.55,0.5,6.42c0.27,1,1.04,1.78,2.04,2.05C4.42,23,14,23,14,23 s9.58,0,11.46-0.53c1-0.27,1.77-1.05,2.04-2.05C28,18.55,28,14,28,14S28,9.45,27.5,7.58z M11.2,18.4V9.6l7.6,4.4L11.2,18.4z" />
    </svg>
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
