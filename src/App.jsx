
import "./App.css";
import SearchBar from "./Components/SearchBar";
import Table from "./Components/Table";
import useFetch from "./Utils/useFetch";
function App() {
  const [isLoading, isError, data, dummyData, setDummyData] = useFetch("");

  isLoading ? (
    <div>Data Loading</div>
  ) : isError ? (
    <div>Data not found</div>
  ) : ""
  
  return(
    <div className="m-4">
      <SearchBar dummyData = {dummyData} data={data} setDummyData = {setDummyData}/>
      <Table dummyData = {dummyData} setDummyData = {setDummyData}/>

    </div>
  );
}

export default App;
