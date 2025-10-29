import MainPanel from "../layout/LeftPanel/templates/MainPanel";
import ChatInterface from "../layout/RightPanel/section/MainSection";
import RightPanelMain from "../layout/RightPanel/template";
import Textbox from "../layout/ui/Textbox";

function MainPage() {
  return (
    <div className="flex h-full w-full ">
      <div className="w-1/3 bg-[#EAE4D5] flex flex-col gap-2">
        <MainPanel />
      </div>
      <div className="w-2/3 flex flex-col gap-2">
        <div className="flex-2 border-b border-black">
          <RightPanelMain />
        </div>
        <div className="flex-8 items-center justify-center overflow-y-auto p-4">
          <ChatInterface />
        </div>
        <div className="flex-2 items-center justify-center">
          <div className="grid place-items-center gap-4 h-full">
            <Textbox />
          </div>
        </div>
      </div>
    </div>
  );
}

export default MainPage;
