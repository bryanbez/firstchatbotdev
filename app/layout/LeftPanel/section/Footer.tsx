import ButtonUI from "../../ui/Button/Button";
import { buttonsOnFooter } from "../../ui/Button/button.constants";
import useButtonHandlers from "../../ui/Button/button.handler";

function BottomPart() {
  const handlers = useButtonHandlers();
  const buttons = buttonsOnFooter(handlers);

  return (
    <div className="flex items-center justify-center gap-4 h-full">
      {buttons.map(({ Icon, label, tooltipLabel, onClick }, index) => (
        <div key={index} className="justify-center relative group inline-block">
          <div className="flex items-center justify-center">
            {Icon ? (
              <ButtonUI onClick={onClick}>
                <Icon />
              </ButtonUI>
            ) : (
              <ButtonUI variant="textOnly">
                <span>{label}</span>
              </ButtonUI>
            )}
            <span className="tooltip">{tooltipLabel}</span>
          </div>
        </div>
      ))}
    </div>
  );
}

export default BottomPart;
