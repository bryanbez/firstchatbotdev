import BottomPart from "./BottomPart";
import HistoryButton from "./HistoryButton";

function MainComponent() {
  return (
    <>
      <div className="flex-3 flex flex-col justify-end items-start h-full ml-10">
        <h2 className="text-4xl font-bold mb-1">WebLLM Chat</h2>
        <p>A.I. Model Helper</p>
      </div>
      <div className="flex-7 items-center justify-center p-4 ">
        <HistoryButton />
      </div>
      <div className="flex-2 ">
        <BottomPart />
      </div>
    </>
  );
}

export default MainComponent;
