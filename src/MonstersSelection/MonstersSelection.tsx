import { FunctionComponent, useEffect, useRef, useState } from "react";
import Select from "../Components/Select/Select";
import "./MonstersSelection.css";
import useFetch from "../hooks/useFetch";
import { generateMonsterEncounter } from "../api/monsterEncounterApi";
import Tooltip from "../Components/Tooltip/Tooltip";
import { TONE } from "../constants";
import TextArea from "../Components/TextArea/TextArea";

const MonstersSelection: FunctionComponent = () => {
  const { data, error, loading } = useFetch<{
    results: { index: string; name: string }[];
  }>(["monsters"]);
  const [selectedAttributes, setSelectedAttributes] = useState<{
    tone?: string | undefined;
    monster?: string | undefined;
  }>();
  // const [randomizedAttributes, setRandomizedAttributes] = useState<{
  //   tone?: string | undefined;
  //   monsterType?: string | undefined;
  // }>();
  const [encounterLoading, setEncounterLoading] = useState(false);
  const [encounter, setEncounter] = useState("");
  const [displayedEncounter, setDisplayedEncounter] = useState("");
  const textAreaRef = useRef<HTMLTextAreaElement>(null);

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
    console.log(selectedAttributes);
    const getEncounter = async () => {
      if (selectedAttributes?.monster && selectedAttributes.tone) {
        setEncounterLoading(true);
        const { monster, tone } = selectedAttributes;

        try {
          const encounter = await generateMonsterEncounter(monster, tone);
          console.log(encounter);
          setEncounter(encounter);
        } catch (error) {
          console.error(error);
        }
        setEncounterLoading(false);
      }
    };
    getEncounter();
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

  return (
    <div className="monster-selection ">
      <div className="monster-selection-container">
        <Select
          htmlFor="monster-select"
          id="monster-select"
          label="Monster"
          options={data.monsters?.results}
          error={error}
          loading={loading}
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
          // randomizedSelection={randomizedAttributes?.tone}
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
      <TextArea
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
