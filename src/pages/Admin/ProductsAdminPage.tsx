import {
  getCoreRowModel,
  useReactTable,
  type SortingState,
} from "@tanstack/react-table";
import { useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router";
import { Button } from "../../components/ui/button";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuTrigger,
} from "../../components/ui/dropdown-menu";
import { Input } from "../../components/ui/input";
import { endPoints } from "../../constants/urls";
import api from "../../services/api";
import { GetProducts } from "../../services/Products";
import { usePaginationState } from "../../store/PaginationState";
import useDebounce from "../../utils/Debounce/useDebounce";
import ProductForm from "./ProductForm";
import ProductTable from "./ProductTable";
import ProductTablePagination from "./ProductTablePagination";

interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  category: { name: string };
  images: string[];
  slug: string;
}

export function Component() {
  const [products, setProducts] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);
  const [searchParams, setSearchParams] = useSearchParams();

  const [sorting, setSorting] = useState<SortingState>([]);

  const [uploading, setUploading] = useState(false);
  const PaginationState = usePaginationState();
  const { pageIndex, pageSize } = PaginationState.getState();
  const { setTotalCount } = PaginationState;

  // Modal state for add/edit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({});

  const debouncedSearchTerm = useDebounce(globalFilter, 1000); // 2-second delay

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const offset = pageIndex * pageSize;

        // Extract sorting parameters
        const sort = sorting[0]; // from [SortingState]
        const sortTitle = sort?.id || ""; // e.g., "id" or "title"
        const sortDirection = sort?.desc ? "desc" : "asc";

        // Call the API with sorting info
        const res = await GetProducts(
          pageIndex,
          pageSize,
          debouncedSearchTerm,
          sortTitle,
          sortDirection
        );

        // Set query params in the URL
        setSearchParams((params) => {
          params.set("offset", String(offset));
          params.set("limit", String(res?.data?.length || pageSize));

          // Optional search filter
          if (debouncedSearchTerm) {
            params.set("title", debouncedSearchTerm);
          } else {
            params.delete("title");
          }

          // Sorting query params
          if (sortTitle) {
            params.set("sort", sortTitle);
            params.set("direction", sortDirection);
          } else {
            params.delete("sort");
            params.delete("direction");
          }

          return params;
        });

        setProducts(res?.data?.products || res?.data || []);
        setTotalCount(res?.data?.total || res?.data?.count || 0);
      } catch (e) {
        console.error("Error fetching products", e);
        setProducts([]);
      }
      setLoading(false);
    };

    fetchProducts();
  }, [pageIndex, pageSize, debouncedSearchTerm, sorting]);

  // Table columns
  const columns = useMemo(
    () => [
      {
        accessorKey: "id",
        header: "ID",
      },
      {
        accessorKey: "title",
        header: "Title",
      },
      {
        accessorKey: "price",
        header: "Price",
        cell: (info) => `$${info.getValue()}`,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: (info) => info.row.original.category?.name,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: (info) => (
          <div className="flex gap-2">
            <Button
              size="sm"
              variant="outline"
              onClick={() => handleEdit(info.row.original)}
            >
              Edit
            </Button>
            <Button
              size="sm"
              variant="destructive"
              onClick={() => handleDelete(info.row.original.id)}
            >
              Delete
            </Button>
          </div>
        ),
      },
    ],
    []
  );

  // Table instance
  const table = useReactTable({
    data: products,
    columns,
    state: { globalFilter, columnVisibility, sorting },
    getCoreRowModel: getCoreRowModel(),
    manualSorting: true,
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    manualFiltering: true,
  });

  // CRUD handlers
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(endPoints.products + id);
    setProducts((products) => products.filter((p) => p.id !== id));
  };

  const handleEdit = (product: Product) => {
    setEditingProduct(product);
    setShowForm(true);
  };

  const handleAdd = () => {
    setEditingProduct(null);
    setShowForm(true);
  };

  const handleFormSubmit = async (product: Partial<Product>) => {
    setUploading(true);
    if (editingProduct) {
      // Update
      const res = await api.put(
        endPoints.products + editingProduct.id,
        product
      );
      setProducts((products) =>
        products.map((p) => (p.id === editingProduct.id ? res.data : p))
      );
    } else {
      // Add
      const res = await api.post(endPoints.products, product);
      setProducts((products) => [res.data, ...products]);
    }
    setUploading(false);
    setShowForm(false);
  };

  // if (!user) {
  //   return <div className="p-10 text-red-500">Access denied</div>;
  // }

  return (
    <div className="p-8">
      <div className="flex flex-col gap-4 mb-6">
        {/* Header + Actions */}
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-4">
          {/* Title */}
          <div className="flex items-center gap-5 text-gray-800 dark:text-white">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              fill="none"
              stroke="currentColor"
              stroke-width="2"
              stroke-linecap="round"
              stroke-linejoin="round"
              className="feather feather-shopping-cart"
              viewBox="0 0 24 24"
            >
              <circle cx="9" cy="21" r="1" />
              <circle cx="20" cy="21" r="1" />
              <path d="M1 1h4l2.68 13.39a2 2 0 0 0 2 1.61h9.72a2 2 0 0 0 2-1.61l1.38-7.39H6" />
            </svg>
            <h2 className="text-black text-xl font-semibold">
              Manage Products
            </h2>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-2 flex-wrap">
            {/* Columns toggle */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  size="sm"
                  className="whitespace-nowrap"
                >
                  🧩 Columns
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="min-w-[200px]">
                {table.getAllLeafColumns().map((column) => (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    checked={column.getIsVisible()}
                    onCheckedChange={() => column.toggleVisibility()}
                  >
                    {column.columnDef.header as string}
                  </DropdownMenuCheckboxItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>

            {/* Add product */}
            <Button
              onClick={handleAdd}
              size="sm"
              className="bg-blue-600 hover:bg-blue-700 text-white"
            >
              ➕ Add Product
            </Button>
          </div>
        </div>

        {/* Search Input */}
        <div className="w-full max-w-sm">
          <Input
            placeholder="🔍 Search products..."
            value={globalFilter}
            onChange={(e) => {
              setGlobalFilter(e.target.value);
              PaginationState.setPageIndex(0); // Reset to first page
            }}
            className="w-full px-4 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500 dark:bg-gray-800 dark:text-white"
          />
        </div>
      </div>
      <div className="overflow-x-auto ">
        <ProductTable columns={columns} loading={loading} table={table} />
        <ProductTablePagination />
        {showForm && (
          <ProductForm
            product={editingProduct}
            onClose={() => setShowForm(false)}
            onSubmit={handleFormSubmit}
            loading={uploading}
          />
        )}
      </div>
    </div>
  );
}

Component.displayName = "ProductsAdminPage";
