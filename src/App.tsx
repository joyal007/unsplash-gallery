import "./App.css";
import Navigation from "./components/Navigation";
import Header from "./components/Header";
import Gallery from "./components/Gallery";
import { ThemeProvider } from "@/components/theme-provider"
import Loading from "./components/Loading";
import { useDataHook } from "./hooks/getDataHooks";


function App() {
  
  const {data, query, setQuery, fetchRequest, loading, displayQuery, showHeader} = useDataHook()

  return (
    <>
    <ThemeProvider defaultTheme="dark" storageKey="vite-ui-theme">
      <Navigation query={query as string} setQuery={setQuery as React.Dispatch<React.SetStateAction<string>>} fetchRequest={fetchRequest as (queryVal?: string) => Promise<void>}  />
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
