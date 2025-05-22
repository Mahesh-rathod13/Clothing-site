import { flexRender } from "@tanstack/react-table";
import SortIconAsc from "../../assets/icons/SortIconAsc";
import SortIconDesc from "../../assets/icons/SortIconDesc";
import SortIconUnSorted from "../../assets/icons/SortIconUnSorted";
export default function ProductTable({
  columns,
  loading,
  table,
}: {
  columns: any[];
  loading: boolean;
  table: any;
}) {
  return (
    // <Card>
    //   <CardContent>
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr
              key={headerGroup.id}
              className="bg-gray-100 hover:opacity-100 rounded-t-2xl"
            >
              {headerGroup.headers.map((header) => (
                <th
                  key={header.id}
                  className="py-2 px-4 cursor-pointer text-left items-center gap-2"
                  onClick={header.column.getToggleSortingHandler?.()}
                >
                  <div className="flex items-center gap-2">
                    {flexRender(
                      header.column.columnDef.header,
                      header.getContext()
                    )}
                    {header.column.getIsSorted() ? (
                      header.column.getIsSorted() === "asc" ? (
                        <SortIconAsc />
                      ) : (
                        <SortIconDesc />
                      )
                    ) : (
                      <SortIconUnSorted />
                    )}
                  </div>
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {loading ? (
            <tr>
              <td colSpan={columns.length} className="text-center py-8">
                Loading...
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row) => (
              <tr key={row.id} className="border-b">
                {row.getVisibleCells().map((cell) => (
                  <td key={cell.id} className="px-4 py-2">
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
    //   </CardContent>
    // </Card>
  );
}
