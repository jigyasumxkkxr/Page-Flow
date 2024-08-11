import { Link } from "react-router-dom"
import logo from "../assets/JK.png"
import { MyDropdown } from "./avatar"

export const NavPost = () => {
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

            <div className="h-full flex mx-8 items-center">
                <MyDropdown />
            </div>     
        </div>
    )
}