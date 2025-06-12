"use client";

import { FormEvent, useEffect, useState } from "react";
import { CircleX, Loader, Plus } from "lucide-react";
import {
  createCategory,
  getCategories,
  removeCategory,
} from "@/actions/category.actions";

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import InputWithLabel from "@/components/input/InputWithLabel";
import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Category as CategoryModel } from "@/generated/prisma";
import { categoryIcon } from "@/lib/categoryIcon";
import { toast } from "sonner";
import {
  Dialog,
  DialogClose,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

function Category() {
  const [categories, setCategories] = useState<CategoryModel[]>();
  const [isPending, setIsPending] = useState({
    adding: false,
    removing: false,
  });
  const [categoryData, setCategoryData] = useState({
    type: "EXPENSE" as CategoryModel["type"],
    label: "",
  });

  useEffect(() => {
    const fetchCategories = async () => {
      const response = await getCategories();
      if (response) setCategories(response);
    };

    fetchCategories();
  }, [isPending]);

  const handleForm = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    setIsPending((prev) => ({ ...prev, adding: true }));

    try {
      const response = await createCategory(categoryData);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        setCategoryData({
          type: "EXPENSE",
          label: "",
        });
        return toast.success("Category successfully added");
      }
    } catch (error) {
      return toast.error("An error occured while saving changes");
    } finally {
      setIsPending((prev) => ({ ...prev, adding: false }));
    }
  };

  const handleRemove = async (categoryId: string) => {
    setIsPending((prev) => ({ ...prev, removing: true }));

    try {
      const response = await removeCategory(categoryId);

      if (response?.error) {
        return toast.error(response.error);
      }

      if (response?.success) {
        return toast.success("Category remove successfully");
      }
    } catch (error) {
      return toast.error("An error occured while saving changes");
    } finally {
      setIsPending((prev) => ({ ...prev, removing: false }));
    }
  };

  return (
    <Card className="space-y-4">
      <CardHeader>
        <CardTitle>Category</CardTitle>
        <CardDescription>Manage your category here.</CardDescription>
      </CardHeader>
      <CardContent>
        <form onSubmit={handleForm} className="space-y-4">
          <div className="grid gap-2">
            <span className="text-sm font-semibold">Type</span>
            <RadioGroup
              className="flex items-center gap-2"
              defaultValue={categoryData.type}
              onValueChange={(value) =>
                setCategoryData((prev) => ({
                  ...prev,
                  type: value as CategoryModel["type"],
                }))
              }
            >
              <div className="flex items-center gap-2 border p-2 rounded-full">
                <RadioGroupItem id="expense" value="EXPENSE" />
                <Label htmlFor="expense">Expense</Label>
              </div>
              <div className="flex items-center gap-2 border p-2 rounded-full">
                <RadioGroupItem id="income" value="INCOME" />
                <Label htmlFor="income">Income</Label>
              </div>
            </RadioGroup>
          </div>
          <InputWithLabel
            label="Label"
            placeholder="e.g. Bills"
            id="label"
            className="sm:w-sm"
            value={categoryData.label}
            onChange={(value) => {
              setCategoryData((prev) => ({
                ...prev,
                label: value as string,
              }));
            }}
          />
          <Button
            className="mt-4"
            type="submit"
            disabled={isPending.adding || categoryData.label === ""}
          >
            {isPending.adding ? (
              <Loader className="size-4 animate-spin" />
            ) : (
              <Plus className="size-4" />
            )}{" "}
            Add
          </Button>
        </form>

        <hr className="my-4" />

        <div>
          <span className="font-semibold text-sm">Categories</span>
          <div className="flex items-center gap-2 flex-wrap mt-2">
            {categories
              ?.filter((cs) => cs.type !== "TRANSFER")
              ?.map((c) => (
                <div
                  key={c.id}
                  className="flex items-center gap-4 p-2 border rounded-full"
                >
                  <div className="flex items-center gap-2 text-xs font-semibold">
                    {categoryIcon(c.label, "size-4")}
                    <span>{c.label}</span>
                  </div>
                  <Dialog>
                    <DialogTrigger asChild>
                      <button type="button" className="cursor-pointer">
                        <CircleX className="size-4" />
                      </button>
                    </DialogTrigger>
                    <DialogContent>
                      <DialogHeader>
                        <DialogTitle>Category</DialogTitle>
                        <DialogDescription>
                          Remove category '{c.label}'
                        </DialogDescription>
                      </DialogHeader>
                      <p className="text-sm">
                        Are you sure you want to remove this category?
                      </p>
                      <DialogFooter>
                        <DialogClose asChild>
                          <Button
                            disabled={isPending.removing}
                            variant="outline"
                          >
                            Cancel
                          </Button>
                        </DialogClose>
                        <Button
                          disabled={isPending.removing}
                          onClick={() => handleRemove(c.id)}
                        >
                          {isPending.removing && (
                            <Loader className="size-4 animate-spin" />
                          )}{" "}
                          Yes
                        </Button>
                      </DialogFooter>
                    </DialogContent>
                  </Dialog>
                </div>
              ))}
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default Category;
