import Waitlist from '@/components/sections/Waitlist';

function WaitlistPage() {
    return (
        <div className="min-h-screen bg-hero-radial">
            {/* <Navbar /> */}
            <main className="min-h-[calc(100vh-120px)] flex items-center justify-center">
                <Waitlist />
            </main>
            {/* <Footer /> */}
        </div>
    );
}

export default WaitlistPage;
