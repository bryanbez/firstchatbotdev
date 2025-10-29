import ButtonUI, { buttonsOnFooter } from "../../ui/Button";

function BottomPart() {
  return (
    <div className="flex items-center justify-center gap-4 h-full">
      {buttonsOnFooter.map((btn, index) => (
        <div key={index} className="justify-center relative group inline-block">
          <div className="flex items-center justify-center">
            {btn.Icon ? (
              <ButtonUI>
                <btn.Icon />
              </ButtonUI>
            ) : (
              <ButtonUI variant="textOnly">
                <span>{btn.label}</span>
              </ButtonUI>
            )}
            <span className="tooltip">{btn.tooltipLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomPart;
