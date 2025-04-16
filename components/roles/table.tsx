"use client";

import { useState } from "react";
import JobRoledetail from "./detail-modal";
import { upsertJobRole, deleteJobRole } from "@/libs/actions";
import { createClient } from "@/libs/supabase/client";
import { DataTableToolbar } from "../datatable/data-table-toolbar";
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
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  PaginationState,
  SortingState,
  useReactTable,
} from "@tanstack/react-table";
import { DataTablePagination } from "../datatable/data-table-pagination";
import { DataTableColumnHeader } from "../datatable/data-table-column-header";
import { Pencil, Plus, Trash } from "lucide-react";
import ConfirmModal from "../dialog/confirm";

type JobRole = {
  id: string;
  profile_id: string;
  job_title: string;
  location: string;
  job_type: Record<string, boolean>;
  work_type: string;
  experience_level: Record<string, boolean>;
  date: Record<string, boolean>;
  apply_once_at_company: boolean;
  company_blacklist: string[];
  title_blacklist: string[];
  min_applicants: number;
  max_applicants: number;
  created_at: string;
  updated_at: string;
};

type TableActionsProps = {
  jobs: JobRole[];
  initialPageSize?: number;
};

const TableActions = ({
  jobs: jobs,
  initialPageSize = 10,
}: TableActionsProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [deleteRow, setDeleteRow] = useState<JobRole | null>(null);
  const [jobToEdit, setJobToEdit] = useState<JobRole | null>(null);
  const supabase = createClient();

  const handleSaveJob = async (job: JobRole) => {
    try {
      const { data: userData } =
        await supabase.auth.getUser();
      const jobWithProfileId = {
        ...job,
        profile_id: userData.user.id,
      };
      await upsertJobRole(jobWithProfileId, jobToEdit); // Llamamos a la Server Action
      setJobToEdit(null); // Resetear el trabajo que estaba en edición
      setIsModalOpen(false); // Cerrar el modal
    } catch (error) {
      console.error("Error saving job role:", error);
    }
  };

  const handleEdit = (job: JobRole) => {
    setJobToEdit(job);
    setIsModalOpen(true);
  };

  const onDelete = async () => {
    try {
      await deleteJobRole(deleteRow.id); // Llamamos a la Server Action para eliminar
    } catch (error) {
      console.error("Error deleting job role:", error);
    }
    setDeleteRow(null);
  };

  const formatJobType = (jobType: Record<string, boolean>) => {
    return Object.keys(jobType)
      .filter((key) => jobType[key])
      .map((key) => key)
      .join(", ");
  };

  const columns: ColumnDef<JobRole>[] = [
    {
      accessorKey: `job_title`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Title" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: `location`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: `job_type`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Type" />
      ),
      cell: ({ row }) => <>{formatJobType(row.getValue("job_type"))}</>,
    },
    {
      accessorKey: `work_type`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Work Type" />
      ),
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center space-x-2">
            <button
              aria-label="Edit job"
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => handleEdit(row.original)}
            >
              <Pencil />
            </button>

            <button
              aria-label="Delete job"
              className="btn text-error/70 hover:bg-error/20 btn-xs btn-square btn-ghost"
              onClick={() => setDeleteRow(row.original)}
            >
              <Trash />
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
          <span className="font-bold text-lg">Job Roles</span>
          <button
            onClick={() => {
              setJobToEdit(null); // Resetear cualquier trabajo en edición
              setIsModalOpen(true); // Abrir el modal en modo "crear"
            }}
            className="btn bg-primary text-white btn-md"
          >
            <Plus />
            Add Job Role
          </button>
        </div>

        <div className="space-y-4">
          <DataTableToolbar table={table} />
          <Table className="table-md capitalize">
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

        <JobRoledetail
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          existingJob={jobToEdit} // Pasar el trabajo existente si se está editando
          onSubmit={handleSaveJob}
        />

        <ConfirmModal
          open={!!deleteRow}
          onCancel={() => setDeleteRow(null)}
          onConfirm={onDelete}
          title={`Are you sure you want to delete the job role "${deleteRow?.job_title}"?`}
          confirmText="Yes, delete"
          cancelText="Cancel"
        />
      </div>
    </div>
  );
};

export default TableActions;
