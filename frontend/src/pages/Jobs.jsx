import Navbar from "@/components/shared/Navbar";
import Job from "@/components/shared/Job";
import FilterCard from "@/components/shared/FilterCard";
import { useDispatch, useSelector } from "react-redux";

import { useEffect, useState } from "react";
import { setFilterQuery } from "@/redux/jobSlice";

const Jobs = () => {
  const dispatch = useDispatch();
  const { allJobs, filterQuery } = useSelector((store) => store.job);
  const [filterJobs, setFilterJobs] = useState(allJobs);
  useEffect(() => {
    if (filterQuery) {
      const filteredJobs = allJobs.filter((job) => {
        return (
          job.title.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job.location.toLowerCase().includes(filterQuery.toLowerCase()) ||
          job.salary.toLowerCase().includes(filterQuery.toLowerCase())
        );
      });
      setFilterJobs(filteredJobs);
    } else {
      setFilterJobs(allJobs);
    }
  }, [filterJobs, filterQuery]);

  useEffect(() => {
    return () => {
      dispatch(setFilterQuery(""));
    };
  }, [dispatch]);

  return (
    <div>
      <Navbar />
      <div className=" w-full px-[5rem] py-[2rem] flex gap-[4rem]">
        <div className="w-[8%]">
          <FilterCard />
        </div>
        <div className="w-[90%] grid grid-cols-3 gap-[1rem]">
          {filterJobs <= 0 ? (
            <p className="font-bold text-[3rem] w-[70vw] flex justify-center items-center">
              No Job To Show
            </p>
          ) : (
            filterJobs.map((job) => <Job job={job} />)
          )}
        </div>
      </div>
    </div>
  );
};

export default Jobs;
