import { render, screen, waitFor } from "@testing-library/react";
import TextArea from "../TextArea";
import userEvent from "@testing-library/user-event";

const textAreaProps = {
  ctaDisabled: true,
  ctaText: "Generate",
  handleCTAClick: vi.fn(),
  textLoading: false,
  textAreaRef: { current: null },
  text: "test text area text",
  displayedText: "test text area text",
  printConfirmationText: "printed",
};

describe("TextArea", () => {
  it("should show a disabled cta button if ctaDisabled is true", () => {
    render(<TextArea {...textAreaProps} />);
    const ctaButton = screen.getByText("Generate");
    expect(ctaButton).toHaveAttribute("disabled");
  });

  it("should render a loading icon if textLoading is true", () => {
    const updatedProps = { ...textAreaProps, textLoading: true };
    render(<TextArea {...updatedProps} />);
    const loadingIcon = screen.getByTestId("loading-icon");
    expect(loadingIcon).toBeVisible();
  });

  it("should render the displayed text if loading is false", () => {
    render(<TextArea {...textAreaProps} />);
    expect(screen.getByText(textAreaProps.displayedText)).toBeVisible();
  });

  it("should call the ctaClick function on cta button click", async () => {
    render(<TextArea {...textAreaProps} />);
    const ctaButton = screen.getByText("Generate");
    await userEvent.click(ctaButton);
    waitFor(() => expect(textAreaProps.handleCTAClick).toHaveBeenCalled());
  });
});
