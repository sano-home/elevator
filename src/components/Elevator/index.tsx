import { FC } from "react";

import { useElevator } from "./hooks";
import { ControlPanel } from "./parts/ControlPanel";

export const Elevator: FC = () => {
  const { floorLabels, floorsToStop, currentFloor, isGoingUp, selectFloor, mode } = useElevator();
  return (
    <>
      <ControlPanel
        floorLabels={floorLabels}
        floorsToStop={floorsToStop}
        currentFloor={currentFloor}
        isGoingUp={isGoingUp}
        onClickFloor={(floor: number) => {
          selectFloor(floor, true);
        }}
      />
      <div>{mode}</div>
    </>
  );
};
