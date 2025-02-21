import { render, screen, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import AttributesSelection from "../AttributesSelection";
import { vi } from "vitest";
import {
  mockClasses,
  mockRaces,
  mockTraits,
} from "../../test/mockAttributes.js";
import * as useFetchHook from "../../hooks/useFetch";
import * as useRandomRoll from "../../hooks/useRandomRoll";

describe("character input", () => {
  it("displays the input", () => {
    render(<AttributesSelection />);
    const input = screen.getByLabelText("Character name:");
    expect(input).toBeVisible();
  });

  it("updates with user input", async () => {
    render(<AttributesSelection />);
    const input = screen.getByLabelText("Character name:") as HTMLInputElement;
    await userEvent.type(input, "Bilbo Baggins");
    expect(input.value).toBe("Bilbo Baggins");
  });
});

describe("random attribute selection", () => {
  const rollRandomAttributes = vi.fn();
  beforeEach(() => {
    vi.spyOn(useRandomRoll, "default").mockReturnValue({
      randomClassIdx: 0,
      randomRaceIdx: 1,
      randomTraitsIdx: 2,
      randomToneIdx: 0,
      randomMonsterIdx: 0,
      rollRandomAttributes,
    });
  });

  afterEach(() => {
    vi.restoreAllMocks();
  });

  it("calls rollRandomHook", async () => {
    render(<AttributesSelection />);

    const randomButton = screen.getByTestId("random-btn");
    await userEvent.click(randomButton);
    expect(rollRandomAttributes).toHaveBeenCalled();
  });

  it("updates inputs with random values", async () => {
    const useFetchSpy = vi.spyOn(useFetchHook, "default");
    useFetchSpy.mockImplementation(() => ({
      data: {
        classes: { results: mockClasses },
        races: { results: mockRaces },
        traits: { results: mockTraits },
      },
      error: "",
      loading: false,
    }));

    render(<AttributesSelection />);
    const randomButton = screen.getByTestId("random-btn");
    await userEvent.click(randomButton);

    const classDropdown = screen.getByLabelText("Class");
    const RaceDropdown = screen.getByLabelText("Race");
    const traitDropdown = screen.getByLabelText("Trait");

    await waitFor(() => {
      expect(classDropdown).toHaveValue("Barbarian");
      expect(RaceDropdown).toHaveValue("Elf");
      expect(traitDropdown).toHaveValue("Lucky");
    });
  });
});
