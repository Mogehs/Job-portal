import React, { useEffect, useState } from "react";

import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import AdminJobsTable from "../shared/AdminJobsTable";
import { setJobBySearch } from "@/redux/jobSlice";
const AdminJobs = () => {
  const [input, setInput] = useState("");
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setJobBySearch(input));
  }, [input]);
  return (
    <div>
      <Navbar />
      <div className="w-[80%] m-auto mt-10 ">
        <div className="flex justify-between items-center">
          <Input
            placeholder="Filter by name"
            className="mb-5 w-50"
            onChange={(e) => setInput(e.target.value)}
          ></Input>
          <Button onClick={() => navigate("/admin/jobs/create")}>
            New Job
          </Button>
        </div>

        <AdminJobsTable />
      </div>
    </div>
  );
};

export default AdminJobs;
