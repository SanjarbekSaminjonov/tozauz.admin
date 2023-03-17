export interface Column {
    id: string;
    label: string;
    minWidth?: number;
    align?: 'right';
    format?: (row: any) => any;
}