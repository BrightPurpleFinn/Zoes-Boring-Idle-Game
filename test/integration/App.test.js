import { render, screen, waitFor  } from '@testing-library/react';
import App from "../../src/App"
import React from "react";
import { toast } from "react-hot-toast";

test("renders App component without crashing", () => {
  render(<App />);
});

test("rendered App contains toaster component", async () => {
  const { container } = render(<App />);
  const toaster = container.querySelector('[data-rht-toaster]');
  expect(toaster).toBeInTheDocument();
  toast.success("TEST TOASTER")
    await waitFor(() =>
    expect(screen.getByText("TEST TOASTER")).toBeInTheDocument()
  );
});

test("rendered App toaster component renders success message", async () => {
  const { container } = render(<App />);

  toast.success("TEST TOASTER")
    await waitFor(() =>
    expect(screen.getByText("TEST TOASTER")).toBeInTheDocument()
  );
});

