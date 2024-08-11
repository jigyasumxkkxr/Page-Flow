import { Link } from "react-router-dom"
import bagdee from "../assets/Badge.svg"
import { useEffect, useState } from "react"

interface BlogProps {
    id: string,
    title: string,
    description: string,
    publishedDate: string,
    author: string
}

export const BlogCardEdit = ({
    id,
    title,
    description,
    publishedDate,
    author
} : BlogProps) => {
    const [badge, setBadge] = useState(false)
    useEffect(() => {
        if (author === "Jigyasu Makkar") {
            setBadge(true);
        } else {
            setBadge(false); // Optional: reset badge if author changes
        }
    }, [author])
    console.log(badge)
    return (
        <Link to = {`/blog/${id}`} >
            <div className="flex flex-col gap-3 w-full pb-4 border-b items-start justify-start">
                <div className="flex gap-2 items-center w-full">
                    <div className="flex gap-2 items-center"> 
                        <div className="relative w-8 h-8 overflow-hidden bg-gray-100 rounded-full">
                            <svg className="absolute w-10 h-10 text-gray-400 -left-1" fill="currentColor" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg"><path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd"></path></svg>
                        </div>
                        <div>
                            <p className="font-bold">{author}</p>
                        </div>
                    </div>
                    {badge && (
                        <div className="flex items-center gap-1">
                            <div className="h-4 w-4 ">
                            <img src={bagdee} alt="Badge" />
                            
                            </div>
                            <p className="text-green-500">Owner</p>
                        </div>
                    )}
                    <div>
                        <p className="text-slate-400">{publishedDate}</p>
                    </div>
                </div>
                <div>
                    <p className="font-bold text-3xl">{title}</p>
                </div>
                <div>
                    <p className="text-slate-500">{description.length > 200 ? description.slice(0, 200) + "..." : description}</p>
                </div>
                <div className=" text-sm opacity-80 w-full rounded flex gap-3 justify-between items-center">
                    <span className="bg-gray-100 text-gray-800 text-xs font-medium inline-flex items-center px-2.5 py-0.5 h-3/4 rounded me-2 shadow-md shadow-gray-200">
                        <svg className="w-2.5 h-2.5 me-1.5" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 20 20">
                        <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z"/>
                        </svg>
                        {`${Math.ceil(description.length / 400)} minute(s) read`}
                    </span>
                    <Link to={`/blog/edit/${id}`} >
                        <button className="bg-green-300 text-green-900 rounded-md text-sm font-semibold px-5 py-1 shadow-md hover:bg-green-200">
                            Edit
                        </button>
                    </Link>
                </div>
            </div>
        </Link>
    )
}