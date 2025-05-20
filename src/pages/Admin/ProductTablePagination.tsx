import { Button } from "../../components/ui/button";
import { usePaginationState } from '../../store/PaginationState.js';

export default function ProductTablePagination() {
  const { pageIndex, pageSize } = usePaginationState().getState();
  console.log("pageIndex", pageIndex);
  

  const {setPageIndex, setPageSize} = usePaginationState();

  return (
    <div className="flex justify-between items-center mt-4">
      <Button
        onClick={() => setPageIndex(pageIndex-1)}
        disabled={pageIndex === 0}
      >
        Previous
      </Button>
      <span>
        Page {pageIndex + 1}
      </span>
      <Button
        onClick={() => setPageIndex(pageIndex+1)}
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