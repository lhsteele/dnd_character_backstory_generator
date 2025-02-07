import { FunctionComponent, ReactNode } from "react";
import { AttributeType } from "../../types";
import "./Select.css";

type SelectProps = {
  htmlFor: string;
  id: string;
  label: string;
  options?: AttributeType[] | null;
  tooltip?: ReactNode;
  onOptionSelect: () => void;
};

const Select: FunctionComponent<SelectProps> = ({
  htmlFor,
  id,
  label,
  options,
  tooltip,
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
      <select id={id} className="attribute-select" onChange={onOptionSelect}>
        {options?.map((op, idx) => (
          <option key={`${op.index}-${idx}`}>{op.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
