import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import Header from "../Header";

// Header component uses useLocation and pathname to determine which
// 'active' button to render
describe("header links", () => {
  it("should navigate to /character onClick of Character backstory button", async () => {
    render(
      <MemoryRouter initialEntries={["/monster"]}>
        <Header />
      </MemoryRouter>
    );

    const characterBackstoryBtn = screen.getByTestId("character-link");
    userEvent.click(characterBackstoryBtn);

    const characterActiveIcon = await screen.findByTestId(
      "character-active-icon"
    );

    expect(characterActiveIcon).toBeVisible();
  });
  it("should navigate to /monster onClick of Monster encounter button", async () => {
    render(
      <MemoryRouter initialEntries={["/character"]}>
        <Header />
      </MemoryRouter>
    );

    const monsterBackstoryBtn = screen.getByTestId("monster-link");
    userEvent.click(monsterBackstoryBtn);

    const monsterActiveIcon = await screen.findByTestId("monster-active-icon");

    expect(monsterActiveIcon).toBeVisible();
  });
});
