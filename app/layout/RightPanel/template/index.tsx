import Textbox from "../../ui/Textbox/Textbox";
import ChatInterface from "../section/ChatInterface";
import ModelButtons from "../section/ModelButtons";
import TitlePart from "../section/Navbar";
import NavbarButtons from "../section/NavbarButtons";

function RightPanelMain() {
  return (
    // <div className="flex-3 flex flex-col justify-end items-start h-full ml-10">
    //   <h2 className="text-4xl font-bold mb-1">WebLLM Chat</h2>
    //   <p>A.I. Model Helper</p>
    // </div>
    // <div className="flex-7 items-center justify-center p-4 overflow-y-auto ">
    //   <HistoryButton />
    // </div>
    // <div className="flex-2 ">
    //   <BottomPart />
    // </div>
    <>
      <div className="flex-2 flex flex-col justify-end items-start h-full ml-10">
        <div className="flex items-center justify-center h-full">
          <div className="w-2/3">
            <TitlePart />
          </div>
          <div className="w-1/3">
            <NavbarButtons />
          </div>
        </div>
      </div>

      <div className="flex-7 items-center justify-center p-4 overflow-y-auto ">
        <ChatInterface />
      </div>
      <div className="flex items-center justify-center p-4 overflow-y-auto ">
        <ModelButtons />
      </div>
      <div className="flex-2 ">
        <Textbox />
      </div>
    </>
  );
}

export default RightPanelMain;
