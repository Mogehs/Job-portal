import React, { useEffect } from "react";
import Navbar from "@/components/shared/Navbar";
import Job from "@/components/shared/Job";
import getJobsComponent from "@/hooks/getJobsComponent";
import { useDispatch, useSelector } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";

const Browse = () => {
  const dispatch = useDispatch();
  getJobsComponent();
  const { allJobs } = useSelector((store) => store.job);

  useEffect(() => {
    return () => {
      dispatch(setSearchQuery(""));
    };
  }, []);

  return (
    <div>
      <Navbar />
      <div className="text-lg font-bold   px-24 pt-10">
        Search results for({allJobs.length})
      </div>
      <div className="w-[85%] grid grid-cols-3 gap-y-6   m-auto p-[1.5rem] shadow-2xl ">
        {allJobs.map((job, idx) => (
          <Job job={job} />
        ))}
      </div>
    </div>
  );
};

export default Browse;
