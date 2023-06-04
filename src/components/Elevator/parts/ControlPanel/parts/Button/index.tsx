import { faCaretLeft, faCaretRight } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { ButtonHTMLAttributes, FC } from "react";

import "./index.css";

export const ButtonOpen: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button className="Button Button-open" {...props}>
      <FontAwesomeIcon icon={faCaretLeft} />
      <FontAwesomeIcon icon={faCaretRight} />
    </button>
  );
};

export const ButtonClose: FC<ButtonHTMLAttributes<HTMLButtonElement>> = ({ ...props }) => {
  return (
    <button className="Button Button-close" {...props}>
      <FontAwesomeIcon icon={faCaretRight} />
      <span className="Icon-space" />
      <FontAwesomeIcon icon={faCaretLeft} />
    </button>
  );
};

interface ButtonFloorProps extends ButtonHTMLAttributes<HTMLButtonElement> {
  selected: boolean;
}

export const ButtonFloor: FC<ButtonFloorProps> = ({ selected, ...props }) => {
  return <button className={selected ? "Button Button-selected" : "Button"} {...props} />;
};
