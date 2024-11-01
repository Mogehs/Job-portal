import React from "react";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import { Button } from "../ui/button";
import { useDispatch } from "react-redux";
import { setSearchQuery } from "@/redux/jobSlice";
import { useNavigate } from "react-router-dom";

const CategoryCrousel = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const category = [
    "Frontend Developer",
    "Backend Developer",
    "MERN Stack Developer",
    "UI/UX Designer",
  ];

  const changeHandler = async (query) => {
    dispatch(setSearchQuery(query));
    navigate("/browse");
  };

  return (
    <div className="w-[100%] overflow-hidden flex justify-center items-center my-[2rem]">
      <div className="w-[50%] ">
        <Carousel>
          <CarouselContent>
            {category.map((cat, idx) => (
              <CarouselItem className="md:basis-1/2 lg:basis-1/3">
                <Button
                  onClick={() => changeHandler(cat)}
                  className="bg-[#5191ff]"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>

          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
};

export default CategoryCrousel;
