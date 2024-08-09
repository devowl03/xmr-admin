"use client";

import * as React from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { ArrowUpDown, ChevronDown, MoreHorizontal } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuCheckboxItem,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { Checkbox } from "@/components/ui/checkbox";

import { Input } from "@/components/ui/input";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

const data: Payment[] = [
  {
    id: "g7d9k2hp",
    amount: 641,
    status: "success",
    email: "rfqxcka@gmail.com",
  },
  {
    id: "w0bs3e5h",
    amount: 482,
    status: "pending",
    email: "hjgfkdy@hotmail.com",
  },
  {
    id: "m4x9h6wq",
    amount: 718,
    status: "failed",
    email: "jklrmqz@outlook.com",
  },
  {
    id: "k1p9r2dx",
    amount: 253,
    status: "success",
    email: "kzgmwbq@hotmail.com",
  },
  { id: "r8l0d6fy", amount: 935, status: "failed", email: "ahjvtpe@gmail.com" },
  {
    id: "s2h3d4ne",
    amount: 321,
    status: "pending",
    email: "qngfjsp@yahoo.com",
  },
  {
    id: "b4c7r9wp",
    amount: 857,
    status: "success",
    email: "jpnfxqe@outlook.com",
  },
  { id: "m3k7x2dj", amount: 430, status: "failed", email: "owrtlkx@gmail.com" },
  {
    id: "p9d0n5lz",
    amount: 764,
    status: "pending",
    email: "mvspqtl@gmail.com",
  },
  {
    id: "j6x2k8wr",
    amount: 281,
    status: "success",
    email: "bktnrhz@yahoo.com",
  },
  {
    id: "y7m8n4ts",
    amount: 552,
    status: "failed",
    email: "rfplmvx@hotmail.com",
  },
  {
    id: "x9p5v6dw",
    amount: 693,
    status: "success",
    email: "zhxlpyr@outlook.com",
  },
  {
    id: "a4f7c8me",
    amount: 309,
    status: "pending",
    email: "ktpfyns@gmail.com",
  },
  { id: "b6z1m2rq", amount: 861, status: "failed", email: "jmtpyql@gmail.com" },
  {
    id: "h8d5j3lp",
    amount: 456,
    status: "success",
    email: "bnktply@outlook.com",
  },
  { id: "c2x7m5wr", amount: 734, status: "failed", email: "mkylqwr@yahoo.com" },
  {
    id: "e0k4f6ty",
    amount: 342,
    status: "pending",
    email: "ynwptfx@gmail.com",
  },
  {
    id: "u9m5p3bz",
    amount: 789,
    status: "success",
    email: "zmlptyj@hotmail.com",
  },
  {
    id: "q8h2l1wx",
    amount: 219,
    status: "failed",
    email: "qjkplmv@outlook.com",
  },
  {
    id: "n3p5z6dk",
    amount: 540,
    status: "pending",
    email: "mpztrxl@yahoo.com",
  },
  {
    id: "o5d9n2hp",
    amount: 612,
    status: "success",
    email: "rlkpqyx@gmail.com",
  },
  {
    id: "m0s6v4nw",
    amount: 487,
    status: "failed",
    email: "rjpkylz@hotmail.com",
  },
  {
    id: "z1h7p3tx",
    amount: 932,
    status: "pending",
    email: "hjptflr@gmail.com",
  },
  {
    id: "c9b3v5dy",
    amount: 329,
    status: "success",
    email: "xfjtpyl@yahoo.com",
  },
  {
    id: "d4m8r7kp",
    amount: 759,
    status: "failed",
    email: "qlfjkpr@outlook.com",
  },
  {
    id: "j2h5x6rw",
    amount: 231,
    status: "pending",
    email: "nptxlmq@hotmail.com",
  },
  {
    id: "w3m9n2fy",
    amount: 678,
    status: "success",
    email: "mlrpkjy@gmail.com",
  },
  { id: "k7d4j8tx", amount: 523, status: "failed", email: "bjktzlp@gmail.com" },
  {
    id: "p2m3n6bz",
    amount: 814,
    status: "pending",
    email: "xlfpkyj@yahoo.com",
  },
  {
    id: "o1h9p4kx",
    amount: 374,
    status: "success",
    email: "rlfjkpq@outlook.com",
  },
  { id: "y8d7m2wr", amount: 653, status: "failed", email: "nkjtpyl@gmail.com" },
  {
    id: "e9m5n6tp",
    amount: 457,
    status: "pending",
    email: "xlfkpqz@hotmail.com",
  },
  {
    id: "s4k3j8dw",
    amount: 712,
    status: "success",
    email: "rfkpljx@gmail.com",
  },
  { id: "b1m9v2nx", amount: 293, status: "failed", email: "tlkpmxy@yahoo.com" },
  {
    id: "r5h2x6wy",
    amount: 829,
    status: "pending",
    email: "hjpkmxf@outlook.com",
  },
  {
    id: "g9b8m3kw",
    amount: 519,
    status: "success",
    email: "bflptzy@hotmail.com",
  },
  { id: "j6k4n8px", amount: 478, status: "failed", email: "mjlkprx@gmail.com" },
  {
    id: "a2m5p7dy",
    amount: 601,
    status: "pending",
    email: "qlfjtpn@yahoo.com",
  },
  {
    id: "n3p9j4tw",
    amount: 780,
    status: "success",
    email: "hplmryx@outlook.com",
  },
  { id: "k0d8v6rw", amount: 439, status: "failed", email: "xjpkzly@gmail.com" },
];

