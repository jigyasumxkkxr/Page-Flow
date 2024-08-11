import { SignupType } from "@jigyasumakkxr/medium-common"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"


export const SignupCard = () => {
    const [postInputs,setPostInputs] = useState<SignupType> ({
        email:"",
        password:"",
        name:""
    })
    const navigate = useNavigate()
    const [error, setError] = useState(null)

    const buttonHandeler = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
            const jwt = response.data.jwt
            const name = response.data.name
            localStorage.setItem("firstName" , name)
            localStorage.setItem("token" , `Bearer `+jwt)
            navigate("/blogs")
        }catch (e) {
            if(e instanceof AxiosError) {
                setError(e.response?.data?.error || e.response?.data?.message)
                console.log(error)
            }
        }
    }

    return (
        <div className="bg-slate-50 p-5 rounded-md shadow-md shadow-slate-300 w-1/2">
            <div className="text-center">
                <p className="text-2xl font-bold text-slate-900">Sign Up</p>
                <p className="text-lg font-semibold text-slate-700">Create an account</p>
            </div>
            <div className="my-5 flex flex-col gap-3 px-6">
                <div>
                <p className="text-md font-semibold text-slate-800">Email</p>
                <input type="text" placeholder="john.doe@gmail.com" className="w-full h-9 px-2 text-sm rounded-md border" onChange={(e) => {
                    setPostInputs({...postInputs,email:e.target.value})
                }}/>
                </div>
                <div>
                <p className="text-md font-semibold text-slate-800 flex items-center">Password <span className="text-xs font-normal text-slate-400">(Min. 6 Characters)</span></p>
                <input type="password" className="w-full h-8 px-2 rounded-md border" onChange={(e) => {
                    setPostInputs({...postInputs,password:e.target.value})
                }} />
                </div>
                <div>
                <p className="text-md font-semibold text-slate-800 flex items-center">Name <span className="text-xs font-normal text-slate-400">(Optional)</span></p>
                <input type="text" placeholder="John Doe" className="w-full text-sm h-8 px-2 rounded-md border" onChange={(e) => {
                    setPostInputs({...postInputs,name:e.target.value})
                }} />
                </div>
            </div>
            <div className="px-6 h-10">
               <button className="h-full px-6 bg-slate-950 rounded-md  text-lg text-slate-50 font-semibold hover:bg-slate-800 shadow-md shadow-slate-950/40 w-full" onClick={buttonHandeler}>Sign Up</button>
            </div>
            <div className="mt-2 px-6 text-center">
                <p>Already have an account ? <Link to={"/signin"} className="hover:underline">Signin</Link></p>
            </div>
            {error && (
                    <div className="text-red-500 flex justify-center items-center">
                    {error}
                    </div>
                )}
        </div>
    )
}