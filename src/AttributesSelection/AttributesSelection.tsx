import { FunctionComponent, useEffect, useState } from "react";
// import { useRecoilState } from "recoil";
// import { classListState } from "../atoms";
import {
  fetchRaceList,
  fetchClassList,
  fetchMonsterList,
  fetchTraitsList,
} from "../api/attributesListApi";
import { AttributeType } from "../types";
import "./AttributesSelection.css";
import { CLASS_KEYS, TONE } from "../constants";

const AttributesSelection: FunctionComponent = () => {
  const [classList, setClassList] = useState<AttributeType[]>();
  const [raceList, setRaceList] = useState<AttributeType[]>();
  const [monsterList, setMonsterList] = useState<AttributeType[]>([]);
  const [traitsList, setTraitsList] = useState<AttributeType[]>([]);
  const [inputValue, setInputValue] = useState("");
  const [showInfoTooltip, setShowInfoTooltip] = useState(false);

  useEffect(() => {
    const getClassList = async () => {
      try {
        const list = await fetchClassList();
        setClassList(list.results);
      } catch (error) {
        console.error(error);
      }
    };

    const getRaceList = async () => {
      try {
        const list = await fetchRaceList();
        setRaceList(list.results);
      } catch (error) {
        console.error(error);
      }
    };

    const getMonsterList = async () => {
      try {
        const list = await fetchMonsterList();
        setMonsterList(list.results);
      } catch (error) {
        console.error(error);
      }
    };

    const getTraitsList = async () => {
      try {
        const list = await fetchTraitsList();
        setTraitsList(list.results);
      } catch (error) {
        console.error(error);
      }
    };

    getClassList();
    getRaceList();
    getMonsterList();
    getTraitsList();
  }, []);

  // const getClassDescription = async (classToFetch: string) => {
  //   try {
  //     const description = await fetchClassDescription(classToFetch);
  //     console.log("descripton", description);
  //   } catch (error) {
  //     console.error(error);
  //   }
  // };

  const handleClassSelect = async (e: React.ChangeEvent<HTMLSelectElement>) => {
    const selected = e.target.value;
    const classKey = Object.entries(CLASS_KEYS).find(
      ([, value]) => value === selected
    )?.[0];
    console.log(classKey);
    // if (classKey) {
    //   await getClassDescription(classKey);
    // }
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const currentInput = e.target.value;
    setInputValue(currentInput);
  };

  const handleInfoHover = () => {
    setShowInfoTooltip(true);
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
      <div className="select-container">
        <label htmlFor="class-select" className="attributes-label">
          Class
        </label>
        <select
          id="class-select"
          className="attribute-select"
          onChange={handleClassSelect}
        >
          {classList?.map((cl, idx) => (
            <option key={`${cl.index}-${idx}`}>{cl.name}</option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="race-select" className="attributes-label">
          Race
        </label>
        <select
          id="race-select"
          className="attribute-select"
          onChange={handleClassSelect}
        >
          {raceList?.map((race, idx) => (
            <option key={`${race.index}-${idx}`}>{race.name}</option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <label htmlFor="traits-select" className="attributes-label">
          Traits
        </label>
        <select
          id="traits-select"
          className="attribute-select"
          onChange={handleClassSelect}
        >
          {traitsList?.map((trait, idx) => (
            <option key={`${trait.index}-${idx}`}>{trait.name}</option>
          ))}
        </select>
      </div>
      <div className="select-container">
        <div className="tone-label-container">
          <label htmlFor="Tone-select" className="attributes-label">
            Tone
          </label>
          <div
            className="tooltip-container"
            onMouseOver={() => setShowInfoTooltip(true)}
            onMouseLeave={() => setShowInfoTooltip(false)}
          >
            <span className="material-symbols-outlined">info</span>
            {showInfoTooltip && (
              <div className="tooltip">
                Kid-friendly means the backstory will be light-hearted and avoid
                dark or mature themes. Young adult means it may incorporate
                darker themes while keeping it appropriate for teens.
              </div>
            )}
          </div>
        </div>
        <select
          id="Tone-select"
          className="attribute-select"
          onChange={handleClassSelect}
        >
          {Object.values(TONE).map((tone, idx) => (
            <option key={`${tone}-${idx}`}>{tone}</option>
          ))}
        </select>
      </div>
    </div>
  );
};

export default AttributesSelection;
