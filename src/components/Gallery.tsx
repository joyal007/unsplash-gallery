import React from "react";
import ImageModel from "./ImageModel";
import { dataT } from "../types/dataFetch";

function Gallery({ data, query }:{data: dataT[], query: string}) {
  return (
    <>
      <h3 className="px-[27px] md:px-[100px] text-4xl mt-4 font-Montserrat font-bold">
        {query}
      </h3>
      {data.length === 0 ? (
        <h4 className="px-[27px] md:px-[100px] text-center text-gray-400 text-lg mt-20  font-Montserrat font-bold">
          No Images Found
        </h4>
      ) : (
        <section className="px-[27px] md:px-[80px] columns-2 md:columns-3  md:gap-x-[35px]  gap-x-[5px] pt-7 md:pt-16">
          {data.map((item) => (
            <ImageModel key={item?.id} item={item} />
          ))}
        </section>
      )}
    </>
  );
}

export default Gallery;
