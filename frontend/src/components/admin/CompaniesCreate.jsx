import React, { useState } from "react";
import { Input } from "../ui/input";
import { Label } from "../ui/label";
import { Button } from "../ui/button";
import { useNavigate } from "react-router-dom";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setSingleCompany } from "@/redux/companySlice";
import axios from "axios";
import { Loader2 } from "lucide-react";

const CompaniesCreate = () => {
  const navigate = useNavigate();
  const { loading } = useSelector((store) => store.auth);
  const [companyName, setCompanyName] = useState();
  let dispatch = useDispatch();
  const registerCompany = async () => {
    try {
      let res = await axios.post(
        `${COMPANY_API_END_POINT}/register`,
        { companyName },
        {
          headers: { "Content-Type": "Application/json" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
        let companyId = await res.data.company._id;
        dispatch(setSingleCompany(res.data.company));
        navigate(`/admin/company/${companyId}`);
      }
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error.message);
    }
  };
  const changeHandler = (e) => {
    setCompanyName(e.target.value);
  };
  return (
    <div>
      <div className="w-[80%] m-auto shadow-lg rounded-md p-10 mt-5">
        <div className="font-bold text-lg">Name Your Company</div>
        <div className="text-gray-500 text-sm">
          What woud you like to choose your company name? You can change later
        </div>
      </div>
      <div className="w-[80%] m-auto  p-10 mt-5">
        <Label className="mb-10">Company Name</Label>
        <Input
          placeholder="Enter you company name"
          onChange={changeHandler}
        ></Input>
      </div>
      <div className="flex gap-2 justify-end px-[8.5rem]">
        <Button
          variant="outline"
          onClick={() => {
            navigate("/admin/companies");
          }}
        >
          Cancel
        </Button>
        {loading ? (
          <Button type="submit" className="w-36  flex gap-1">
            <Loader2 className="animate-spin" />
            Please Wait
          </Button>
        ) : (
          <Button type="submit" onClick={registerCompany} className="w-36">
            Continue
          </Button>
        )}
      </div>
    </div>
  );
};

export default CompaniesCreate;
