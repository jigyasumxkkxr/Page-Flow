import axios from "axios";
import { useEffect, useState } from "react";
import { BACKEND_URL } from "../config";

interface blogs {
    id: string,
    title: string,
    content: string,
    author: {
        id: string,
        name: string
    },
    createdAt: Date
}

interface blog {
    id: string,
    title: string,
    content: string,
    author: {
        name: string
    },
    comments: {
        id: string,
        name: string,
        content: string,
        createdAt: Date
    }[],
    createdAt: Date
}

export const useBlog = ({id}: {id:string}) => {
    const [loading, setLoading] = useState(true)
    const [blog, setBlog] = useState<blog>()

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${BACKEND_URL}/api/v1/blog/${id}`,{
            headers : {
                Authorization : token
            }
        } ).then(response => {
            setBlog(response.data)
            setLoading(false)
        })
    },[id])

    return {
        loading,
        blog
    }
}

export const useBlogs = (reference : string) => {
    const [loading, setLoading] = useState(true)
    const [blogs, setBlogs] = useState<blogs[]>([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        axios.get(`${BACKEND_URL}/api/v1/blog/${reference}`,{
            headers : {
                Authorization : token
            }
        } ).then(response => {
            setBlogs(response.data.posts)
            setLoading(false)
        })
    },[])

    return {
        loading,
        blogs
    }
}
