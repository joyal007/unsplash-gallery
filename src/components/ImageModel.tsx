import React, { useEffect, useState } from "react";
import {
  ThumbsUpIcon,
  InstagramIcon,
  TwitterIcon,
  XIcon,
  Share2Icon,
  InfoIcon,
} from "lucide-react";
import { Button } from "./ui/button";
import { Access_Key, Unsplash_url } from "@/lib/utils";
import { saveAs } from "file-saver";
import { Skeleton } from "./ui/skeleton";

function ImageModel({ item }: { item: unknown }) {
  const [open, setOpen] = useState(false);
  return (
    <>
      <section
        className={"rounded-sm overflow-hidden mb-3 md:mb-7 cursor-pointer "}
        onClick={() => setOpen(true)}
      >
        <img src={item?.urls?.raw ?? ""} alt="unsplash image" />
        <div className="flex justify-between items-center bg-card-bg border border-card-border rounded-b-sm">
          <div className=" flex items-center p-2 md:gap-2 gap-1">
            <img
              loading="eager"
              src={item?.user?.profile_image?.small}
              className="h-5 w-5 md:h-[39px] md:w-[39px] rounded-full md:m-0 "
              alt="author"
            />
            <div>
              <p className="font-semibold font-Montserrat text-[7px] md:text-xs not-italic text-gray-400">
                {item.user.name}
              </p>
              <p className="text-[5.5px] md:text-[10px] font-semibold font-poppins italic text-gray-100">
                @{item.user.username}
              </p>
            </div>
          </div>
          <div className="flex mr-2 justify-center items-center">
            <ThumbsUpIcon className=" w-[9px] h-[9px] md:w-[14px] md:h-[14px]" />
            <p className="text-[6px] md:text-[10px] font-Montserrat ml-[2px] font-bold text-center not-italic leading-normal text-gray-400  ">
              {item.likes}
            </p>
          </div>
        </div>
      </section>

      {open && <PopUp id={item?.id as string} setOpen={setOpen} />}
    </>
  );
}

