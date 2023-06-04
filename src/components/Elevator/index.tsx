import { FC } from "react";
import "./index.css";

import { useElevator } from "./hooks";
import { ControlPanel } from "./parts/ControlPanel";
import { Door } from "./parts/Door";

export const Elevator: FC = () => {
  const {
    floorLabels,
    floorsToStop,
    currentFloor,
    isGoingUp,
    selectFloor,
    mode,
    keepDoorOpen,
    closeDoor,
  } = useElevator();
  return (
    <div className="Elevator">
      <Door isOpen={mode === "open" || mode === "keepOpen"} isClose={mode === "close"} />
      <ControlPanel
        floorLabels={floorLabels}
        floorsToStop={floorsToStop}
        currentFloor={currentFloor}
        isGoingUp={isGoingUp}
        onClickFloor={(floor: number) => {
          selectFloor(floor, true);
        }}
        keepDoorOpen={keepDoorOpen}
        closeDoor={closeDoor}
      />
    </div>
  );
};
