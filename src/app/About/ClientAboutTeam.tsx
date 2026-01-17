"use client";

import dynamic from 'next/dynamic';

const AboutTeam = dynamic(() => import('./AboutTeam'), {
    ssr: false
});

export default function ClientAboutTeam() {
    return <AboutTeam />;
}