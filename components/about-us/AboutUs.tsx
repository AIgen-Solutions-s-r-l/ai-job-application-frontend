"use client";
import OurMission from "./OurMission";
import { Header } from "./Header";
import OurSolution from "./OurSolution";
import WhoWeAre from "./WhoWeAre";
import WhyLaboro from "./WhyLaboro";
import TheLaboro from "./TheLaboro";
import { Footer } from '@/components/landing/Footer';

function AboutUsPage() {
    return (
        <>
            {/* <Header /> */}
            <div className="flex flex-col px-[15vw] gap-32 mb-[200px]">
                <OurMission />
                <OurSolution />
                <WhoWeAre />
                <WhyLaboro />
                <TheLaboro />
            </div>
            <Footer />
        </>
    )
}

export default AboutUsPage