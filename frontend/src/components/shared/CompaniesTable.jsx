import React, { useEffect, useState } from "react";

import {
  Table,
  TableBody,
  TableCaption,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/components/ui/popover";

import { Avatar, AvatarImage } from "../ui/avatar";
import { useSelector } from "react-redux";
import { Edit2, MoreHorizontal } from "lucide-react";
import { Link, useNavigate } from "react-router-dom";
import getAllCompaniesComponent from "@/hooks/getAllCompaniesComponent";

const CompaniesTable = () => {
  getAllCompaniesComponent();
  const { allCompanies, companyBySearch } = useSelector(
    (store) => store.company
  );
  const [filterCompany, setFilterCompany] = useState(allCompanies);
  const navigate = useNavigate();

  useEffect(() => {
    const filteredCompany =
      allCompanies?.length >= 0 &&
      allCompanies.filter((company) => {
        if (!companyBySearch) {
          return true;
        }
        return company?.name
          ?.toLowerCase()
          .includes(companyBySearch.toLowerCase());
      });
    setFilterCompany(filteredCompany);
  }, [allCompanies, companyBySearch]);

  return (
    <div>
      <Table>
        <TableCaption>A list of your registered companies</TableCaption>
        <TableHeader>
          <TableRow>
            <TableHead className="w-[150px] text-left">Logo</TableHead>
            <TableHead className="w-[250px] text-left">Name</TableHead>
            <TableHead>Date</TableHead>
            <TableHead className="text-right">Action</TableHead>
          </TableRow>
        </TableHeader>

        {filterCompany?.length <= 0 ? (
          <>
            <div className="flex justify-center items-center w-[50vw]">
              <p className="font-bold ">You Have Not Registered The Company</p>
            </div>
          </>
        ) : (
          filterCompany.map((company, idx) => (
            <TableBody>
              <TableRow>
                <TableCell className="font-medium w-20">
                  <Avatar className="w-[3vw] h-[3vw] ml-4">
                    <AvatarImage
                      src={company.logo}
                      className="object-cover"
                    ></AvatarImage>
                  </Avatar>
                </TableCell>
                <TableCell>{company.name}</TableCell>
                <TableCell>{company.createdAt.split("T")[0]}</TableCell>
                <TableCell className="text-right">
                  <Popover>
                    <PopoverTrigger>
                      <MoreHorizontal />
                    </PopoverTrigger>
                    <PopoverContent className="w-15">
                      <Link
                        className="flex gap-2"
                        onClick={() =>
                          navigate(`/admin/company/${company._id}`)
                        }
                      >
                        <Edit2 className="w-4" />
                        Edit
                      </Link>
                    </PopoverContent>
                  </Popover>
                </TableCell>
              </TableRow>
            </TableBody>
          ))
        )}
      </Table>
    </div>
  );
};

export default CompaniesTable;
