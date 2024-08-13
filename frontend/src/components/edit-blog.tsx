import axios from "axios"
import { useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { BACKEND_URL } from "../config"
import { NavPost } from "./create-nav"
import { useBlog } from "../hooks/blog"


export const Edit = () => {
    const [title, setTitle] = useState("Untitled")
    const [description, setDescription] = useState("Sample Description")
    const navigate = useNavigate()
    const {id} = useParams()
    const {loading, blog} = useBlog({
        id: id || ""
    })
    if (loading || !blog) {
        return (
            <div className="flex justify-center items-center h-screen absolute inset-0 h-screen w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <div className="relative inline-flex">
                    <div className="w-8 h-8 bg-blue-500 rounded-full"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-ping"></div>
                    <div className="w-8 h-8 bg-blue-500 rounded-full absolute top-0 left-0 animate-pulse"></div>
                </div>
            </div>
        )
    }else {
    
    return (
        <div className="absolute inset-0 min-h-screen max-h-fit max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <NavPost />
            <div className="flex justify-center w-4/5 m-auto mt-24 py-8 backdrop-blur-xs shadow-md"> 
            <div className="max-w-screen-lg w-full flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                <p className="text-slate-600 font-semibold">Title</p>
                <input onChange={(e) => {
                    setTitle(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={blog.title} />
                </div>

                <div className="flex flex-col gap-2">
                <p className="text-slate-600 font-semibold">Content</p>
                <textarea onChange={(e) => {
                    setDescription(e.target.value)
                }} className="h-48 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder={blog.content}  />
                </div>
                <div className="flex justify-end">
                <button onClick={async () => {
                   await axios.put(`${BACKEND_URL}/api/v1/blog`, {
                        id,
                        title,
                        content: description
                    }, {
                        headers: {
                            Authorization: localStorage.getItem("token")
                        }
                    });
                    navigate(`/blog/${id}`)
                }} type="submit" className="w-fit  inline-flex justify-end px-5 py-2.5 text-sm font-medium text-center text-white bg-green-700 rounded-lg focus:ring-4 focus:ring-green-200 dark:focus:ring-green-900 hover:bg-green-800">
                    Edit post
                </button>
                </div>
            </div>
        </div>
        </div>
    )
}
}