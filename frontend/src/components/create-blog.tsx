import { useState } from "react"
import { NavPost } from "./create-nav"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"


export const CreatePost = () => {
    const [title, setTitle] = useState("Goli Beta Masti Nahi")
    const [description, setDescription] = useState("I know you will do this")
    const navigate = useNavigate()
    return (
        <div className="absolute inset-0 h-screen max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <NavPost />
            <div className="flex justify-center w-4/5 m-auto mt-24 py-8 backdrop-blur-xs shadow-md"> 
            <div className="max-w-screen-lg w-full flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                <p className="text-slate-600 font-semibold">Title</p>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Title" />
                </div>

                <div className="flex flex-col gap-2">
                <p className="text-slate-600 font-semibold">Content</p>
                <textarea onChange={(e) => {
                    setDescription(e.target.value)
                }} className="h-48 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Content"  />
                </div>
                <div className="flex justify-end">
                <button onClick={async () => {
                    const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${response.data.id}`)
                }} type="submit" className="w-fit  inline-flex justify-end px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                    Publish post
                </button>
                </div>
            </div>
        </div>
        </div>
    )
}