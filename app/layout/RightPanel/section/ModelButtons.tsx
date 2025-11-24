import React from "react";
import ButtonUI from "../../ui/Button/Button";
import useButtonHandlers from "../../ui/Button/button.handler";
import { modelPickButtons } from "../../ui/Button/button.constants";
import { ModelButtonProps } from "../../ui/Button/button.types";

function ModelButtons() {
  const handlers = useButtonHandlers();
  const buttons: ModelButtonProps[] = modelPickButtons(handlers);

  return (
    <div className="flex items-center justify-center gap-4 h-full">
      {buttons.map((btn, index) => (
        <div key={index} className="justify-center relative group inline-block">
          <div className="flex items-center justify-center">
            <ButtonUI
              variant="textOnly"
              onClick={btn.onClick ? () => btn.onClick!(btn.label) : undefined}>
              <span>{btn.name}</span>
            </ButtonUI>
          </div>
        </div>
      ))}
    </div>
  );
}

export default ModelButtons;
