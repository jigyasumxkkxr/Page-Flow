import { useParams } from "react-router-dom"
import { Nav } from "../components/blog-nav"
import { useBlog } from "../hooks/blog"
import { BlogCardFull } from "../components/blog-card-full"
import { Comments } from "../components/comments"





export const Blog = () => {
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
    }
    else {
        return (
            <div className="absolute inset-0 max-h-fit min-h-screen max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                <Nav />
                <div className="w-4/5 m-auto mb-10 p-4 rounded-t-xl h-fit mt-20 flex flex-col justify-between gap-3 backdrop-blur-xs shadow-md">
                    <BlogCardFull id={blog.id} title={blog.title} description = {blog.content} createdAt={blog.createdAt} author= {blog.author?.name ?? 'Anonymous'}  />
                </div>
                <Comments initialcomments={blog.comments} id={blog.id} />
            </div>
        )
    }
}