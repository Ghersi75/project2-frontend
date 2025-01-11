import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import Navbar from "./Navbar";
import { useNewsFeedShown } from "@/Hooks/useNewsFeedShown";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { useCustomSearchParams } from "@/Hooks/useCustomSearchParams";
import { MemoryRouter, useParams } from "react-router";

jest.mock("@/Hooks/useNewsFeedShown");
jest.mock("@/Hooks/useUserInfo");
jest.mock("@/Hooks/useCustomSearchParams");
jest.mock("react-router", () => ({
  ...jest.requireActual("react-router"),
  useParams: jest.fn(),
}));

const mockUseNewsFeedShown = useNewsFeedShown as jest.Mock;
const mockUseUserInfo = useUserInfo as jest.Mock;
const mockUseCustomSearchParams = useCustomSearchParams as jest.Mock;
const mockUseParams = useParams as jest.Mock;

const TestComponent = () => (
  <MemoryRouter>
    <Navbar />
  </MemoryRouter>
);

describe("Navbar Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockSetNewsFeedShown = jest.fn();
  const mockLogout = jest.fn();
  const defaultParamsString = "extraParam=true";

  test("renders Navbar for logged-out users", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({ userInfo: null, logout: mockLogout });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    expect(screen.getByText(/game threads/i)).toBeInTheDocument();
    expect(screen.getByText(/home/i)).toBeInTheDocument();
    expect(screen.getByText(/search/i)).toBeInTheDocument();
    expect(screen.getByText(/login/i)).toBeInTheDocument();
    expect(screen.getByText(/sign up/i)).toBeInTheDocument();
  });

  test("constructs correct URL additions when appId is null", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({ userInfo: null, logout: mockLogout });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toHaveAttribute("href", `/login?&${defaultParamsString}`);
  });

  test("constructs correct URL additions when appId is provided", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({ userInfo: null, logout: mockLogout });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: "1234" });

    render(<TestComponent />);

    const loginLink = screen.getByText(/login/i);
    expect(loginLink).toHaveAttribute("href", `/login?appId=1234&${defaultParamsString}`);
  });

  test("renders Navbar for logged-in users", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({
      userInfo: {
        displayName: "John Doe",
        username: "johndoe",
      },
      logout: mockLogout,
    });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    expect(screen.getByText(/favorited games/i)).toBeInTheDocument();
    expect(screen.getByText(/show news feed/i)).toBeInTheDocument();
    expect(screen.getByText(/john doe/i)).toBeInTheDocument();
    expect(screen.getByText(/@johndoe/i)).toBeInTheDocument();
    expect(screen.getByText(/logout/i)).toBeInTheDocument();
  });

  // Very janky solution because it would not count the toggle functionality otherwise
  test("toggles news feed visibility", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({
      userInfo: {
        displayName: "John Doe",
        username: "johndoe",
      },
      logout: mockLogout,
    });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    const toggleButton = screen.getByText(/show news feed/i);
    fireEvent.click(toggleButton);

    // Capture the callback and manually call it to ensure coverage
    const callback = mockSetNewsFeedShown.mock.calls[0][0]; // Get the first call's argument
    expect(typeof callback).toBe("function");
    expect(callback(false)).toBe(true); // Simulate `prev => !prev`

    // Confirm the function was called
    expect(mockSetNewsFeedShown).toHaveBeenCalledWith(expect.any(Function));

    // Simulate toggling to the opposite state
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: true, setNewsFeedShown: mockSetNewsFeedShown });
    render(<TestComponent />);

    const hideToggleButton = screen.getByText(/hide news feed/i);
    fireEvent.click(hideToggleButton);

    const callback2 = mockSetNewsFeedShown.mock.calls[1][0]; // Get the second call's argument
    expect(callback2(true)).toBe(false); // Simulate `prev => !prev`

    expect(mockSetNewsFeedShown).toHaveBeenCalledTimes(2);
  });


  test("calls logout function on logout button click", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({
      userInfo: {
        displayName: "John Doe",
        username: "johndoe",
      },
      logout: mockLogout,
    });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    const logoutButton = screen.getByText(/logout/i);
    fireEvent.click(logoutButton);

    expect(mockLogout).toHaveBeenCalled();
  });

  test("renders correct login and signup links with query params", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: false, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({ userInfo: null, logout: mockLogout });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    const loginLink = screen.getByText(/login/i);
    const signUpLink = screen.getByText(/sign up/i);

    expect(loginLink).toHaveAttribute("href", `/login?&${defaultParamsString}`);
    expect(signUpLink).toHaveAttribute("href", `/signup?&${defaultParamsString}`);
  });

  test("renders 'Hide News Feed' when newsFeedShown is true", () => {
    mockUseNewsFeedShown.mockReturnValue({ newsFeedShown: true, setNewsFeedShown: mockSetNewsFeedShown });
    mockUseUserInfo.mockReturnValue({
      userInfo: {
        displayName: "John Doe",
        username: "johndoe",
      },
      logout: mockLogout,
    });
    mockUseCustomSearchParams.mockReturnValue({ paramsString: defaultParamsString });
    mockUseParams.mockReturnValue({ appId: null });

    render(<TestComponent />);

    expect(screen.getByText(/hide news feed/i)).toBeInTheDocument();
  });
});
