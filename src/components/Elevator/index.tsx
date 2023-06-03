import { FC } from "react";

import { useElevator } from "./hooks";
import { ControlPanel } from "./parts/ControlPanel";

export const Elevator: FC = () => {
  const { numberOfFloors, currentFloor, isGoingUp, selectFloor, mode } = useElevator();
  return (
    <>
      <ControlPanel
        numberOfFloors={numberOfFloors}
        currentFloor={currentFloor}
        isGoingUp={isGoingUp}
        onClickFloor={selectFloor}
      />
      <div>{mode}</div>
    </>
  );
};
