import { render, screen } from "@testing-library/react"
import "@testing-library/jest-dom"
import { LoginPropsType } from "@/Types/LoginTypes";
import { BrowserRouter } from "react-router";
import Login from "./Login";

test("renders all labels, inputs and button", () => {
  const mockSetEmail = jest.fn();
  const mockSetPassword = jest.fn();
  const mockHandleSubmit = jest.fn();

  const props: LoginPropsType = {
    email: "",
    setEmail: mockSetEmail,
    password: "",
    setPassword: mockSetPassword,
    handleSubmit: mockHandleSubmit
  }

  render(
    <BrowserRouter>
      <Login {...props} />
    </BrowserRouter>
  )

  // Test that the labels show up
  expect(screen.getByLabelText(/email/i)).toBeInTheDocument();
  expect(screen.getByLabelText(/password/i)).toBeInTheDocument();

  // Test that 1 text inputs load up
  // type password doesn't have a role according to issue below
  // https://github.com/testing-library/dom-testing-library/issues/1128
  expect(screen.getAllByRole("textbox")).toHaveLength(1);

  // Test that password input loads up
  expect(screen.getByPlaceholderText(/enter password/i)).toBeInTheDocument();

  // Test the button loads up
  expect(screen.getByRole("button", { name: /login/i })).toBeInTheDocument();
})