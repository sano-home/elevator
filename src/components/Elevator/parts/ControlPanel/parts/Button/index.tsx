import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes, FC } from "react";

import "./index.css";

export const ButtonOpen: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button className="Button Button-open" type="button" {...props}>
      <FontAwesomeIcon icon={faCaretLeft} widthAuto />
      <FontAwesomeIcon icon={faCaretRight} widthAuto />
    </button>
  );
};

export const ButtonClose: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button className="Button Button-close" type="button" {...props}>
      <FontAwesomeIcon icon={faCaretRight} widthAuto />
      <span className="Icon-space" />
      <FontAwesomeIcon icon={faCaretLeft} widthAuto />
    </button>
  );
};

interface ButtonFloorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

export const ButtonFloor: FC<ButtonFloorProps> = ({ selected, ...props }) => {
  return (
    <button type="button" className={selected ? "Button Button-selected" : "Button"} {...props} />
  );
};
