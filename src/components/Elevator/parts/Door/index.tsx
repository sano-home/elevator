import "./index.css";

import type { FC } from "react";

export const Door: FC<{
  isOpen: boolean;
  isClose: boolean;
}> = ({ isOpen, isClose }) => {
  return (
    <div className={isOpen ? "Door Door-open" : isClose ? "Door Door-close" : "Door"}>
      <div className="Door-left"></div>
      <div className="Door-right"></div>
    </div>
  );
};
