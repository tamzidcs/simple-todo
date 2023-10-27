import React from 'react';
import Signup from "../components/Signup/Signup";
import { render, screen } from "@testing-library/react";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Signup", () => {
  it("should have username,password text-fields,labels and also signup button", () => {
    render(<Signup />)
    expect(screen.getByRole('header')).toBeInTheDocument();
    expect(screen.getByLabelText('Username')).toBeInTheDocument();
    expect(screen.getByLabelText('Password')).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Signup' })).toBeInTheDocument();
  });
});