export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};

export const columns: ColumnDef<Payment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "status",
    header: "Status",
    cell: ({ row }) => (
      <div className="capitalize">{row.getValue("status")}</div>
    ),
  },
  {
    accessorKey: "email",
    header: ({ column }) => {
      return (
        <Button
          variant="ghost"
          onClick={() => column.toggleSorting(column.getIsSorted() === "asc")}
        >
          Email
          <ArrowUpDown className="ml-2 h-4 w-4" />
        </Button>
      );
    },
    cell: ({ row }) => <div className="lowercase">{row.getValue("email")}</div>,
  },
  {
    accessorKey: "amount",
    header: () => <div className="text-right">Amount</div>,
    cell: ({ row }) => {
      const amount = parseFloat(row.getValue("amount"));

      // Format the amount as a dollar amount
      const formatted = new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(amount);

      return <div className="text-right font-medium">{formatted}</div>;
    },
  },
  {
    id: "actions",
    enableHiding: false,
    cell: ({ row }) => {
      const payment = row.original;

      return (
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="ghost" className="h-8 w-8 p-0">
              <span className="sr-only">Open menu</span>
              <MoreHorizontal className="h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            <DropdownMenuLabel>Actions</DropdownMenuLabel>
            <DropdownMenuItem
              onClick={() => navigator.clipboard.writeText(payment.id)}
            >
              Copy payment ID
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem>View customer</DropdownMenuItem>
            <DropdownMenuItem>View payment details</DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>
      );
    },
  },
];

export function DataTableDemo() {
  const [sorting, setSorting] = React.useState<SortingState>([]);
  const [columnFilters, setColumnFilters] = React.useState<ColumnFiltersState>(
    []
  );
  const [columnVisibility, setColumnVisibility] =
    React.useState<VisibilityState>({});
  const [rowSelection, setRowSelection] = React.useState({});
  const [pagination, setPagination] = React.useState({
    pageIndex: 0, //initial page index
    pageSize: 10, //default page size
  });

  const table = useReactTable({
    data,
    columns,

    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    getCoreRowModel: getCoreRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    onColumnVisibilityChange: setColumnVisibility,
    onRowSelectionChange: setRowSelection,
    initialState: {
      pagination: {
        pageIndex: 1, //custom initial page index
        pageSize: 5, //custom default page size
      },
    },
    state: {
      sorting,
      columnFilters,
      columnVisibility,
      rowSelection,
    },
  });

  return (
    <div className="w-[700px]">
      <div className="flex items-center py-4">
        <Input
          placeholder="Filter emails..."
          value={(table.getColumn("email")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("email")?.setFilterValue(event.target.value)
          }
          className="max-w-sm"
        />
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button variant="outline" className="ml-auto">
              Columns <ChevronDown className="ml-2 h-4 w-4" />
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end">
            {table
              .getAllColumns()
              .filter((column) => column.getCanHide())
              .map((column) => {
                return (
                  <DropdownMenuCheckboxItem
                    key={column.id}
                    className="capitalize"
                    checked={column.getIsVisible()}
                    onCheckedChange={(value) =>
                      column.toggleVisibility(!!value)
                    }
                  >
                    {column.id}
                  </DropdownMenuCheckboxItem>
                );
              })}
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  data-state={row.getIsSelected() && "selected"}
                >
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
      </div>
      <div className="flex items-center justify-end space-x-2 py-4">
        <div className="flex-1 text-sm text-muted-foreground">
          {table.getFilteredSelectedRowModel().rows.length} of{" "}
          {table.getFilteredRowModel().rows.length} row(s) selected.
        </div>
        <div className="space-x-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.previousPage()}
            disabled={!table.getCanPreviousPage()}
          >
            Previous
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => table.nextPage()}
            disabled={!table.getCanNextPage()}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  );
}
