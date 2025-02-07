import { FunctionComponent } from "react";
import { AttributeType } from "../../types";

type SelectProps = {
  htmlFor: string;
  id: string;
  label: string;
  options?: AttributeType[];
  onOptionSelect: () => void;
};

const Select: FunctionComponent<SelectProps> = ({
  htmlFor,
  id,
  label,
  options,
  onOptionSelect,
}) => {
  return (
    <div className="select-container">
      <label htmlFor={htmlFor} className="attributes-label">
        {label}
      </label>
      <select id={id} className="attribute-select" onChange={onOptionSelect}>
        {options?.map((op, idx) => (
          <option key={`${op.index}-${idx}`}>{op.name}</option>
        ))}
      </select>
    </div>
  );
};

export default Select;
