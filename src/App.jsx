// src/App.jsx
import { useEffect, useMemo, useRef, useState, useCallback } from "react";
import ChatHeader from "./components/ChatHeader.jsx";
import MessageList from "./components/MessageList.jsx";
import ChatInputBar from "./components/ChatInputBar.jsx";
import ActionBar from "./components/ActionBar.jsx";

export default function App() {
    const [recognized, setRecognized] = useState(false);
    const handleLogin = () => { /* open login modal */ setRecognized(true); };
    const handleAccount = () => console.log("Open account");
    const handleDues = () => console.log("Go to dues");
    const handleCall = () => console.log("Call manager");
    const [drawerOpen, setDrawerOpen] = useState(false);
    const [messages, setMessages] = useState([
        {
            id: 1,
            role: "agent",
            text: "Hello, call me Huxley 😊 I am a well trained robot, what is your name?",
            time: new Date().toISOString(),
        },
    ]);
    const [typing, setTyping] = useState(false);
    const endRef = useRef(null);

    useEffect(() => {
        endRef.current?.scrollIntoView({ behavior: "smooth", block: "end" });
    }, [messages, typing]);

    // sentiment → header emoji (kept here; ChatHeader is presentational)
    const getSentimentEmoji = (txt = "") => {
        const t = txt.toLowerCase();
        if (!t.trim()) return "😊";
        const pos = ["thanks","thank you","great","good","perfect","awesome","nice","love"];
        const neg = ["angry","mad","upset","hate","terrible","awful","bad","broken","ugh","wtf"];
        const worry = ["concern","confused","not sure","help","issue","problem","why","how","stuck"];
        if (neg.some(w => t.includes(w))) return "😟";
        if (worry.some(w => t.includes(w))) return "🙂";
        if (pos.some(w => t.includes(w))) return "😊";
        return "😐";
    };
    const lastUser = [...messages].reverse().find(m => m.sender === "user");
    const headerEmoji = useMemo(() => getSentimentEmoji(lastUser?.text), [lastUser]);

    // send helpers
    const sendMessage = (text) => {
        const t = (text ?? "").trim();
        if (!t) return;

        setMessages(m => [
            ...m,
            { id: Date.now(), role: "user", text: t, time: new Date().toISOString() }
        ]);

        setTyping(true);
        setTimeout(() => {
            setMessages(m => [
                ...m,
                {
                    id: Date.now() + 1,
                    role: "agent",
                    text: "Got it — we’ll take a look and follow up. 👍",
                    time: new Date().toISOString(),
                }
            ]);
            setTyping(false);
        }, 900);
    };

    // normalize for MessageList (expects role)
    const listMessages = messages.map(m => ({ id: m.id, role: m.sender, text: m.text }));

    return (
        <div className="min-h-screen w-full font-sans bg-beige md:bg-hoa-wide bg-cover bg-center bg-fixed">

            {/* HEADER (menu button kept here; ChatHeader is presentational) */}
            <header className="sticky top-0 z-30 bg-white/80 backdrop-blur-sm border-b">
                <div className="relative mx-auto max-w-2xl px-4 py-3">
                    <button
                        aria-label="Open menu"
                        onClick={() => setDrawerOpen(true)}
                        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-lg border bg-white hover:bg-cloud"
                    >
                        <span className="block w-5 h-0.5 bg-charcoal mb-1"></span>
                        <span className="block w-5 h-0.5 bg-charcoal mb-1"></span>
                        <span className="block w-5 h-0.5 bg-charcoal"></span>
                    </button>

                    {/* Your presentational header; if you want the sentiment emoji here,
              add it inside ChatHeader later. */}
                    <h1 className="text-center text-xl md:text-2xl font-bold text-charcoal">
                        Rice Lake Communications Hub &nbsp; <span className="align-middle text-2xl md:text-3xl">{headerEmoji}</span>
                    </h1>
                    {/* Or: <ChatHeader /> if you prefer the rotating emoji/header */}
                </div>
            </header>

            {/* OVERLAY */}
            {drawerOpen && (
                <button
                    aria-label="Close menu"
                    onClick={() => setDrawerOpen(false)}
                    className="fixed inset-0 z-40 bg-black/30"
                />
            )}

            {/* DRAWER */}
            <aside
                className={`fixed z-50 left-0 top-0 h-full w-72 bg-white border-r shadow-xl transform transition-transform
                   ${drawerOpen ? "translate-x-0" : "-translate-x-full"}`}
                role="dialog"
                aria-modal="true"
            >
                <div className="p-4 border-b flex items-center justify-between">
                    <div className="font-semibold">Menu</div>
                    <button
                        onClick={() => setDrawerOpen(false)}
                        className="p-2 rounded-lg border hover:bg-cloud"
                        aria-label="Close"
                    >
                        ✕
                    </button>
                </div>
                <nav className="p-4 space-y-2">
                    <a className="block px-3 py-2 rounded hover:bg-cloud" href="#">Home</a>
                    <a className="block px-3 py-2 rounded hover:bg-cloud" href="#">Service Requests</a>
                    <a className="block px-3 py-2 rounded hover:bg-cloud" href="#">Payments</a>
                    <a className="block px-3 py-2 rounded hover:bg-cloud" href="#">Documents</a>
                    <a className="block px-3 py-2 rounded hover:bg-cloud" href="#">Meetings</a>
                    <a className="block px-3 py-2 rounded hover:bg-cloud" href="#">Settings</a>
                </nav>
            </aside>

            {/* CHAT */}
            <div className="mx-auto w-full max-w-2xl px-4 py-6">
                <ActionBar
                    recognized={recognized}
                    onLogin={() => { console.log("Login clicked"); setRecognized(true); }}
                    onAccount={() => console.log("Account clicked")}
                    onDues={() => console.log("Dues clicked")}
                    onMaintenance={() => console.log("Maintenance clicked")}
                    onCalendar={() => console.log("Calendar clicked")}
                    onFAQ={() => console.log("FAQ clicked")}
                    onContact={() => console.log("Contact clicked")}
                />
                <div className="rounded-2xl shadow-xl bg-white/85 backdrop-blur-sm border">
                    <main className="max-h-[70vh] overflow-y-auto p-4">
                        <MessageList messages={messages} />
                        {typing && (
                            <div className="mt-3 p-3 rounded-lg max-w-[60%] bg-cloud text-charcoal">
                                <div className="flex items-center gap-1">
                                    <span className="h-2 w-2 bg-charcoal/60 rounded-full animate-bounce" />
                                    <span className="h-2 w-2 bg-charcoal/60 rounded-full animate-bounce" style={{ animationDelay: "120ms" }} />
                                    <span className="h-2 w-2 bg-charcoal/60 rounded-full animate-bounce" style={{ animationDelay: "240ms" }} />
                                </div>
                            </div>
                        )}
                        <div ref={endRef} />
                    </main>

                    <ChatInputBar
                        onSend={sendMessage}
                        onUpload={(files) => console.log("upload", files)}
                        onEnableVoice={() => console.log("voice mode")}
                        onSendVoicemail={() => console.log("send voicemail")}
                        onCallManager={() => console.log("call manager")}
                        onShowActions={() => console.log("show actions")}
                        className=""
                    />
                </div>
            </div>
        </div>
    );
}
