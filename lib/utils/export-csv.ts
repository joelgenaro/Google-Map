import { type Table } from '@tanstack/react-table';
import { DataType } from '../types/table-data.type';
import { ProjectManagementMonitoringPlot } from '@/database/types';

export function exportTableToCSV<TData>(
  /**
   * The table to export.
   * @type Table<TData>
   */
  table: Table<TData>,
  opts: {
    /**
     * The filename for the CSV file.
     * @default "table"
     * @example "tasks"
     */
    filename?: string;
    /**
     * The columns to exclude from the CSV file.
     * @default []
     * @example ["select", "actions"]
     */
    excludeColumns?: (keyof TData | 'select' | 'actions')[];

    /**
     * Whether to export only the selected rows.
     * @default false
     */
    onlySelected?: boolean;

    /**
     * The type of data to export.
     * @default "plot"
     */
    type?: DataType;
  } = {}
): void {
  const {
    filename = 'table',
    excludeColumns = [],
    onlySelected = false,
  } = opts;

  // Retrieve headers (column names)
  const headers = table
    .getAllLeafColumns()
    .map((column) => ({ id: column.id, header: column.columnDef.header }))
    .filter(
      (column) =>
        !excludeColumns.includes(
          column.id as keyof TData | 'select' | 'actions'
        )
    );

  // Build CSV content
  const csvContent = [
    // Insert longitude and latitude headers after plotid if type is 'plot'
    ...(() => {
      const headersCopy = [...headers];
      if (opts.type === 'plot') {
        const plotidIndex = headersCopy.findIndex(
          (header) => header.id === 'plotID'
        );
        if (plotidIndex !== -1) {
          headersCopy.splice(
            plotidIndex + 1,
            0,
            { id: 'longitude', header: 'longitude' },
            { id: 'latitude', header: 'latitude' }
          );
        }
      }
      return [headersCopy.map((header) => header.header).join(',')];
    })(),
    ...(onlySelected
      ? table.getFilteredSelectedRowModel().rows
      : table.getRowModel().rows
    ).map((row) => {
      const rowData = headers.map((header) => {
        let cellValue = row.getValue(header.id);
        // Convert boolean values to 'yes' or 'no' for specific headers
        if (
          (header.id === 'disease' || header.id === 'herbivory') &&
          typeof cellValue === 'boolean'
        ) {
          cellValue = cellValue ? 'yes' : 'no';
        }
        // Handle values that might contain commas or newlines
        return typeof cellValue === 'string'
          ? `"${cellValue.replace(/"/g, '""')}"`
          : cellValue;
      });

      // Insert longitude and latitude values after plotid if type is 'plot'
      if (opts.type === 'plot') {
        const plotidIndex = headers.findIndex(
          (header) => header.id === 'plotID'
        );
        if (plotidIndex !== -1) {
          // Assuming row.original.longitude and row.original.latitude can retrieve the values
          rowData.splice(
            plotidIndex + 1,
            0,
            (row.original as ProjectManagementMonitoringPlot).longitude,
            (row.original as ProjectManagementMonitoringPlot).latitude
          );
        }
      }

      return rowData.join(',');
    }),
  ].join('\n');

  // Create a Blob with CSV content
  const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });

  // Create a link and trigger the download
  const url = URL.createObjectURL(blob);
  const link = document.createElement('a');
  link.setAttribute('href', url);
  link.setAttribute('download', `${filename}.csv`);
  link.style.visibility = 'hidden';
  document.body.appendChild(link);
  link.click();
  document.body.removeChild(link);
}
