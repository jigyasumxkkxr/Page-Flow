import { useState } from "react"
import { useNavigate } from "react-router-dom"
import axios from "axios"
import { BACKEND_URL } from "../config"
import toast from "react-hot-toast"
import { NavPostAi } from "./create-nav-ai"
import geminiLogo from "../assets/image 3.svg"



export const CreatePostAi = () => {
    const [question, setQuestion] = useState("")
    const navigate = useNavigate()


    const handlePostAi = async () => {
        try {
            const url = import.meta.env.VITE_API || "";
            const answer = await axios.post(url, {
                contents: [{ parts: [{ text: question }] }]
            });

        const text = answer.data.candidates[0].content.parts[0].text;
        const generatedTitle = text.split('\n')[0].replace('## ', '');
        const generatedDescription = text.split('\n').slice(1).join('\n');

            const response = await axios.post(`${BACKEND_URL}/api/v1/blog`, {
                title: generatedTitle,
                content: generatedDescription
            }, {
                headers: {
                    Authorization: localStorage.getItem("token")
                }
            });
            navigate(`/blog/${response.data.id}`);
        } catch (error) {
            console.error("Failed to post:", error);
            toast.error("Failed to generate content");
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
                <div className="flex justify-between">
                <div className="flex items-center text-xs sm:text-sm gap-1">
                    <span className="pt-0.5">Powered by</span><span><img src={geminiLogo} alt="" className="h-3 sm:h-4" /></span>
                </div>
                <button onClick={() => {
                toast.promise(
                    handlePostAi(),
                    {
                        loading: 'Generating and Posting...',
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