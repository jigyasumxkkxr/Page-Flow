import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/JK.png"
import { ButtonGreen } from "./button-green"
import { MyDropdown } from "./avatar"

export const Nav = () => {
    const navigate = useNavigate()
    const CreateHandeler = () => {
        navigate("/create")
    }
    return (
        <div className="h-14 flex justify-between mt-2">
            <Link to={"/blogs"} >
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
                <div className="h-4/5 flex items-center">
                    <ButtonGreen label="Create Post" onClick={CreateHandeler} />
                </div>
                <MyDropdown />
            </div>     
        </div>
    )
}