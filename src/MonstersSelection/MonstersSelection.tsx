import { FunctionComponent, useEffect, useState } from "react";
import Select from "../Components/Select/Select";
import { fetchMonsterList } from "../api/attributesListApi";
import { AttributeType } from "../types";
import "./MonstersSelection.css";

const MonstersSelection: FunctionComponent = () => {
  const [monsterList, setMonsterList] = useState<AttributeType[]>([]);

  useEffect(() => {
    const getMonsterList = async () => {
      try {
        const list = await fetchMonsterList();
        setMonsterList(list.results);
      } catch (error) {
        console.error(error);
      }
    };
    getMonsterList();
  }, []);

  return (
    <div className="monsters-selection germania-one-regular">
      <Select
        htmlFor="monster-select"
        id="monster-select"
        label="Monsters"
        options={monsterList}
        onOptionSelect={() => {}}
      />
    </div>
  );
};

export default MonstersSelection;
