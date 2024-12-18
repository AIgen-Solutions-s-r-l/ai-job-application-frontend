"use client";

import React, { useState } from "react";
import { AppliedJob, AutoJob } from "@/libs/definitions"; // Aquí importas tu interfaz para tipar los datos
import DetailModal from "./detail-modal"; // Importamos el modal de detalles
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import {
  ColumnDef,
  flexRender,
  getCoreRowModel,
  SortingState,
  useReactTable,
  getPaginationRowModel,
  PaginationState,
  ColumnFiltersState,
  getFilteredRowModel,
  getSortedRowModel,
} from "@tanstack/react-table";
import { DataTableColumnHeader } from "../datatable/data-table-column-header";
import clsx from "clsx";
import { Eye } from "lucide-react";
import { DataTablePagination } from "../datatable/data-table-pagination";
import { DataTableToolbar } from "../datatable/data-table-toolbar";

interface AutoJobsTableProps {
  jobs: AppliedJob[]; // Propiedad 'jobs' tipada con la interfaz 'AutoJob'
  initialPageSize?: number;
}

const AutoJobsTable = ({ jobs, initialPageSize = 10 }: AutoJobsTableProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentJob, setCurrentJob] = useState<AppliedJob | null>(null);

  // Función para abrir el modal con los detalles del trabajo
  const handleViewDetails = (job: AppliedJob) => {
    setCurrentJob(job);
    setIsModalOpen(true);
  };

  const columns: ColumnDef<AppliedJob>[] = [
    {
      accessorKey: "company_id",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Company"
          className="min-w-[150px]"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "title",
      header: ({ column }) => (
        <DataTableColumnHeader
          column={column}
          title="Job Title"
          className="min-w-[150px]"
        />
      ),
      enableSorting: false,
    },
    {
      accessorKey: "location_id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
    },
    {
      accessorKey: "apply_link",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Link" />
      ),
      cell: ({ row }) => (
        <a
          href={row.getValue("apply_link")}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          Job Link
        </a>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "job_state",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("job_state");
        return (
          <div
            className={clsx(
              `inline rounded-badge px-3 py-1 text-xs font-medium`,
              status === "Success" && `bg-success/5 text-success`,
              status === "Skipped" && `bg-info/5 text-info`,
              status === "Failed" && `bg-error/5 text-error`
            )}
          >
            {status as string}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "posted_date",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Date Applied" />
      ),
      cell: ({ row }) => {
        const createdAt = row.getValue("posted_date");
        return (
          <>
            {createdAt
              ? new Date(createdAt as string).toLocaleDateString()
              : "N/A"}
          </>
        );
      },
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center">
            <button
              aria-label="View job details"
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => handleViewDetails(row.original)}
            >
              <Eye />
            </button>
          </div>
        );
      },
      enableSorting: false,
    },
  ];

  const [sorting, setSorting] = useState<SortingState>([]);
  const [pagination, setPagination] = useState<PaginationState>({
    pageSize: initialPageSize,
    pageIndex: 0,
  });
  const [globalFilter, setGlobalFilter] = useState<any>();

  const table = useReactTable({
    data: jobs,
    columns,
    state: {
      sorting,
      pagination,
      globalFilter,
    },
    globalFilterFn: "includesString",
    onSortingChange: setSorting,
    onGlobalFilterChange: setGlobalFilter,
    onPaginationChange: setPagination,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getSortedRowModel: getSortedRowModel(),
  });

  return (
    <div aria-label="Card" className="card bg-base-100 card-bordered">
      <div className="card-body">
        <div className="flex items-center justify-between pb-5">
          <span className="font-bold text-lg">Jobs Analyzed</span>
        </div>

        {/* Tabla para mostrar los trabajos */}
        <div className="space-y-4">
          <DataTableToolbar table={table} />
          <Table className="table-md">
            <TableHeader>
              {table.getHeaderGroups().map((headerGroup) => (
                <TableRow key={headerGroup.id}>
                  {headerGroup.headers.map((header) => (
                    <TableHead key={header.id} colSpan={header.colSpan}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  ))}
                </TableRow>
              ))}
            </TableHeader>
            <TableBody>
              {table.getRowModel().rows?.length ? (
                table.getRowModel().rows.map((row) => (
                  <TableRow key={row.id}>
                    {row.getVisibleCells().map((cell) => (
                      <TableCell key={cell.id}>
                        {flexRender(
                          cell.column.columnDef.cell,
                          cell.getContext()
                        )}
                      </TableCell>
                    ))}
                  </TableRow>
                ))
              ) : (
                <TableRow>
                  <TableCell
                    colSpan={columns.length}
                    className="h-24 text-center"
                  >
                    No results.
                  </TableCell>
                </TableRow>
              )}
            </TableBody>
          </Table>
          <DataTablePagination table={table} />
        </div>
      </div>

      {/* Modal para ver los detalles del trabajo */}
      <DetailModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        job={currentJob}
      />
    </div>
  );
};

export default AutoJobsTable;
