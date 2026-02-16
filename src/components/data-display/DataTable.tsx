import React, { useState, useMemo } from 'react';
import { ChevronUp, ChevronDown, ChevronsUpDown } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Checkbox } from '../ui';
import { SkeletonList } from '../ui/Skeleton';

export interface Column<T> {
  key: string;
  label: string;
  sortable?: boolean;
  render?: (value: T[keyof T], row: T) => React.ReactNode;
  width?: string;
}

export interface DataTableProps<T> {
  columns: Column<T>[];
  data: T[];
  keyField: keyof T;
  selectable?: boolean;
  onSelectionChange?: (selectedRows: T[]) => void;
  isLoading?: boolean;
  emptyMessage?: string;
  className?: string;
}

type SortDirection = 'asc' | 'desc' | null;

function DataTable<T extends Record<string, unknown>>({
  columns,
  data,
  keyField,
  selectable = false,
  onSelectionChange,
  isLoading = false,
  emptyMessage = 'No data available',
  className,
}: DataTableProps<T>) {
  const [sortColumn, setSortColumn] = useState<string | null>(null);
  const [sortDirection, setSortDirection] = useState<SortDirection>(null);
  const [selectedRows, setSelectedRows] = useState<Set<unknown>>(new Set());

  const sortedData = useMemo(() => {
    if (!sortColumn || !sortDirection) return data;

    return [...data].sort((a, b) => {
      const aValue = a[sortColumn];
      const bValue = b[sortColumn];

      if (aValue === bValue) return 0;

      const comparison = aValue < bValue ? -1 : 1;
      return sortDirection === 'asc' ? comparison : -comparison;
    });
  }, [data, sortColumn, sortDirection]);

  const handleSort = (columnKey: string) => {
    if (sortColumn === columnKey) {
      if (sortDirection === 'asc') {
        setSortDirection('desc');
      } else if (sortDirection === 'desc') {
        setSortColumn(null);
        setSortDirection(null);
      }
    } else {
      setSortColumn(columnKey);
      setSortDirection('asc');
    }
  };

  const handleSelectAll = (checked: boolean) => {
    if (checked) {
      const allKeys = new Set(data.map((row) => row[keyField]));
      setSelectedRows(allKeys);
      onSelectionChange?.(data);
    } else {
      setSelectedRows(new Set());
      onSelectionChange?.([]);
    }
  };

  const handleSelectRow = (row: T, checked: boolean) => {
    const newSelectedRows = new Set(selectedRows);
    const rowKey = row[keyField];

    if (checked) {
      newSelectedRows.add(rowKey);
    } else {
      newSelectedRows.delete(rowKey);
    }

    setSelectedRows(newSelectedRows);
    const selected = data.filter((r) => newSelectedRows.has(r[keyField]));
    onSelectionChange?.(selected);
  };

  const allSelected = data.length > 0 && selectedRows.size === data.length;
  const someSelected = selectedRows.size > 0 && selectedRows.size < data.length;

  const renderSortIcon = (columnKey: string) => {
    if (sortColumn !== columnKey) {
      return <ChevronsUpDown className="h-4 w-4 text-gray-400" />;
    }
    return sortDirection === 'asc' ? (
      <ChevronUp className="h-4 w-4 text-blue-600" />
    ) : (
      <ChevronDown className="h-4 w-4 text-blue-600" />
    );
  };

  if (isLoading) {
    return (
      <div className={cn('rounded-lg border border-gray-200 bg-white p-6', className)}>
        <SkeletonList count={5} />
      </div>
    );
  }

  return (
    <div className={cn('overflow-hidden rounded-lg border border-gray-200 bg-white', className)}>
      <div className="overflow-x-auto">
        <table className="w-full border-collapse">
          <thead className="bg-gray-50">
            <tr>
              {selectable && (
                <th className="w-12 px-4 py-3">
                  <Checkbox
                    checked={allSelected}
                    onChange={(e) => handleSelectAll(e.target.checked)}
                    aria-label="Select all rows"
                    className={someSelected ? 'indeterminate' : ''}
                  />
                </th>
              )}
              {columns.map((column) => (
                <th
                  key={column.key}
                  className={cn(
                    'px-4 py-3 text-left text-sm font-semibold text-gray-700',
                    column.sortable && 'cursor-pointer select-none hover:bg-gray-100',
                    column.width && `w-${column.width}`
                  )}
                  onClick={() => column.sortable && handleSort(column.key)}
                >
                  <div className="flex items-center gap-2">
                    <span>{column.label}</span>
                    {column.sortable && renderSortIcon(column.key)}
                  </div>
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {sortedData.length === 0 ? (
              <tr>
                <td
                  colSpan={columns.length + (selectable ? 1 : 0)}
                  className="px-4 py-8 text-center text-gray-500"
                >
                  {emptyMessage}
                </td>
              </tr>
            ) : (
              sortedData.map((row) => {
                const rowKey = row[keyField];
                const isSelected = selectedRows.has(rowKey);

                return (
                  <tr
                    key={rowKey}
                    className={cn(
                      'transition-colors hover:bg-gray-50',
                      isSelected && 'bg-blue-50'
                    )}
                  >
                    {selectable && (
                      <td className="px-4 py-3">
                        <Checkbox
                          checked={isSelected}
                          onChange={(e) => handleSelectRow(row, e.target.checked)}
                          aria-label={`Select row ${rowKey}`}
                        />
                      </td>
                    )}
                    {columns.map((column) => {
                      const value = row[column.key];
                      return (
                        <td key={column.key} className="px-4 py-3 text-sm text-gray-900">
                          {column.render ? column.render(value, row) : value}
                        </td>
                      );
                    })}
                  </tr>
                );
              })
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}

DataTable.displayName = 'DataTable';

export default DataTable;
