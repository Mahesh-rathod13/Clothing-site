import { useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import { usePaginationState } from "../../store/PaginationState.js";

export default function ProductTablePagination() {
  const PaginationState = usePaginationState();

  const [searchParams, _setSearchParams] = useSearchParams();

  return (
    <div className="flex justify-end items-center mt-4 gap-10">
      <Button
        onClick={() =>
          PaginationState.setPageIndex(PaginationState.getState().pageIndex - 1)
        }
        disabled={PaginationState.getState().pageIndex === 0}
      >
        Previous
      </Button>
      <span>Page {PaginationState.getState().pageIndex + 1}</span>
      <Button
        onClick={() =>
          PaginationState.setPageIndex(PaginationState.getState().pageIndex + 1)
        }
        disabled={
          searchParams.get("limit") < PaginationState.getState().pageSize
        }
      >
        Next
      </Button>
      <select
        value={PaginationState.getState().pageSize}
        onChange={(e) => {
          PaginationState.setPageSize(Number(e.target.value));
          PaginationState.setPageIndex(0);
        }}
        className="ml-4 border rounded px-2 py-1"
      >
        {[8, 16, 32, 64].map((size) => (
          <option key={size} value={size}>
            {size} / page
          </option>
        ))}
      </select>
    </div>
  );
}
