

interface BlogProps {
    id: string,
    title: string,
    description: string,
    publishedDate: string,
    author: string
}

export const BlogCardFull = ({
    title,
    description,
    publishedDate,
    author
} : BlogProps) => {
    return (
        <div className="flex w-full pb-4">
            <div className="flex w-full items-center">
                <div className="flex justify-between px-10 w-full pt-200 max-w-screen-xl pt-12">
                    <div className="w-2/3">
                        <div className="text-5xl font-extrabold">
                            {title}
                        </div>
                        <div className="text-slate-500 pt-2">
                            {publishedDate}
                        </div>
                                <div className="pt-4">
                            {description}
                            </div>
                        </div>
                    <div className="w-1/4">
                        <div className="text-slate-600 text-lg">
                            Author
                        </div>
                        <div className="flex w-full">
                            <div>
                                <div className="text-xl font-bold">
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