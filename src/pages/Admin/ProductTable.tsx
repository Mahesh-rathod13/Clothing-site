import React from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { Card, CardContent } from "../../components/ui/card";
import { Button } from "../../components/ui/button";

export default function ProductTable({
  products,
  columns,
  loading,
  table,
}: {
  products: any[];
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
              {table.getHeaderGroups().map(headerGroup => (
                <tr key={headerGroup.id} className="bg-gray-100 hover:opacity-100 rounded-t-2xl">
                  {headerGroup.headers.map(header => (
                    <th
                      key={header.id}
                      className="py-2 px-4 cursor-pointer text-left"
                      onClick={header.column.getToggleSortingHandler?.()}
                    >
                      {flexRender(header.column.columnDef.header, header.getContext())}
                      {header.column.getIsSorted() ? (header.column.getIsSorted() === "asc" ? " 🔼" : " 🔽") : ""}
                    </th>
                  ))}
                </tr>
              ))}
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={columns.length} className="text-center py-8">Loading...</td>
                </tr>
              ) : (
                table.getRowModel().rows.map(row => (
                  <tr key={row.id} className="border-b">
                    {row.getVisibleCells().map(cell => (
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