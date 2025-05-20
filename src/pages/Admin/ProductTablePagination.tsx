import React from "react";
import { Button } from "../../components/ui/button";

export default function ProductTablePagination({
  pageIndex,
  pageSize,
  totalCount,
  setPageIndex,
  setPageSize,
}: {
  pageIndex: number;
  pageSize: number;
  totalCount: number;
  setPageIndex: (fn: (p: number) => number) => void;
  setPageSize: (size: number) => void;
}) {
  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        onClick={() => setPageIndex((p) => Math.max(0, p - 1))}
        disabled={pageIndex === 0}
      >
        Previous
      </Button>
      <span>
        Page {pageIndex + 1} of {Math.ceil(totalCount / pageSize) || 1}
      </span>
      <Button
        onClick={() => setPageIndex((p) => p + 1)}
        // disabled={(pageIndex + 1) * pageSize >= totalCount}
      >
        Next
      </Button>
      <select
        value={pageSize}
        onChange={e => {
          setPageSize(Number(e.target.value));
          setPageIndex(() => 0);
        }}
        className="ml-4 border rounded px-2 py-1"
      >
        {[8, 16, 32, 64].map(size => (
          <option key={size} value={size}>{size} / page</option>
        ))}
      </select>
    </div>
  );
}