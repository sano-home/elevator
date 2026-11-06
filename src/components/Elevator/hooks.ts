import { useCallback, useEffect, useReducer } from "react";

const NUMBER_OF_FLOORS = 10;
const SEC_PER_FLOOR = 1;
const SEC_KEEP_OPEN = 3;
const SEC_CLOSE = 1;

// 階のラベル（1からスタート）
const FLOOR_LABELS = Array.from({ length: NUMBER_OF_FLOORS }, (_, i) => i + 1);

export type Mode = "keepOpen" | "open" | "close" | "idle" | "moving";

type State = {
  currentFloor: number;
  isGoingUp: boolean;
  mode: Mode;
  // 各階の停止フラグ(true:停止する, false:停止しない)
  floorsToStop: boolean[];
};

type Action =
  | { type: "selectFloor"; floor: number }
  | { type: "step" }
  | { type: "keepDoorOpen"; keepOpen: boolean }
  | { type: "closeDoor" }
  | { type: "doorTimeout" };

const initialState: State = {
  currentFloor: 1,
  isGoingUp: true,
  mode: "idle",
  floorsToStop: Array.from({ length: NUMBER_OF_FLOORS }, () => false),
};

// currentFloorから進行方向で一番近い停止階を探す（なければ -1）
const findDestinationFloor = (
  currentFloor: number,
  isGoingUp: boolean,
  floorsToStop: boolean[]
): number => {
  if (isGoingUp) {
    const index = floorsToStop.indexOf(true, currentFloor - 1);
    return index === -1 ? -1 : index + 1;
  }
  const index = floorsToStop.lastIndexOf(true, currentFloor - 2);
  return currentFloor < 2 || index === -1 ? -1 : index + 1;
};

// 進行方向に停止階がなければ方向を反転する
const resolveDirection = (
  currentFloor: number,
  isGoingUp: boolean,
  floorsToStop: boolean[]
): boolean =>
  findDestinationFloor(currentFloor, isGoingUp, floorsToStop) === -1 ? !isGoingUp : isGoingUp;

const hasDestination = (floorsToStop: boolean[]) => floorsToStop.includes(true);

const setStop = (floorsToStop: boolean[], floor: number, value: boolean) =>
  floorsToStop.map((v, i) => (i === floor - 1 ? value : v));

const reducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "selectFloor": {
      const index = action.floor - 1;
      if (action.floor === state.currentFloor || state.floorsToStop[index]) {
        return state;
      }
      const floorsToStop = setStop(state.floorsToStop, action.floor, true);
      return {
        ...state,
        floorsToStop,
        isGoingUp: resolveDirection(state.currentFloor, state.isGoingUp, floorsToStop),
        // 停止中なら出発
        mode: state.mode === "idle" ? "moving" : state.mode,
      };
    }

    case "step": {
      if (state.mode !== "moving") {
        return state;
      }
      const destination = findDestinationFloor(
        state.currentFloor,
        state.isGoingUp,
        state.floorsToStop
      );
      if (destination === -1) {
        return { ...state, mode: "idle" };
      }
      const currentFloor = state.currentFloor + (state.isGoingUp ? 1 : -1);
      if (currentFloor !== destination) {
        return { ...state, currentFloor };
      }
      // 到着したらドアを開ける
      const floorsToStop = setStop(state.floorsToStop, destination, false);
      return {
        currentFloor,
        floorsToStop,
        isGoingUp: resolveDirection(currentFloor, state.isGoingUp, floorsToStop),
        mode: "open",
      };
    }

    case "keepDoorOpen":
      if (action.keepOpen) {
        return state.mode === "moving" ? state : { ...state, mode: "keepOpen" };
      }
      return state.mode === "keepOpen" ? { ...state, mode: "open" } : state;

    case "closeDoor":
      return state.mode === "open" || state.mode === "keepOpen"
        ? { ...state, mode: "close" }
        : state;

    case "doorTimeout":
      if (state.mode === "open") {
        return { ...state, mode: "close" };
      }
      if (state.mode === "close") {
        // 停止階が残っていれば出発
        return { ...state, mode: hasDestination(state.floorsToStop) ? "moving" : "idle" };
      }
      return state;
  }
};

const TIMER_SEC: Partial<Record<Mode, number>> = {
  moving: SEC_PER_FLOOR,
  open: SEC_KEEP_OPEN,
  close: SEC_CLOSE,
};

export const useElevator = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const { mode, currentFloor } = state;

  // 移動中は1階ごと、ドアは開閉状態ごとにタイマーを張る。
  // 階の選択では張り直さない（依存は mode と currentFloor のみ）。
  useEffect(() => {
    const sec = TIMER_SEC[mode];
    if (sec === undefined) {
      return;
    }
    const timerId = setTimeout(() => {
      dispatch(mode === "moving" ? { type: "step" } : { type: "doorTimeout" });
    }, sec * 1000);
    return () => clearTimeout(timerId);
  }, [mode, currentFloor]);

  const selectFloor = useCallback((floor: number) => dispatch({ type: "selectFloor", floor }), []);
  const keepDoorOpen = useCallback(
    (keepOpen: boolean) => dispatch({ type: "keepDoorOpen", keepOpen }),
    []
  );
  const closeDoor = useCallback(() => dispatch({ type: "closeDoor" }), []);

  return {
    ...state,
    floorLabels: FLOOR_LABELS,
    selectFloor,
    keepDoorOpen,
    closeDoor,
  };
};
