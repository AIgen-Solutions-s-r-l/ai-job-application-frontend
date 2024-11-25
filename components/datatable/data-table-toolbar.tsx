"use client";

import { Table } from "@tanstack/react-table";
import { X } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = !!table.getState().globalFilter;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center justify-end space-x-2">
        <Input
          placeholder="Search..."
          value={table.getState().globalFilter}
          onChange={(event) =>
            table.setGlobalFilter(String(event.target.value))
          }
          className="h-10 w-[150px] lg:w-[250px]"
        />
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.setGlobalFilter("")}
            className="h-10 px-2 lg:px-3"
          >
            Reset
            <X />
          </Button>
        )}
      </div>
    </div>
  );
}
