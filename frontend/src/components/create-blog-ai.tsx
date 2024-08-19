import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"
import { NavPostAi } from "./create-nav-ai"
import { useGenerate } from "../hooks/generate"



export const CreatePostAi = () => {
    const [question, setQuestion] = useState("")
    const navigate = useNavigate()
    const { title, description, generateContent } = useGenerate(question);

    const handlePostAi = async () => {
        try {
            await generateContent();

            // Check if title and description are updated
            if (title !== "Untitled" && description !== "Sample Description") {
                const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                    title,
                    content: description
                }, {
                    headers: {
                        Authorization: localStorage.getItem("token")
                    }
                });

                navigate(`/blog/${response.data.id}`);
            } else {
                throw new Error('Failed to generate content');
            }
        } catch (error) {
            console.error("Failed to post:", error);
            throw error;
        }
    };
    return (
        <div className="absolute inset-0 min-h-screen max-h-fit max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
            <NavPostAi />
            <div className="flex justify-center w-full px-3 sm:w-4/5 m-auto mt-24 py-8 backdrop-blur-xs shadow-md"> 
            <div className="max-w-screen-lg w-full flex flex-col gap-5">
                <div className="flex flex-col gap-2">
                <p className="text-slate-600 font-semibold">Prompt</p>
                <input onChange={(e) => {
                    setQuestion(e.target.value)
                }} type="text" className="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5" placeholder="Write a prompt for your blog post" />
                </div>
                <div className="flex justify-end">
                <button onClick={() => {
                toast.promise(
                    handlePostAi(),
                    {
                        loading: 'Posting...',
                        success: 'Successfully Posted!',
                        error: 'Failed to generate. Please try again.'
                    }
                );
            }} type="submit" className="w-fit  inline-flex justify-end px-5 py-2.5 text-sm font-medium text-center text-white bg-blue-700 rounded-lg focus:ring-4 focus:ring-blue-200 dark:focus:ring-blue-900 hover:bg-blue-800">
                    Generate Post
                </button>
                </div>
            </div>
        </div>
        </div>
    )
}