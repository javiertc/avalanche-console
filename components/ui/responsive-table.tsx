"use client"

import { useState } from 'react'
import { ChevronDown, ChevronRight } from 'lucide-react'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from './table'
import { Button } from './button'
import { useIsMobile } from '@/hooks/use-mobile'

interface ResponsiveTableProps {
  data: Array<Record<string, unknown>>
  columns: Array<{
    key: string
    label: string
    render?: (value: unknown, row: Record<string, unknown>) => React.ReactNode
    mobileHidden?: boolean
  }>
  mobileCardRender?: (row: Record<string, unknown>, index: number) => React.ReactNode
  className?: string
}

export function ResponsiveTable({ 
  data, 
  columns, 
  mobileCardRender, 
  className 
}: ResponsiveTableProps) {
  const isMobile = useIsMobile()
  const [expandedRows, setExpandedRows] = useState<Set<number>>(new Set())

  const toggleRow = (index: number) => {
    const newExpanded = new Set(expandedRows)
    if (newExpanded.has(index)) {
      newExpanded.delete(index)
    } else {
      newExpanded.add(index)
    }
    setExpandedRows(newExpanded)
  }

  if (isMobile && mobileCardRender) {
    return (
      <div className={`space-y-3 ${className}`}>
        {data.map((row, index) => (
          <div key={index} className="border rounded-lg bg-card">
            {mobileCardRender(row, index)}
          </div>
        ))}
      </div>
    )
  }

  if (isMobile) {
    return (
      <div className={`space-y-3 ${className}`}>
        {data.map((row, index) => {
          const isExpanded = expandedRows.has(index)
          const visibleColumns = columns.filter(col => !col.mobileHidden)
          const hiddenColumns = columns.filter(col => col.mobileHidden)
          
          return (
            <div key={index} className="border rounded-lg bg-card">
              <div className="p-4">
                {/* Always visible columns */}
                <div className="space-y-2">
                  {visibleColumns.map(column => (
                    <div key={column.key} className="flex justify-between items-center">
                      <span className="text-sm font-medium text-muted-foreground">
                        {column.label}
                      </span>
                      <span className="text-sm text-foreground">
                        {column.render ? column.render(row[column.key], row) : String(row[column.key] ?? '')}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Expandable section for hidden columns */}
                {hiddenColumns.length > 0 && (
                  <>
                    <Button
                      variant="ghost"
                      size="sm"
                      onClick={() => toggleRow(index)}
                      className="mt-3 p-0 h-auto text-xs text-muted-foreground hover:text-foreground"
                    >
                      {isExpanded ? (
                        <>
                          <ChevronDown className="h-3 w-3 mr-1" />
                          Show Less
                        </>
                      ) : (
                        <>
                          <ChevronRight className="h-3 w-3 mr-1" />
                          Show More
                        </>
                      )}
                    </Button>

                    {isExpanded && (
                      <div className="mt-3 pt-3 border-t space-y-2">
                        {hiddenColumns.map(column => (
                          <div key={column.key} className="flex justify-between items-center">
                            <span className="text-sm font-medium text-muted-foreground">
                              {column.label}
                            </span>
                            <span className="text-sm text-foreground">
                              {column.render ? column.render(row[column.key], row) : String(row[column.key] ?? '')}
                            </span>
                          </div>
                        ))}
                      </div>
                    )}
                  </>
                )}
              </div>
            </div>
          )
        })}
      </div>
    )
  }

  // Desktop table view
  return (
    <div className={`rounded-md border ${className}`}>
      <Table>
        <TableHeader>
          <TableRow className="hover:bg-transparent">
            {columns.map(column => (
              <TableHead key={column.key} className="font-medium">
                {column.label}
              </TableHead>
            ))}
          </TableRow>
        </TableHeader>
        <TableBody>
          {data.map((row, index) => (
            <TableRow key={index} className="hover:bg-muted/50">
              {columns.map(column => (
                <TableCell key={column.key}>
                  {column.render ? column.render(row[column.key], row) : String(row[column.key] ?? '')}
                </TableCell>
              ))}
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  )
} 