import React, { useEffect, useState } from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { useSelector } from "react-redux";
import { Edit2, Eye, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import useGetAllJobsComponent from "@/hooks/useGetAllJobsComponent";

const AdminJobsTable = () => {
  useGetAllJobsComponent();
  const { allAdminJobs, jobBySearch } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allAdminJobs);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredJobs = allAdminJobs.filter((job) =>
      jobBySearch
        ? job?.title?.toLowerCase().includes(jobBySearch.toLowerCase())
        : true
    );
    setFilterJobs(filteredJobs);
  }, [allAdminJobs, jobBySearch]);

  return (
    <div>
      {filterJobs.length === 0 ? (
        <div className="flex justify-center items-center w-full py-6">
          <p className="font-bold">No Job Is Posted</p>
        </div>
      ) : (
        <Table>
          <TableCaption>A list of your Created Jobs</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead className="w-[250px] text-left ">
                Company Name
              </TableHead>
              <TableHead className="w-[300px] text-left">Job Title</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          {filterJobs.map((job) => (
            <TableBody key={job._id}>
              <TableRow>
                <TableCell>{job.company.name}</TableCell>
                <TableCell>{job.title}</TableCell>
                <TableCell>{job.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-15">
                      <Link
                        className="flex gap-2"
                        onClick={() =>
                          navigate(`/admin/jobs/${job._id}/applicants`)
                        }
                      >
                        <Eye className="w-4" />
                        Applications
                      </Link>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </TableBody>
          ))}
        </Table>
      )}
    </div>
  );
};

export default AdminJobsTable;
