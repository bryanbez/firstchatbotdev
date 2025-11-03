import { useChat } from "@/app/context/chatContext";
import ButtonUI, { buttonsOnNavbar } from "../../ui/Button/Button";

function NavbarButtons() {
  const { chatMessages } = useChat();
  return (
    <div className="flex items-center justify-center gap-4 h-full">
      {chatMessages.length !== 0
        ? buttonsOnNavbar.map((btn, index) => (
            <div
              key={index}
              className="justify-center relative group inline-block">
              <div className="flex items-center justify-center">
                <ButtonUI>{btn.Icon && <btn.Icon />}</ButtonUI>
                <span className="tooltip">{btn.tooltipLabel}</span>
              </div>
            </div>
          ))
        : ""}
    </div>
  );
}

export default NavbarButtons;
