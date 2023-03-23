export type WidgetProps = {
    type: string
}

export type DataTableProps = {
    type: string
    columns: string[]
    rows: string[][]
}

export type DialogProps = { 
    open: boolean, 
    title: string, 
    content: string,
    onConfirm: () => void, 
    onCancel: () => void 
}
