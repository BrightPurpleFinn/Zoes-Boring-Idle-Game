import { render } from '@testing-library/react';
import React from "react";
import userEvent from "@testing-library/user-event";
import HoldButton from '../../src/UI-components/button/holdButton';

test("rendered App contains goldUI component", () => {
  const { container } = render(<HoldButton />);
  const holdButton = container.querySelector(".HoldButton");
  expect(holdButton).toBeInTheDocument();
});

test("Hide UI/Show UI Button effectively hides the UI and updates text", async () => {
  const user = userEvent.setup();
  let counter = 0;
  const increment = () => { counter += 1; };

  const { container } = render(<HoldButton onHold={increment} />);
  const button = container.querySelector(".HoldButton");
  await user.click(button);
  expect(counter).toBe(1);

  user.pointer([{ target: button, keys: "[MouseLeft>]" }]);
  const milliseconds = 500;
  await new Promise(resolve => setTimeout(resolve, milliseconds));
  expect(counter).toBeGreaterThan(1);
});
