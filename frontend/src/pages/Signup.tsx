import { SignupCard } from "../components/signup-card"
import signupimg from "../assets/Croods Peaceful Place.svg"
import { useEffect, useState } from "react"

export const Signup = () => {
    const [loading, setLoading] = useState(true)
    useEffect(() => {
        const timer = setTimeout(() => {
            setLoading(false);
        }, 500);

        return () => clearTimeout(timer);
    }, [])

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen absolute inset-0 h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>
        )
    }
    else {
        return (
            <div className="absolute inset-0 h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px] flex">
                <div className="w-1/2 bg-slate-100 flex flex-col justify-center items-center shadow-xl shadow-slate-300">
                    <div className="h-2/5">
                        <img src={signupimg} alt="" className="h-full"/>
                    </div>
                    <div className="flex flex-col justify-center items-center">
                        <div>
                        <svg
                            className="mx-auto mb-3 h-10 w-10 text-gray-400 dark:text-gray-600"
                            aria-hidden="true"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="currentColor"
                            viewBox="0 0 18 14">
                            <path d="M6 0H2a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3H2a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Zm10 0h-4a2 2 0 0 0-2 2v4a2 2 0 0 0 2 2h4v1a3 3 0 0 1-3 3h-1a1 1 0 0 0 0 2h1a5.006 5.006 0 0 0 5-5V2a2 2 0 0 0-2-2Z" />
                        </svg>
                        </div>
                        <div className="text-slate-950 px-36 text-center text-lg font-medium italic  ">
                            Some people don't like change, but you need to embrace change if the alternative is disaster
                        </div>
                        <div className="text-slate-700 text-lg divide-x-2 divide-gray-500">
                        <cite className="pr-3 font-medium text-gray-900 not-italic">Elon Musk</cite>
                        <cite className="pl-3 text-sm text-gray-500">CEO of Tesla Motors
                        </cite>
                        </div>
                    </div>
                </div>
                <div className="w-1/2 flex justify-center items-center">
                    <SignupCard />
                </div>
            </div>
        )
    }
}