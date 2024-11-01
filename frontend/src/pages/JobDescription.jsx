import React, { useEffect, useState } from "react";
import Navbar from "@/components/shared/Navbar";
import { Badge } from "@/components/ui/badge";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import { APP_API_END_POINT, JOBS_API_END_POINT } from "@/utils/constant";
import { setSingleJob } from "@/redux/jobSlice";
import { useParams } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { toast } from "sonner";
import { setLoading } from "@/redux/authSlice";
import { Loader2 } from "lucide-react";

const JobDescription = () => {
  const { user } = useSelector((store) => store.auth);
  const { singleJob } = useSelector((store) => store.job);
  const { loading } = useSelector((store) => store.auth);
  const dispatch = useDispatch();
  const params = useParams();
  const [applied, setApplied] = useState(false);
  let jobId = params.id;

  useEffect(() => {
    const fetchSingleJob = async () => {
      try {
        let res = await axios.get(`${JOBS_API_END_POINT}/get/${jobId}`, {
          withCredentials: true,
        });

        if (res.data.success) {
          dispatch(setSingleJob(res.data.job));
          const hasApplied = singleJob?.applications?.some(
            (app) => app.applicant === user?.userid
          );
          setApplied(hasApplied);
        }
      } catch (e) {
        console.log(e);
      }
    };

    fetchSingleJob();
  }, [dispatch, jobId]);

  const applicationHandler = async () => {
    try {
      dispatch(setLoading(true));
      let res = await axios.post(
        `${APP_API_END_POINT}/apply/${jobId}`,
        {},
        {
          withCredentials: true,
        }
      );
      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      toast.error(error.response.data.message);
    } finally {
      dispatch(setLoading(false));
    }
  };

  const formattedDate = new Date(singleJob?.createdAt).toLocaleDateString(
    "en-US",
    {
      day: "2-digit",
      month: "2-digit",
      year: "numeric",
    }
  );
  return (
    <div>
      <Navbar />
      <div className="w-[70%] m-auto  py-10 px-4 shadow-lg rounded-2xl">
        <div className=" flex items-center">
          <div className="w-[93%] flex justify-between items-center">
            <div>
              <h1 className="text-2xl font-bold">{singleJob?.title}</h1>
              <span className="text-sm text-gray-500">
                {singleJob?.description}
              </span>
            </div>
          </div>

          {applied ? (
            <Button disabled={true}>Already Applied</Button>
          ) : loading ? (
            <Loader2 className="animate-spin">Please Wait</Loader2>
          ) : (
            <Button onClick={applicationHandler}>Apply</Button>
          )}
        </div>
        <div className="mt-3 flex gap-2">
          <Badge variant="ghost" className="text-red-900">
            {singleJob?.positions} Positions
          </Badge>
          <Badge variant="ghost" className="text-blue-900">
            {singleJob?.jobType}
          </Badge>
          <Badge variant="ghost" className="bg-[#5191ff] text-white">
            {singleJob?.salary}
          </Badge>
        </div>
      </div>
      <div className="w-[70%] m-auto p-5">
        <span className="text-md font-bold">Location: </span>
        <span className="text-gray-600">
          {singleJob?.location}
          <br />
        </span>
        <span className="text-md font-bold">Description: </span>
        <span className="text-gray-600">
          {singleJob?.description}
          <br />
        </span>
        <span className="text-md font-bold">Experience: </span>
        <span className="text-gray-600">
          {singleJob?.experience} yrs
          <br />
        </span>
        <span className="text-md font-bold">Salary: </span>
        <span className="text-gray-600">
          {singleJob?.salary}
          <br />
        </span>
        <span className="text-md font-bold">Total Applicants: </span>
        <span className="text-gray-600">
          {singleJob?.applications?.length}
          <br />
        </span>
        <span className="text-md font-bold">Posted Date: </span>
        <span className="text-gray-600">
          {formattedDate}
          <br />
        </span>
      </div>
    </div>
  );
};

export default JobDescription;
