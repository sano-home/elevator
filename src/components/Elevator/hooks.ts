import { useEffect, useState } from "react";

const NUMBER_OF_FLOORS = 10;

type MODE = "open" | "close" | "idle" | "readyToMove" | "moving";

export const useElevator = () => {
  const [currentFloor, setCurrentFloor] = useState(1);
  const [nextFloor, setNextFloor] = useState(0);
  const [isGoingUp, setIsGoingUp] = useState(true);
  const [destinationFloors, setDestinationFloors] = useState<number[]>([]);
  const [mode, setMode] = useState<MODE>("idle");

  const selectFloor = (floor: number) => {
    console.log("selectFloor", floor);
    if (floor === currentFloor) {
      return;
    }

    if (destinationFloors.includes(floor)) {
      return;
    }

    // TODO: 進行方向と逆方向の階を選択した場合もreturn

    // TODO: 次の階に移動中に次の階を選択した場合もreturn

    const newDestinationFloors = [...destinationFloors];
    newDestinationFloors.push(floor);
    setDestinationFloors(newDestinationFloors);
  };

  useEffect(() => {
    console.log(mode, destinationFloors);

    if (mode === "idle" && destinationFloors.length > 0) {
      // 出発
      setMode("moving");
    } else if (mode === "moving") {
      if (currentFloor === destinationFloors[0]) {
        // 到着
        // destinationFloorsから最初の1つを消す
        const newDestinationFloors = [...destinationFloors];
        newDestinationFloors.shift();
        setDestinationFloors(newDestinationFloors);

        // 到着したら1秒後にopenに切り替える
        setMode("open");
      } else {
        // 出発
        const isUp = currentFloor < destinationFloors[0];
        setIsGoingUp(isUp);
        setNextFloor(isUp ? currentFloor + 1 : currentFloor - 1);

        const timerId = setTimeout(() => {
          setCurrentFloor(nextFloor);
        }, 1000);
        console.log("setTimeout", timerId);

        return () => {
          console.log("clearTimeout", timerId);
          clearTimeout(timerId);
        };
      }
    } else if (mode === "open") {
      // ドアが開く
      const timerId = setTimeout(() => {
        setMode("close");
      }, 1000);
      console.log("setTimeout Open", timerId);

      return () => {
        console.log("clearTimeout Open", timerId);
        clearTimeout(timerId);
      };
    } else if (mode === "close") {
      // ドアが閉まる
      const timerId = setTimeout(() => {
        setMode("idle");
      }, 1000);

      console.log("setTimeout Close", timerId);

      return () => {
        console.log("clearTimeout Close", timerId);
        clearTimeout(timerId);
      };
    }
  }, [currentFloor, destinationFloors, mode, nextFloor]);

  return {
    numberOfFloors: NUMBER_OF_FLOORS,
    currentFloor,
    isGoingUp,
    setMode,
    selectFloor,
    mode,
  };
};
