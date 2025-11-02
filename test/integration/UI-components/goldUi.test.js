import { render } from '@testing-library/react';
import App from "../../../src/App";
import React from "react";
import userEvent from "@testing-library/user-event";

test("rendered App contains goldUI component", () => {
  const { container } = render(<App />);
  const goldUIDiv = container.querySelector(".goldUI");
  expect(goldUIDiv).toBeInTheDocument();
});

test("Hide UI/Show UI Button effectively hides the UI and updates text", async () => {
  const user = userEvent.setup();
  const { getByText, container } = render(<App />);

  const button = getByText("Hide UI");
  let goldUIInternalDiv = container.querySelector(".goldUIInternal");
  expect(goldUIInternalDiv).toBeInTheDocument();

  await user.click(button);
  goldUIInternalDiv = container.querySelector(".goldUIInternal");
  expect(goldUIInternalDiv).toBe(null);
  expect(button.textContent).toBe("Show UI");

  await user.click(button);
  goldUIInternalDiv = container.querySelector(".goldUIInternal");
  expect(goldUIInternalDiv).toBeInTheDocument();
  expect(button.textContent).toBe("Hide UI");
});
