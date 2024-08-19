import { useState, useCallback } from "react";
import axios from "axios";

export const useGenerate = (question: string) => {
    const [loading, setLoading] = useState(false);
    const [title, setTitle] = useState("Untitled");
    const [description, setDescription] = useState("Sample Description");

    const generateContent = useCallback(async () => {
        setLoading(true);
        try {
            const url = import.meta.env.VITE_API || "";
            const response = await axios.post(url, {
                contents: [{ parts: [{ text: `${question}` }] }]
            });

            const text = response.data.candidates[0].content.parts[0].text;
            const newTitle = text.split('\n')[0].replace('## ', '');
            const newDescription = text.split('\n').slice(1).join('\n');

            setTitle(newTitle);
            setDescription(newDescription);
        } catch (error) {
            console.error("Failed to generate content:", error);
        } finally {
            setLoading(false);
        }
    }, [question]);

    return {
        loading,
        title,
        description,
        generateContent
    };
};
