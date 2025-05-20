import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";

export default function ProductForm({
  product,
  onClose,
  onSubmit,
}: {
  product: any,
  onClose: () => void,
  onSubmit: (product: any) => void
}) {
  const [form, setForm] = useState({
    title: product?.title || "",
    price: product?.price || "",
    description: product?.description || "",
    categoryId: product?.category?.id || "",
    images: product?.images?.[0] || "",
  });

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const payload = {
      ...form,
      price: Number(form.price),
      images: [form.images],
      categoryId: Number(form.categoryId),
    };
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h3 className="text-xl font-bold mb-2">{product ? "Edit Product" : "Add Product"}</h3>
        <Input name="title" placeholder="Title" value={form.title} onChange={handleChange} required />
        <Input name="price" placeholder="Price" type="number" value={form.price} onChange={handleChange} required />
        <Input name="images" placeholder="Image URL" value={form.images} onChange={handleChange} required />
        <Input name="categoryId" placeholder="Category ID" value={form.categoryId} onChange={handleChange} required />
        <textarea name="description" placeholder="Description" value={form.description} onChange={handleChange} className="w-full border rounded p-2" required />
        <div className="flex gap-2 justify-end">
          <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
          <Button type="submit">{product ? "Update" : "Add"}</Button>
        </div>
      </form>
    </div>
  );
}