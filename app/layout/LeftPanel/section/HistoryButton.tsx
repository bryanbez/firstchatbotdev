import { useChatHistoryContext } from "@/app/context/chatHistoryContext";

function HistoryButton() {
  const { chats, displayMessages } = useChatHistoryContext();
  return (
    <>
      {!chats ? (
        <div className="font-xl"> Loading </div>
      ) : (
        chats.map((chat, index) => (
          <div
            key={chat.chat_id}
            onClick={() => displayMessages(chat.chat_id ?? "")}
            className={`rounded-xl p-3 mb-2 border border-black min-h-[10%] lifting-animation-btn
            ${index === chats.length - 1 ? "animate-slide-in" : ""}
            `}>
            <div className="text-sm">
              <p className="font-normal"> {chat.title} </p>
            </div>
          </div>
        ))
      )}
    </>
  );
}

export default HistoryButton;
