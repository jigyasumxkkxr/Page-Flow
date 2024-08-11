import { Nav } from "../components/blog-nav"
import { useBlogs } from "../hooks/blog"
import { BlogCard } from "../components/blog-card"


export const MyBlog = () => {
    const {loading, blogs} = useBlogs("my")
      if(loading) {
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
        if(blogs.length == 0){
            return (
                <div className="absolute inset-0 h-screen max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                    <Nav />
                    <div className="w-full h-4/5 flex flex-col justify-center items-center">
                        <div>
                            <p className="text-4xl font-extrabold">No Posts Yet</p>
                        </div>
                        <div>
                            <p className="text-slate-500">Create a new one on clicking <span className="text-green-500">Create Post</span> Button</p>
                        </div>
                    </div>
                </div>
            )
        }
        else {
            return (
                <div className="absolute inset-0 max-h-fit min-h-screen max-w-screen bg-white bg-[radial-gradient(#e5e7eb_1px,transparent_1px)] [background-size:16px_16px]">
                    <Nav />
                    <div className="w-4/5 m-auto mb-10 p-4 rounded-t-xl h-fit mt-10 flex flex-col justify-between gap-3 backdrop-blur-xs shadow-md">
                        {blogs.map(blog => <BlogCard id={blog.id} title={blog.title} description = {blog.content} publishedDate="Posted on a day in 2024" author= {blog.author?.name ?? 'Anonymous'}  />)}
                    </div>
                </div>
            )
        }
      }
}