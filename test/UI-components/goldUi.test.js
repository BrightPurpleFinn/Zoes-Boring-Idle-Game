import { render } from '@testing-library/react';
import GoldUI from '../../src/UI-components/gold/goldUi';
import React from "react";

test("rendered App contains goldUI component", () => {
  const { container } = render(<GoldUI />);
  const goldUIDiv = container.querySelector(".goldUI");
  expect(goldUIDiv).toBeInTheDocument();
});
