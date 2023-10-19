import { Access_Key, Unsplash_url } from "@/lib/utils";
import { useState, useEffect } from "react";
export function useDataHook() {
    const [data, setData] = useState([]);
    const [query, setQuery] = useState("")
    const [loading, setLoading] = useState(false)
    const [displayQuery, setDisplayQuery] = useState("");
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
        setDisplayQuery(queryVal);
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
      if (displayQuery !== "") setDisplayQuery("");

      setData(result);
      setTimeout(() => {
        setLoading(false);
      },1000)
    };
  
  
    useEffect(() => {
      fetchRequest();
    }, []);

    return { data, query, setQuery, fetchRequest, loading, displayQuery, showHeader };
}