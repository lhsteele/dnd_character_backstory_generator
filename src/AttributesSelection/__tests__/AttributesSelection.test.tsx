import { screen } from "@testing-library/react";

test("renders character name input", () => {
  const input = screen.getByLabelText("Character name:");
  expect(input);
});
