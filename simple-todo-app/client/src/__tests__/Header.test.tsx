import { shallow } from 'enzyme';
import React from 'react';
import Header  from '../components/Header/Header';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it("should render header", () => {
  const wrapper = shallow(<Header />);
});