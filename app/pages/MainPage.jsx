import MainPanel from "../layout/LeftPanel/templates/MainPanel";
import ChatInterface from "../layout/RightPanel/section/ChatInterface";
import RightPanelMain from "../layout/RightPanel/template";
import Textbox from "../layout/ui/Textbox/Textbox";

function MainPage() {
  return (
    <div className="flex h-full w-full">
      <div className="w-1/3 bg-[#EAE4D5] flex flex-col gap-2">
        <MainPanel />
      </div>
      <div className="w-2/3 flex flex-col gap-2">
        <RightPanelMain />
      </div>
    </div>
  );
}

export default MainPage;
