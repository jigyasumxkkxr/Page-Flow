import { useState } from "react"
import { Comment } from "./comment"
import axios from "axios"
import { BACKEND_URL } from "../config"
import { SkeletonLoader } from "./skeleton"


export const Comments = ({ initialcomments , id }: {
    initialcomments: {
        id: string,
        content: string,
        createdAt: Date
    }[],
    id: string
}) => {
    const [loading,setLoading] = useState(false)
    const [loadingSend,setLoadingSend] = useState(false)
    const [comments,setComments] = useState(initialcomments)
    const RefreshHandler = async () => {
        setLoading(true)
        const token = localStorage.getItem("token")
        try {
            const response = await axios.get(`${BACKEND_URL}/api/v1/blog/comment/${id}`,{
                headers : {
                    Authorization : token
                }
            })
            setComments(response.data)
        }catch (error) {
            console.error("Error fetching comments:", error);
        }finally {
            setLoading(false);
        }
    }
    const [comment, setComment] = useState("Why you left comment empty");
    const SubmitCommentHandler =async () => {
        setLoadingSend(true)
        const token = localStorage.getItem("token")
        try {
            await axios.post(`${BACKEND_URL}/api/v1/blog/comment/${id}`,{
                content:comment
            },{
                headers : {
                    Authorization : token
                }
            })
            setComment("Why you left comment empty")
            await RefreshHandler()
        }catch(err) {
            console.error("Error submitting comment:", err);
        }finally{
            setLoadingSend(false)
        }
    }
    return (
            <div className="w-4/5 m-auto backdrop-blur-xs shadow-md p-4 mb-12"> 
                <div className="w-full m-auto backdrop-blur-xs shadow-md p-4 mb-2 flex flex-col gap-2">
                <p className="text-grar-800 font-semibold text-lg">Add Comment Anonymously</p>
                <div className="flex justify-between mx-3">
                    <input type="text" placeholder="Write Here..." className="w-10/12 bg-gray-100 text-slate-500 px-3 rounded h-10 border" onChange={(e)=>{
                        setComment(e.target.value);
                    }} />
                    <button className="px-12 bg-green-300 rounded-lg text-lg font-semibold text-green-800 hover:bg-green-200" onClick={SubmitCommentHandler} disabled={loadingSend}>{loadingSend? <div>
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                </div> : "Send"}</button>
                </div>
            </div>

            <div className="mb-3 border-slate-500 flex justify-between items-center">
                <h2 className="text-2xl font-bold  pb-2">Comments</h2>
                <div className="flex gap-2 items-ceter justify-center">
                <p className="flex items-center text-xs text-slate-600">(Click on <span className="text-green-600 mx-1">{" Refresh Button "}</span> for Newest Comment Render)</p>
                <button className="bg-gray-300 py-1 px-3 rounded-md text-gray-800 font-semibold hover:bg-gray-200" onClick={RefreshHandler} disabled={loading}>{loading ? <div className="px-[60px]">
                    <svg aria-hidden="true" role="status" className="inline w-4 h-4 text-white animate-spin" viewBox="0 0 100 101" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z" fill="#E5E7EB"/>
                <path d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z" fill="currentColor"/>
                </svg>
                </div> : "Refresh Comments"}</button>
                </div>
            </div>

            {loading ? 
                <SkeletonLoader />
             : comments.length === 0 ? (
                <p className="flex justify-center font-bold text-gray-800 text-xl">Be the first to comment!</p>
            ) : (
                comments.map(comment => (
                    <Comment
                        key={comment.id}
                        id={comment.id}
                        content={comment.content}
                        createdAt={comment.createdAt}
                    />
                ))
            )}
        </div>
    )
}