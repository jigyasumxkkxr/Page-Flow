import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/JK.png"
import { Button } from "./button"
import { ButtonDark } from "./button-dark"

export const NavBar = () => {
    const navigate = useNavigate()
    const SignInHandeler = () => {
        navigate("/signin")
    }
    const SignUpHandeler = () => {
        navigate("/signup")
    }
    return (
        <div className="h-14 flex justify-between mt-2">
            <Link to={"/"} >
            <div className="h-full  mx-1 sm:mx-8 flex items-center gap-3">
                <div className="w-2/5 sm:w-2/5 h-full">
                    <img src={logo} alt="" className="h-full" />
                </div>

                <div>
                    <h3 className="text-lg sm:text-3xl font-extrabold text-slate-950">PageFlow</h3>
                </div>
            </div>
            </Link>

            <div className="h-full flex mx-2 sm:mx-8 gap-3 sm:gap-6 items-center">
                <div>
                    <ButtonDark label="Get Started" onClick={SignUpHandeler} />
                </div>

                <div>
                    <Button label="Sign In" onClick={SignInHandeler} />
                </div>
            </div>
        </div>
    )
}