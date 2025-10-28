import GithubIcon from "@/app/svg/github";
import GlobeIcon from "@/app/svg/globe";

function BottomPart() {
  return (
    <div className="flex items-center justify-center gap-4 h-full">
      <div className="flex items-center justify-center ">
        <button
          className="p-2 rounded-xl bg-white lifting-animation-btn"
          aria-label="Attach">
          <GlobeIcon />
        </button>
      </div>
      <div className="flex items-center justify-center ">
        <button
          className="p-2 rounded-xl bg-white lifting-animation-btn"
          aria-label="Attach">
          <GithubIcon />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="p-2 rounded-xl bg-white lifting-animation-btn"
          aria-label="Attach">
          <GlobeIcon />
        </button>
      </div>
      <div className="flex items-center justify-center">
        <button
          className="font-bold px-4 py-2 rounded-xl bg-white lifting-animation-btn"
          aria-label="Attach">
          + New Chat
        </button>
      </div>
    </div>
  );
}

export default BottomPart;
