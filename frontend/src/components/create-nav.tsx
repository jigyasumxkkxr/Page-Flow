import { Link, useNavigate } from "react-router-dom"
import logo from "../assets/JK.png"
import { MyDropdown } from "./avatar"

export const NavPost = () => {
    const navigate = useNavigate()
    const onClick = () => {
        navigate("/create/ai")
    }
    return (
        <div className="h-14 flex justify-between mt-2">
            <Link to={"/blogs"} >
            <div className="h-full flex mx-2 sm:mx-8 items-center gap-3">
                <div className="w-1/3 sm:w-2/5 h-full">
                    <img src={logo} alt="" className="h-full" />
                </div>

                <div>
                    <h3 className="text-xl sm:text-3xl font-bold sm:font-extrabold text-slate-950">PageFlow</h3>
                </div>
            </div>
            </Link>

            <div className="h-full flex mx-2.5 sm:mx-8 items-center gap-4">
            <div className="h-10">
                <button onClick={onClick} className="h-full bg-blue-300 text-blue-700 flex px-2 sm:px-6 rounded-full text-sm sm:text-lg font-semibold flex items-center hover:bg-blue-200 shadow-md shadow-blue-200">Generate AI</button>
            </div>
                <MyDropdown />
            </div>     
        </div>
    )
}