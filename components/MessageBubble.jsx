import React from "react";

export default function MessageBubble({ role, text }) {
  const isUser = role === "user";
  const base = "max-w-[85%] rounded-2xl px-3 py-2 shadow-sm text-sm";
  const userStyles = "bg-blue-600 text-white rounded-br-md";
  const botStyles = "bg-white border rounded-bl-md";
  return <div className={`${base} ${isUser ? userStyles : botStyles}`}>{text}</div>;
}
