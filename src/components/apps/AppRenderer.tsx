import MyPC from "./MyPC";
import Projects from "./Projects";
import Skills from "./Skills";
import Education from "./Education";
import { PERSONAL_INFO } from "@/lib/data.tsx";
import AppLayout from "../system/AppLayout";
import { AppHistoryProvider } from "@/hooks/use-app-history";

const appMap: Record<string, React.ComponentType> = {
  MyPC,
  Projects,
  Skills,
  Education,
};

function About() {
    return (
        <div className="space-y-4">
            <h2 className="text-2xl font-bold text-primary">{PERSONAL_INFO.name}</h2>
            <p className="text-lg text-muted-foreground">{PERSONAL_INFO.title}</p>
            <p>
                Welcome to my portfolio! I'm a passionate developer with a knack for creating beautiful and functional web applications. This portfolio is a showcase of my work and skills, built to look and feel like Windows 11. Explore my projects, check out my skills, and feel free to get in touch!
            </p>
        </div>
    )
}
appMap['About'] = About;


export default function AppRenderer({ appId, windowId }: { appId: string, windowId: string }) {
  const AppComponent = appMap[appId];

  if (!AppComponent) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-destructive">Error: App "{appId}" not found.</p>
      </div>
    );
  }

  return (
    <AppHistoryProvider windowId={windowId} appId={appId}>
        <AppLayout>
            <AppComponent />
        </AppLayout>
    </AppHistoryProvider>
  );
}
