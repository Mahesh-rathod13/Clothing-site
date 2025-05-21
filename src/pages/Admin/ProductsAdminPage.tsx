import { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel} from "@tanstack/react-table";
import { Input } from "../../components/ui/input";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductTablePagination from "./ProductTablePagination";
import { Button } from "../../components/ui/button";
import api from "../../services/api";
import { endPoints } from "../../constants/urls";
import { usePaginationState } from "../../store/PaginationState";
import { GetProducts } from "../../services/Products";
import { Loader } from "lucide-react";
import { useSearchParams } from "react-router";
import useDebounce from "../../utils/Debounce/useDebounce";
import { DropdownMenu, DropdownMenuCheckboxItem, DropdownMenuContent, DropdownMenuTrigger } from "../../components/ui/dropdown-menu";

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

  const [uploading, setUploading] = useState(false);
  const PaginationState = usePaginationState();
  const { pageIndex, pageSize } = PaginationState.getState();
  const { setTotalCount } = PaginationState;

  // Modal state for add/edit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Column visibility state
  const [columnVisibility, setColumnVisibility] = useState({});

  const debouncedSearchTerm = useDebounce(globalFilter, 100); // 2-second delay

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const offset = pageIndex * pageSize;
        const res = await GetProducts(pageIndex, pageSize, debouncedSearchTerm);

        setSearchParams(params => {
          params.set("offset", String(offset));
          params.set("limit", String(res?.data?.length));
          if (debouncedSearchTerm) params.set("search", debouncedSearchTerm);
          else params.delete("search");
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
  }, [pageIndex, pageSize, debouncedSearchTerm, setSearchParams]);

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
        cell: info => `$${info.getValue()}`,
      },
      {
        accessorKey: "category",
        header: "Category",
        cell: info => info.row.original.category?.name,
      },
      {
        accessorKey: "actions",
        header: "Actions",
        cell: info => (
          <div className="flex gap-2">
            <Button size="sm" variant="outline" onClick={() => handleEdit(info.row.original)}>Edit</Button>
            <Button size="sm" variant="destructive" onClick={() => handleDelete(info.row.original.id)}>Delete</Button>
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
    state: { globalFilter, columnVisibility },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    onColumnVisibilityChange: setColumnVisibility,
    manualFiltering: true,
  });

  // CRUD handlers
  const handleDelete = async (id: number) => {
    if (!window.confirm("Delete this product?")) return;
    await api.delete(endPoints.products + id);
    setProducts(products => products.filter(p => p.id !== id));
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
    setUploading(true)
    if (editingProduct) {
      // Update
      const res = await api.put(endPoints.products + editingProduct.id, product);
      setProducts(products => products.map(p => (p.id === editingProduct.id ? res.data : p)));
    } else {
      // Add
      const res = await api.post(endPoints.products, product);
      setProducts(products => [res.data, ...products]);
    }
    setUploading(false);
    setShowForm(false);
  };


  // if (!user) {
  //   return <div className="p-10 text-red-500">Access denied</div>;
  // }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products Admin</h2>
        <div className="flex gap-2">
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="outline" size="sm">Columns</Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent>
              {table.getAllLeafColumns().map(column => (
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
          <Button onClick={handleAdd}>Add Product</Button>
        </div>
      </div>
      <Input
        placeholder="Search products..."
        value={globalFilter}
        onChange={e => {
          setGlobalFilter(e.target.value);
          // PaginationState.setState({ pageIndex: 0 }); // Reset to first page on search
        }}
        className="mb-4 max-w-xs"
      />
      {loading ? <Loader /> :
        <div className="overflow-x-auto ">
          <ProductTable products={products} columns={columns} loading={loading} table={table} />
          <ProductTablePagination />
          {showForm && (
            <ProductForm
              product={editingProduct}
              onClose={() => setShowForm(false)}
              onSubmit={handleFormSubmit}
              loading={uploading}
            />
          )}
        </div>}
    </div>
  );
}

Component.displayName = 'ProductsAdminPage';