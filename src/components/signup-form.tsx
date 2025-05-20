import { useState } from "react";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { cn } from "@/lib/utils";
import api from "../services/api";
import { endPoints } from "../constants/urls";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";

const SignupSchema = z.object({
  name: z.string().min(1, "Name is required"),
  email: z.string().email("Invalid email address"),
  password: z.string().min(6, "Password must be at least 6 characters long"),
  confirmPassword: z.string().min(6, "Confirm Password is required"),
  avatar: z.string().url("Invalid URL format"),
  // role: z.enum(["customer", "admin"]),
});

type SignupFormData = z.infer<typeof SignupSchema>;

export default function SignupForm({ className }: { className?: string }) {
  
  const { register, handleSubmit, formState : { errors } } = useForm<SignupFormData>({
    resolver: zodResolver(SignupSchema),
    mode: "onBlur",
  });

  const handleRoleChange = (value: string) => {
    setFormData((prev) => ({ ...prev, role: value }));
  };

  const onSubmit = async(data : FormData) => {
    console.log(data)
    if (data.password !== data.confirmPassword) {
      alert("Passwords do not match.");
      return;
    }

    try {
        const res = await api.post(endPoints.signup, data);
        window.location.href = "/auth/login";
    } catch (error) {
        
    }
  };

  return (
    <form
      onSubmit={handleSubmit(onSubmit)}
      className={cn("mx-auto mt-10 space-y-6 bg-white p-8 rounded-2xl w-[70%]", className)}
    >
      <div className="text-center">
        <h1 className="text-2xl font-bold">Create your account</h1>
        <p className="text-muted-foreground text-sm">
          Fill in the details to register
        </p>
      </div>

      <div className="space-y-4">
        <div className="grid gap-3">
          <Label htmlFor="name">Full Name</Label>
          <Input
            name="name"
            {...register("name")}
            placeholder="John Doe"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="email">Email</Label>
          <Input
            type="email"
            name="email"
            {...register("email")}
            placeholder="john@example.com"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="password">Password</Label>
          <Input
            type="password"
            {...register("password")}
            placeholder="Enter your password"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="confirmPassword">Confirm Password</Label>
          <Input
            type="password"
            {...register("confirmPassword")}
            placeholder="Re-enter your password"
            required
          />
        </div>

        <div className="grid gap-3">
          <Label htmlFor="avatar">Avatar URL</Label>
          <Input
            type="url"
            {...register("avatar")}
            placeholder="https://example.com/avatar.jpg"
          />
        </div>

        {/* <div className="grid gap-3">
          <Label htmlFor="role">Role</Label>
          <Select {...register("role")}>
            <SelectTrigger>
              <SelectValue placeholder="Select a role" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="customer">Customer</SelectItem>
              <SelectItem value="admin">Admin</SelectItem>
            </SelectContent>
          </Select>
        </div> */}
      </div>

      <Button type="submit" className="w-full">
        Sign Up
      </Button>

      <div className="text-sm text-center text-muted-foreground">
        Already have an account?{" "}
        <a href="/login" className="underline underline-offset-4">
          Login
        </a>
      </div>
    </form>
  );
}
