import { FC } from "react";
import "./index.css";

export const ControlPanel: FC<{
  floorLabels: number[];
  floorsToStop: boolean[];
  currentFloor: number;
  isGoingUp: boolean;
  onClickFloor: (floor: number) => void;
}> = ({ floorLabels, floorsToStop, currentFloor, isGoingUp, onClickFloor }) => {
  return (
    <>
      <div>
        {isGoingUp ? "↑" : "↓"}
        {currentFloor}
      </div>
      <div>
        <button>開</button>
        <button>閉</button>
        {floorLabels.map((floor) => (
          <button
            key={floor}
            onClick={() => onClickFloor(floor)}
            className={floorsToStop[floor - 1] ? "Button-selected" : ""}
          >
            {floor}
          </button>
        ))}
      </div>
    </>
  );
};
