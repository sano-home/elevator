import { FC } from "react";

import "./index.css";
import { ButtonClose, ButtonFloor, ButtonOpen } from "./parts/Button";
import { Display } from "./parts/Display";

export const ControlPanel: FC<{
  floorLabels: number[];
  floorsToStop: boolean[];
  currentFloor: number;
  isGoingUp: boolean;
  onClickFloor: (floor: number) => void;
}> = ({ floorLabels, floorsToStop, currentFloor, isGoingUp, onClickFloor }) => {
  return (
    <div className="Control-panel">
      <Display currentFloor={currentFloor} isGoingUp={isGoingUp} />
      <div className="Controller">
        <ButtonOpen />
        <ButtonClose />
        {floorLabels.map((floor) => (
          <ButtonFloor
            key={floor}
            onClick={() => onClickFloor(floor)}
            selected={floorsToStop[floor - 1]}
          >
            {floor}
          </ButtonFloor>
        ))}
      </div>
    </div>
  );
};
