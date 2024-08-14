import { useEffect, useState } from "react"
import { Footer } from "../components/footer"
import { HeroLanding } from "../components/landing-hero"
import { LandingImage } from "../components/landing-img"
import { LandingSubHero } from "../components/landing-subhero"
import { NavBar } from "../components/navbar"
import { SunspotLoaderComponent } from "../components/loader"


export const Landing = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 1000);

        return () => clearTimeout(timer);
    }, [])
    if(loading) {
        return (
            <div className="flex h-screen w-screen justify-center items-center">
                <SunspotLoaderComponent />
            </div>
        )
    }

    else {
        return (
            <div className="absolute inset-0 min-h-screen max-h-fit w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex flex-col justify-between">
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
}