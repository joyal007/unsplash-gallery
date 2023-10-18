import React, { useState } from "react";
import { MenuIcon, SearchIcon, XIcon } from "lucide-react";
import { Input } from "./ui/input";
import { Switch } from "./ui/switch";
import { useTheme} from "@/components/theme-provider";
import type { Theme } from "@/components/theme-provider";
import { Button } from "./ui/button";

function Navigation({
  query,
  setQuery,
  fetchRequest,
}: {
  query: string;
  setQuery: React.Dispatch<React.SetStateAction<string>>;
  fetchRequest: (queryVal: string) => void;
}) {
  const { theme, setTheme } = useTheme();
  const [open, setOpen] = useState(false);
  const [openSearchBar, setOpenSearchBar] = useState(false);

  return (
    <>
      <nav className="pl-[27px] pr-[23px] pt-[18px] pb-[19px] flex justify-evenly">
        <p className="font-pattaya font-normal w-full text-2xl md:text-3xl text-header">
          Image Gallery
        </p>

        <div className="gap-7 w-full items-center text-header hidden md:flex">
          <Input
            onKeyDown={(e) => {
              if (e.key === "Enter") {
                fetchRequest(query);
              }
            }}
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className={`w-[419px] h-10  ${
              query != "" ? "bg-[#ECECEC]" : "bg-search"
            }  text-black focus:bg-[#ECECEC]`}
            placeholder=" Search Images here"
          />
          <ul className="flex font-Montserrat text-xs font-bold not-italic leading-normal gap-14">
            <li>Explore</li>
            <li>Collection</li>
            <li>Community</li>
          </ul>
        </div>
        <div className="hidden md:flex w-full items-center gap-2 justify-center">
          <h3 className="font-Montserrat text-xs font-bold not-italic leading-normal w-fit text-header">
            {theme !== "dark" ? "Dark Mode" : "Light Mode"}
          </h3>
          <Switch
            defaultValue="light"
            checked={theme == "dark"}
            onCheckedChange={() => setTheme(theme == "dark" ? "light" : "dark")}
          />
        </div>
        <div className="flex gap-[2px] md:hidden">
          <Button variant="link" onClick={() => setOpenSearchBar(true)}>
            <SearchIcon size={18} />
          </Button>
          <Button variant="link" onClick={() => setOpen(true)}>
            <MenuIcon size={24} />
          </Button>
        </div>
      </nav>
      {open && (
        <NavigationMobile setTheme={setTheme} theme={theme} setOpen={setOpen} />
      )}
      {openSearchBar && (
        <SearchModel setOpen={setOpenSearchBar} fetchRequest={fetchRequest} />
      )}
    </>
  );
}

function SearchModel({ fetchRequest, setOpen }: { setOpen: React.Dispatch<React.SetStateAction<boolean>>; fetchRequest: (queryVal: string) => void }) {
  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setOpen(false);
    fetchRequest(e?.target[0].value);
  }
  return (
    <section className="md:hidden fixed top-0 left-0 z-50 h-screen w-full bg-black/50 backdrop-blur-sm">
      <div className="mt-20 mx-4 relative">
        <Button variant="link" className="absolute -top-10 -right-2">
          <XIcon
            className="h-6"
            onClick={() => {
              setOpen(false);
            }}
          />
        </Button>
        <form onSubmit={handleSubmit}>
          <Input
            name="search"
            type="text"
            autoFocus
            className={`w-full h-14 bg-[#ECECEC] text-black focus:bg-[#ECECEC] active:bg-[#ECECEC]`}
            placeholder=" Search Images here"
          />
        </form>
      </div>
    </section>
  );
}

function NavigationMobile({ theme, setTheme, setOpen }: { theme: string; setTheme: (query: Theme) => void; setOpen: React.Dispatch<React.SetStateAction<boolean>> }) {
  return (
    <div className="md:hidden fixed right-0 top-0 z-50 h-screen w-full grid grid-cols-5">
      <div
        role="button"
        onClick={() => setOpen(false)}
        className="col-span-2 bg-black/50 backdrop-blur-sm"
      />
      <aside className="col-span-3 bg-background px-2 relative">
        <Button
          variant="link"
          className="absolute top-4 right-5"
          onClick={() => setOpen(false)}
        >
          <XIcon className="h-6" />
        </Button>
        <ul className="flex flex-col font-Montserrat mt-10 text-base font-bold not-italic leading-normal gap-4">
          <li>Explore</li>
          <li>Collection</li>
          <li>Community</li>
        </ul>
        <div className="flex w-full items-center gap-2 justify-start mt-5">
          <h3 className="font-Montserrat text-xs font-bold not-italic leading-normal w-fit text-header">
            {theme !== "dark" ? "Dark Mode" : "Light Mode"}
          </h3>
          <Switch
            defaultValue="light"
            checked={theme == "dark"}
            onCheckedChange={() => setTheme(theme == "dark" ? "light" : "dark")}
          />
        </div>
      </aside>
    </div>
  );
}

export default Navigation;
