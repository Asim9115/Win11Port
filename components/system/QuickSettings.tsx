"use client";

import { Wifi, Bluetooth, Moon, Sun, Volume2, Settings, BatteryFull, Plane, Accessibility, MapPin, Shield, ScreenShare, ChevronRight } from 'lucide-react';
import { Card, CardContent, CardFooter } from '@/components/ui/card';
import { Slider } from '@/components/ui/slider';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';
import { Separator } from '../ui/separator';
import { useWindows } from '@/hooks/use-windows';
import { useState } from 'react';
import { useTheme } from '@/hooks/use-theme';

const QuickSettingButton = ({ icon: Icon, label, active = false, ...props }: { icon: React.ElementType, label: string, active?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
    <div 
        className={cn(
            "flex flex-col items-center justify-center text-center p-2 rounded-lg cursor-pointer transition-colors w-full h-[72px] gap-1",
            active ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
        )}
        {...props}
    >
        <Icon className="h-5 w-5" />
        <span className="text-xs font-medium">{label}</span>
    </div>
);

const QuickSettingDropdownButton = ({ icon: Icon, label, active = false, ...props }: { icon: React.ElementType, label: string, active?: boolean } & React.HTMLAttributes<HTMLDivElement>) => (
    <div className={cn(
        "flex items-center text-left p-1 rounded-lg cursor-pointer transition-colors text-sm w-full",
        active ? 'bg-primary text-primary-foreground' : 'bg-secondary hover:bg-secondary/80'
    )}
    {...props}
    >
        <div className="p-2 rounded-md">
            <Icon className="h-4 w-4" />
        </div>
        <span className="ml-2 font-medium">{label}</span>
        <ChevronRight className="h-4 w-4 ml-auto text-muted-foreground" />
    </div>
);

export default function QuickSettings() {
    const { brightness, setBrightness } = useWindows();
    const { theme, setTheme } = useTheme();
    const [volume, setVolume] = useState(50);
    const [toggles, setToggles] = useState({
        wifi: true,
        bluetooth: true,
        airplane: false,
        batterySaver: false,
        accessibility: false,
        location: true,
        cast: false,
        security: false,
    });

    const handleToggle = (key: keyof typeof toggles) => {
        setToggles(prev => ({ ...prev, [key]: !prev[key] }));
    };

    const toggleTheme = () => {
        setTheme(theme === 'dark' ? 'light' : 'dark');
    }

    return (
        <div className="w-full sm:w-[448px] flex flex-col gap-2">
            <Card className="w-full bg-card/80 backdrop-blur-xl border-border p-6 shadow-2xl rounded-xl">
                 <p className="text-center text-muted-foreground text-sm">No new notifications</p>
            </Card>

            <Card className="w-full bg-card/80 backdrop-blur-xl border-border p-0 shadow-2xl rounded-xl overflow-hidden">
                <CardContent className="p-4">
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <div className="col-span-2 grid grid-cols-2 gap-2">
                            <QuickSettingDropdownButton icon={Wifi} label="Wi-Fi" active={toggles.wifi} onClick={() => handleToggle('wifi')} />
                            <QuickSettingDropdownButton icon={Bluetooth} label="Bluetooth" active={toggles.bluetooth} onClick={() => handleToggle('bluetooth')} />
                        </div>
                        <QuickSettingButton icon={Plane} label="Airplane Mode" active={toggles.airplane} onClick={() => handleToggle('airplane')} />

                        <QuickSettingButton icon={BatteryFull} label="Battery saver" active={toggles.batterySaver} onClick={() => handleToggle('batterySaver')} />
                        <QuickSettingButton icon={Accessibility} label="Accessibility" active={toggles.accessibility} onClick={() => handleToggle('accessibility')} />
                        
                        <QuickSettingButton 
                            icon={theme === 'dark' ? Moon : Sun} 
                            label={theme === 'dark' ? "Dark mode" : "Light mode"}
                            active
                            onClick={toggleTheme}
                        />

                        <QuickSettingButton icon={MapPin} label="Location" active={toggles.location} onClick={() => handleToggle('location')} />
                        <QuickSettingButton icon={ScreenShare} label="Cast" active={toggles.cast} onClick={() => handleToggle('cast')} />
                        <QuickSettingButton icon={Shield} label="Security" active={toggles.security} onClick={() => handleToggle('security')} />
                    </div>

                    <div className="space-y-5 px-2">
                        <div className="flex items-center gap-3">
                            <Sun className="h-5 w-5" />
                            <Slider value={[brightness]} onValueChange={(value) => setBrightness(value[0])} max={100} step={1} />
                        </div>
                        <div className="flex items-center gap-3">
                            <Volume2 className="h-5 w-5" />
                            <Slider value={[volume]} onValueChange={(value) => setVolume(value[0])} max={100} step={1} />
                        </div>
                    </div>
                </CardContent>
                
                <Separator/>

                <CardFooter className="p-2 flex items-center justify-between text-sm bg-black/5">
                     <div className="flex items-center gap-2 p-2">
                         <BatteryFull className="h-5 w-5 text-primary" />
                         <span className="font-semibold">98%</span>
                    </div>
                    <Button variant="ghost" size="icon">
                        <Settings className="h-5 w-5" />
                    </Button>
                </CardFooter>
            </Card>
        </div>
    );
}