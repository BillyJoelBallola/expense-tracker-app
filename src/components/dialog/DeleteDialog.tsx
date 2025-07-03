"use client";

import { useState } from "react";

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
import { Button } from "@/components/ui/button";
import { Loader, Trash2 } from "lucide-react";

type DeleteDialogProps = {
  description: string;
  isDeleting: boolean;
  handleDelete: (id: string) => Promise<string | number | undefined>;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  open: boolean;
  id: string;
};

function DeleteDialog({
  description,
  isDeleting,
  handleDelete,
  setOpen,
  open,
  id,
}: DeleteDialogProps) {
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <DialogTrigger asChild>
        <Button variant="ghost" size="icon" onClick={() => {}}>
          <Trash2 />
        </Button>
      </DialogTrigger>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Sign In</DialogTitle>
        </DialogHeader>
        <DialogDescription>{description}</DialogDescription>
        <DialogFooter>
          <DialogClose asChild>
            <Button variant="outline" disabled={isDeleting}>
              Cancel
            </Button>
          </DialogClose>
          <Button
            variant="destructive"
            onClick={() => handleDelete(id)}
            disabled={isDeleting}
          >
            {isDeleting && <Loader className="size-4 animate-spin" />} Delete
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}

export default DeleteDialog;
