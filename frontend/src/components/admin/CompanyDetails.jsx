import React, { useEffect, useState } from "react";
import { Form, useNavigate, useParams } from "react-router-dom";
import Navbar from "../shared/Navbar";
import { Loader2, StepBack } from "lucide-react";
import { Button } from "../ui/button";
import { Label } from "../ui/label";
import { Input } from "../ui/input";
import axios from "axios";
import { COMPANY_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";
import { useDispatch, useSelector } from "react-redux";
import { setLoading } from "@/redux/authSlice";
import getCompanyComponent from "@/hooks/getCompanyComponent";

const CompanyDetails = () => {
  const { singleCompany } = useSelector((store) => store.company);

  let navigate = useNavigate();
  let params = useParams();
  let companyId = params.id;
  getCompanyComponent(companyId);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();

  const [input, setInput] = useState({
    name: "",
    description: "",
    website: "",
    location: "",
    file: null,
  });

  const changeEventHandler = async (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };
  const changeFileHandler = async (e) => {
    let file = e.target.files?.[0];
    setInput({
      ...input,
      file,
    });
  };
  const submitHandler = async (e) => {
    e.preventDefault();

    let formData = new FormData();
    formData.append("name", input.name);
    formData.append("description", input.description);
    formData.append("website", input.website);
    formData.append("location", input.location);
    if (input.file) {
      formData.append("file", input.file);
    }

    try {
      dispatch(setLoading(true));
      let res = await axios.put(
        `${COMPANY_API_END_POINT}/update/${companyId}`,
        formData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
      navigate("/admin/companies");
    } catch (error) {
      toast.error(error.response.data.message);
      console.log(error);
    } finally {
      dispatch(setLoading(false));
    }
  };

  useEffect(() => {
    setInput({
      name: singleCompany.name || "",
      description: singleCompany.description || "",
      website: singleCompany.website || "",
      location: singleCompany.location || "",
      file: null,
    });
  }, [singleCompany]);

  return (
    <div>
      <Navbar />
      <div className="w-[70%] m-auto mt-10">
        <div className="flex gap-2 items-center">
          <Button
            onClick={() => {
              navigate("/admin/companies/create");
            }}
            variant="outline"
          >
            <StepBack className="text-gray-600" />
            <div className="text-lg text-gray-600">Back</div>
          </Button>
        </div>
        <div className="text-center text-3xl font-bold"> Company Setup</div>

        <Form onSubmit={submitHandler}>
          <div className="grid grid-cols-2 gap-9 mt-10">
            <div>
              <Label>Company Name</Label>
              <Input
                name="name"
                value={input.name}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Description</Label>
              <Input
                name="description"
                value={input.description}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Website</Label>
              <Input
                name="website"
                value={input.website}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Location</Label>
              <Input
                name="location"
                value={input.location}
                onChange={changeEventHandler}
              />
            </div>
            <div>
              <Label>Logo</Label>
              <Input type="file" accept="image/" onChange={changeFileHandler} />
            </div>
          </div>
          {loading ? (
            <Button type="submit" className="mt-5 w-36  flex gap-1">
              <Loader2 className="animate-spin" />
              Please Wait
            </Button>
          ) : (
            <Button type="submit" className="mt-5 w-36">
              Update
            </Button>
          )}
        </Form>
      </div>
    </div>
  );
};

export default CompanyDetails;
