import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Loader2 } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

import axios from "axios";
import { JOBS_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import { setSingleJob } from "@/redux/jobSlice";
import getAllCompaniesComponent from "@/hooks/getAllCompaniesComponent";

const CompanyDetails = () => {
  getAllCompaniesComponent();

  const { loading } = useSelector((store) => store.auth);
  const { allCompanies } = useSelector((store) => store.company);
  let dispatch = useDispatch();
  let navigate = useNavigate();

  const [input, setInput] = useState({
    title: "",
    description: "",
    requirements: "",
    salary: "",
    location: "",
    jobType: "",
    experience: "",
    positions: "",
    companyId: "",
  });
  console.log(input);

  const changeEventHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const submitHandler = async (e) => {
    e.preventDefault();
    console.log(input);
    try {
      dispatch(setLoading(true));
      let res = await axios.post(`${JOBS_API_END_POINT}/post`, input, {
        headers: { "Content-Type": "application/json" },
        withCredentials: true,
      });
      if (res.data.success) {
        toast.success(res.data.message);
        dispatch(setSingleJob(res.data.job));
      }
      navigate("/admin/jobs");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar />
      <div className="w-[70%] m-auto mt-10">
        {allCompanies.length <= 0 && (
          <p className="text-red-700 font-bold p-1">
            *Please register a company first, to post the job*
          </p>
        )}
        <Form onSubmit={submitHandler}>
          <div className="flex justify-center items-center">
            <div className="grid grid-cols-3 gap-9 px-10 py-6 shadow-lg w-[70vw]">
              <div>
                <Label>Title</Label>
                <Input name="title" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>Description</Label>
                <Input name="description" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>Requirement</Label>
                <Input name="requirements" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>Salary</Label>
                <Input name="salary" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>Location</Label>
                <Input name="location" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>Job Type</Label>
                <Input name="jobType" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>Experience Level</Label>
                <Input name="experience" onChange={changeEventHandler} />
              </div>
              <div>
                <Label>No Of Position</Label>
                <Input name="positions" onChange={changeEventHandler} />
              </div>
              <div>
                <Label htmlFor="companySelect">Select Your Company</Label>
                <Select>
                  <SelectTrigger
                    id="companySelect"
                    name="companyId"
                    onChange={changeEventHandler}
                    className="w-[15rem] h-[2.5rem]"
                  >
                    <SelectValue placeholder="Company" />
                  </SelectTrigger>
                  <SelectContent>
                    {allCompanies?.length >= 0 &&
                      allCompanies?.map((company, id) => (
                        <SelectItem value={company._id}>
                          {company.name}
                        </SelectItem>
                      ))}
                  </SelectContent>
                </Select>
              </div>

              {loading ? (
                <Button className="mt-5 w-36  flex gap-1">
                  <Loader2 className="animate-spin" />
                  Please Wait
                </Button>
              ) : (
                <Button type="submit" className="mt-5 w-36">
                  Post Job
                </Button>
              )}
            </div>
          </div>
        </Form>
      </div>
    </div>
  );
};

export default CompanyDetails;
