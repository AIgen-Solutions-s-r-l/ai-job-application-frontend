"use client";

import { useCallback, useMemo, useState } from "react";
import { Bot, JobProfile, JobRole } from "@/libs/definitions";
import BotModal from "./detail-modal";
import {
  addBot,
  updateBot,
  deleteBot,
  startBot,
  stopBot,
} from "@/libs/actions";
import ConfirmModal from "../dialog/confirm";
import toast from "react-hot-toast";
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
import { Pencil, Play, Plus, Square, Trash } from "lucide-react";
import clsx from "clsx";
import { UserPlan } from "../subscription/types";
import moment from "moment";

interface BotTableProps {
  bots: Bot[];
  jobProfiles: JobProfile[];
  jobRoles: JobRole[];
  initialPageSize?: number;
  userPlans: UserPlan;
}

export default function BotTable({
  bots,
  jobProfiles,
  jobRoles,
  initialPageSize = 10,
  userPlans,
}: BotTableProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedBot, setSelectedBot] = useState<Bot | null>(null);
  const [botToDelete, setBotToDelete] = useState<Bot | null>(null);
  const [loadingBotId, setLoadingBotId] = useState<string | null>(null);

  const isExpaired = useMemo(
    () => moment(userPlans.expireDate) <= moment(),
    [userPlans]
  );

  const hasActivedBot = useCallback(
    (_bots: Bot[]): boolean => !!_bots.find((bot) => bot.status === "active"),
    []
  );

  const handleAddBot = () => {
    setSelectedBot(null);
    setIsModalOpen(true);
  };

  const handleEditBot = (bot: Bot) => {
    setSelectedBot(bot);
    setIsModalOpen(true);
  };

  const handleSubmit = async (
    botData: Omit<
      Bot,
      "id" | "created_at" | "updated_at" | "total_applications" | "status"
    >,
    botId?: string
  ) => {
    try {
      if (botId) {
        await updateBot(botId, botData);
        console.log("Bot updated successfully");
      } else {
        await addBot(botData);
        console.log("Bot added successfully");
      }
      setIsModalOpen(false);
    } catch (error) {
      console.error("Failed to save bot:", error);
    }
  };

  const handleStartBot = async (bot: Bot) => {
    if (isExpaired) {
      toast.error("Plan is already expired. Please upgrade your plan");
      return;
    }

    if (hasActivedBot(bots)) {
      toast.error("Other bot is already running.");
      return;
    }

    setLoadingBotId(bot.id);
    try {
      await startBot(bot);
      toast.success("Bot started successfully!");
    } catch (error) {
      toast.error(error.message);
      console.error("Failed to start bot:", error);
    } finally {
      setLoadingBotId(null);
    }
  };

  const handleStopBot = async (bot: Bot) => {
    setLoadingBotId(bot.id);
    try {
      await stopBot(bot);
      toast.success("Bot stopped successfully!");
    } catch (error) {
      toast.error("Failed to stop bot");
      console.error("Failed to stop bot:", error);
    } finally {
      setLoadingBotId(null);
    }
  };

  const handleDeleteBot = (bot: Bot) => {
    setBotToDelete(bot);
  };

  const handleConfirmDelete = async () => {
    if (botToDelete) {
      try {
        await deleteBot(botToDelete.id);
        toast.success("Bot deleted successfully");
        console.log("Bot deleted successfully");
      } catch (error) {
        toast.error("Failed to delete bot");
        console.error("Failed to delete bot:", error);
      } finally {
        setBotToDelete(null);
      }
    }
  };

  const columns: ColumnDef<Bot>[] = [
    {
      accessorKey: `name`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Bot Name" />
      ),
      enableSorting: false,
    },
    {
      accessorKey: `total_applications`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Total Applications" />
      ),
    },
    {
      accessorKey: `personal_information.profile_alias`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Profile" />
      ),
    },
    {
      accessorKey: `job_role.job_title`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Job Role" />
      ),
    },
    {
      accessorKey: `status`,
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Status" />
      ),
      cell: ({ row }) => {
        const status = row.getValue("status");
        return (
          <div
            className={clsx(
              `inline rounded-badge px-3 py-1 text-xs font-medium`,
              status === "active" && `bg-success/5 text-success`,
              status === "inactive" && `bg-error/5 text-error`
            )}
          >
            {status === "active" ? "Running" : "Stopped"}
          </div>
        );
      },
      enableSorting: false,
    },
    {
      accessorKey: "id",
      header: ({ column }) => (
        <DataTableColumnHeader column={column} title="Actions" />
      ),
      cell: ({ row }) => {
        const botId = row.getValue("id");
        const status = row.getValue("status");
        return (
          <div className="flex items-center space-x-5">
            {status === "inactive" ? (
              <button
                aria-label="Start bot"
                className="btn btn-xs btn-square btn-ghost hover:bg-success/20"
                onClick={() => handleStartBot(row.original)}
                disabled={loadingBotId === botId}
              >
                {loadingBotId === botId ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <Play />
                )}
              </button>
            ) : (
              <button
                aria-label="Stop bot"
                className="btn btn-xs btn-square btn-ghost text-error/70 hover:bg-error/20"
                onClick={() => handleStopBot(row.original)}
                disabled={loadingBotId === botId}
              >
                {loadingBotId === botId ? (
                  <span className="loading loading-spinner loading-xs"></span>
                ) : (
                  <Square />
                )}
              </button>
            )}
            <button
              aria-label="Edit bot"
              className="btn btn-xs btn-square btn-ghost"
              onClick={() => handleEditBot(row.original)}
            >
              <Pencil />
            </button>

            <button
              aria-label="Delete bot"
              className="btn text-error/70 hover:bg-error/20 btn-xs btn-square btn-ghost"
              onClick={() => handleDeleteBot(row.original)}
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
    data: bots,
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
    <div className="card bg-base-100 shadow-md">
      <div className="card-body">
        <div className="flex justify-between items-center pb-5">
          <h2 className="card-title">Bot Overview</h2>
          <button
            className="btn bg-primary text-white btn-md"
            onClick={handleAddBot}
          >
            <Plus />
            Add New Bot
          </button>
        </div>

        <div className="space-y-4">
          <DataTableToolbar table={table} />
          <Table className="table table-md">
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

      {isModalOpen && (
        <BotModal
          isOpen={isModalOpen}
          setIsOpen={setIsModalOpen}
          jobProfiles={jobProfiles}
          jobRoles={jobRoles}
          onSubmit={handleSubmit}
          bot={selectedBot}
        />
      )}

      <ConfirmModal
        open={!!botToDelete}
        onCancel={() => setBotToDelete(null)}
        onConfirm={handleConfirmDelete}
        title={`Are you sure you want to delete the bot "${botToDelete?.name}"?`}
        confirmText="Yes, delete"
        cancelText="Cancel"
      />
    </div>
  );
}