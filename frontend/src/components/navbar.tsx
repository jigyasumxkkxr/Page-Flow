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
            <div className="h-full flex mx-8 items-center gap-3">
                <div className="h-full">
                    <img src={logo} alt="" className="h-full" />
                </div>

                <div>
                    <h3 className="text-3xl font-extrabold text-slate-950">PageFlow</h3>
                </div>
            </div>
            </Link>

            <div className="h-full flex mx-8 gap-6 items-center">
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