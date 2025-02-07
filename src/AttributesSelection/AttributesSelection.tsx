import { FunctionComponent, useState } from "react";
import "./AttributesSelection.css";
import { TONE } from "../constants";
import Select from "../Components/Select/Select";
import Tooltip from "../Components/Tooltip/Tooltip";
import useFetch from "../hooks/useFetch";

const AttributesSelection: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { data, error, loading } = useFetch<{
    results: { index: string; name: string }[];
  }>(["classes", "races", "traits"]);

  console.log(error, loading);
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    setInputValue(currentInput);
  };

  return (
    <div className="attributes-selection germania-one-regular">
      <div className="input-container">
        <label htmlFor="character-name-input" className="attributes-label ">
          Character name:
        </label>

        <input
          id="character-name-input"
          className="character-name-input"
          value={inputValue}
          onChange={handleInputChange}
        />
      </div>
      <Select
        htmlFor="class-select"
        id="class-select"
        label="Class"
        options={data?.classes?.results}
        onOptionSelect={() => {}}
      />
      <Select
        htmlFor="race-select"
        id="race-select"
        label="Race"
        options={data?.races?.results}
        onOptionSelect={() => {}}
      />
      <Select
        htmlFor="traits-select"
        id="traits-select"
        label="Traits"
        options={data?.traits?.results}
        onOptionSelect={() => {}}
      />
      <Select
        htmlFor="tone-select"
        id="tone-select"
        label="Tone"
        options={TONE}
        onOptionSelect={() => {}}
        tooltip={
          <Tooltip
            tooltipContent={
              "Kid-friendly means the backstory will be light-hearted and avoid dark or mature themes. Young adult means it may incorporate darker themes while keeping it appropriate for teens."
            }
          />
        }
      />
    </div>
  );
};

export default AttributesSelection;
