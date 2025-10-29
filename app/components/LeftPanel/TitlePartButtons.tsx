import DownloadIcon from "@/app/svg/download";
import ShareIcon from "@/app/svg/share";

function TitlePartButtons() {
  return (
    <div className="flex items-center justify-center gap-4 h-full">
      <div className="justify-center relative group inline-block">
        <button
          className="p-2 rounded-xl bg-white lifting-animation-btn"
          aria-label="Attach">
          <DownloadIcon />
        </button>
        <span className="tooltip">Download</span>
      </div>
      <div className="justify-center relative group inline-block">
        <button
          className="p-2 rounded-xl bg-white lifting-animation-btn"
          aria-label="Attach">
          <ShareIcon />
        </button>
        <span className="tooltip">Share</span>
      </div>
    </div>
  );
}

export default TitlePartButtons;
