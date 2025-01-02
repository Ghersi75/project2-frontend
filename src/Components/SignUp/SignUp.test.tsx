import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom"
import SignUp from "./SignUp";
import { SignUpPropsType } from "@/Types/SignUpTypes";
import { BrowserRouter } from 'react-router';

test("renders all labels, inputs and button", () => {
  const mockSetUsername = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  const props: SignUpPropsType = {
    username: "",
    setUsername: mockSetUsername,
    password: "",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit
  }

  render(
    <BrowserRouter>
      <SignUp {...props} />
    </BrowserRouter>
  );

  // Test that the labels show up
  expect(screen.getByLabelText(/username/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Test that 1 text input loads up
  // type password doesn't have a role according to issue below
  // https://github.com/testing-library/dom-testing-library/issues/1128
  expect(screen.getAllByRole("textbox")).toHaveLength(1);

  // Test that password input loads up
  expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();

  // Test the button loads up
  expect(screen.getByRole("button", { name: /sign up/i })).toBeInTheDocument();
});