export type Severity = 'error' | 'success' | 'info' | 'warning' | undefined;
export interface alert{
    severity: Severity,
    message: string
}
