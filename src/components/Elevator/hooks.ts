/* eslint-disable no-debugger */
import { useCallback, useEffect, useState } from "react";

const NUMBER_OF_FLOORS = 10;
const SEC_PER_FLOOR = 1;
const SEC_KEEP_OPEN = 3;
const SEC_CLOSE = 1;

type MODE = "keepOpen" | "open" | "close" | "idle" | "moving";

const findDestinationFloor = (
  currentFloor: number,
  isGoingUp: boolean,
  floorsToStop: boolean[]
): number => {
  // currentFloorから進行方向で一番近い階を探す
  if (isGoingUp) {
    // currentFloorより上の階から探す
    const floors = floorsToStop.slice(currentFloor - 1);
    const index = floors.indexOf(true);
    if (index === -1) {
      return -1;
    }
    return index + currentFloor;
  } else {
    // currentFloorより下の階から探す
    const floors = floorsToStop.slice(0, currentFloor - 1).reverse();
    const index = floors.indexOf(true);
    if (index === -1) {
      return -1;
    }
    return currentFloor - index - 1;
  }
};

export const useElevator = () => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [nextFloor, setNextFloor] = useState(0);
  const [destinationFloor, setDestinationFloor] = useState(0);

  const [isGoingUp, setIsGoingUp] = useState(true);
  const [mode, setMode] = useState<MODE>("idle");

  // 各階の停止フラグ(true:停止する, false:停止しない)
  const [floorsToStop, setFloorsToStop] = useState<boolean[]>(
    Array.from(Array(NUMBER_OF_FLOORS), (_) => false)
  );

  // 階のラベル（1からスタート）
  const floorLabels = Array.from(Array(NUMBER_OF_FLOORS), (_, i) => i + 1);

  const selectFloor = useCallback(
    (floorLabel: number, isOn: boolean) => {
      const floor = floorLabels.indexOf(floorLabel);
      console.log("selectFloor", floorLabel, isOn);

      if (floorLabel === currentFloor && isOn) {
        return;
      }

      if (floorsToStop[floor] === isOn) {
        console.log(floorLabel, "is already", isOn);
        return;
      }

      const newValue = [...floorsToStop];
      newValue[floor] = isOn;
      setFloorsToStop(newValue);

      // 現在の階から進行方向で一番近い階を探す
      let destination = findDestinationFloor(currentFloor, isGoingUp, newValue);
      console.log("destination", destination);

      if (destination === -1) {
        destination = findDestinationFloor(currentFloor, !isGoingUp, newValue);
        setIsGoingUp(!isGoingUp);
      }

      setDestinationFloor(destination);
    },
    [currentFloor, floorLabels, floorsToStop, isGoingUp]
  );

  const keepDoorOpen = useCallback(
    (keepOpen: boolean) => {
      if (mode === "moving") {
        return;
      }

      if (keepOpen) {
        setMode("keepOpen");
      } else {
        setMode("open");
      }
    },
    [mode]
  );

  const closeDoor = useCallback(() => {
    if (mode === "open" || mode === "keepOpen") {
      setMode("close");
    }
  }, [mode]);

  useEffect(() => {
    const hasDestination = floorsToStop.some((value) => value === true);
    if (mode === "idle" && hasDestination) {
      // 出発
      setMode("moving");
    } else if (mode === "moving") {
      if (currentFloor === destinationFloor) {
        // 到着
        selectFloor(destinationFloor, false);

        // 到着したらopenに切り替える
        setMode("open");
      } else {
        // 出発
        const isUp = currentFloor < destinationFloor;
        setIsGoingUp(isUp);
        setNextFloor(isUp ? currentFloor + 1 : currentFloor - 1);

        const timerId = setTimeout(() => {
          setCurrentFloor(nextFloor);
        }, SEC_PER_FLOOR * 1000);
        // console.log("setTimeout", timerId);

        return () => {
          // console.log("clearTimeout", timerId);
          clearTimeout(timerId);
        };
      }
    } else if (mode === "open") {
      // ドアが開く
      const timerId = setTimeout(() => {
        setMode("close");
      }, SEC_KEEP_OPEN * 1000);
      // console.log("setTimeout Open", timerId);

      return () => {
        // console.log("clearTimeout Open", timerId, mode);
        clearTimeout(timerId);
      };
    } else if (mode === "close") {
      // ドアが閉まる
      const timerId = setTimeout(() => {
        setMode("idle");
      }, SEC_CLOSE * 1000);

      // console.log("setTimeout Close", timerId);

      return () => {
        // console.log("clearTimeout Close", timerId, mode);
        clearTimeout(timerId);
      };
    }
  }, [currentFloor, destinationFloor, isGoingUp, mode, nextFloor, floorsToStop, selectFloor]);

  return {
    floorLabels,
    floorsToStop,
    currentFloor,
    isGoingUp,
    setMode,
    selectFloor,
    mode,
    keepDoorOpen,
    closeDoor,
  };
};
