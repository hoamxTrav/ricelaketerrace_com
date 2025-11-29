// src/components/ChatInputBar.jsx
import { useEffect, useRef, useState, useCallback } from "react";

export default function ChatInputBar({
                                         onSend,            // (text: string) => void
                                         onUpload,          // (files: File[]) => void
                                         onRecord,          // () => void
                                         onCall,            // () => void
                                         callNumber = "",   // optional: tel number string, if provided will use window.location.href = `tel:${callNumber}`
                                         placeholder = "Type a message…",
                                         className = "",
                                     }) {
    const [value, setValue] = useState("");
    const [open, setOpen] = useState(false);
    const btnRef = useRef(null);
    const popRef = useRef(null);
    const fileRef = useRef(null);

    // Close popover on outside click
    useEffect(() => {
        if (!open) return;
        const onDocClick = (e) => {
            const t = e.target;
            if (!btnRef.current?.contains(t) && !popRef.current?.contains(t)) {
                setOpen(false);
            }
        };
        document.addEventListener("mousedown", onDocClick);
        return () => document.removeEventListener("mousedown", onDocClick);
    }, [open]);

    const handleSend = useCallback(() => {
        const text = value.trim();
        if (!text) return;
        onSend?.(text);
        setValue("");
    }, [value, onSend]);

    const onKeyDown = (e) => {
        if (e.key === "Enter" && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const triggerUpload = () => fileRef.current?.click();
    const onFileChange = (e) => {
        const files = Array.from(e.target.files || []);
        if (files.length) onUpload?.(files);
        e.target.value = "";
        setOpen(false);
    };

    const callHandler = () => {
        if (callNumber) {
            window.location.href = `tel:${callNumber}`;
        } else {
            onCall?.();
        }
        setOpen(false);
    };

    return (
        <div className={`w-full border-t border-black/10 bg-white px-3 py-2 ${className}`}>
            <input ref={fileRef} type="file" multiple className="hidden" onChange={onFileChange} />

            <div className="mx-auto flex max-w-2xl items-center gap-2">
                {/* + button */}
                <div className="relative flex-shrink-0">
                    <button
                        ref={btnRef}
                        type="button"
                        aria-label="More actions"
                        onClick={() => setOpen((o) => !o)}
                        className="inline-flex h-12 w-12 items-center justify-center rounded-xl border border-black/15
                     bg-white shadow-sm hover:bg-neutral-50 active:scale-[0.98] transition"
                    >
                        <svg width="22" height="22" viewBox="0 0 24 24" fill="none">
                            <path d="M12 5v14M5 12h14" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                        </svg>
                    </button>

                    {open && (
                        <div
                            ref={popRef}
                            className="absolute z-50 mt-2 w-72 rounded-2xl border border-black/10 bg-white p-2 shadow-xl"
                        >
                            {/* popover list unchanged */}
                            <ul className="space-y-1">
                                <li>
                                    <button
                                        className="w-full rounded-xl px-3 py-2 text-left hover:bg-neutral-50 active:scale-[0.99] transition"
                                        onClick={triggerUpload}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg border p-1.5 shadow-sm">📎</div>
                                            <div>
                                                <div className="text-sm font-semibold">Upload photo / document</div>
                                                <div className="text-xs text-black/60">Attach a file to your message</div>
                                            </div>
                                        </div>
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="w-full rounded-xl px-3 py-2 text-left hover:bg-neutral-50 active:scale-[0.99] transition"
                                        onClick={() => { onRecord?.(); setOpen(false); }}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg border p-1.5 shadow-sm">🎤</div>
                                            <div>
                                                <div className="text-sm font-semibold">Record a message</div>
                                                <div className="text-xs text-black/60">Voice note or voicemail</div>
                                            </div>
                                        </div>
                                    </button>
                                </li>

                                <li>
                                    <button
                                        className="w-full rounded-xl px-3 py-2 text-left hover:bg-neutral-50 active:scale-[0.99] transition"
                                        onClick={callHandler}
                                    >
                                        <div className="flex items-start gap-3">
                                            <div className="rounded-lg border p-1.5 shadow-sm">📞</div>
                                            <div>
                                                <div className="text-sm font-semibold">Call on-duty manager</div>
                                                <div className="text-xs text-black/60">
                                                    {callNumber ? `Dial ${callNumber}` : "Start a call"}
                                                </div>
                                            </div>
                                        </div>
                                    </button>
                                </li>
                            </ul>

                        </div>
                    )}
                </div>

                {/* text box */}
                <div className="relative flex-1 flex items-center">
        <textarea
            rows={1}
            value={value}
            onChange={(e) => setValue(e.target.value)}
            onKeyDown={onKeyDown}
            placeholder={placeholder}
            aria-label="Message input"
            className="h-12 w-full resize-none rounded-xl border border-black/20 bg-white px-3 py-2 pr-10
                     text-[15px] leading-[1.4rem] shadow-sm outline-none
                     focus:border-bark focus:ring-4 focus:ring-bark/15"
        />
                    <button
                        type="button"
                        onClick={triggerUpload}
                        aria-label="Attach a file"
                        className="absolute right-2 top-1/2 -translate-y-1/2 rounded-md p-1 text-black/50 hover:text-black"
                    >
                        📎
                    </button>
                </div>

                {/* send */}
                <button
                    type="button"
                    onClick={handleSend}
                    disabled={!value.trim()}
                    aria-label="Send message"
                    className="flex-shrink-0 inline-flex h-12 items-center justify-center rounded-xl
                   bg-cherry px-5 text-base font-medium text-white shadow-sm
                   hover:brightness-95 active:translate-y-px
                   disabled:opacity-50 disabled:cursor-not-allowed"
                >
                    Send
                </button>
            </div>
        </div>
    );

}
