
export interface datePicker {
    id: string;
    className: string;
    testId: string;
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
}