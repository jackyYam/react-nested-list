/**
 * @jest-environment jsdom
 */

import "@testing-library/jest-dom";
import { render, fireEvent, within } from "@testing-library/react";
import App from "./App";

describe("App", () => {
  it("renders correctly", () => {
    const { getByText } = render(<App />);
    expect(getByText("Item 1")).toBeInTheDocument();
    expect(getByText("Item 2")).toBeInTheDocument();
    // Add more assertions for the initial state as needed.
  });
  it("The accordian works correctly", () => {
    const { getByText } = render(<App />);
    const button = getByText("Item 1");
    fireEvent.click(button);
    expect(getByText("Item 1.1")).toBeInTheDocument();
  });
  it("Add a root item", () => {
    const { getByPlaceholderText, getByText } = render(<App />);
    const input = getByPlaceholderText("New Root Item") as HTMLInputElement; // Specify the type as HTMLInputElement
    fireEvent.change(input, { target: { value: "New Item Test" } });
    expect(input.value).toBe("New Item Test");

    const button = getByText("Add");
    fireEvent.click(button);

    expect(getByText("New Item Test")).toBeInTheDocument();
  });
  it("Display Input Field when edit Icon is clicked", () => {
    const { getByTestId, getByDisplayValue } = render(<App />);
    const pathID = [0].join("-");
    const pencilId = `pencil-edit-${pathID}`;
    const pencil = getByTestId(pencilId, { exact: true });
    fireEvent.click(pencil);
    const inputField = getByDisplayValue("Item 1");
    expect(inputField).toBeInTheDocument();
  });
  it("Edit the name of the item", () => {
    const { getByTestId, getByDisplayValue, getByText, queryByText } = render(
      <App />
    );
    const pathID = [0].join("-");
    const pencilId = `pencil-edit-${pathID}`;
    const pencil = getByTestId(pencilId, { exact: true });
    fireEvent.click(pencil);
    const inputField = getByDisplayValue("Item 1");
    fireEvent.change(inputField, { target: { value: "New Item 1" } });
    fireEvent.blur(inputField);
    const item1Element = queryByText("Item 1");
    expect(item1Element).not.toBeInTheDocument();
    expect(getByText("New Item 1")).toBeInTheDocument();
  });
  it("Add a child item", () => {
    const { getByTestId } = render(<App />);
    const pathID = [0].join("-");
    const addButtonId = `add-button-${pathID}`;
    const contentId = `content-${pathID}`;
    const addButton = getByTestId(addButtonId, { exact: true });
    fireEvent.click(addButton);
    const content = getByTestId(contentId);
    expect(within(content).getByText("New Item")).toBeInTheDocument();
  });
});
