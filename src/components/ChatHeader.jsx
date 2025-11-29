// src/components/ChatHeader.jsx
import { useEffect, useState } from "react";

export default function ChatHeader() {
    const [emoji, setEmoji] = useState("👋");
    const [status, setStatus] = useState("Online");

    useEffect(() => {
        const moods = ["👋","🙂","😊","🤔","😌"];
        let i = 0;
        const t = setInterval(() => { i = (i + 1) % moods.length; setEmoji(moods[i]); }, 8000);
        return () => clearInterval(t);
    }, []);

    return (
        <div className="flex items-center justify-between">
            <div className="flex flex-col">
                <h1 className="text-xl font-bold text-bark leading-tight">Rice Lake Terrace</h1>
                <div className="text-sm text-black/60">Homeowners Association</div>
            </div>
            <div className="flex items-center gap-2">
                <span className="text-2xl leading-none" title={`Agent status: ${status}`}>{emoji}</span>
                <span className="text-sm font-semibold text-lawn">{status}</span>
            </div>
        </div>
    );
}
