import React, { useEffect, useState } from "react";
import { Label } from "@/components/ui/label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { useDispatch, useSelector } from "react-redux";
import { setFilterQuery } from "@/redux/jobSlice";

const FilterCard = () => {
  const [selectedValue, setSelectedValue] = useState("");
  const dispatch = useDispatch();

  const changeHandler = (value) => {
    setSelectedValue(value);
    dispatch(setFilterQuery(value));
  };

  useEffect(() => {
    return () => {
      dispatch(setFilterQuery(""));
    };
  }, [dispatch]);
  const filterData = [
    {
      filterType: "Location",
      array: ["Delhi", "India", "Mumbai", "Agra"],
    },
    {
      filterType: "Industry",
      array: ["Frontend", "Backend", "Full Stack"],
    },
    {
      filterType: "Salary",
      array: ["10k-20k", "30k-40k", "More than 40k"],
    },
  ];

  return (
    <div>
      <RadioGroup value={selectedValue} onValueChange={changeHandler}>
        {filterData.map((item, idx) => (
          <div key={idx}>
            <h1 className="text-lg font-bold">{item.filterType}</h1>
            {item.array.map((data, index) => (
              <div className="flex items-center m-1" key={index}>
                <RadioGroupItem value={data} id={data} />
                <Label
                  htmlFor={data}
                  className="m-1 text-sm cursor-pointer w-[10rem]"
                >
                  {data}
                </Label>
              </div>
            ))}
          </div>
        ))}
      </RadioGroup>
    </div>
  );
};

export default FilterCard;
