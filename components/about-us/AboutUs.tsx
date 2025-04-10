"use client";
import OurMission from "./OurMission";
import { Header } from "./Header";
import OurSolution from "./OurSolution";
import WhoWeAre from "./WhoWeAre";

function AboutUsPage() {
    return (
        <>
            {/* <Header /> */}
            <div className="px-[15vw]">
                <OurMission />
                <OurSolution />
                <WhoWeAre />
            </div>
        </>
    )
}

export default AboutUsPage