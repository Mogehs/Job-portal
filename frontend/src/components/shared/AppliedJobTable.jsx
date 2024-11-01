import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "../ui/button";
import { useSelector } from "react-redux";

const AppliedJobTable = () => {
  const { appliedJobs } = useSelector((store) => store.appliedJobs);
  return (
    <div>
      <Table>
        <TableCaption>A list of recent applied jobs</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead>Date</TableHead>
            <TableHead>Job Role</TableHead>
            <TableHead>Company</TableHead>
            <TableHead className="text-right">Status</TableHead>
          </TableRow>
        </TableHeader>
        <TableBody>
          {appliedJobs?.map((app, id) => (
            <TableRow>
              <TableCell className="font-medium">
                {app.createdAt.split("T")[0]}
              </TableCell>
              <TableCell>{app?.job?.title}</TableCell>
              <TableCell>{app?.job?.company?.name}</TableCell>
              <TableCell className="text-right">
                {app?.status == "pending" ? (
                  <Button className="rounded-lg py-2 w-20 capitalize ">
                    {app?.status}
                  </Button>
                ) : app?.status == "accepted" ? (
                  <Button className="rounded-lg py-2 w-20 bg-green-600 capitalize ">
                    {app?.status}
                  </Button>
                ) : (
                  <Button className="rounded-lg py-2 w-20 bg-red-800 capitalize ">
                    {app?.status}
                  </Button>
                )}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
};

export default AppliedJobTable;
