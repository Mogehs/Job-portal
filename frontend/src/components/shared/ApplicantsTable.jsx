import React from "react";
import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { useSelector } from "react-redux";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";
import { MoreHorizontal, Loader2 } from "lucide-react";
import axios from "axios";
import { APP_API_END_POINT } from "@/utils/constant";
import { toast } from "sonner";

const ApplicantsTable = () => {
  const { applicants } = useSelector((store) => store.applicants);
  const { loading } = useSelector((store) => store.auth);

  const status = ["Accepted", "Rejected"];

  const statusHandler = async (status, id) => {
    try {
      let res = await axios.put(
        `${APP_API_END_POINT}/status/${id}/update`,
        { status },
        {
          withCredentials: true,
        }
      );

      if (res.data.success) {
        toast.success(res.data.message);
      }
    } catch (error) {
      console.log(error.response.data.messaage);
    }
  };

  return (
    <div>
      {loading ? (
        <p className=" w-full flex items-center justify-center mt-10 text-3xl">
          <Loader2 className="animate-spin" />
        </p>
      ) : applicants?.length > 0 ? (
        <Table className="mt-10">
          <TableCaption>A list of applications</TableCaption>
          <TableHeader>
            <TableRow>
              <TableHead>Full Name</TableHead>
              <TableHead>Email</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Resume</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="text-right">Action</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {applicants.map((applicant, id) => (
              <TableRow key={id}>
                <TableCell>{applicant.applicant.fullName}</TableCell>
                <TableCell>{applicant.applicant.email}</TableCell>
                <TableCell>{applicant.applicant.phoneNumber}</TableCell>
                <TableCell>
                  <a
                    target="_blank"
                    rel="noopener noreferrer"
                    href={applicant.applicant.profile.resume}
                  >
                    {
                      applicant.applicant.profile.resumeOriginalName.split(
                        "."
                      )[0]
                    }
                  </a>
                </TableCell>
                <TableCell>
                  {applicant.applicant.createdAt.split("T")[0]}
                </TableCell>
                <TableCell className="text-right uppercase">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-15">
                      {status.map((status, idx) => (
                        <div
                          onClick={() => statusHandler(status, applicant?._id)}
                          className="text-sm p-1 cursor-pointer"
                        >
                          {status}
                        </div>
                      ))}
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      ) : (
        <p className="font-bold mt-10 text-3xl text-center">
          No Application To Show
        </p>
      )}
    </div>
  );
};

export default ApplicantsTable;
