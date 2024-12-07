"use client";

import React, { createContext, FC, useState } from "react";
import JobProfileDetail from "./detail-modal";
import { deleteJobProfile, createJobProfile } from "@/libs/actions";
import ConfirmModal from "../dialog/confirm"; // Importa el componente Confirm
import { CVType, JobProfile } from "@/libs/definitions";
import { serialize } from "object-to-formdata";
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
import { DataTableColumnHeader } from "../datatable/data-table-column-header";
import { DataTableToolbar } from "../datatable/data-table-toolbar";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "../ui/table";
import { DataTablePagination } from "../datatable/data-table-pagination";
import { Eye, Plus, Trash } from "lucide-react"

interface TableProfilesProps {
  cv: CVType;
  profiles: JobProfile[];
  initialPageSize?: number;
}

export const CVFileContext = createContext(null);

const TableProfiles: FC<TableProfilesProps> = ({
  cv,
  profiles,
  initialPageSize = 10,
}: TableProfilesProps) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [currentProfile, setCurrentProfile] = useState<JobProfile | null>(null);
  const [profileToDelete, setProfileToDelete] = useState<JobProfile | null>(
    null
  );
  const [cvFile, setCVFile] = useState(cv);

  const handleAddProfile = () => {
    setCurrentProfile(null);
    setIsModalOpen(true);
  };

  const handleEditProfile = (profile: JobProfile) => {
    setCurrentProfile(profile);
    setIsModalOpen(true);
  };

  const handleDeleteClick = (profile: JobProfile) => {
    setProfileToDelete(profile);
  };

  const handleConfirmDelete = async () => {
    if (!profileToDelete) return;

    try {
      const response = await deleteJobProfile(profileToDelete.personalInfo);
      if (response.success) {
        console.log("Profile deleted successfully");
      } else {
        console.error("Error deleting profile:", response.error);
      }
    } catch (error) {
      console.error("Error deleting profile:", error);
    } finally {
      setProfileToDelete(null);
    }
  };

  const handleProfileSubmit = async (jobProfile: JobProfile) => {
    try {      
      const response = await createJobProfile(
        serialize(jobProfile, { indices: true, dotsForObjectNotation: true })
      );

      if (response.success) {
        console.log("Profile saved successfully");
        setIsModalOpen(false);
      } else {
        console.error("Error saving profile:", response.error);
      }
    } catch (error) {
      console.error("Error submitting profile:", error);
    }
  };

  const columns: ColumnDef<JobProfile>[] = [
    {
      accessorKey: "personalInfo.name",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Name" />
      ),
      cell: ({ row }) => (
        <div>{`${row.original.personalInfo.name} ${row.original.personalInfo.surname}`}</div>
      ),
    },
    {
      accessorKey: "personalInfo.city",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Location" />
      ),
      cell: ({ row }) => (
        <div>{`${row.original.personalInfo.city}, ${row.original.personalInfo.country}`}</div>
      ),
    },
    {
      accessorKey: "personalInfo.email",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Email" />
      ),
    },
    {
      id: "resume",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Resume" />
      ),
      cell: ({ row }) => (
        <a
          href={`/api/download/resume?path=${cv.path}`}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          Resume
        </a>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "personalInfo.linkedin",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="LinkedIn" />
      ),
      cell: ({ row }) => (
        <a
          href={row.original.personalInfo.linkedin}
          target="_blank"
          rel="noopener noreferrer"
          className="link link-primary"
        >
          LinkedIn
        </a>
      ),
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        return (
          <div className="flex items-center gap-2">
            <button
              aria-label="View job details"
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => handleEditProfile(row.original)}
            >
              <Eye />
            </button>
            <button
              aria-label="Delete profile"
              className="btn text-error/70 hover:bg-error/20 btn-xs btn-square btn-ghost"
              onClick={() => handleDeleteClick(row.original)}
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
    data: profiles,
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
          <span className="font-bold text-lg">Job Profiles</span>
          <button
            className="btn bg-primary text-white btn-md"
            onClick={handleAddProfile}
          >
            <Plus />
            Add Job Profile
          </button>
        </div>

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

      <CVFileContext.Provider value={{ cvFile, setCVFile }}>
        <JobProfileDetail
          isModalOpen={isModalOpen}
          setIsModalOpen={setIsModalOpen}
          existingProfile={currentProfile}
          onSubmit={handleProfileSubmit}
        />
      </CVFileContext.Provider>

      <ConfirmModal
        open={!!profileToDelete}
        onCancel={() => setProfileToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete the profile?`}
        confirmText="Yes, delete"
        cancelText="Cancel"
      />
    </div>
  );
};

export default TableProfiles;