import { CloseIcon, SendIcon } from "@components/ui/Icons";
import clsx from "clsx";
import Button from "./ui/Button";
import { useState } from "react";
import { MESSAGES } from "@utils/mockup";

const ChatMessage = ({ text, type }: { text: string; type: "sent" | "received" }) => {
    const isSent = type === "sent";

    return (
        <div
            className={clsx(
                "p-4 border border-black text-sm text-black/60 bg-white",
                "rounded-t-3xl",
                isSent
                    ? "rounded-br-3xl mr-10 self-end"
                    : "rounded-bl-3xl ml-10 self-start"
            )}
        >
            <p>{text}</p>
        </div>
    );
};

const Chat = ({ isOpen, onClose }: { isOpen: boolean; onClose: () => void }) => {
    const [message, setMessage] = useState("");

    const handleSend = () => {
        if (message.trim()) {
            console.log("Sending:", message);
            setMessage("");
        }
    };

    return (
        <div
            className={clsx(
                "h-screen w-[300px] rounded-tl-3xl rounded-bl-3xl max-w-full bg-white text-black shadow-lg transition-transform duration-300 z-50 flex flex-col",
                isOpen ? "translate-x-0" : "translate-x-full"
            )}
        >
            <div className="flex justify-between items-center h-[60px] pl-5 border-b">
                <h2 className="text-lg font-semibold">Chat</h2>
                <Button onClick={onClose} variant="ghost" icon={<CloseIcon />} />
            </div>

            <div className="flex-1 p-5 space-y-5 overflow-y-scroll flex flex-col bg-black/90">
                {MESSAGES.map((msg, i) => (
                    <ChatMessage key={i} text={msg.text} type={msg.type as "sent" | "received"} />
                ))}
            </div>

            <div className="border-t flex w-full">
                <textarea
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message..."
                    className="text-sm resize-none h-[80px] outline-none w-full p-5 border-r border-black"
                />
                <div className="flex items-center">
                    <Button
                        variant="ghost"
                        onClick={handleSend}
                        icon={<SendIcon />}
                        disabled={!message.trim()}
                    />
                </div>
            </div>
        </div>
    );
};

export default Chat;
