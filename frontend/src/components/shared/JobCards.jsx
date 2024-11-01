import React from "react";

import { Badge } from "@/components/ui/badge";
import { Link } from "react-router-dom";

const JobCards = ({ job }) => {
  return (
    <Link to="/jobs">
      <div className="shadow-lg border rounded-lg py-[0.2rem] w-[28vw] cursor-pointer">
        <div className="company mx-2 text-[1rem]">{job.company?.name}</div>
        <div className="country mx-2 text-xs">{job.location}</div>

        <h2 className="job m-2 text-lg font-bold">{job.title}</h2>
        <div className="description m-2 text-xs text-gray-500">
          {job.description}
        </div>
        <div className="p-[0.2rem] mt-5 flex gap-2">
          <Badge variant="ghost" className="text-red-900">
            {job.location}
          </Badge>
          <Badge variant="ghost" className="text-blue-900">
            {job.jobType}
          </Badge>
          <Badge variant="ghost" className="bg-[#5191ff] text-white">
            {job.salary}
          </Badge>
        </div>
      </div>
    </Link>
  );
};

export default JobCards;
