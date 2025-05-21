import React, { useState } from "react";
import { Input } from "../../components/ui/input";
import { Button } from "../../components/ui/button";
import {  z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Loader } from "lucide-react";

const productSchema = z.object({
  title: z.string().min(2, "Title is required"),
  price: z.preprocess((val) => Number(val), z.number().min(0, "Price is required")),
  description: z.string().min(10, "Description is required"),
  categoryId: z.preprocess((val) => Number(val), z.number().min(1, "Category ID is required")),
  images: z.string().url("Image URL is required"),
});

type ProductFormValues = z.infer<typeof productSchema>;

export default function ProductForm({
  product,
  onClose,
  onSubmit,
  loading
}: {
  product: any,
  onClose: () => void,
  onSubmit: (product: any) => void
  loading: boolean
}) {
  const { register, handleSubmit, formState: { errors } } = useForm<ProductFormValues>({
    resolver: zodResolver(productSchema),
    defaultValues: {
      title: product?.title || "",
      price: product?.price?.toString() || "",
      description: product?.description || "",
      categoryId: product?.categoryId?.toString() || "",
      images: product?.images?.[0] || "",
    },
  });

  const SubmitForm = (data: ProductFormValues) => {
    const payload = {
      ...data,
      images: [data.images],
    };
    console.log("Form submitted:", payload);
    onSubmit(payload);
  };

  return (
    <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
      <form onSubmit={handleSubmit(SubmitForm)} className="bg-white p-8 rounded-lg shadow-lg w-full max-w-md space-y-4">
        <h3 className="text-xl font-bold mb-2">{product ? "Edit Product" : "Add Product"}</h3>

        <Input
          placeholder="Title"
          {...register("title")}
          required
        />
        {errors.title && (
          <p className="text-red-500 text-xs">{errors.title.message}</p>
        )}

        <Input
          placeholder="Price"
          type="number"
          {...register("price")}
          required
        />
        {errors.price && (
          <p className="text-red-500 text-xs">{errors.price.message}</p>
        )}

        <Input
          placeholder="Image URL"
          {...register("images")}
          required
        />
        {errors.images && (
          <p className="text-red-500 text-xs">{errors.images.message}</p>
        )}

        <Input
          type="text"
          placeholder="Category ID"
          {...register("categoryId")}
          required
        />
        {errors.categoryId && (
          <p className="text-red-500 text-xs">{errors.categoryId.message}</p>
        )}

        <textarea
          placeholder="Description"
          {...register("description")}
          required
        />
        {errors.description && (
          <p className="text-red-500 text-xs">{errors.description.message}</p>
        )}
        {loading
          ?
          <Loader />
          :
          <div className="flex gap-2 justify-end">
            <Button type="button" variant="outline" onClick={onClose}>Cancel</Button>
            <Button type="submit">{product ? "Update" : "Add"}</Button>
          </div>}
      </form>
    </div>
  );
}