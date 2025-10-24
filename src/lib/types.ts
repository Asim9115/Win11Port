import type React from 'react';
import type { LucideProps } from 'lucide-react';

export type Window = {
  id: string;
  appId: string;
  title: string;
  position: { x: number; y: number };
  size: { width: number; height: number };
  zIndex: number;
  minimized: boolean;
  maximized: boolean;
  originalPosition?: { x: number; y: number };
  originalSize?: { width: number; height: number };
};

export type Project = {
  id: string;
  title: string;
  description: string;
  technologies: string[];
  link: string;
};

export type SkillCategory = {
  title: string;
  skills: string[];
};

export type Education = {
  institution: string;
  degree: string;
  period: string;
};

type BaseItem = {
    id: string;
    name: string;
    position?: { x: number; y: number };
}

export type AppItem = BaseItem & {
    icon: string;
    type: 'app';
    appId: string;
};

export type LinkItem = BaseItem & {
    icon: string;
    type: 'link';
    path: string;
};

export type DesktopItem = AppItem | LinkItem;
export type NavItem = AppItem | LinkItem;
