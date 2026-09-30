export type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
export interface toast{
    id: number,
    severity: Severity,
    message: string
}
