'use client';

import dynamic from 'next/dynamic'
import LoadingScreen from '@/components/system/LoadingScreen';

const Shell = dynamic(() => import('@/components/system/Shell'), {
  ssr: false,
  loading: () => <LoadingScreen />,
});

export default function Home() {
  return <Shell />;
}
