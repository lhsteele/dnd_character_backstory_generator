import { FunctionComponent, ReactNode, useState } from "react";
import "./Tooltip.css";

type TooltipProps = {
  tooltipContent: string;
  tooltipIcon?: ReactNode;
  leftPositioned?: boolean;
};

const Tooltip: FunctionComponent<TooltipProps> = ({
  tooltipContent,
  tooltipIcon,
  leftPositioned,
}) => {
  const [showTooltip, setShowTooltip] = useState(false);

  return (
    <div
      className="tooltip-container"
      onMouseOver={() => setShowTooltip(true)}
      onMouseLeave={() => setShowTooltip(false)}
    >
      {tooltipIcon && tooltipIcon}
      {showTooltip && (
        <div className={`tooltip ${leftPositioned ? "left-tooltip" : ""}`}>
          {tooltipContent}
        </div>
      )}
    </div>
  );
};

export default Tooltip;
