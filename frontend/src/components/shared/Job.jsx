import React from "react";
import { Badge } from "../ui/badge";
import { Button } from "../ui/button";
import { Bookmark } from "lucide-react";
import { Avatar, AvatarImage } from "../ui/avatar";
import { useNavigate } from "react-router-dom";

const Job = ({ job }) => {
  const navigate = useNavigate();
  let descriptionId = job._id;

  const daysAgo = (mongoTime) => {
    let present = new Date();
    let postDate = new Date(mongoTime);
    let diff = present - postDate;
    return Math.floor(diff / (1000 * 24 * 60 * 60));
  };

  return (
    <div className="shadow-md border rounded-lg p-4 h-[50vh] w-[24.5vw] bg-white">
      <div className="flex justify-between items-center mb-2">
        <span className="text-xs text-gray-500">
          {daysAgo(job.createdAt) === 0
            ? "Today"
            : `${daysAgo(job.createdAt)} Days Ago`}
        </span>
        <Button className="bg-transparent p-0 hover:bg-transparent">
          <Bookmark className="text-gray-700" />
        </Button>
      </div>

      <div className="flex items-center gap-3 mb-4">
        <Avatar className="h-12 w-12">
          <AvatarImage src={job.company.logo} alt="Company Logo" />
        </Avatar>
        <div>
          <div className="text-md font-semibold">{job.company.name}</div>
          <div className="text-xs text-gray-500">{job.location}</div>
        </div>
      </div>

      <h2 className="text-lg font-bold mb-2 leading-tight">{job.title}</h2>
      <p className="text-sm text-gray-600 line-clamp-2 mb-4">
        {job.description}
      </p>

      <div className="flex gap-2 mb-4">
        <Badge
          variant="ghost"
          className="text-red-900 px-2 py-1 rounded-full border"
        >
          Positions&nbsp;
          {job.positions}
        </Badge>
        <Badge
          variant="ghost"
          className="text-blue-900 px-2 py-1 rounded-full border"
        >
          {job.jobType}
        </Badge>
        <Badge
          variant="ghost"
          className="bg-[#5191ff] text-white px-2 py-1 rounded-full"
        >
          {job.salary}
        </Badge>
      </div>

      <div className="flex gap-3">
        <Button
          onClick={() => navigate(`/jobs/description/${descriptionId}`)}
          variant="secondary"
          className="h-9 w-[5.5rem] text-sm font-medium"
        >
          Details
        </Button>
        <Button className="h-9 w-[8rem] bg-[#BFD7FF] text-black font-medium hover:bg-[#89b3fe] text-sm">
          Save For Later
        </Button>
      </div>
    </div>
  );
};

export default Job;
