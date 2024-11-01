import React, { useEffect, useState } from "react";
import CompaniesTable from "../shared/CompaniesTable";
import Navbar from "../shared/Navbar";
import { Input } from "@/components/ui/input";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { setCompanyBySearch } from "@/redux/companySlice";
const Companies = () => {
  const [input, setInput] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(setCompanyBySearch(input));
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
          <Button onClick={() => navigate("/admin/companies/create")}>
            New Company
          </Button>
        </div>
        <CompaniesTable />
      </div>
    </div>
  );
};

export default Companies;
