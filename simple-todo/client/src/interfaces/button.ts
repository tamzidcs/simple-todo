import { ButtonHTMLAttributes } from 'react';

export interface button {
  className: string;
  text: string;
  type?: ButtonHTMLAttributes<HTMLButtonElement>['type'];
  testId: string;
  onClick?:()=>void;
}
