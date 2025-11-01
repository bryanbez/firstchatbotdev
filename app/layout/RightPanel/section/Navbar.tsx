import { useChat } from "@/app/context/chatContext";

const TitlePart = () => {
  const { currentChatSession } = useChat();
  console.log(currentChatSession?.messages?.length);
  const messagesLength = currentChatSession?.messages?.length ?? 0;

  return (
    <div className="flex flex-col justify-end items-start ml-[5%]">
      <span className="font-bold text-3xl">
        {messagesLength > 0 ? currentChatSession?.title || "Untitled Chat" : ""}
      </span>
      <span className="font-semibold text-gray-500 text-sm">
        {messagesLength > 0 ? `${messagesLength} messages` : ""}
      </span>
    </div>
  );
};

export default TitlePart;
