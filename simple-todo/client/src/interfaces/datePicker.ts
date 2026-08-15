import type { ChangeEvent } from 'react';

export interface datePicker {
    id: string;
    className: string;
    testId: string;
    onChange: (event: ChangeEvent<HTMLInputElement>) => void;
}