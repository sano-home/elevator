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
    <div className="Container">
      <div className="Display">
        {isGoingUp ? "↑" : "↓"}
        {currentFloor}
      </div>
      <div className="Controller">
        <button className="Button">閉</button>
        <button className="Button">開</button>
        {floorLabels.map((floor) => (
          <button
            key={floor}
            onClick={() => onClickFloor(floor)}
            className={floorsToStop[floor - 1] ? "Button Button-selected" : "Button"}
          >
            {floor}
          </button>
        ))}
      </div>
    </div>
  );
};
