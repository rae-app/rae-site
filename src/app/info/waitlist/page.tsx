import Footer from '@/components/ui/Footer';
import Navbar from '@/components/ui/Navbar';
import Waitlist from '@/components/sections/Waitlist';
import React from 'react';

function WaitlistPage() {
    return (
        <div className="min-h-screen flex flex-col z-40">
            {/* <Navbar /> */}
            <main className="flex-1 z-40">
                <Waitlist />
            </main>
            <Footer />
        </div>
    );
}

export default WaitlistPage;
