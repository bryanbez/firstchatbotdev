import ButtonUI, { buttonsOnFooter } from "../../ui/Button/Button";
import useButtonHandlers from "../../ui/Button/buttonHandlers";

function BottomPart() {
  const handlers = useButtonHandlers();
  const buttons = buttonsOnFooter(handlers);

  return (
    <div className="flex items-center justify-center gap-4 h-full">
      {buttons.map((btn, index) => (
        <div key={index} className="justify-center relative group inline-block">
          <div className="flex items-center justify-center">
            {btn.Icon ? (
              <ButtonUI onClick={btn.onClick}>
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
