import { FunctionComponent, RefObject, useState } from "react";
import Tooltip from "../Tooltip/Tooltip";
import { copyTextToClipboard, printText } from "../../helpers";
import "./TextArea.css";

type TextAreaProps = {
  ctaDisabled: boolean;
  ctaText: string;
  handleCTAClick: () => void;
  textLoading: boolean;
  textAreaRef: RefObject<HTMLTextAreaElement>;
  text: string;
  displayedText: string;
  printConfirmationText: string;
};

const TextArea: FunctionComponent<TextAreaProps> = ({
  ctaDisabled,
  ctaText,
  handleCTAClick,
  textLoading,
  textAreaRef,
  text,
  displayedText,
  printConfirmationText,
}) => {
  const [copied, setCopied] = useState(false);

  return (
    <div className="text-area">
      <button
        className="cta-btn"
        onClick={handleCTAClick}
        disabled={ctaDisabled}
      >
        {ctaText}
      </button>
      <div className="text-area-container">
        {textLoading ? (
          <div className="loader">
            <span className="material-symbols-outlined">hourglass</span>
          </div>
        ) : (
          <textarea
            ref={textAreaRef}
            id="text-area"
            className="text"
            value={displayedText}
            readOnly
          />
        )}
        <div className="text-area-controls">
          <button
            onClick={() => copyTextToClipboard(textAreaRef, text, setCopied)}
          >
            <Tooltip
              tooltipContent={copied ? "Copied!" : "Copy"}
              tooltipIcon={
                <span className="material-symbols-outlined">content_copy</span>
              }
              leftPositioned
            />
          </button>
          <button
            onClick={() => printText(printConfirmationText, displayedText)}
          >
            <Tooltip
              tooltipContent="Print"
              tooltipIcon={
                <span className="material-symbols-outlined">print</span>
              }
            />
          </button>
        </div>
      </div>
    </div>
  );
};

export default TextArea;
