import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Select from "../Select";
import { mockClasses } from "../../../test/mockAttributes";
import { AttributeType } from "../../../types";

const mockSelectProps = {
  htmlFor: "mock-class-select",
  id: "mock-class-select",
  label: "Class",
  options: mockClasses as AttributeType[],
  onOptionSelect: vi.fn(),
};

describe("select", () => {
  it("updates with user selection", async () => {
    render(<Select {...mockSelectProps} />);
    const classDropdown = screen.getByLabelText("Class");
    await userEvent.selectOptions(classDropdown, "Barbarian");
    expect(classDropdown).toHaveValue("Barbarian");
  });
});

describe("loading", () => {
  it("shows a loading icon when loading is true", () => {
    const loadingMockSelectProps = {
      ...mockSelectProps,
      loading: true,
    };

    render(<Select {...loadingMockSelectProps} />);
    const loadingIcon = screen.getByTestId("loading-icon");
    expect(loadingIcon).toBeInTheDocument();
  });
});

describe("error", () => {
  it("shows error text when error is true", () => {
    const errorMockSelectProps = {
      ...mockSelectProps,
      error: "error",
    };

    render(<Select {...errorMockSelectProps} />);
    const error = screen.getByTestId("error");
    expect(error).toBeInTheDocument();
  });
});
