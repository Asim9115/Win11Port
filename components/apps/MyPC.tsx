"use client"

import { MY_PC_ITEMS } from "@/lib/data.tsx";
import { useAppView } from "@/hooks/use-app-history";
import Image from "next/image";
import { Progress } from "@/components/ui/progress";
import { useEffect, useState } from "react";

interface DriveInfo {
    totalStorage: number;
    usedStorage: number;
    freeStorage: number;
    usagePercentage: number;
}

export default function MyPC() {
    const { open } = useAppView('MyPC');
    const [driveInfo, setDriveInfo] = useState<Record<string, DriveInfo>>({});

    useEffect(() => {
        const newDriveInfo: Record<string, DriveInfo> = {};
        MY_PC_ITEMS.forEach(item => {
            const totalStorage = Math.floor(Math.random() * (512 - 128 + 1)) + 128;
            const usedStorage = Math.floor(Math.random() * (totalStorage * 0.8 - totalStorage * 0.2 + 1)) + (totalStorage * 0.2);
            const freeStorage = totalStorage - usedStorage;
            const usagePercentage = (usedStorage / totalStorage) * 100;
            newDriveInfo[item.id] = { totalStorage, usedStorage, freeStorage, usagePercentage };
        });
        setDriveInfo(newDriveInfo);
    }, []);

    return (
        <div className="p-2 space-y-6">
             <div>
                <h2 className="text-sm font-medium text-muted-foreground px-2 mb-2">Devices and drives ({MY_PC_ITEMS.length})</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {MY_PC_ITEMS.map((item) => {
                        const info = driveInfo[item.id];
                        if (!info) {
                            return (
                                 <div key={item.id} className="flex items-center gap-4 p-3 rounded-md">
                                    <Image src="/icons/hard-drive.svg" alt="Hard drive" width={40} height={40} className="text-primary flex-shrink-0"/>
                                    <div className="w-full overflow-hidden">
                                         <span className="font-semibold text-sm truncate">{item.name}</span>
                                         <div className="h-2 my-1 bg-muted rounded-full" />
                                         <span className="text-xs text-muted-foreground">Calculating...</span>
                                    </div>
                                </div>
                            );
                        }

                        return (
                            <div 
                                key={item.id}
                                onDoubleClick={() => open(item.appId)}
                                className="flex items-center gap-4 p-3 rounded-md hover:bg-accent cursor-pointer transition-colors"
                            >
                                <Image src="/icons/hard-drive.svg" alt="Hard drive" width={40} height={40} className="text-primary flex-shrink-0"/>
                                <div className="w-full overflow-hidden">
                                    <span className="font-semibold text-sm truncate">{item.name}</span>
                                    <Progress value={info.usagePercentage} className="h-2 my-1" />
                                    <span className="text-xs text-muted-foreground">{info.freeStorage.toFixed(1)} GB free of {info.totalStorage} GB</span>
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </div>
    )
}
