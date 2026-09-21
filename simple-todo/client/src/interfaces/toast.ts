export type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
export interface toast{
    severity: Severity,
    message: string
}
