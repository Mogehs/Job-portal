import { setAllJobs } from "@/redux/jobSlice";
import { JOBS_API_END_POINT } from "@/utils/constant";
import axios from "axios";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "sonner";

const getJobsComponent = () => {
  let dispatch = useDispatch();
  let { searchQuery } = useSelector((store) => store.job);
  useEffect(() => {
    const fetchAllJobs = async () => {
      try {
        let res = await axios.get(
          `${JOBS_API_END_POINT}/get?keyword=${searchQuery}`,
          {
            withCredentials: true,
          }
        );
        if (res.data.success) {
          dispatch(setAllJobs(res.data.jobs));
        }
      } catch (e) {
        dispatch(setAllJobs([]));
        toast.error(e.response.data.message);
      }
    };
    fetchAllJobs();
  }, []);
};

export default getJobsComponent;
