import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import MonstersSelection from "../MonstersSelection";
import { vi } from "vitest";
import * as useRandomRoll from "../../hooks/useRandomRoll";
import * as useFetchHook from "../../hooks/useFetch";
import { mockMonsters } from "../../test/mockAttributes";

describe("random attribute selection", () => {
  const rollRandomAttributes = vi.fn();
  beforeEach(() => {
    vi.spyOn(useRandomRoll, "default").mockReturnValue({
      randomClassIdx: 0,
      randomRaceIdx: 1,
      randomTraitsIdx: 2,
      randomToneIdx: 0,
      randomMonsterIdx: 2,
      rollRandomAttributes,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls rollRandomHook", async () => {
    render(<MonstersSelection />);

    const randomButton = screen.getByTestId("random-btn");
    await userEvent.click(randomButton);
    expect(rollRandomAttributes).toHaveBeenCalled();
  });

  it("updates inputs with random values", async () => {
    const useFetchSpy = vi.spyOn(useFetchHook, "default");
    useFetchSpy.mockImplementation(() => ({
      data: {
        monsters: { results: mockMonsters },
      },
      error: "",
      loading: false,
    }));

    render(<MonstersSelection />);
    const randomButton = screen.getByTestId("random-btn");
    await userEvent.click(randomButton);

    const monsterDropdown = screen.getByLabelText("Monster");

    await waitFor(() => {
      expect(monsterDropdown).toHaveValue("Chimera");
    });
  });
});
