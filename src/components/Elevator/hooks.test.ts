import { act, renderHook } from "@testing-library/react";
import { afterEach, beforeEach, describe, expect, it, vi } from "vitest";

import { useElevator } from "./hooks";

// Advance in small steps so that timers scheduled by effects in between are
// picked up, as they would be in a browser.
const advance = (sec: number) => {
  for (let ms = 0; ms < Math.round(sec * 1000); ms += 100) {
    act(() => {
      vi.advanceTimersByTime(100);
    });
  }
};

const setup = () => renderHook(() => useElevator());

beforeEach(() => {
  vi.useFakeTimers();
});

afterEach(() => {
  vi.useRealTimers();
});

describe("useElevator", () => {
  it("starts idle on the 1st floor going up", () => {
    const { result } = setup();
    expect(result.current.currentFloor).toBe(1);
    expect(result.current.mode).toBe("idle");
    expect(result.current.isGoingUp).toBe(true);
    expect(result.current.floorLabels).toEqual([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]);
    expect(result.current.floorsToStop.every((v) => !v)).toBe(true);
  });

  it("moves one floor per second, opens on arrival, then closes and idles", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(3));
    expect(result.current.mode).toBe("moving");
    expect(result.current.floorsToStop[2]).toBe(true);

    advance(1);
    expect(result.current.currentFloor).toBe(2);
    expect(result.current.mode).toBe("moving");

    advance(1);
    expect(result.current.currentFloor).toBe(3);
    expect(result.current.mode).toBe("open");
    expect(result.current.floorsToStop[2]).toBe(false);

    advance(2.9);
    expect(result.current.mode).toBe("open");
    advance(0.1);
    expect(result.current.mode).toBe("close");

    advance(1);
    expect(result.current.mode).toBe("idle");
    expect(result.current.currentFloor).toBe(3);
  });

  it("ignores selecting the current floor", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(1));
    expect(result.current.mode).toBe("idle");
    expect(result.current.floorsToStop[0]).toBe(false);
  });

  it("flips the direction indicator after arriving with no further requests", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(2));
    advance(1);
    expect(result.current.currentFloor).toBe(2);
    expect(result.current.mode).toBe("open");
    expect(result.current.isGoingUp).toBe(false);
  });

  it("keeps going in the current direction before serving floors behind", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(5));
    advance(2);
    expect(result.current.currentFloor).toBe(3);

    act(() => result.current.selectFloor(2));
    expect(result.current.isGoingUp).toBe(true);

    advance(2);
    expect(result.current.currentFloor).toBe(5);
    expect(result.current.mode).toBe("open");
    expect(result.current.isGoingUp).toBe(false);

    advance(3); // open -> close
    advance(1); // close -> idle -> moving
    expect(result.current.mode).toBe("moving");

    advance(3);
    expect(result.current.currentFloor).toBe(2);
    expect(result.current.mode).toBe("open");
  });

  it("serves a request selected while the door is open after it closes", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(2));
    advance(1);
    expect(result.current.mode).toBe("open");

    act(() => result.current.selectFloor(4));
    expect(result.current.mode).toBe("open");

    advance(3);
    expect(result.current.mode).toBe("close");
    advance(1);
    expect(result.current.mode).toBe("moving");
    expect(result.current.isGoingUp).toBe(true);

    advance(2);
    expect(result.current.currentFloor).toBe(4);
    expect(result.current.mode).toBe("open");
  });

  it("keeps the door open while the open button is held", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(2));
    advance(1);
    expect(result.current.mode).toBe("open");

    act(() => result.current.keepDoorOpen(true));
    expect(result.current.mode).toBe("keepOpen");
    advance(10);
    expect(result.current.mode).toBe("keepOpen");

    act(() => result.current.keepDoorOpen(false));
    expect(result.current.mode).toBe("open");
    advance(3);
    expect(result.current.mode).toBe("close");
  });

  it("reopens the door when the open button is pressed while closing", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(2));
    advance(1 + 3);
    expect(result.current.mode).toBe("close");

    act(() => result.current.keepDoorOpen(true));
    expect(result.current.mode).toBe("keepOpen");
  });

  it("opens the door from idle with the open button", () => {
    const { result } = setup();
    act(() => result.current.keepDoorOpen(true));
    expect(result.current.mode).toBe("keepOpen");
    act(() => result.current.keepDoorOpen(false));
    expect(result.current.mode).toBe("open");
    advance(3 + 1);
    expect(result.current.mode).toBe("idle");
  });

  it("ignores releasing the open button when it was not held", () => {
    const { result } = setup();
    act(() => result.current.keepDoorOpen(false));
    expect(result.current.mode).toBe("idle");
  });

  it("closes the door immediately with the close button", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(2));
    advance(1);
    expect(result.current.mode).toBe("open");

    act(() => result.current.closeDoor());
    expect(result.current.mode).toBe("close");
    advance(1);
    expect(result.current.mode).toBe("idle");
  });

  it("ignores the door buttons while moving", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(3));
    act(() => result.current.keepDoorOpen(true));
    expect(result.current.mode).toBe("moving");
    act(() => result.current.closeDoor());
    expect(result.current.mode).toBe("moving");
  });

  it("does not delay movement when another floor is selected while moving", () => {
    const { result } = setup();
    act(() => result.current.selectFloor(5));
    advance(0.6);
    act(() => result.current.selectFloor(8));
    advance(0.4);
    expect(result.current.currentFloor).toBe(2);
  });
});
