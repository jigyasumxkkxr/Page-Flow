import { Link, useNavigate } from "react-router-dom"
import { Button } from "./button"


export const LandingSubHero = () => {
    const navigate  = useNavigate()
    const SignUpHandeler = () => {
        navigate("/signup")
    }
    return (
        <div className="w-screen px-6 sm:px-12 flex flex-col gap-5 pt-2">
            <div className="flex gap-2 flex-col justify-center items-center">
                <div className="text-slate-500 text-sm text-center sm:text-md">
                    You will have to <span className="text-green-500">signup/login</span> to read or write in community
                </div>
                <Button label="Signup / Signin" onClick={SignUpHandeler} />
            </div>
            <div className="flex gap-4 pt-2 items-center justify-center sm:justify-start sm:flex-row-reverse">
                <Link to = "https://x.com/Jigyasu_20">
                <button className="bg-sky-100 px-5 rounded-md h-8 font-semibold text-sky-400 hover:bg-sky-200">Twitter</button>
                </Link>
                <Link to = "https://www.linkedin.com/in/jigyasumakkxr/" >
                <button className="bg-blue-100 px-5 rounded-md h-8 font-semibold text-blue-600 hover:bg-blue-200">LinkedIn</button>
                </Link>
                <Link to = "https://github.com/jigyasumxkkxr/Page-Flow" >
                <button className="bg-gray-100 px-5 rounded-md h-8 font-semibold text-gray-600 hover:bg-gray-200">Github</button>
                </Link>
            </div>
        </div>
    )
}