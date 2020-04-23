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
   const [experies, setexperies] = useState([])
   const [optionsData, setoptionsData] = useState({});
   const [islive, setislive] = useState(true);

   const [selectedDate, setselectedDate] = useState("")
   const [selectedExpiry, setselectedExpiry] = useState("");

   const [tableValues, settableValues] = useState([]);

   const [niftyValue, setniftyValue] = useState(0.0000);

   const [lastSyncTime, setlastSyncTime] = useState("null");

   const [liveNiftyValue, setliveNiftyValue] = useState(0);

   const [liveSyncTime, setliveSyncTime] = useState("null");

//    const  liveStatus=(liveStatus)=>{

//     setislive(liveStatus)

//    }


   const getselectedValues=(date,time,expiry)=>{

       setisLoading(true)
       console.log(date)
       console.log(time)
       console.log(expiry)
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
    })
}

   }


//   const setMode=(state)=>{
//       setislive(state)
     


//   }

//   const setliveExperies=(expiry)=>{

//     selectedExpiry(expiry)

//   }


//    useEffect(() => {
//             const interval = setInterval(() =>{
//             setisLoading(true)
//               axios.get("http://127.0.0.1:5000/options").then(
               
//                 (res)=>{
//                  setexperies(res.data[0].experies)
//                  setoptionsData(res.data[0].filtered.data)
//                  setliveNiftyValue(res.data[0].niftyValue)
//                  setliveSyncTime(res.data[0].time)
//                  console.log(res.data[0].filtered.data)
//                  setisLoading(false)
                  
//                 }).catch(
//                   err =>console.log(err))
        
        
//             },18000)
          
            
          //  return clearInterval(interval)   
               
        //   },[islive])


//     if(islive){
//         return (

        
//             <div id={styleSheets.optionPage}>
//              {/* <OptionContext.Provider value={experies}> */}
//             <HeaderComponent  selectedValues={getselectedValues} experies={experies} nifty={liveNiftyValue} lastSync={liveSyncTime} mode={setMode} type={"live"} expiry={setliveExperies}></HeaderComponent> 
//            {/* {isLoading ?  */}
//         { !isLoading ? <TableComponent  values={optionsData}></TableComponent> : <Loader></Loader>}
//            {/* : <Loader></Loader>} */}
//            {/* </OptionContext.Provider>    */}
//             </div>
//         )


//     }
// else{

    return (

        
        <div id={styleSheets.optionPage}>
         {/* <OptionContext.Provider value={experies}> */}
        <HeaderComponent  selectedValues={getselectedValues} nifty={niftyValue} lastSync={lastSyncTime} ype={"notlive"}></HeaderComponent> 
       {/* {isLoading ?  */}
    { !isLoading ? <TableComponent  values={tableValues}></TableComponent> : <Loader></Loader>}
       {/* : <Loader></Loader>} */}
       {/* </OptionContext.Provider>    */}
        </div>
    )

}

// }

export default OptionChain


