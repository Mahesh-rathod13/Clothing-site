import { flexRender } from "@tanstack/react-table";
import SortIconAsc from "../../assets/icons/SortIconAsc";
import SortIconDesc from "../../assets/icons/SortIconDesc";
import SortIconUnSorted from "../../assets/icons/SortIconUnSorted";
import Loader from "../../components/Loader/Loader";
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
    <div className="overflow-x-auto rounded-2xl shadow-md border border-gray-200">
      <table className="min-w-full text-sm text-left text-gray-700">
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id} className="bg-gray-100 text-gray-700">
              {headerGroup.headers.map((header, index) => (
                <th
                  key={header.id}
                  onClick={header.column.getToggleSortingHandler?.()}
                  className={`
                px-4 py-3 font-semibold whitespace-nowrap cursor-pointer transition-colors duration-200
                ${index === 0 ? "rounded-tl-2xl" : ""}
                ${
                  index === headerGroup.headers.length - 1
                    ? "rounded-tr-2xl"
                    : ""
                }
                hover:bg-gray-200
              `}
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
        <tbody className="divide-y divide-gray-200">
          {loading ? (
            <tr>
              <td
                colSpan={columns.length}
                className="text-center py-8 text-gray-500"
              >
                <Loader variant="wave" text="Loading Products ...." />
              </td>
            </tr>
          ) : (
            table.getRowModel().rows.map((row, rowIndex) => (
              <tr
                key={row.id}
                className={`transition-colors duration-150 hover:bg-gray-50 ${
                  rowIndex % 2 === 1 ? "bg-gray-50" : ""
                }`}
              >
                {row.getVisibleCells().map((cell, index) => (
                  <td
                    key={cell.id}
                    className={`px-4 py-3 whitespace-nowrap ${
                      index === 0 ? "rounded-bl-2xl" : ""
                    } ${
                      index === row.getVisibleCells().length - 1
                        ? "rounded-br-2xl"
                        : ""
                    }`}
                  >
                    {flexRender(cell.column.columnDef.cell, cell.getContext())}
                  </td>
                ))}
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
}
