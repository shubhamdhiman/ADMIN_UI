import {useState,useEffect} from "react";


function useFetch() {
    const [isLoading, setIsLoading] = useState(true)
    const [isError, setIsError] = useState(false)
    const [data,setData] = useState([])
    const [dummyData,setDummyData] = useState([])
    useEffect(()=>{
        async function fetchData(){
            try {
                const response = await fetch("https://geektrust.s3-ap-southeast-1.amazonaws.com/adminui-problem/members.json")
                if(!response.ok){
                    throw new Error("Data not found")
                }
                const jsonData = await response.json()
                setData(jsonData)
                setDummyData(jsonData)
                setIsLoading(false)
            } catch (error) {
                setIsError(true)
                setIsLoading(false)
            }
        }
        fetchData()
    },[])
  return [isLoading,isError,data,dummyData,setDummyData ]
}

export default useFetch