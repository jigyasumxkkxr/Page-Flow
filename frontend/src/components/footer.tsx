import heart from "../assets/path88.svg"

export const Footer = () => {
    return (
        <div className="flex justify-center items-center mb-1 border-t border-dashed bg-white pt-1">
            <p className="font-semibold text-sm">Made with</p>
            <img src={heart} alt="" className="h-5 w-5 mx-1" />
            <p className="font-semibold text-sm">by Jigyasu Makkar</p>
        </div>
    )
}