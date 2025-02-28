import { FunctionComponent, useEffect, useMemo, useRef, useState } from "react";
import Select from "../Components/Select/Select";
import "./MonstersSelection.css";
import useFetch from "../hooks/useFetch";
import { generateMonsterEncounter } from "../api/monsterEncounterApi";
import Tooltip from "../Components/Tooltip/Tooltip";
import { TONE } from "../constants";
import TextArea from "../Components/TextArea/TextArea";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faDiceD20 } from "@fortawesome/free-solid-svg-icons";
import useRandomRoll from "../hooks/useRandomRoll";
import { requestWithinLimitCount } from "../helpers";

const MonstersSelection: FunctionComponent = () => {
  const { data, error, loading } = useFetch<{
    results: { index: string; name: string }[];
  }>(["monsters"]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    tone?: string | undefined;
    monster?: string | undefined;
  }>();
  const [randomizedAttributes, setRandomizedAttributes] = useState<{
    tone?: string | undefined;
    monster?: string | undefined;
  }>();
  const [encounterLoading, setEncounterLoading] = useState(false);
  const [encounter, setEncounter] = useState("");
  const [displayedEncounter, setDisplayedEncounter] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const [randomGenerationLoading, setRandomGenerationLoading] = useState(false);
  const [generateLimitError, setGenerateLimitError] = useState("");

  const { randomMonsterIdx, randomToneIdx, rollRandomAttributes } =
    useRandomRoll(0, 0, 0, data?.monsters?.results.length);

  useEffect(() => {
    if (!encounter) return;

    let index = 0;
    setDisplayedEncounter(encounter[0]);

    const interval = setInterval(() => {
      if (index < encounter.length - 1) {
        setDisplayedEncounter((prev) => prev + encounter[index]);
        index++;
      }
    }, 50);

    return () => clearInterval(interval);
  }, [encounter]);

  const handleGenerateBtnClick = () => {
    const getEncounter = async () => {
      if (selectedAttributes?.monster && selectedAttributes.tone) {
        setEncounterLoading(true);
        const { monster, tone } = selectedAttributes;

        try {
          const encounter = await generateMonsterEncounter(monster, tone);
          setEncounter(encounter);
        } catch (error) {
          const e = error as Error;
          console.error(e);
        }
        setEncounterLoading(false);
      }
    };

    if (!requestWithinLimitCount("monster")) {
      setGenerateLimitError(
        "You've reached your daily limit of 5 encounter requests. Please try again tomorrow."
      );
      return;
    } else {
      getEncounter();
    }
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

  const handleRandomize = () => {
    setRandomGenerationLoading(true);
    rollRandomAttributes();
    const currentRandomAttributes = { ...randomizedAttributes };
    currentRandomAttributes.monster =
      data?.monsters?.results[randomMonsterIdx].name;
    currentRandomAttributes.tone = TONE[randomToneIdx].name;
    setRandomizedAttributes(currentRandomAttributes);
    setSelectedAttributes(currentRandomAttributes);
    setRandomGenerationLoading(false);
  };

  const optionsFullyFilled = useMemo(() => {
    const requiredKeys = ["monster", "tone"];

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

    return selectedAttributesIsFullyFilled || randomAttributesIsFullyFilled;
  }, [selectedAttributes, randomizedAttributes]);

  return (
    <div className="monster-selection ">
      <div className="monster-selection-container">
        <div className="monster-selection-dropdowns">
          <Select
            htmlFor="monster-select"
            id="monster-select"
            label="Monster"
            options={data.monsters?.results}
            error={error}
            loading={loading}
            onOptionSelect={handleSelect}
            randomizedSelection={randomizedAttributes?.monster}
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
        </div>
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
      {generateLimitError ? (
        <span className="generate-limit-error">{generateLimitError}</span>
      ) : null}
      <TextArea
        ctaDisabled={!optionsFullyFilled}
        ctaText="Generate encounter"
        handleCTAClick={handleGenerateBtnClick}
        textLoading={encounterLoading}
        textAreaRef={textAreaRef}
        text={encounter}
        displayedText={displayedEncounter}
        printConfirmationText={`${selectedAttributes?.monster} encounter`}
      />
    </div>
  );
};

export default MonstersSelection;
