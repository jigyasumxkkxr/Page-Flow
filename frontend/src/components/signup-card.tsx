import { SignupType } from "@jigyasumakkxr/medium-common"
import axios, { AxiosError } from "axios"
import { useRef, useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { BACKEND_URL } from "../config"
import toast from 'react-hot-toast';


export const SignupCard = () => {
    const [postInputs,setPostInputs] = useState<SignupType> ({
        email:"",
        password:"",
        name:""
    })
    const navigate = useNavigate()
    const passwordRef = useRef<HTMLInputElement>(null);
    const signInButtonRef = useRef<HTMLButtonElement>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === 'Enter') {
        signInButtonRef.current?.click();
        }
    };

    const signup  = async () => {
        try {
            const response = await axios.post(`${BACKEND_URL}/api/v1/user/signup`, postInputs)
            const jwt = response.data.jwt
            const name = response.data.name
            localStorage.setItem("firstName" , name)
            localStorage.setItem("token" , `Bearer `+jwt)
            navigate("/blogs")
        }catch (e) {
            if(e instanceof AxiosError) {
                throw new Error(e.response?.data?.error || e.response?.data?.message)
            }
        }
    }
    const CustomErrorToast = ({ message, onNavigate }: {
        message: string,
        onNavigate?: () => void
    }) => (
        <div className="flex w-full items-center">
            <p className="w-3/4">{message}</p>
            <button onClick={onNavigate} className="bg-red-200 h-3/4 w-1/4 font-semibold text-sm px-2 py-1 text-red-900 rounded hover:bg-red-300 hover:shadow-md">Sign In</button>
        </div>
    );

    const buttonHandeler = async () => {
        toast.promise(
            signup(),
            {
                loading: 'Signing up...',
                success: "Successfully Signed up!",
                error: (error) => {
                    if (error.message === "An account with this email already exists") {
                        return <CustomErrorToast
                            message={error.message}
                            onNavigate={() => navigate('/signin')}
                        />;
                    }
                    return <p>{error.message}</p>
                },
            }
        )
    }

    return (
        <div className="bg-slate-50 p-5 rounded-md shadow-md shadow-slate-300 w-4/5 sm:w-1/2">
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
                }}  ref={passwordRef}
                    onKeyDown={handleKeyDown} />
                </div>
                <div>
                <p className="text-md font-semibold text-slate-800 flex items-center">Name <span className="text-xs font-normal text-slate-400">(Optional)</span></p>
                <input type="text" placeholder="John Doe" className="w-full text-sm h-8 px-2 rounded-md border" onChange={(e) => {
                    setPostInputs({...postInputs,name:e.target.value})
                }}  ref={passwordRef}
                    onKeyDown={handleKeyDown} />
                </div>
            </div>
            <div className="px-6 h-10">
               <button className="h-full px-6 bg-slate-950 rounded-md  text-lg text-slate-50 font-semibold hover:bg-slate-800 shadow-md shadow-slate-950/40 w-full" onClick={buttonHandeler} ref={signInButtonRef}>Sign Up</button>
            </div>
            <div className="mt-2 px-6 text-center">
                <p>Already have an account ? <Link to={"/signin"} className="hover:underline">Signin</Link></p>
            </div>
            
        </div>
    )
}