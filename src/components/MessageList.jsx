// src/components/MessageList.jsx
export default function MessageList({ messages = [] }) {
  if (!messages.length) {
    return (
        <div className="h-[40vh] grid place-items-center text-sm text-black/50">
          Start the conversation…
        </div>
    );
  }

  return (
      <div className="flex flex-col gap-2">
        {messages.map((m) => {
          const isUser = m.role === "user";
          return (
              <div
                  key={m.id}
                  className={[
                    "max-w-[82%] px-3.5 py-2.5 rounded-xl text-[16px] leading-snug border",
                    isUser
                        ? "self-end bg-cherry text-white border-transparent"
                        : "self-start bg-beige border-black/10"
                  ].join(" ")}
              >
                  {m.text}
                  {m.time && (
                      <div className="mt-1 text-xs text-black/50">
                        {new Date(m.time).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })}
                      </div>
                  )}
              </div>
          );
        })}
      </div>
  );
}
