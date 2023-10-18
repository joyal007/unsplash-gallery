import { useEffect, useState } from "react";
import "./App.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import { Unsplash_url, Access_Key } from "./lib/utils";
import { ThemeProvider } from "@/components/theme-provider"
import Loading from "./components/Loading";


function App() {
  
  const [data, setData] = useState([]);
  const [query, setQuery] = useState("")
  const [loading, setLoading] = useState(false)
  const [displayQuery, setDisplayQuery] = useState("")
  const [showHeader, setShowHeader] = useState(true)

  const fetchRequest = async (queryVal="") => {
    setLoading(true);
    const data = await fetch(
      queryVal === ""
        ? `${Unsplash_url}photos?client_id=${Access_Key}&per_page=20`
        : `${Unsplash_url}search/photos?page=1&query=${queryVal}&client_id=${Access_Key}&per_page=20`
    );
    const dataJ = await data.json();
    if(queryVal){
      const result = dataJ?.results 
      setData(result);
      setShowHeader(false);
      setDisplayQuery(queryVal)
      if(queryVal !== query){
        setQuery(queryVal)
      }
      setTimeout(() => {
        setLoading(false);
      },1500)
      return
    }
    const result =  dataJ;
    if(!showHeader)
      setShowHeader(true);
    if(displayQuery !== ""){
      setDisplayQuery("")
    }
    setData(result);
    setTimeout(() => {
      setLoading(false);
    },1000)
  };


  useEffect(() => {
    fetchRequest();
  }, []);

  

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navigation query={query} setQuery={setQuery} fetchRequest={fetchRequest} />
      {loading && <Loading/>}
      {
        showHeader && <Header fetchRequest={fetchRequest} />
      }
      <Gallery query={displayQuery} data={data} />
      </ThemeProvider>
    </>
  );
}

export default App;
