import React from "react";
import JobCards from "./JobCards";
import { useSelector } from "react-redux";

const LatestJobs = () => {
  const { allJobs } = useSelector((store) => store.job);
  return (
    <div className="overflow-hidden">
      <div className="w-[100%] overflow-hidden">
        <div className="w-full mt-[3rem] text-[2rem] leading-none">
          <h2 className="w-[32%] text-center font-bold ">
            Latest &<span className="text-[#5191ff]"> Top Jobs</span>
          </h2>
        </div>
      </div>
      <div className="flex justify-center px-[4.3rem] py-[1rem]">
        <div className="grid grid-cols-3 gap-[2rem]">
          {allJobs <= 0 ? (
            <span>No Jobs Here</span>
          ) : (
            allJobs
              ?.slice(0, 6)
              .map((job) => <JobCards job={job} jobId={job._id} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default LatestJobs;
