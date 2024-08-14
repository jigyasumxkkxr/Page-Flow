import hero1 from "../assets/Croods Friends.svg"
import hero2 from "../assets/Croods Mobile.svg"
import hero3 from "../assets/Croods The Feedback.svg"

export const LandingImage = () => {
    return (
        <div className="flex h-64 justify-center sm:justify-between mx-3 sm:mx-48">
                <div className="hidden sm:block ">
                    <img src={hero1} alt="" className="h-full" />
                </div>
                <div className="hidden sm:block ">
                    <img src={hero2} alt="" className="hidden sm:block h-full"  />
                </div>
                <div>
                    <img src={hero3} alt="" className="h-64 sm:h-full"  />
                </div>
        </div>
    )
}