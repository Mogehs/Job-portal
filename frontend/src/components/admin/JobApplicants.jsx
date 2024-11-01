import React, { useEffect } from "react";
import Navbar from "../shared/Navbar";
import { useParams } from "react-router-dom";
import axios from "axios";
import { APP_API_END_POINT } from "@/utils/constant";
import ApplicantsTable from "../shared/ApplicantsTable";
import { useDispatch, useSelector } from "react-redux";
import { setApplicants } from "@/redux/applicants";
import { setLoading } from "@/redux/authSlice";

const JobApplicants = () => {
  const { applicants } = useSelector((store) => store.applicants);
  const dispatch = useDispatch();
  let params = useParams();
  let jobId = params.id;
  useEffect(() => {
    const applications = async () => {
      try {
        dispatch(setLoading(true));
        let res = await axios.get(`${APP_API_END_POINT}/${jobId}/applicants`, {
          withCredentials: true,
        });
        if (res.data.success) {
          dispatch(setApplicants(res.data.job.applications));
        }
      } catch (error) {
        console.log(error);
      } finally {
        dispatch(setLoading(false));
      }
    };
    applications();
  }, []);

  return (
    <div>
      <Navbar />
      <div className="w-[80%] m-auto mt-10 ">
        <p className="font-bold text-lg">Applicants({applicants?.length})</p>
        <ApplicantsTable />
      </div>
    </div>
  );
};

export default JobApplicants;
