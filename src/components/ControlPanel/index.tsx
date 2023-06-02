import { FC } from "react";

export const ControlPanel: FC<{
  numberOfFloors: number;
  currentFloor: number;
  isGoingUp: boolean;
}> = ({ numberOfFloors, currentFloor, isGoingUp }) => {

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
          <button key={floor}>{floor}</button>
        ))}
      </div>
    </>
  );
}
