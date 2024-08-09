"use client";
import { useQuery } from "@tanstack/react-query";
import { Button } from "@/components/ui/button";
import { deleteUser, editUser } from "@/services/server/utils";
import { isSuccess, User } from "@/services/types";
import { zodResolver } from "@hookform/resolvers/zod";
import { SubmitHandler, useForm } from "react-hook-form";
import { ColumnDef, Row } from "@tanstack/react-table";

import { DataTable } from "./data-table";
import { userList } from "@/services/server/utils";
import { SetStateAction, useEffect, useState } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { MoreHorizontal } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { z } from "zod";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/components/ui/form";

export type TPagination = {
  pageIndex: number; // custom initial page index
  pageSize: number; // custom default page size
};
export type Payment = {
  id: string;
  amount: number;
  status: "pending" | "processing" | "success" | "failed";
  email: string;
};
export default function DemoPage() {
  const [pagination, setPagination] = useState<TPagination>({
    pageIndex: 0, // custom initial page index
    pageSize: 5, // custom default page size
  });
  const formSchema = z.object({
    username: z.string().min(2).max(50),
    balance: z.string(),
    betPublic: z.boolean(),
  });
  const [isOpen, setisOpen] = useState(false);
  const [currentUser, setcurrentUser] = useState<string>();
  const form = useForm<z.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      username: "",
      balance: "0",
      betPublic: false,
    },
  });

  const { data, refetch } = useQuery({
    queryKey: ["data", pagination],
    queryFn: () =>
      userList({
        page: pagination.pageIndex,
        limit: pagination.pageSize,
      }),
    placeholderData: (prev) => prev,
  });

  // This type is used to define the shape of our data.
  // You can use a Zod schema here if you want.

  const columns: ColumnDef<User>[] = [
    {
      accessorKey: "username",
      header: "username",
    },
    {
      accessorKey: "commission",
      header: "commission",
    },

    {
      accessorKey: "balance",
      header: "balance",
    },
    {
      accessorKey: "inviteCode",
      header: "inviteCode",
    },
    {
      header: "Action",
      enableSorting: false,
      enableHiding: false,
      cell: ({ row }) => {
        return (
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" className="h-8 w-8 p-0">
                <span className="sr-only">Open menu</span>
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem
                onClick={async () => {
                  await deleteUser(row.getValue("username"));
                  refetch();
                }}
              >
                Delete
              </DropdownMenuItem>
              <DropdownMenuItem onClick={() => openDialog(row)}>
                Edit
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        );
      },
    },
  ];
  const onSubmit: SubmitHandler<z.infer<typeof formSchema>> = async (user) => {
    const newUser = user;
    if (currentUser) {
      const response = await editUser(currentUser!, user);
      if (isSuccess(response)) {
        setisOpen(false);
        refetch();
      }
    }
  };
  function openDialog(row: Row<User>) {
    setisOpen(true);
    setcurrentUser(row.original.username);
    form.setValue("username", row.original.username);
    form.setValue("balance", row.original.balance.toString());
    form.setValue("betPublic", row.original.betPublic);
  }
  return (
    <main className="flex min-h-screen  flex-col items-center justify-between p-24">
      {data?.data?.users && (
        <DataTable
          columns={columns}
          data={data?.data.users}
          size={data.data.totalUsers}
          pagination={pagination}
          setPagination={setPagination}
        />
      )}
      <Dialog onOpenChange={setisOpen} open={isOpen}>
        <DialogContent className="sm:max-w-[425px]">
          <DialogHeader>
            <DialogTitle>Edit profile</DialogTitle>
            <DialogDescription>
              Make changes to your profile here. Click save when you&apos;re
              done.
            </DialogDescription>
          </DialogHeader>
          <div className="flex flex-col gap-4 ">
            <Form {...form}>
              <form
                className="flex flex-col gap-4 "
                onSubmit={form.handleSubmit(onSubmit)}
              >
                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="username"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Username</FormLabel>
                          <FormControl>
                            <Input
                              className="col-span-3"
                              placeholder="shadcn"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="balance"
                      render={({ field }) => (
                        <FormItem>
                          <FormLabel>Balance</FormLabel>
                          <FormControl>
                            <Input
                              type="number"
                              className="col-span-3"
                              min={0}
                              step={0.001}
                              placeholder="0"
                              {...field}
                            />
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>

                <div className="grid grid-cols-4 items-center gap-4">
                  <div className="col-span-4">
                    <FormField
                      control={form.control}
                      name="betPublic"
                      render={({ field }) => (
                        <FormItem className="space-y-4">
                          <FormLabel>
                            <label className="text-lg font-bold text-white">
                              Public Bets
                            </label>
                          </FormLabel>
                          <FormControl>
                            <div className="flex relative w-full items-center ">
                              <input
                                type="checkbox"
                                className="peer sr-only opacity-0"
                                id="PublicBets"
                                {...form.register("betPublic")}
                              />
                              <label
                                htmlFor="PublicBets"
                                className="relative flex h-6 w-11 cursor-pointer items-center rounded-full bg-white/[0.03] px-0.5 outline-white/[0,03] transition-colors before:h-5 before:w-5 before:rounded-full before:bg-white before:shadow before:transition-transform before:duration-300 peer-checked:bg-[#FFA34F] peer-checked:before:translate-x-full peer-focus-visible:outline peer-focus-visible:outline-offset-2 peer-focus-visible:outline-gray-400 peer-checked:peer-focus-visible:outline-green-500"
                              >
                                <span className="sr-only">Enable</span>
                              </label>
                            </div>
                          </FormControl>

                          <FormMessage />
                        </FormItem>
                      )}
                    />
                  </div>
                </div>
                <Button type="submit">Submit</Button>
              </form>
            </Form>
          </div>
        </DialogContent>
      </Dialog>
    </main>
  );
}
