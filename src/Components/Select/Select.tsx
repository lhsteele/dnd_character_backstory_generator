import { FunctionComponent, ReactNode, useEffect, useState } from "react";
import { AttributeType } from "../../types";
import "./Select.css";

type SelectProps = {
  htmlFor: string;
  id: string;
  label: string;
  options?: AttributeType[] | null;
  tooltip?: ReactNode;
  loading?: boolean;
  error?: string;
  randomizedSelection?: string;
  onOptionSelect: (
    e: React.ChangeEvent<HTMLSelectElement>,
    optionType: string
  ) => void;
};

const Select: FunctionComponent<SelectProps> = ({
  htmlFor,
  id,
  label,
  options,
  tooltip,
  loading,
  error,
  randomizedSelection,
  onOptionSelect,
}) => {
  const [selectedValue, setSelectedValue] = useState(randomizedSelection || "");

  useEffect(() => {
    if (randomizedSelection) {
      setSelectedValue(randomizedSelection);
    }
  }, [randomizedSelection]);

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    label: string
  ) => {
    setSelectedValue(e.target.value);
    onOptionSelect(e, label);
  };
  return (
    <div className="select-container">
      <div className="select-label-container">
        <label htmlFor={htmlFor} className="attributes-label">
          {label}
        </label>
        {tooltip && tooltip}
      </div>
      {loading ? (
        <div aria-busy="true">
          <span
            className="material-symbols-outlined"
            data-testid="loading-icon"
          >
            hourglass
          </span>
        </div>
      ) : error ? (
        <div role="alert" className="select-error" data-testid="error">
          Error
        </div>
      ) : (
        <select
          id={id}
          className="attribute-select"
          onChange={(e) => handleSelect(e, label)}
          value={selectedValue}
        >
          <option value="" disabled>
            {`Select ${label.toLowerCase()}`}
          </option>
          {options?.map((op, idx) => (
            <option key={op.index ?? `${op.name}-${idx}`}>{op.name}</option>
          ))}
        </select>
      )}
    </div>
  );
};

export default Select;
