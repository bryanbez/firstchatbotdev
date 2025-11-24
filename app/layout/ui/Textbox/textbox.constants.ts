import { TextAreaType } from "./textbox.types";
import { useTextBoxHandlers } from "./textbox.handler";

export const ChatArea = (
  handlers: ReturnType<typeof useTextBoxHandlers>
): TextAreaType => ({
  value: handlers.text,
  onChange: (e) => handlers.setText(e.target.value),
  onKeyDown: (e) =>
    handlers.handleKeyDown(e, () =>
      handlers.handleSendToBotChat(handlers.text)
    ),
  placeholder: "Type a message...",
  rows: 1,
  className:
    "w-full resize-none overflow-hidden bg-transparent focus:outline-none text-sm placeholder-gray-400 py-2",
});

// <textarea
//         ref={textareaRef}
//         value={text}
//         onChange={(e) => setText(e.target.value)}
//         onKeyDown={(e) => handleChatKeyDown(e, handleSubmit, setText)}
//         placeholder="Type a message..."
//         rows={1}
//         className="w-full resize-none overflow-hidden bg-transparent focus:outline-none text-sm placeholder-gray-400 py-2"
//       />
