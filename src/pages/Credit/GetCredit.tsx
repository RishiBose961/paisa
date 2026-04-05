import { useState } from "react";
import axios from "axios";
import { keepPreviousData, useQuery } from "@tanstack/react-query";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import CheckEnvironment from "@/CheckEnvironment/CheckEnvironment";
import { useSelector } from "react-redux";
import { Button } from "@/components/ui/button";

const GetCredit = () => {

  const { user } = useSelector(
    (state: {
      auth: {
        isAuthenticated: boolean;
        user: { token: string; _id: string; name: string; avatar: string; email: string };
      };
    }) => state.auth
  );
  const [page, setPage] = useState(1);
  const [limit] = useState(5);
  const [search, setSearch] = useState("");
  const { base_url } = CheckEnvironment();

  const fetchCredits = async () => {
    const { data } = await axios.get(`${base_url}/api/credits/get`, {
      params: { page, limit, search },
      headers: {
        Authorization: `Bearer ${user.token}`,
      },
    })
    return data;
  };

  const { data, isLoading, isError } = useQuery({
    queryKey: ["credits", { page, limit, search }],
    queryFn: fetchCredits,
    placeholderData: keepPreviousData
  });

  if (isLoading) return <p>Loading...</p>;
  if (isError) return <p>Error fetching data</p>;


  return (
    <div className="p-4 max-w-4xl w-full mx-auto">

      <input
        type="text"
        placeholder="Search..."
        className="border p-2 mb-4 w-full"
        value={search}
        onChange={(e) => {
          setPage(1); // reset page on search
          setSearch(e.target.value);
        }}
      />

      <Table>
        <TableCaption>Your debit records</TableCaption>

        <TableHeader>
          <TableRow>
            <TableHead>Type</TableHead>
            <TableHead>Date</TableHead>
            <TableHead>Amount</TableHead>
            <TableHead>Note</TableHead>
            <TableHead>Actions</TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {data?.data?.length > 0 ? (
            data.data.map((item: { type: string; date: string; amount: number; about: string; _id: string }, index: number) => (
              <TableRow key={index}>

                <TableCell>{item.type}</TableCell>
                <TableCell className="font-medium">
                  {item.date ? new Date(item.date).toLocaleDateString() : "N/A"}
                </TableCell>
                <TableCell>
                  ₹{item.amount}
                </TableCell>
                <TableCell className="max-w-xs line-clamp-3">
                  {item.about}
                </TableCell>
                <TableCell>

                  <Button variant="destructive" className="text-red-500 hover:underline">
                    Delete
                  </Button>
                </TableCell>

              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={4} className="text-center">
                No data found
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>

      {/* 📄 Pagination */}
      <div className="flex justify-between items-center mt-4">
        <button
          className="px-4 py-2 border"
          disabled={page === 1}
          onClick={() => setPage((prev) => prev - 1)}
        >
          Prev
        </button>

        <span>
          Page {data?.pagination?.page} of{" "}
          {data?.pagination?.totalPages}
        </span>

        <button
          className="px-4 py-2 border"
          disabled={page === data?.pagination?.totalPages}
          onClick={() => setPage((prev) => prev + 1)}
        >
          Next
        </button>
      </div>
    </div>
  );
};

export default GetCredit;