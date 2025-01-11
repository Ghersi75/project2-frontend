import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import Profile from "./Profile";
import { useUserInfo } from "@/Hooks/useUserInfo";
import { useDefaultRequestOptions } from "@/Hooks/useDefaultRequestOptions";
import axios from "axios";

jest.mock("@/Hooks/useUserInfo");
jest.mock("@/Hooks/useDefaultRequestOptions");
jest.mock("axios");

const mockUseUserInfo = useUserInfo as jest.Mock;
const mockUseDefaultRequestOptions = useDefaultRequestOptions as jest.Mock;
const mockAxios = axios as jest.Mocked<typeof axios>;

describe("Profile Component", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  const mockUserInfo = {
    username: "currentUsername",
    displayName: "currentDisplayName",
  };

  // Dont need auth header for testing
  const defaultRequestOptions = {
    headers: { "Content-Type": "application/json" },
    withCredentials: true,
  };

  test("renders profile forms when userInfo is available", () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    render(<Profile />);

    // Check that the username form is rendered
    expect(screen.getByLabelText(/username:/i)).toBeInTheDocument();

    // Check that the display name form is rendered
    expect(screen.getByLabelText(/display name:/i)).toBeInTheDocument();

    // Check that the password form is rendered
    expect(screen.getByLabelText(/old password:/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/confirm password:/i)).toBeInTheDocument();

    expect(screen.getByLabelText(/new password:/i)).toBeInTheDocument();

  });

  test("does not render forms when userInfo is null", () => {
    mockUseUserInfo.mockReturnValue({ userInfo: null, loading: false });

    render(<Profile />);

    // Assert that nothing is rendered
    expect(screen.queryByText(/profile/i)).not.toBeInTheDocument();
  });

  test("updates username successfully", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockResolvedValueOnce({});

    render(<Profile />);

    const usernameInput = screen.getByLabelText(/username:/i);
    const updateButton = screen.getByRole("button", { name: /update username/i });

    // Update username input
    fireEvent.change(usernameInput, { target: { value: "newUsername" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND}/user/username?username=currentUsername`,
        { newUsername: "newUsername" },
        defaultRequestOptions
      );
      expect(screen.getByText(/username successfully updated/i)).toBeInTheDocument();
    });
  });

  test("displays error when updating username fails", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockRejectedValueOnce({ response: { data: { error: "Update failed" } } });

    render(<Profile />);

    const usernameInput = screen.getByLabelText(/username:/i);
    const updateButton = screen.getByRole("button", { name: /update username/i });

    // Update username input
    fireEvent.change(usernameInput, { target: { value: "newUsername" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalled();
      expect(screen.getByText(/update failed/i)).toBeInTheDocument();
    });
  });

  test("displays fallback error when updating username fails", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockRejectedValueOnce({});

    render(<Profile />);

    const usernameInput = screen.getByLabelText(/username:/i);
    const updateButton = screen.getByRole("button", { name: /update username/i });

    // Update username input
    fireEvent.change(usernameInput, { target: { value: "newUsername" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalled();
      expect(screen.getByText(/Error updating username, please try again later/i)).toBeInTheDocument();
    });
  });

  test("updates display name successfully", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockResolvedValueOnce({});

    render(<Profile />);

    const displayNameInput = screen.getByLabelText(/display name:/i);
    const updateButton = screen.getByRole("button", { name: /update display name/i });

    // Update display name input
    fireEvent.change(displayNameInput, { target: { value: "newDisplayName" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND}/user/displayname?username=currentUsername`,
        { newDisplayName: "newDisplayName" },
        defaultRequestOptions
      );
      expect(screen.getByText(/display name successfully updated/i)).toBeInTheDocument();
    });
  });

  test("displays error when updating display name fails", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockRejectedValueOnce({ response: { data: { error: "Update failed" } } });

    render(<Profile />);

    const displayNameInput = screen.getByLabelText(/display name:/i);
    const updateButton = screen.getByRole("button", { name: /update display name/i });

    // Update display name input
    fireEvent.change(displayNameInput, { target: { value: "newDisplayName" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalled();
      expect(screen.getByText(/update failed/i)).toBeInTheDocument();
    });
  });

  test("displays fallback error when updating display name fails", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockRejectedValueOnce({});

    render(<Profile />);

    const displayNameInput = screen.getByLabelText(/display name:/i);
    const updateButton = screen.getByRole("button", { name: /update display name/i });

    // Update display name input
    fireEvent.change(displayNameInput, { target: { value: "newDisplayName" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalled();
      expect(screen.getByText(/Error updating display name, please try again later/i)).toBeInTheDocument();
    });
  });

  test("updates password successfully", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockResolvedValueOnce({});

    render(<Profile />);

    const oldPasswordInput = screen.getByLabelText(/old password:/i);
    const newPasswordInput = screen.getByLabelText(/new password:/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password:/i);
    const updateButton = screen.getByRole("button", { name: /update password/i });

    // Update password inputs
    fireEvent.change(oldPasswordInput, { target: { value: "oldPass123" } });
    fireEvent.change(newPasswordInput, { target: { value: "newPass123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "newPass123" } });

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalledWith(
        `${process.env.VITE_BACKEND}/user/password?username=currentUsername`,
        { oldPassword: "oldPass123", newPassword: "newPass123" },
        defaultRequestOptions
      );
      expect(screen.getByText(/password successfully updated/i)).toBeInTheDocument();
    });
  });

  test("displays error when updating password fails", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockRejectedValueOnce({ response: { data: { error: "Invalid old password" } } });

    render(<Profile />);

    const oldPasswordInput = screen.getByLabelText(/old password:/i);
    const newPasswordInput = screen.getByLabelText(/new password:/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password:/i);
    const updateButton = screen.getByRole("button", { name: /update password/i });

    // Update password inputs
    fireEvent.change(oldPasswordInput, { target: { value: "wrongOldPassword" } });
    fireEvent.change(newPasswordInput, { target: { value: "newPassword123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "newPassword123" } });

    // Ensure the button is enabled before clicking
    expect(updateButton).not.toBeDisabled();

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalled();
      expect(screen.getByText(/invalid old password/i)).toBeInTheDocument();
    });
  });

  test("displays fallback error when updating password fails", async () => {
    mockUseUserInfo.mockReturnValue({ userInfo: mockUserInfo, loading: false });
    mockUseDefaultRequestOptions.mockReturnValue({ defaultOptions: defaultRequestOptions });

    mockAxios.put.mockRejectedValueOnce({});

    render(<Profile />);

    const oldPasswordInput = screen.getByLabelText(/old password:/i);
    const newPasswordInput = screen.getByLabelText(/new password:/i);
    const confirmPasswordInput = screen.getByLabelText(/confirm password:/i);
    const updateButton = screen.getByRole("button", { name: /update password/i });

    // Update password inputs
    fireEvent.change(oldPasswordInput, { target: { value: "wrongOldPassword" } });
    fireEvent.change(newPasswordInput, { target: { value: "newPassword123" } });
    fireEvent.change(confirmPasswordInput, { target: { value: "newPassword123" } });

    // Ensure the button is enabled before clicking
    expect(updateButton).not.toBeDisabled();

    // Click update button
    fireEvent.click(updateButton);

    await waitFor(() => {
      expect(mockAxios.put).toHaveBeenCalled();
      expect(screen.getByText(/Error updating password, please try again later/i)).toBeInTheDocument();
    });
  });
});
