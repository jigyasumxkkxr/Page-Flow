import React from "react";

type ButtonDarkProps = {
    label: string;
    onClick: () => void
}

export const ButtonDark : React.FC<ButtonDarkProps> = ({label, onClick}) => {
    return (
        <div className="h-10">
            <button onClick={onClick} className="h-full px-6 bg-slate-900 rounded-md text-lg text-slate-50 font-semibold hover:bg-slate-800 shadow-md shadow-slate-950/40">{label}</button>
        </div>
    )
}