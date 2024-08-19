import { useState } from "react";
import axios from "axios";

export const useGenerate = (question: string) => {
    const [title, setTitle] = useState("Untitled");
    const [description, setDescription] = useState("Sample Description");

    const generate = async () => {
        try {
            const url = import.meta.env.VITE_API || "";
            const response = await axios.post(url, {
                contents: [{ parts: [{ text: `${question}` }] }]
            });

            const text = response.data.candidates[0].content.parts[0].text;
            console.log(text)
            setTitle(text.split("\n")[0].replace("## ", ""));
            setDescription(text.split("\n").slice(1).join("\n"));
        } catch (error) {
            console.error("Error generating content:", error);
        }
    };

    return { title, description, generate };
};
