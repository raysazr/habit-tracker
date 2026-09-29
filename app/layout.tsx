import type { Metadata } from 'next'; import './globals.css';
export const metadata: Metadata = { title: 'Personal Productivity OS', description: 'A private, evidence-based workspace for habits, learning and career progress.' };
export default function RootLayout({children}:{children:React.ReactNode}) { return <html lang="en"><body>{children}</body></html> }
