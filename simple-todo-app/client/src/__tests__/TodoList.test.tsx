import { shallow } from 'enzyme';
import React from 'react';
import  ToDoList  from '../components/Todo/ToDoList';

const mockedUsedNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
   ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockedUsedNavigate,
}));

it("should render signup", () => {
  const wrapper = shallow(<ToDoList />);
});

