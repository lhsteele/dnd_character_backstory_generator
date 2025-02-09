import { FunctionComponent, useEffect, useState } from "react";
import "./AttributesSelection.css";
import { TONE } from "../constants";
import Select from "../Components/Select/Select";
import Tooltip from "../Components/Tooltip/Tooltip";
import useFetch from "../hooks/useFetch";
import { generateBackstory } from "../api/backstoryApi";

const AttributesSelection: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { data, error, loading } = useFetch<{
    results: { index: string; name: string }[];
  }>(["classes", "races", "traits"]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    class?: string | undefined;
    race?: string | undefined;
    traits?: string | undefined;
    tone?: string | undefined;
  }>();
  const [backstory, setBackstory] = useState("");
  const [displayedBackstory, setDisplayedBackstory] = useState("");
  const [backstoryLoading, setBackstoryLoading] = useState(false);
  const [hasNickname, setHasNickname] = useState(false);

  useEffect(() => {
    if (!backstory) return;

    let index = 0;
    setDisplayedBackstory(backstory[0]);

    const interval = setInterval(() => {
      if (index < backstory.length - 1) {
        setDisplayedBackstory((prev) => prev + backstory[index]);
        index++;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [backstory]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setInputValue(e.target.value);
  };

  const handleSelect = (
    e: React.ChangeEvent<HTMLSelectElement>,
    optionType: string
  ) => {
    setSelectedAttributes((prev) => ({
      ...prev,
      [optionType.toLowerCase()]: e.target.value,
    }));
  };

  const handleNicknameCheck = () => {
    setHasNickname((prev) => !prev);
  };

  const handleGenerateBtnClick = () => {
    if (
      selectedAttributes?.class &&
      selectedAttributes.race &&
      selectedAttributes.traits &&
      selectedAttributes.tone
    ) {
      const { race, class: cls, traits, tone } = selectedAttributes;

      const getBackstory = async () => {
        setBackstoryLoading(true);
        try {
          const backstory = await generateBackstory(
            inputValue,
            race,
            cls,
            traits,
            tone,
            hasNickname
          );

          setBackstory(backstory);
          setBackstoryLoading(false);
        } catch (error) {
          console.error(error);
          setBackstoryLoading(false);
        }
      };

      getBackstory();
    }
  };

  return (
    <div className="attributes-selection germania-one-regular">
      <div className="attributes-selection-container">
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
          <div className="nickname-container">
            <input
              type="checkbox"
              id="nickname-checkbox"
              checked={hasNickname}
              onChange={handleNicknameCheck}
            />
            <label htmlFor="nickname-checkbox">Add nickname</label>
          </div>
        </div>
        <Select
          htmlFor="class-select"
          id="class-select"
          label="Class"
          loading={loading}
          error={error}
          options={data?.classes?.results}
          onOptionSelect={handleSelect}
        />
        <Select
          htmlFor="race-select"
          id="race-select"
          label="Race"
          loading={loading}
          error={error}
          options={data?.races?.results}
          onOptionSelect={handleSelect}
        />
        <Select
          htmlFor="traits-select"
          id="traits-select"
          label="Traits"
          loading={loading}
          error={error}
          options={data?.traits?.results}
          onOptionSelect={handleSelect}
        />
        <Select
          htmlFor="tone-select"
          id="tone-select"
          label="Tone"
          options={TONE}
          loading={loading}
          error={error}
          onOptionSelect={handleSelect}
          tooltip={
            <Tooltip
              tooltipContent={
                "Kid-friendly means the backstory will be light-hearted and avoid dark or mature themes. Young adult means it may incorporate darker themes while keeping it appropriate for teens."
              }
            />
          }
        />
      </div>
      <div className="backstory-container">
        <button className="generate-btn" onClick={handleGenerateBtnClick}>
          Generate backstory
        </button>
        <div className="backstory-text-container">
          {backstoryLoading ? (
            <div className="loader">
              <span className="material-symbols-outlined">hourglass</span>
            </div>
          ) : (
            <textarea
              id="backstory-text"
              className="backstory-text"
              value={displayedBackstory}
              readOnly
            />
          )}
        </div>
      </div>
    </div>
  );
};

export default AttributesSelection;
