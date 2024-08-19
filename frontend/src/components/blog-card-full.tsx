import moment from "moment-timezone"
import ReactMarkdown from 'react-markdown';

interface BlogProps {
    id: string,
    title: string,
    description: string,
    createdAt: Date,
    author: string
}

export const BlogCardFull = ({
    title,
    description,
    createdAt,
    author
} : BlogProps) => {
    const createdAtIndiaTime = moment(createdAt).tz('Asia/Kolkata').format('MMMM D, YYYY [at] hh:mm A')
    return (
        <div className="flex w-full pb-4">
            <div className="flex w-full items-center">
                <div className="flex justify-between px-6 sm:px-10 w-full pt-200 max-w-screen-xl pt-6 sm:pt-12">
                    <div className="w-2/3">
                        <div className="text-2xl sm:text-5xl font-extrabold">
                            {title}
                        </div>
                        <p className="font-md text-xs text-slate-600 pt-1 sm:pt-3">{createdAtIndiaTime.toLocaleString()}</p>
                            <div className="pt-4 text-sm sm:text-lg">
                            <ReactMarkdown>{description}</ReactMarkdown>
                            </div>
                        </div>
                    <div className="w-1/4">
                        <div className="text-slate-600 text-sm sm:text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div>
                                <div className="text-md sm:text-xl font-bold">
                                    {author || "Anonymous"}
                                </div>
                            </div>
                        </div>  
                    </div>
            </div>
        </div>
        
    </div>
    )
}