function PopUp({
  id,
  setOpen,
}: {
  id: string;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const [item, setItem] = useState({});
  const [loading, setLoading] = useState(false);
  const [imageLoaded, setImageLoaded] = useState(false);
  const fetchData = async () => {
    setLoading(true);
    const resp = await fetch(
      `${Unsplash_url}/photos/${id}?client_id=${Access_Key}`
    );
    const data = await resp.json();
    setItem(data);
    setTimeout(() => {
      setLoading(false);
    }, 1000);
  };
  useEffect(() => {
    fetchData();
  }, []);

  function handleDownload() {
    saveAs(item?.urls?.raw, "image.jpg");
  }

  return (
    <>
      <Loader loading={loading} />
      <section className="fixed top-0 left-0 py-7 h-full w-full z-40 backdrop-blur-sm bg-black/50 flex justify-center items-center">
        <section className="w-[95%] max-h-[600px] md:w-full md:max-w-[945px] md:max-h-[659px] mr-auto ml-auto my-5 rounded-md overflow-hidden relative">
          <Button
            onClick={() => setOpen(false)}
            variant="link"
            className="bg-white p-1 absolute h-6 w-6 top-1 z-50 right-1 rounded-full "
          >
            <XIcon className="text-black h-4" />
          </Button>
          <div className="md:w-full md:h-full relative">
            <img
              src={item?.urls?.raw}
              onLoad={() => {
                setImageLoaded(true);
              }}
              className={`object-cover w-full max-h-[400px] md:max-h-[500px] ${
                imageLoaded ? "block" : "hidden"
              }`}
            />

            {!imageLoaded && (
              <Skeleton className="w-full h-[400px] md:max-h-[400px]" />
            )}

            <div className="absolute bottom-2 left-0 w-full flex gap-2 justify-between md:flex-row-reverse px-3 md:px-4">
              <Button onClick={handleDownload} className="invisible md:visible">
                Download Image
              </Button>
              <div className="flex gap-2">
                <Button
                  variant="ghost"
                  className="text-white border-white border"
                >
                  <Share2Icon className="h-4 mr-2 text-white" />
                  Share
                </Button>
                <Button
                  variant="ghost"
                  className="text-white border-white border"
                >
                  <InfoIcon className="h-4 mr-2 text-white" />
                  Info
                </Button>
              </div>
            </div>
          </div>

          <section className="px-3 md:px-6 py-2 md:py-5 bg-white">
            <div className="flex flex-col md:flex-row md:gap-3 md:w-full">
              <div className="flex justify-between items-center">
                <div className="flex justify-center gap-2">
                  <img
                    src={item?.user?.profile_image?.small}
                    className="rounded-full h-11 md:h-14 md:w-14 w-11"
                  />
                  <div>
                    <h4 className="text-sm font-Montserrat not-italic leading-normal text-gray-400 font-bold">
                      {item?.user?.name}
                    </h4>
                    <h5 className="font-poppins text-[10px] md:text-xs font-semibold text-gray-100">
                      @{item?.user?.username}
                    </h5>
                  </div>
                </div>
                <Button onClick={handleDownload} className="md:hidden">
                  Download Image
                </Button>
              </div>
              <div className="flex justify-between mt-1 w-full">
                <ul className="text-gray-100 flex gap-2">
                  {item?.user?.instagram_username && (
                    <li className="flex items-center gap-1 font-poppins text-[10px] md:text-xs font-semibold">
                      <InstagramIcon className="h-3 w-3 text-gray-100" />/
                      {item?.user?.instagram_username}
                    </li>
                  )}
                  {item?.user?.twitter_username && (
                    <li className="flex items-center gap-1 font-poppins text-[10px] md:text-xs font-semibold">
                      <TwitterIcon className="h-3 w-3 text-gray-100" />/
                      {item?.user?.twitter_username}
                    </li>
                  )}
                </ul>
                <ul className="font-Montserrat text-gray-100 flex gap-2">
                  <li className="flex items-center gap-1 text-[10px] md:text-sm not-italic font-semibold">
                    {item?.downloads > 1000
                      ? (item?.downloads / 1000).toFixed(1) + "k"
                      : item?.downloads}
                    &nbsp; downloads
                  </li>
                  <li className="flex items-center gap-1 text-[10px] md:text-xs not-italic font-semibold">
                    <ThumbsUpIcon className="h-3 w-3 md:w-5 md:h-5  " />
                    {item?.likes}
                  </li>
                </ul>
              </div>
            </div>
            <div className="mt-5">
              <h3 className="font-Montserrat text-gray-400 text-[10px] md:text-xs font-bold not-italic leading-normal ">
                Related Tags
              </h3>
              <div className="flex gap-[10px] my-2 flex-wrap">
                {item?.tags?.slice(0, 7)?.map((tag) => (
                  <p
                    key={tag.title}
                    className="text-[8px] md:text-[10px] rounded-md py-[6.5px] px-[10px] bg-gray-600 not-italic text-gray-400 font-Montserrat font-medium"
                  >
                    {tag.title}
                  </p>
                ))}
              </div>
            </div>
          </section>
        </section>
      </section>
    </>
  );
}

export default ImageModel;

function Loader({ loading }) {
  return (
    <div
      className={` ${
        !loading ? "animate-dissolve" : ""
      }fixed top-0 left-0 py-7 h-full w-full z-50 backdrop-blur-sm bg-black/50 flex justify-center items-center`}
    >
      <section className="w-[95%] h-[600px] md:w-full md:max-w-[945px] md:h-[659px]  mr-auto ml-auto my-5 bg-background rounded-md overflow-hidden relative">
        <div className="w-full h-2/3 bg-background p-4">
          <Skeleton className="h-full w-full" />
        </div>
        <div className="w-full h-1/3 bg-background pl-5 space-y-4">
          <Skeleton className="h-12 w-12 rounded-full" />
          <div className="space-y-2">
            <Skeleton className="h-4 w-[250px]" />
            <Skeleton className="h-4 w-[200px]" />
          </div>
        </div>
      </section>
    </div>
  );
}
