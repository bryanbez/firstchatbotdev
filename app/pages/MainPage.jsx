import MainPanel from "../components/LeftPanel/MainPanel";
import TitlePartButtons from "../components/LeftPanel/TitlePartButtons";
import TitlePart from "../components/TitlePart";
import ChatInteface from "./../components/ChatInterface";
import Textbox from "./../components/Textbox";

function MainPage() {
  return (
    <div className="flex h-full w-full ">
      <div className="w-1/3 bg-[#EAE4D5] flex flex-col gap-2">
        <MainPanel />
      </div>
      <div className="w-2/3 flex flex-col gap-2">
        <div className="flex-2 border-b border-black">
          <div className="flex items-center justify-center h-full">
            <div className="w-2/3">
              <TitlePart />
            </div>
            <div className="w-1/3">
              <TitlePartButtons />
            </div>
          </div>
        </div>
        <div className="flex-8 items-center justify-center overflow-y-auto p-4">
          <ChatInteface />
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
