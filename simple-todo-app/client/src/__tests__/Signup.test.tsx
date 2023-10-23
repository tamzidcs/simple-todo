import { shallow } from 'enzyme';
import React from 'react';
import Signup from "../components/Signup/Signup";

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

describe("Signup", () => {
  it("should render signup", () => {
    const wrapper = shallow(<Signup />);
  });
});