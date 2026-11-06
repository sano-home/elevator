import "./index.css";

import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import type { FC } from "react";

export const Display: FC<{
  currentFloor: number;
  isGoingUp: boolean;
}> = ({ isGoingUp, currentFloor }) => {
  return (
    <div className="Display">
      <div className="Display-inner">
        <div className="Arrow">
          <FontAwesomeIcon icon={isGoingUp ? faArrowUp : faArrowDown} widthAuto />
        </div>
        <span className="Current-floor">{currentFloor}</span>
      </div>
    </div>
  );
};
