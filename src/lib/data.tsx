import type { Project, SkillCategory, Education, NavItem, DesktopItem } from "@/lib/types";

export const PERSONAL_INFO = {
  name: "Your Name",
  title: "Full Stack Developer",
  linkedin: "https://www.linkedin.com/in/your-username",
  github: "https://github.com/your-username",
  email: "your.email@example.com",
  resume: "/resume.pdf",
};

export const DESKTOP_ITEMS: DesktopItem[] = [
  { id: 'mypc', name: 'This PC', icon: '/icons/mypc.svg', type: 'app', appId: 'MyPC' },
  { id: 'resume', name: 'Resume.pdf', icon: '/icons/file-text.svg', type: 'link', path: PERSONAL_INFO.resume },
  { id: 'skills', name: 'Skills', icon: '/icons/code.svg', type: 'app', appId: 'Skills' },
  { id: 'projects', name: 'Projects', icon: '/icons/briefcase.svg', type: 'app', appId: 'Projects' },
  { id: 'linkedin', name: 'LinkedIn', icon: '/icons/linkedin.svg', type: 'link', path: PERSONAL_INFO.linkedin },
  { id: 'github', name: 'GitHub', icon: '/icons/github.svg', type: 'link', path: PERSONAL_INFO.github },
  { id: 'email', name: 'Email Me', icon: '/icons/mail.svg', type: 'link', path: `mailto:${PERSONAL_INFO.email}` },
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
    { id: 'mypc', name: 'This PC', icon: '/icons/monitor.svg', type: 'app', appId: 'MyPC' },
    { id: 'projects', name: 'Projects', icon: '/icons/briefcase.svg', type: 'app', appId: 'Projects' },
    { id: 'skills', name: 'Skills', icon: '/icons/code.svg', type: 'app', appId: 'Skills' },
    { id: 'education', name: 'Education', icon: '/icons/graduation-cap.svg', type: 'app', appId: 'Education' },
    { id: 'about', name: 'About Me', icon: '/icons/user.svg', type: 'app', appId: 'About' },
    { id: 'youtube', name: 'YouTube', icon: '/icons/youtube.svg', type: 'link', path: 'https://youtube.com' },
    { id: 'leetcode', name: 'LeetCode', icon: '/icons/leetcode.svg', type: 'link', path: 'https://leetcode.com' },
];

export const MY_PC_ITEMS = [
    { id: 'projects', name: 'Projects', icon: '/icons/briefcase.svg', type: 'app', appId: 'Projects' },
    { id: 'skills', name: 'Skills', icon: '/icons/code.svg', type: 'app', appId: 'Skills' },
    { id: 'education', name: 'Education', icon: '/icons/graduation-cap.svg', type: 'app', appId: 'Education' },
]
