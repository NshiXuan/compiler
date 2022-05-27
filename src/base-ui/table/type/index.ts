export interface ITableArr {
  value?: string
  line?: number
  content?: string
  kind?: string
}

export interface ITableLabel {
  label?: string
  props?: string
}

export interface ITableData {
  tableArr: ITableArr[]
  showID?: boolean
  tableLabel: ITableLabel[]
  maxHeight?: string
}
