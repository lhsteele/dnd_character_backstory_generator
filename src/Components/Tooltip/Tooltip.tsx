import { FunctionComponent, useState } from "react";
import "./Tooltip.css";

type TooltipProps = {
  tooltipContent: string;
};

const Tooltip: FunctionComponent<TooltipProps> = ({ tooltipContent }) => {
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseOver={() => setShowInfoTooltip(true)}
      onMouseLeave={() => setShowInfoTooltip(false)}
    >
      <span className="material-symbols-outlined">info</span>
      {showInfoTooltip && <div className="tooltip">{tooltipContent}</div>}
    </div>
  );
};

export default Tooltip;
