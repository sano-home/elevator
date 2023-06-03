import { FC } from "react";

export const ControlPanel: FC<{
  numberOfFloors: number;
  currentFloor: number;
  isGoingUp: boolean;
  onClickFloor: (floor: number) => void;
}> = ({ numberOfFloors, currentFloor, isGoingUp, onClickFloor }) => {
  // create array of floor numbers start from 1
  const floors = Array.from(Array(numberOfFloors), (_, i) => i + 1);

  return (
    <>
      <div>
        {isGoingUp ? "↑" : "↓"}
        {currentFloor}
      </div>
      <div>
        <button>開</button>
        <button>閉</button>
        {floors.map((floor) => (
          <button key={floor} onClick={() => onClickFloor(floor)}>
            {floor}
          </button>
        ))}
      </div>
    </>
  );
};
