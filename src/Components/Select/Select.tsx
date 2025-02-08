import { FunctionComponent, ReactNode } from "react";
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
  onOptionSelect,
}) => {
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
          <span className="material-symbols-outlined">hourglass</span>
        </div>
      ) : error ? (
        <div role="alert" className="select-error">
          Error
        </div>
      ) : (
        <select
          id={id}
          className="attribute-select"
          onChange={(e) => onOptionSelect(e, label)}
        >
          <option value="" disabled selected>
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
