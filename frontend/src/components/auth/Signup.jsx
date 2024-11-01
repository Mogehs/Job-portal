import React, { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../shared/Navbar";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import FormData from "form-data";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { useDispatch, useSelector } from "react-redux";
import { Loader2 } from "lucide-react";

const Signup = () => {
  const [input, setInput] = useState({
    fullName: "",
    email: "",
    password: "",
    phoneNumber: "",
    role: "",
    file: "",
  });

  const { loading } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  const changeFileHandler = (e) => {
    setInput({ ...input, file: e.target.files?.[0] });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("fullName", input.fullName);
    formData.append("email", input.email);
    formData.append("password", input.password);
    formData.append("phoneNumber", input.phoneNumber);
    formData.append("role", input.role);
    if (input.file) {
      formData.append("file", input.file);
    }
    try {
      dispatch(setLoading(true));
      let res = await axios.post(`${USER_API_END_POINT}/signup`, formData, {
        headers: {
          "Content-Type": "Multipart/form-data",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        navigate("/login");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  return (
    <div>
      <Navbar></Navbar>
      <form onSubmit={handleSubmit}>
        <div className="flex justify-center items-center">
          <div className="bg-[#BFD7FF] w-[30rem] h-[30rem] mt-8 rounded-2xl p-4 uppercase font-bold text-[1.2rem]">
            <p> Sign up</p>
            <div className="mt-5">
              <Input
                type="text"
                id="fullName"
                placeholder="Full Name"
                className="mt-6"
                value={input.fullName}
                name="fullName"
                onChange={changeEventHandler}
              />
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="mt-6"
                value={input.email}
                name="email"
                onChange={changeEventHandler}
              />
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-6"
                value={input.password}
                name="password"
                onChange={changeEventHandler}
              />
              <Input
                id="number"
                placeholder="Phone Number"
                className="mt-6"
                value={input.phoneNumber}
                name="phoneNumber"
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex justify-center items-center">
              <div className="pt-3 flex justify-center items-center gap-2 ml-1">
                <Label>Profile</Label>
                <Input
                  id="picture"
                  type="file"
                  accept="image/*"
                  onChange={changeFileHandler}
                  className="cursor-pointer"
                />
              </div>
              <RadioGroup defaultValue="student">
                <div className="flex justify-center items-center gap-2 p-2 mt-3">
                  <div className="flex items-center space-x-1">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      checked={input.role == "student"}
                      onChange={changeEventHandler}
                      id="student"
                    />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      checked={input.role == "recruiter"}
                      id="recruiter"
                      onChange={changeEventHandler}
                    />
                    <Label htmlFor="recruiter">Recruiter</Label>
                  </div>
                </div>
              </RadioGroup>
            </div>
            {loading ? (
              <Button className="mt-2 py-[0rem] relative left-[68%] uppercase ">
                <Loader2 className="animate-spin " />
                Please Wait
              </Button>
            ) : (
              <Button
                type="submit"
                className="mt-2 py-[0rem] relative left-[81.4%] uppercase "
              >
                Sign Up
              </Button>
            )}
            <div className="bg-slate-400 w-full h-[0.1rem]  rounded-lg mt-2"></div>
            <div className="w-full felx items-center m-auto justify-center">
              <div className="text-[0.8rem] w-full mt-2">
                <p className="inline font-light text-slate-900">
                  Already have an account?
                </p>
                <Link to="/login"> Login</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Signup;
