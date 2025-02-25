import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import "./AttributesSelection.css";
import { TONE } from "../constants";
import Select from "../Components/Select/Select";
import Tooltip from "../Components/Tooltip/Tooltip";
import useFetch from "../hooks/useFetch";
import { generateBackstory } from "../api/backstoryApi";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import useRandomRoll from "../hooks/useRandomRoll";
import { generateRandomCharacterName } from "../api/randomCharacterNameApi";
import TextArea from "../Components/TextArea/TextArea";

const AttributesSelection: FunctionComponent = () => {
  const [inputValue, setInputValue] = useState("");
  const { data, error, loading } = useFetch<{
    results: { index: string; name: string }[];
  }>(["classes", "races", "traits"]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    class?: string | undefined;
    race?: string | undefined;
    trait?: string | undefined;
    tone?: string | undefined;
  }>();
  const [randomizedAttributes, setRandomizedAttributes] = useState<{
    class?: string | undefined;
    race?: string | undefined;
    trait?: string | undefined;
    tone?: string | undefined;
  }>();
  const [backstory, setBackstory] = useState("");
  const [displayedBackstory, setDisplayedBackstory] = useState("");
  const [backstoryLoading, setBackstoryLoading] = useState(false);
  const [hasNickname, setHasNickname] = useState(false);
  const [randomGenerationLoading, setRandomGenerationLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

  const {
    randomClassIdx,
    randomRaceIdx,
    randomTraitsIdx,
    randomToneIdx,
    rollRandomAttributes,
  } = useRandomRoll(
    data?.classes?.results.length,
    data?.races?.results.length,
    data?.traits?.results.length
  );

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

  const getRandomCharacterName = async () => {
    setRandomGenerationLoading(true);
    try {
      const { name } = await generateRandomCharacterName();
      setInputValue(name);
    } catch (error) {
      const e = error as Error;
      console.error(e);
    }
    setRandomGenerationLoading(false);
  };

  const handleRandomize = () => {
    rollRandomAttributes();
    const currentRandomAttributes = { ...randomizedAttributes };
    currentRandomAttributes.class = data?.classes?.results[randomClassIdx].name;
    currentRandomAttributes.race = data?.races?.results[randomRaceIdx].name;
    currentRandomAttributes.trait = data?.traits?.results[randomTraitsIdx].name;
    currentRandomAttributes.tone = TONE[randomToneIdx].name;
    setRandomizedAttributes(currentRandomAttributes);
    setSelectedAttributes(currentRandomAttributes);
    getRandomCharacterName();
  };

  const handleGenerateBtnClick = () => {
    if (
      selectedAttributes?.class &&
      selectedAttributes.race &&
      selectedAttributes.trait &&
      selectedAttributes.tone
    ) {
      const { race, class: cls, trait, tone } = selectedAttributes;

      const getBackstory = async () => {
        setBackstoryLoading(true);
        try {
          const backstory = await generateBackstory(
            inputValue,
            race,
            cls,
            trait,
            tone,
            hasNickname
          );

          setBackstory(backstory);
          setBackstoryLoading(false);
        } catch (error) {
          const e = error as Error;
          console.error(e);
          setBackstoryLoading(false);
        }
      };

      getBackstory();
    }
  };

  const optionsFullyFilled = useMemo(() => {
    const requiredKeys = ["class", "race", "trait", "tone"];

    const selectedAttributesIsFullyFilled =
      selectedAttributes &&
      requiredKeys.every(
        (key) =>
          selectedAttributes[key as keyof typeof selectedAttributes] !==
          undefined
      );
    const randomAttributesIsFullyFilled =
      randomizedAttributes &&
      requiredKeys.every(
        (key) =>
          randomizedAttributes[key as keyof typeof selectedAttributes] !==
          undefined
      );

    return (
      inputValue &&
      (selectedAttributesIsFullyFilled || randomAttributesIsFullyFilled)
    );
  }, [inputValue, selectedAttributes, randomizedAttributes]);

  return (
    <div className="attributes-selection">
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
          randomizedSelection={randomizedAttributes?.class}
        />
        <Select
          htmlFor="race-select"
          id="race-select"
          label="Race"
          loading={loading}
          error={error}
          options={data?.races?.results}
          onOptionSelect={handleSelect}
          randomizedSelection={randomizedAttributes?.race}
        />
        <Select
          htmlFor="traits-select"
          id="traits-select"
          label="Trait"
          loading={loading}
          error={error}
          options={data?.traits?.results}
          onOptionSelect={handleSelect}
          randomizedSelection={randomizedAttributes?.trait}
        />
        <Select
          htmlFor="tone-select"
          id="tone-select"
          label="Tone"
          options={TONE}
          loading={loading}
          error={error}
          onOptionSelect={handleSelect}
          randomizedSelection={randomizedAttributes?.tone}
          tooltip={
            <Tooltip
              tooltipContent={
                "Kid-friendly means the backstory will be light-hearted and avoid dark or mature themes. Young adult means it may incorporate darker themes while keeping it appropriate for teens."
              }
              tooltipIcon={
                <span className="material-symbols-outlined">info</span>
              }
            />
          }
        />
        {randomGenerationLoading ? (
          <div className="loader">
            <span className="material-symbols-outlined">hourglass</span>
          </div>
        ) : (
          <div className="randomizer-btn-container">
            <label>Random</label>
            <button data-testid="random-btn" onClick={handleRandomize}>
              <FontAwesomeIcon icon={faDiceD20} size="2x" />
            </button>
          </div>
        )}
      </div>
      <TextArea
        ctaDisabled={!optionsFullyFilled}
        ctaText="Generate backstory"
        handleCTAClick={handleGenerateBtnClick}
        textLoading={backstoryLoading}
        textAreaRef={textAreaRef}
        text={backstory}
        displayedText={displayedBackstory}
        printConfirmationText={`${inputValue}'s Backstory`}
      />
    </div>
  );
};

export default AttributesSelection;
