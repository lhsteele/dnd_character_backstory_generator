import { useState, useCallback } from "react";

const getRandomIndex = (length?: number) =>
  length ? Math.floor(Math.random() * length) : 0;

const useRandomRoll = (
  classLength?: number,
  raceLength?: number,
  traitsLength?: number
) => {
  const [randomClassIdx, setRandomClassIdx] = useState(0);
  const [randomRaceIdx, setRandomRaceIdx] = useState(0);
  const [randomTraitsIdx, setRandomTraitsIdx] = useState(0);
  const [randomToneIdx, setRandomToneIdx] = useState(0);

  const rollRandomAttributes = useCallback(() => {
    setRandomClassIdx(getRandomIndex(classLength));
    setRandomRaceIdx(getRandomIndex(raceLength));
    setRandomTraitsIdx(getRandomIndex(traitsLength));
    setRandomToneIdx(getRandomIndex(2));
  }, [classLength, raceLength, traitsLength]);

  return {
    randomClassIdx,
    randomRaceIdx,
    randomTraitsIdx,
    randomToneIdx,
    rollRandomAttributes,
  };
};

export default useRandomRoll;
