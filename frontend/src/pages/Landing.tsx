import { Footer } from "../components/footer"
import { HeroLanding } from "../components/landing-hero"
import { LandingImage } from "../components/landing-img"
import { LandingSubHero } from "../components/landing-subhero"
import { NavBar } from "../components/navbar"


export const Landing = () => {
    return (
        <div className="absolute inset-0 h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex flex-col justify-between">
            <NavBar />
            <div className="w-full flex justify-center">
                <HeroLanding />
            </div>
            <LandingImage />
            <div className="w-full flex justify-center items-center">
                <LandingSubHero />
            </div>
            <Footer />
        </div>
    )
}