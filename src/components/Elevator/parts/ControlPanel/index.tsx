import "./index.css";

import type { FC } from "react";

import { ButtonClose, ButtonFloor, ButtonOpen } from "./parts/Button";
import { Display } from "./parts/Display";

export const ControlPanel: FC<{
  floorLabels: number[];
  floorsToStop: boolean[];
  currentFloor: number;
  isGoingUp: boolean;
  onClickFloor: (floor: number) => void;
  keepDoorOpen: (keepOpen: boolean) => void;
  closeDoor: () => void;
}> = ({
  floorLabels,
  floorsToStop,
  currentFloor,
  isGoingUp,
  onClickFloor,
  keepDoorOpen,
  closeDoor,
}) => {
  return (
    <div className="Control-panel">
      <Display currentFloor={currentFloor} isGoingUp={isGoingUp} />
      <div className="Controller">
        <ButtonOpen
          onPointerDown={() => keepDoorOpen(true)}
          onPointerUp={() => keepDoorOpen(false)}
          onPointerLeave={() => keepDoorOpen(false)}
          onPointerCancel={() => keepDoorOpen(false)}
        />
        <ButtonClose onPointerDown={closeDoor} />
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
