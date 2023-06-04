import { faArrowUp, faArrowDown } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { FC } from "react";
import "./index.css";

export const Display: FC<{
  currentFloor: number;
  isGoingUp: boolean;
}> = ({ isGoingUp, currentFloor }) => {
  return (
    <div className="Display">
      <div className="Display-inner">
        <div className="Arrow">
          <FontAwesomeIcon icon={isGoingUp ? faArrowUp : faArrowDown} />
        </div>
        <span className="Current-floor">{currentFloor}</span>
      </div>
    </div>
  );
};
