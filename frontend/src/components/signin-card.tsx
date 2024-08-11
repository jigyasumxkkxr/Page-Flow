import { SigninType } from "@jigyasumakkxr/medium-common"
import axios, { AxiosError } from "axios"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"




export const SigninCard = () => {
    const [postInputs,setPostInputs] = useState<SigninType>({
        email: "",
        password: ""
    })
    const [error, setError] = useState(null)
    const [loading, setLoading] =useState(false)

    const navigate = useNavigate()

    const buttonHandeler = async () => {
        try {
            setLoading(true)
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signin`, postInputs)
            const jwt = response.data?.jwt
            localStorage.setItem("token" , `Bearer `+jwt)
            const name = response.data.name
            localStorage.setItem("firstName" , name)
            navigate("/blogs")
        }catch (e){
            if(e instanceof AxiosError) {
                setError(e.response?.data?.error || e.response?.data?.message)
                console.log(error)
            }
        }finally{
            setLoading(false)
        }
    }

    return (
        <div className="bg-slate-50 p-5 rounded-md shadow-md shadow-slate-300 w-1/2">
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
               <button className="h-full px-6 bg-slate-950 rounded-md text-lg text-slate-50 font-semibold hover:bg-slate-800 shadow-md shadow-slate-950/40 w-full" onClick={buttonHandeler}>{loading? <svg aria-hidden="true" role="status" className="inline w-4 h-4 me-3 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg> : "Sign In"}</button>
            </div>
            <div className="mt-2 px-6 text-center">
                <p>Don't have an account ? <Link to={"/signup"} className="hover:underline">Signup</Link></p>
            </div>
            {error && (
                    <div className="text-red-500 flex justify-center items-center">
                    {error}
                    </div>
                )}
        </div>
    )
}