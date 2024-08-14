import React from "react";

type ButtonProps = {
    label: string;
    onClick: () => void;
}

export const Button : React.FC<ButtonProps> = ({label, onClick}) => {
    return (
        <div className="h-10">
            <button onClick={onClick} className=" h-full bg-slate-100 flex px-4 sm:px-6 rounded-md text-xs sm:text-lg font-normel sm:font-semibold flex items-center hover:bg-slate-200 shadow-md shadow-slate-300">{label}</button>
        </div>
    )
}