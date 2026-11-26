import { render, screen, fireEvent } from "@testing-library/react";
import { GoogleOAuthProvider } from "@react-oauth/google";
import App from "./App";
import SmartFarm from "./pages/SmartFarm";
import PigBreed from "./pages/PigBreed";
import PigNutrition from "./pages/PigNutrition";

jest.mock(
  "react-router-dom",
  () => ({
    BrowserRouter: ({ children }) => <div>{children}</div>,
    Routes: ({ children }) => <div>{children}</div>,
    Route: ({ path, element }) => (path === "/" ? element : null),
    Link: ({ children, to, ...rest }) => (
      <a href={to} {...rest}>
        {children}
      </a>
    ),
    useNavigate: () => jest.fn(),
    useLocation: () => ({ pathname: "/" }),
  }),
  { virtual: true }
);

test("renders Regal Pork Farms LLP headline and LLP mission pillars", () => {
  render(
    <GoogleOAuthProvider clientId="test-client-id">
      <App />
    </GoogleOAuthProvider>
  );
  const heading = screen.getByRole("heading", {
    level: 1,
    name: /Regal Pork Farms/i,
  });
  expect(heading).toBeInTheDocument();
  expect(screen.getByText(/Object of the LLP/i)).toBeInTheDocument();
  expect(
    screen.getByText(/Six Pillars Powering a Modern Livestock Economy/i)
  ).toBeInTheDocument();
});

test("renders SmartFarm IoT and ML intelligence dashboard and switches tabs", () => {
  render(<SmartFarm />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Smart Farm & Supply Chain Intelligence/i,
    })
  ).toBeInTheDocument();
  expect(
    screen.getByRole("button", { name: /IoT Shed Monitoring/i })
  ).toBeInTheDocument();

  fireEvent.click(
    screen.getByRole("button", { name: /ML Health & Productivity/i })
  );
  expect(
    screen.getByText(/ML Productivity & Growth Forecast/i)
  ).toBeInTheDocument();
});

test("renders Breeds and Nutrition pages without errors", () => {
  render(<PigBreed />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Swine Genetics & Breed Profiles/i,
    })
  ).toBeInTheDocument();

  render(<PigNutrition />);
  expect(
    screen.getByRole("heading", {
      level: 1,
      name: /Swine Nutrition & Herd Health Protocols/i,
    })
  ).toBeInTheDocument();
});
