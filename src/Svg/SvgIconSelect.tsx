import { FC } from "react";
import { I_SvgIcon } from "./SvgIcon";

const SvgIconSelect: FC<I_SvgIcon> = ({
  className="",
  fill="#ffffff",
  focusable=false,
  viewBox="0 0 24 24",
  OnClick
}) => {
  return (
    <svg
    onClick={OnClick}
    className={className}
    fill={fill}
    focusable={focusable}
    viewBox={viewBox}
    >
      <path d="M7 10l5 5 5-5z"></path>
    </svg>
  );
};

export { SvgIconSelect };