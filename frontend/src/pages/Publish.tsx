import { useEffect, useState } from "react";
import { CreatePost } from "../components/create-blog"


export const Publish = () => {
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
            <div>
                <CreatePost />
            </div>
        )
    }
}