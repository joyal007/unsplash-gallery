import React, { useState } from "react";
import backgroundImg from "@/assets/background.jpeg";
import { Input } from "./ui/input";
import { SearchIcon } from "lucide-react";


function Header({ fetchRequest }: {fetchRequest: (queryString?: string) => Promise<void>}) {

  const [query, setQuery] = useState("");
  return (
    <header className="relative overflow-hidden">
      <img
        src={backgroundImg}
        alt="background image"
        className="h-[400px] md:w-full object-cover scale-[300%] md:scale-100 object-center "
      />
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 z-30 w-full flex justify-center flex-col items-center ">
        <h3 className="text-white w-[291px] md:w-full tracking-[-0.48px] md:text-[32px] text-center font-Montserrat leading-normal text-2xl not-italic font-bold ">
          Download High Quality Images by creators
        </h3>
        <p className="font-Montserrat md:w-full md:text-sm text-center text-[10px] font-normal mt-[10px] text-gray-300 w-[219px]">
          Over 2.4 million+ stock Images by our talented community
        </p>

        <div className="flex items-center justify-center mt-[23px] relative rounded-sm pl-2 bg-white">
          <SearchIcon className="h-4 w-[18px] text-gray-400 absolute left-1 " />
          <Input
            className="w-[325px] md:w-[808px] md:h-[54px] text-black bg-white border-0 pl-5 h-10 border-l-0"
            value={query}
            placeholder="Search high resolution Images"
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchRequest(query);
              }
            }}
            onChange={(e) => {
              setQuery(e.target.value);
            }}
          />
        </div>
      </div>
    </header>
  );
}

export default Header;
