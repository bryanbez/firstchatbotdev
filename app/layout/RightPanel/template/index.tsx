import TitlePart from "../section/Navbar";
import NavbarButtons from "../section/NavbarButtons";

function RightPanelMain() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="w-2/3">
        <TitlePart />
      </div>
      <div className="w-1/3">
        <NavbarButtons />
      </div>
    </div>
  );
}

export default RightPanelMain;
