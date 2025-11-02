import { render, screen } from '@testing-library/react';
import App from '../src/App';
import React from "react";

test("renders App component without crashing", () => {
  render(<App />);
});


