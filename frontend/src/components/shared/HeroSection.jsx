import React, { useState } from "react";
import { Search } from "lucide-react";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const HeroSection = () => {
  const [query, setQuery] = useState();
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const changeHandler = async () => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };
  return (
    <div className="w-[100vw] overflow-hidden">
      <div className="w-full flex justify-center items-center">
        <p className=" mt-5 text-red-800 text-[1.4rem] font-bold">
          No. 1 Job Hunt Web Site
        </p>
      </div>
      <div className="w-full mt-5 flex justify-center items-center text-[3rem] leading-none">
        <h2 className="w-[38%] text-center font-bold ">
          Search Apply & Get Your
          <span className="text-[#5191ff]"> Dream Job</span>
        </h2>
      </div>
      <p className="px-[17rem] py-[0.5rem] ">
        Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum id
        placeat neque,Lorem ipsum dolor sit,
      </p>

      <div className="border-none mt-5 w-[100%] mx-auto flex justify-center items-center pb-[0.5rem]">
        <input
          onChange={(e) => setQuery(e.target.value)}
          type="text"
          placeholder="Search your job here"
          className="outline-none rounded-l-full shadow-lg w-[50%] h-[3rem] px-[2rem]"
        />
        <Button
          onClick={changeHandler}
          className="h-[3rem] w-[4rem] shadow-lg  rounded-l-none rounded-r-full"
        >
          <Search className="h-5 w-4" />
        </Button>
      </div>
    </div>
  );
};

export default HeroSection;
