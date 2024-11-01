import React from "react";
import { Button } from "@/components/ui/button";
import { Link, useNavigate } from "react-router-dom";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { LogOut, User2 } from "lucide-react";
import { useDispatch, useSelector } from "react-redux";
import { USER_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { setUser } from "@/redux/authSlice";
import { toast } from "sonner";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const logoutHandler = async () => {
    try {
      let res = await axios.get(`${USER_API_END_POINT}/logout`);
      if (res.data.success) {
        dispatch(setUser(null));
        navigate("/");
        toast.success(res.data.message);
      }
    } catch (e) {
      console.log(e);
      toast.error(e.response.data.message);
    }
  };
  const { user } = useSelector((store) => store.auth);
  return (
    <div>
      <div className="w-full py-[0.8rem] px-[5rem] flex justify-between items-center">
        <div className="logo  text-[2rem] font-semibold">Job Sphere</div>
        <div className="flex list-none gap-5 items-center">
          <ul className="flex justify-center items-center gap-6 pr-[2rem] text-md font-bold">
            {user && user.role == "recruiter" ? (
              <>
                <li>
                  <Link to={"/admin/companies"}>Companies</Link>
                </li>
                <li>
                  <Link to={"/admin/jobs"}>Jobs</Link>
                </li>
              </>
            ) : (
              <>
                <li>
                  <Link to={"/"}>Home</Link>
                </li>
                <li>
                  <Link to={"/jobs"}>Jobs</Link>
                </li>
                <li>
                  <Link to={"/browse"}>Browse</Link>
                </li>
              </>
            )}
          </ul>
          {user ? (
            <>
              <Popover>
                <PopoverTrigger>
                  <Avatar>
                    <AvatarImage
                      src={user.profile.profilePhoto}
                      className="object-cover"
                    />
                    <AvatarFallback>PF</AvatarFallback>
                  </Avatar>
                </PopoverTrigger>
                <PopoverContent className="mr-20">
                  <div className="w-full text-center">
                    <h4 className="font-bold">{user.fullName}</h4>
                    <p className="text-zinc-500 text-[0.8rem]">{user.bio}</p>
                  </div>
                  <div className="flex flex-col items-start mt-3">
                    {user.role == "student" && (
                      <Button variant="link" className="m-0 p-0">
                        <User2 />
                        <Link to="/profile">View Profile</Link>
                      </Button>
                    )}
                    <Button
                      onClick={logoutHandler}
                      variant="link"
                      className="m-0 p-0"
                    >
                      <LogOut />
                      Log Out
                    </Button>
                  </div>
                </PopoverContent>
              </Popover>
            </>
          ) : (
            <>
              <Link to="/login">
                <Button variant="link" className="text-[1rem] p-0 m-0  ">
                  Login
                </Button>
              </Link>
              <Link to="/signup">
                <Button
                  variant="link"
                  className="text-[1rem]  py-[0.3rem]  bg-[#BFD7FF] m-0  "
                >
                  Signup
                </Button>
              </Link>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Navbar;
