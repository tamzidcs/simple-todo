import React from 'react';
import './Button.scss';
import { button } from '../../interfaces/button';

export function Button(buttonProps: button) {
  const {
    text, testId, className, type, onClick,
  } = buttonProps;
  const buttontype = type || 'button';
  return (
    // eslint-disable-next-line react/button-has-type
    <button className={className} data-testid={testId} type={buttontype} onClick={onClick}>
      {text}
    </button>
  );
}
export default Button;
