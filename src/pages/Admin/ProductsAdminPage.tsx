import React, { useEffect, useMemo, useState } from "react";
import { useReactTable, getCoreRowModel, getSortedRowModel, flexRender, getFilteredRowModel } from "@tanstack/react-table";
import { Input } from "../../components/ui/input";
import useAuth from "../../hooks/useAuth";
import { GetProducts } from "@/services/Products";
import ProductTable from "./ProductTable";
import ProductForm from "./ProductForm";
import ProductTablePagination from "./ProductTablePagination";
import { Button } from "../../components/ui/button";
import api from "../../services/api";
import { endPoints } from "../../constants/urls";

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
  const { user } = useAuth();
  const [products, setProducts] = useState<Product[]>([]);
  const [globalFilter, setGlobalFilter] = useState("");
  const [loading, setLoading] = useState(true);

  // Modal state for add/edit
  const [editingProduct, setEditingProduct] = useState<Product | null>(null);
  const [showForm, setShowForm] = useState(false);

  // Pagination state
  const [pageIndex, setPageIndex] = useState(0);
  const [pageSize, setPageSize] = useState(8);
  const [totalCount, setTotalCount] = useState(0);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setLoading(true);
      try {
        const res = await GetProducts(pageIndex, pageSize);
        setProducts(res?.data?.products || res?.data || []);
        setTotalCount(res?.data?.total || res?.data?.count || 0);
      } catch (e) {
        setProducts([]);
      }
      setLoading(false);
    };
    fetchProducts();
  }, [pageIndex, pageSize]);

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
    state: { globalFilter },
    getCoreRowModel: getCoreRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onGlobalFilterChange: setGlobalFilter,
    globalFilterFn: (row, columnId, filterValue) => {
      return String(row.getValue(columnId)).toLowerCase().includes(filterValue.toLowerCase());
    },
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
    if (editingProduct) {
      // Update
      const res = await api.put(endPoints.products + editingProduct.id, product);
      setProducts(products => products.map(p => (p.id === editingProduct.id ? res.data : p)));
    } else {
      // Add
      const res = await api.post(endPoints.products, product);
      setProducts(products => [res.data, ...products]);
    }
    setShowForm(false);
  };

  if (!user) {
    return <div className="p-10 text-red-500">Access denied. Admins only.</div>;
  }

  return (
    <div className="p-8">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-2xl font-bold">Products Admin</h2>
        <Button onClick={handleAdd}>Add Product</Button>
      </div>
      <Input
        placeholder="Search products..."
        value={globalFilter}
        onChange={e => setGlobalFilter(e.target.value)}
        className="mb-4 max-w-xs"
      />
      <ProductTable products={products} columns={columns} loading={loading} table={table} />
      <ProductTablePagination
        pageIndex={pageIndex}
        pageSize={pageSize}
        totalCount={totalCount}
        setPageIndex={setPageIndex}
        setPageSize={setPageSize}
      />
      {showForm && (
        <ProductForm
          product={editingProduct}
          onClose={() => setShowForm(false)}
          onSubmit={handleFormSubmit}
        />
      )}
    </div>
  );
}

Component.displayName = 'ProductsAdminPage';