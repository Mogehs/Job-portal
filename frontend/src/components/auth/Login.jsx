import React, { useEffect } from "react";
import { useState } from "react";

import { Button } from "../ui/button";
import { Input } from "../ui/input";
import { Label } from "@/components/ui/label";
import { RadioGroup } from "@/components/ui/radio-group";
import { Link, useNavigate } from "react-router-dom";

import Navbar from "../shared/Navbar";
import { toast } from "sonner";
import axios from "axios";
import { USER_API_END_POINT } from "@/utils/constant";
import { useDispatch, useSelector } from "react-redux";
import { setLoading, setUser } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const Login = () => {
  const [input, setInput] = useState({
    email: "",
    password: "",
    role: "",
  });

  const { loading, user } = useSelector((store) => store.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const changeEventHandler = (e) => {
    setInput({ ...input, [e.target.name]: e.target.value });
  };

  useEffect(() => {
    if (user) {
      navigate("/");
    }
  });
  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      dispatch(setLoading(true));
      let res = await axios.post(`${USER_API_END_POINT}/login`, input, {
        headers: {
          "Content-Type": "application/json",
        },
        withCredentials: true,
      });
      if (res.data.success) {
        dispatch(setUser(res.data.user));
        {
          res.data.user.role == "recruiter"
            ? navigate("/admin/companies")
            : navigate("/");
        }
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
            <p> Log In</p>
            <div className="mt-5">
              <Input
                type="email"
                id="email"
                placeholder="Email"
                className="mt-6"
                name="email"
                value={input.email}
                onChange={changeEventHandler}
              />
              <Input
                type="password"
                id="password"
                placeholder="Password"
                className="mt-6"
                name="password"
                value={input.password}
                onChange={changeEventHandler}
              />
            </div>
            <div className="flex  items-center">
              <RadioGroup defaultValue="student">
                <div className="flex justify-center items-center gap-2 p-2 mt-3">
                  <div className="flex items-center space-x-1">
                    <Input
                      type="radio"
                      name="role"
                      value="student"
                      id="student"
                      checked={input.role == "student"}
                      onChange={changeEventHandler}
                    />
                    <Label htmlFor="student">Student</Label>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Input
                      type="radio"
                      name="role"
                      value="recruiter"
                      id="recruiter"
                      checked={input.role == "recruiter"}
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
                Log in
              </Button>
            )}

            <div className="bg-slate-400 w-full h-[0.1rem]  rounded-lg mt-2"></div>
            <div className="w-full felx items-center m-auto justify-center">
              <div className="text-[0.8rem] w-full mt-2">
                <p className="inline font-light text-slate-900">
                  Don't Have An Account?&nbsp;
                </p>
                <Link to="/signup">Sign Up</Link>
              </div>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default Login;
