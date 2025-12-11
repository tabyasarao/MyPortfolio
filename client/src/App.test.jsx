import { render, screen } from "@testing-library/react";
import App from "./App";

// Mock navigate so redirects don't break tests
vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom");
  return {
    ...actual,
    useNavigate: () => () => {},  // prevent redirect crash
  };
});

test("renders Sign In page by default", () => {
  render(<App />);

  // Get ALL "Sign In" elements (header + button)
  const elements = screen.getAllByText(/Sign In/i);

  // Expect at least 1 match
  expect(elements.length).toBeGreaterThan(0);
});
