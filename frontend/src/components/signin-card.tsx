import { SigninType } from "@jigyasumakkxr/medium-common"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"




export const SigninCard = () => {
    const [postInputs,setPostInputs] = useState<SigninType>({
        email: "",
        password: ""
    })

    const navigate = useNavigate()

    const signup = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = response.data?.jwt
            localStorage.setItem("token" , `Bearer `+jwt)
            const name = response.data.name
            localStorage.setItem("firstName" , name)
            navigate("/blogs")
        }catch (e){
            if(e instanceof AxiosError) {
                throw new Error(e.response?.data?.error || e.response?.data?.message)
            }
        }
    }
    const buttonHandeler = async () => {
        toast.promise(
            signup(),
            {
                loading: 'Signing in...',
                success: "Successfully Signed in!",
                error: (error) => {
                    return <p>{error.message}</p>
                },
            }
        )
    }

    return (
        <div className="bg-slate-50 p-5 rounded-md shadow-md shadow-slate-300 w-4/5 sm:w-1/2">
            <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">Sign In</p>
                <p className="text-lg font-semibold text-slate-700">Sign In to your account</p>
            </div>
            <div className="my-5 flex flex-col gap-3 px-6">
                <div>
                <p className="text-md font-semibold text-slate-800">Email</p>
                <input type="text" placeholder="john.doe@gmail.com" className="w-full h-8 px-2 rounded-md border" onChange={(e) => {
                    setPostInputs({...postInputs,email:e.target.value})
                }}/>
                </div>
                <div>
                <p className="text-md font-semibold text-slate-800">Password</p>
                <input type="password" className="w-full h-8 px-2 rounded-md border" onChange={(e) => {
                    setPostInputs({...postInputs,password:e.target.value})
                }} />
                </div>
            </div>
            <div className="px-6 h-10">
               <button className="h-full px-6 bg-slate-950 rounded-md text-lg text-slate-50 font-semibold hover:bg-slate-800 shadow-md shadow-slate-950/40 w-full" onClick={buttonHandeler}>{"Sign In"}</button>
            </div>
            <div className="mt-2 px-6 text-center">
                <p>Don't have an account ? <Link to={"/signup"} className="hover:underline">Signup</Link></p>
            </div>
        </div>
    )
}