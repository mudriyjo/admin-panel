import * as React from 'react'
import { cn } from '@/lib/utils'
import './table.css'

export interface TableColumn<T> {
  header: string
  accessor: keyof T | ((row: T) => React.ReactNode)
  className?: string
  headerClassName?: string
}

export interface TableProps<T> {
  columns: TableColumn<T>[]
  data: T[]
  className?: string
  emptyMessage?: string
  onRowClick?: (row: T, index: number) => void
}

function Table<T>({ columns, data, className, emptyMessage = 'No data available', onRowClick }: TableProps<T>) {
  const getCellValue = (row: T, column: TableColumn<T>) => {
    if (typeof column.accessor === 'function') {
      return column.accessor(row)
    }
    return row[column.accessor] as React.ReactNode
  }

  return (
    <div className="table-container">
      <table className={cn('data-table', className)}>
        <thead>
          <tr className="table-header-row">
            {columns.map((column, index) => (
              <th
                key={index}
                className={cn('table-header-cell', column.headerClassName)}
              >
                {column.header}
              </th>
            ))}
          </tr>
        </thead>
        <tbody>
          {data.length === 0 ? (
            <tr>
              <td colSpan={columns.length} className="table-empty">
                {emptyMessage}
              </td>
            </tr>
          ) : (
            data.map((row, rowIndex) => (
              <tr
                key={rowIndex}
                className={cn('table-body-row', onRowClick && 'table-body-row-clickable')}
                onClick={() => onRowClick?.(row, rowIndex)}
              >
                {columns.map((column, colIndex) => (
                  <td
                    key={colIndex}
                    className={cn('table-body-cell', column.className)}
                  >
                    {getCellValue(row, column)}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  )
}

Table.displayName = 'Table'

export { Table }
