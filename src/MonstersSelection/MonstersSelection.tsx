import { FunctionComponent } from "react";
import Select from "../Components/Select/Select";
import "./MonstersSelection.css";
import useFetch from "../hooks/useFetch";

const MonstersSelection: FunctionComponent = () => {
  const { data, error, loading } = useFetch<{
    results: { index: string; name: string }[];
  }>(["monsters"]);

  console.log(error, loading);

  return (
    <div className="monsters-selection germania-one-regular">
      <Select
        htmlFor="monster-select"
        id="monster-select"
        label="Monsters"
        options={data.monsters?.results}
        onOptionSelect={() => {}}
      />
    </div>
  );
};

export default MonstersSelection;
