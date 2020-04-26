import React,{useEffect,useState,createContext} from 'react'
import HeaderComponent from '../components/optionChain/header';
import TableComponent from '../components/optionChain/table.js';
import styleSheets from './options.module.css';
import axios from 'axios';
import Loader from '../components/loader/loader';




function OptionChain() {

   const [errorState, seterrorState] = useState(false)
   const [isLoading, setisLoading] = useState(false);
   const [errorMessage, seterrorMessage] = useState("")
   const [tableValues, settableValues] = useState([]);

   const [niftyValue, setniftyValue] = useState(0.0000);
   const [tableModeState, settableModeState] = useState(true);
   const [lastSyncTime, setlastSyncTime] = useState("null");




const tableMode=(tableMode)=>{

    settableModeState(tableMode)

}



   const getselectedValues=(date,time,expiry,tableState)=>{

    setisLoading(true)
    console.log(date)
    console.log(time)
    console.log(expiry) 
      
  if(tableState==false){  
    
     if(expiry=="currentExpiry")
     {


    axios.post("http://127.0.0.1:5000/dataForSelectedDateTimeExpiry",{"date":date,"time":time,"expiry":expiry}).then((res)=>{
        console.log(res.data)
        // console.log(res.data.data.records.niftyPrice)
        setniftyValue(res.data.filtered.niftyPrice)
        setlastSyncTime(res.data.filtered.time)
        settableValues(res.data.filtered.data)
        setisLoading(false)

    }).catch((err)=>{
        console.log(err)
        setisLoading(false)
    })

     }  
else
{

    axios.post("http://127.0.0.1:5000/dataForSelectedDateTimeExpiry",{"date":date,"time":time,"expiry":expiry}).then((res)=>{
        console.log(res.data)
        console.log(res.data.data.records.niftyPrice)
        setniftyValue(res.data.data.records.niftyPrice)
        setlastSyncTime(res.data.time)
        settableValues(res.data.data.records.values)
        setisLoading(false)

    }).catch((err)=>{
        console.log(err)
        setisLoading(false)
    })
}

}



else{
    setisLoading(true)

    if(expiry=="currentExpiry")
    {


   axios.post("http://127.0.0.1:5000/optionsDashBoard",{"date":date,"time":time,"expiry":expiry}).then((res)=>{
       console.log(res.data)
       // console.log(res.data.data.records.niftyPrice)
       setniftyValue(res.data.filtered.niftyPrice)
       setlastSyncTime(res.data.filtered.time)
       settableValues(res.data.filtered.data)
       setisLoading(false)

   }).catch((err)=>{
       console.log(err)
       setisLoading(false)
   })

    }  
else
{

   axios.post("http://127.0.0.1:5000/optionsDashBoard",{"date":date,"time":time,"expiry":expiry}).then((res)=>{
       console.log(res.data)
       console.log(res.data.data.records.niftyPrice)
       setniftyValue(res.data.data.records.niftyPrice)
       setlastSyncTime(res.data.time)
       settableValues(res.data.data.records.values)
       setisLoading(false)

   }).catch((err)=>{
       console.log(err)
       setisLoading(false)
   })
}

}



}



// useEffect(() => {


// },[tableModeState])



    return (

        
        <div id={styleSheets.optionPage}>
         {/* <OptionContext.Provider value={experies}> */}
        <HeaderComponent  selectedValues={getselectedValues} nifty={niftyValue} lastSync={lastSyncTime} tableMode={tableMode}  ></HeaderComponent> 
       {/* {isLoading ?  */}
    { !isLoading ? <TableComponent  values={tableValues}></TableComponent> : <Loader></Loader>}
       {/* : <Loader></Loader>} */}
       {/* </OptionContext.Provider>    */}
        </div>
    )

}


export default OptionChain


