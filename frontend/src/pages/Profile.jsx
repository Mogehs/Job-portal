import Navbar from "@/components/shared/Navbar";
import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Contact2, Mail, Pen } from "lucide-react";

import AppliedJobTable from "@/components/shared/AppliedJobTable";
import { useEffect, useState } from "react";
import UpdateProfile from "@/components/shared/UpdateProfile";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APP_API_END_POINT } from "@/utils/constant";
import { setAppliedJobs } from "@/redux/appliedSlice";

const Profile = () => {
  const { user } = useSelector((store) => store.auth);
  const [open, setOpen] = useState(false);
  const skillArray = user?.profile?.skills;
  const dispatch = useDispatch();

  useEffect(() => {
    const appliedJobs = async () => {
      try {
        let res = await axios.get(`${APP_API_END_POINT}/get`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setAppliedJobs(res.data.application));
        }
      } catch (error) {
        console.log(error.response.data.message);
      }
    };
    appliedJobs();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-[70%] m-auto  py-10 px-4 shadow-lg rounded-2xl">
        <div className=" flex items-center">
          <Avatar className="w-[5vw] h-[5vw] ml-4 ">
            <AvatarImage
              src={user?.profile?.profilePhoto}
              className="object-cover"
            ></AvatarImage>
          </Avatar>
          <div className="w-[93%] flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold ml-3">{user?.fullName}</h1>
              <p className="text-sm text-gray-500 ml-3">{user?.profile?.bio}</p>
            </div>
            <div>
              <Button
                onClick={() => setOpen(true)}
                variant="outline"
                className="text-right w-14"
              >
                <Pen />
              </Button>
            </div>
          </div>
        </div>
        <div className="px-4 flex mt-2 items-center gap-3">
          <Mail className="w-5 h-5" />
          <p className="text-gray-600 "> {user?.email}</p>
        </div>
        <div className="px-4 flex mt-2 items-center gap-3">
          <Contact2 className="w-5 h-5" />
          <p className="text-gray-600 "> {user?.phoneNumber}</p>
        </div>

        <div className=" mt-5 px-4">
          <h2 className="text-xl font-bold">Skills</h2>
          <p className="flex gap-2 mt-2">
            {skillArray != ""
              ? skillArray?.map((item, idx) => <Badge> {item} </Badge>)
              : "NA"}
          </p>
          <div className="mt-2">
            <h2 className="text-xl font-bold">Resume</h2>
            <Button
              variant="outline"
              className="mt-2 hover:invert transition-all  ease-linear duration-500"
            >
              <a href={user?.profile?.resume}>
                {user?.profile?.resumeOriginalName}
              </a>
            </Button>
          </div>
        </div>
      </div>
      <div className=" w-[70%] m-auto p-2 ">
        <h2 className="text-lg font-bold">Applied Jobs</h2>
        <div>
          <AppliedJobTable />
        </div>
      </div>
      <UpdateProfile open={open} setOpen={setOpen} />
    </div>
  );
};

export default Profile;
