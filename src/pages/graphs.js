import React,{useState,useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import Typography from '@material-ui/core/Typography';
import HomeMadeContainer from '../components/container';
import Container from '@material-ui/core/Container'
import AdvDecChart from '../components/liveGraphs/advDec';
import NiftyChart from '../components/liveGraphs/nifty';
import OI from '../components/liveGraphs/oi';
import IV from '../components/liveGraphs/iv';
import COI from '../components/liveGraphs/changeoi';
import CalenderComponent from '../components/calenderInput';
import DropdownComponent from '../components/dropdown';
import 'date-fns';
import styleSheets from './home.modules.css';
import Switch from '../components/switch';
import axios from 'axios';
import Moment from 'moment'
import Loader from '../components/loader/loader';
import Box from '@material-ui/core/Box';
import SnackBar from '../components/snackBar';
import Dialog from '../components/dialog';




const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    margin:'20px',
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));

export default function FullWidthGrid() {
  const classes = useStyles();

  // var initialState=true;

  // var [state, setstate] = useState(initialState)

  var todayDate=Date().toString()

  // console.log(`Today Date is ${todayDate}`);

  // const [advValues, setadv] = useState();
  // const [decValues, setdec] = useState([]);
  // const [ratioValuesNifty, setratioNifty] = useState([])
  // const [ratioValues, setratio] = useState([])
  // const [OIValuesPuts, setOIPuts] = useState([]);
  // const [OIValuesCalls, setOICalls] = useState([]);
  // const [IVValuesPuts, setIVPuts] = useState([]);
  // const [IVValuesCalls, setIVCalls] = useState([]);
  // const [COIValuesPuts, setCOIPuts] = useState([]);
  // const [COIValuesCalls, setCOICalls] = useState([]);
  // const [xAxisForOptions, setxAxisForOptions] = useState({})
  // const [xAxisForAdvances, setxAxisForAdvances] = useState({});

  

  // useEffect(() => {
  
  //    axios.post("http://localhost:4000/liveGraphs",{"date":"2020-04-15"}).then(
  //     (res)=>{
  //       console.log(res.data["result"]["AdvDecRatio"]["xAsis"])
  //       console.log(res.data["result"]["OI"]["puts"])
  //       console.log(res.data["result"]["OI"]["calls"])

  //       setxAxisForAdvances({"xaxis":res.data["result"]["AdvDecRatio"]["xAsis"]})
  //       setxAxisForOptions(res.data["result"]["COI"]["xAsis"])
  //       setCOIPuts(res.data["result"]["COI"]["puts"])
  //       setCOICalls(res.data["result"]["COI"]["calls"])
  //       setIVCalls(res.data["result"]["IV"]["calls"])
  //       setIVPuts(res.data["result"]["IV"]["puts"])
  //       setOIPuts(res.data["result"]["OI"]["puts"])
  //       setOICalls(res.data["result"]["OI"]["calls"])
  //       setratio(res.data["result"]["AdvDecRatio"]["yAsisAdvDecRatio"])
  //       setratioNifty(res.data["result"]["AdvDecRatio"]["yAsisNifty"])
  //       setdec(res.data["result"]["AdvDecRatio"]["yAsisAdvances"])
  //       setadv(res.data["result"]["AdvDecRatio"]["yAsisDeclines"]) 
  //       console.log(xAxisForAdvances)
  //       console.log(OIValuesPuts)




        
  //     }).catch(
  //       err =>console.log(err))
    
       
  // },[])

  const [experies, setexperies] = useState([])
  const [date, setdate] = useState("");
  const [putsStrikePrice, setputsStrikePrice] = useState(0);
  const [callsStrikePrice, setcallsStrikePrice] = useState(0);
  const [strikePrices, setstrikePrices] = useState([])
  const [selectedExpiry, setselectedExpiry] = useState("");
  const [loading, setloading] = useState(false);
  const [error, seterror] = useState("");


  const [strikePriceChangeState, setstrikePriceChangeState] = useState("calls");

  const [maxavgOI, setavgmaxOI] = useState([])
  const [advValues, setadv] = useState([]);
  const [decValues, setdec] = useState([]);
  const [ratioValuesNifty, setratioNifty] = useState([])
  const [ratioValues, setratio] = useState([])
  const [xAxisForAdvances, setxAxisForAdvances] = useState([]);
  const [OIValuesPuts, setOIPuts] = useState([]);
  const [OIValuesCalls, setOICalls] = useState([]);
  const [IVValuesPuts, setIVPuts] = useState([]);
  const [IVValuesCalls, setIVCalls] = useState([]);
  const [COIValuesPuts, setCOIPuts] = useState([]);
  const [COIValuesCalls, setCOICalls] = useState([]);
  const [xAxisForOptions, setxAxisForOptions] = useState([])




  
 
  const getExperies=(date,experies)=>{
    
    setexperies(experies);
    setdate(date);
  

  }

  const getStrikePrices=(selectedExpiryParam)=>{
    seterror("")  
    
    setselectedExpiry(selectedExpiryParam);
    if(selectedExpiry=="" ||  putsStrikePrice=="" || callsStrikePrice==""){
      setloading(true)

      axios.post("http://127.0.0.1:5000/strikePrice",{"date":date,"expiry":selectedExpiryParam}).then((response)=>{
        // console.log(response.data.strikePrices[0].strikePrices)
         
         if(selectedExpiryParam=="currentExpiry"){
          setstrikePrices(response.data.strikePrices)
          setavgmaxOI(response.data.maxOI)
         // console.log(response)
    
         }
         else{
         console.log(response)
          setavgmaxOI(response.data.maxOI)
          setstrikePrices(response.data.strikePrices[0].strikePrices)
         }
         
         setloading(false)
       }).catch((err)=>{
        seterror("something went wrong , may be some program is not running") 
        console.log(err)
      })

    }

    else
    {
   
   
      setloading(true)

      axios.post("http://127.0.0.1:5000/graphWithExpiryPutsStrikeDate",{"date":date,"expiry":selectedExpiryParam,'strikePrice':putsStrikePrice}).then((res)=>{
          // console.log(res)
          const xaxisForAdvances=res.data["advDec"]["xAsis"]
  
          const nifty=res.data["ratio"]["yAsisNifty"]
  
          const ratio=res.data["ratio"]["yAsisAdvDecRatio"]
          const advances=res.data["advDec"]["yAsisAdvances"]
          const declines=res.data["advDec"]["yAsisDeclines"]
      
          const oiPuts=res.data["OI"]["puts"]
          const oiCalls=res.data["OI"]["calls"]
  
          const coiPuts=res.data["COI"]["puts"]
          const coiCalls=res.data["COI"]["calls"]
  
          const ivPuts=res.data["IV"]["puts"]
          const ivCalls=res.data["IV"]["calls"]
          const optionXaxis=res.data["COI"]["xAxis"]

          setavgmaxOI(res.data.maxOI)
  
  
          setxAxisForAdvances(xaxisForAdvances)
          setxAxisForOptions(optionXaxis)
  
          setratio(ratio)
          setratioNifty(nifty)
          setdec(declines)
          setadv(advances)
  
          setOIPuts(oiPuts)
          setCOIPuts(coiPuts)
          setIVPuts(ivPuts)
         
        
  
  
        }).catch((err)=>{
          seterror("something went wrong , may be some program is not running") 
          console.log(err)
        })

        axios.post("http://127.0.0.1:5000/graphWithExpiryCallsStrikeDate",{"date":date,"expiry":selectedExpiryParam,'strikePrice':callsStrikePrice}).then((res)=>{
      
          console.log(res)
          const xaxisForAdvances=res.data["advDec"]["xAsis"]
          const nifty=res.data["ratio"]["yAsisNifty"]
          const ratio=res.data["ratio"]["yAsisAdvDecRatio"]
          const advances=res.data["advDec"]["yAsisAdvances"]
          const declines=res.data["advDec"]["yAsisDeclines"]
          const optionXaxis=res.data["COI"]["xAxis"]  
    
          const oiPuts=res.data["OI"]["puts"]
          const oiCalls=res.data["OI"]["calls"]
    
          const coiPuts=res.data["COI"]["puts"]
          const coiCalls=res.data["COI"]["calls"]
    
          const ivPuts=res.data["IV"]["puts"]
          const ivCalls=res.data["IV"]["calls"]
    
          setavgmaxOI(res.data.maxOI)
          setxAxisForAdvances(xaxisForAdvances)
          setratio(ratio)
          setratioNifty(nifty)
          setdec(declines)
          setadv(advances)
          setxAxisForOptions(optionXaxis)
          setOICalls(oiCalls)
          setCOICalls(coiCalls)
          setIVCalls(ivCalls)
    
          console.log(coiCalls)
    
          setloading(false)  
    
       }).catch((err)=>{
      seterror("something went wrong , may be some program is not running")      
       setloading(false)
       console.log(err)
    })



    }
  

   
  


  }
 
  const getSelectedaPutsStrikePrice=(putsStrikePrice)=>{
    setputsStrikePrice(putsStrikePrice)
    seterror("") 
    setloading(true)

    axios.post("http://127.0.0.1:5000/graphWithExpiryPutsStrikeDate",{"date":date,"expiry":selectedExpiry,'strikePrice':putsStrikePrice}).then((res)=>{
        // console.log(res)
        const xaxisForAdvances=res.data["advDec"]["xAsis"]

        const nifty=res.data["ratio"]["yAsisNifty"]

        const ratio=res.data["ratio"]["yAsisAdvDecRatio"]
        const advances=res.data["advDec"]["yAsisAdvances"]
        const declines=res.data["advDec"]["yAsisDeclines"]
    
        const oiPuts=res.data["OI"]["puts"]
        const oiCalls=res.data["OI"]["calls"]

        const coiPuts=res.data["COI"]["puts"]
        const coiCalls=res.data["COI"]["calls"]

        const ivPuts=res.data["IV"]["puts"]
        const ivCalls=res.data["IV"]["calls"]
        const optionXaxis=res.data["COI"]["xAxis"]

        // console.log(coiPuts)
       
        
        // console.log(nifty)
        // console.log(oiPuts)

        

        setxAxisForAdvances(xaxisForAdvances)
        setxAxisForOptions(optionXaxis)

        setratio(ratio)
        setratioNifty(nifty)
        setdec(declines)
        setadv(advances)

        setOIPuts(oiPuts)
        setCOIPuts(coiPuts)
        setIVPuts(ivPuts)
       

        setloading(false)
        


      }).catch((err)=>{
        seterror("something went wrong , may be some program is not running") 
        setloading(false)
        console.log(err)
      })

    
    
    // setputsStrikePrice(putsStrikePrice)

    // setstrikePriceChangeState("puts")

    // fectchGraphsData("puts")
    

  }

   
  const getSelectedaCallsStrikePrice=(callsStrikePrice)=>{
    setcallsStrikePrice(callsStrikePrice)
    console.log(callsStrikePrice)
    seterror("") 
    setloading(true)


    axios.post("http://127.0.0.1:5000/graphWithExpiryCallsStrikeDate",{"date":date,"expiry":selectedExpiry,'strikePrice':callsStrikePrice}).then((res)=>{
      
      console.log(res)
      const xaxisForAdvances=res.data["advDec"]["xAsis"]
      const nifty=res.data["ratio"]["yAsisNifty"]
      const ratio=res.data["ratio"]["yAsisAdvDecRatio"]
      const advances=res.data["advDec"]["yAsisAdvances"]
      const declines=res.data["advDec"]["yAsisDeclines"]
      const optionXaxis=res.data["COI"]["xAxis"]  

      const oiPuts=res.data["OI"]["puts"]
      const oiCalls=res.data["OI"]["calls"]

      const coiPuts=res.data["COI"]["puts"]
      const coiCalls=res.data["COI"]["calls"]

      const ivPuts=res.data["IV"]["puts"]
      const ivCalls=res.data["IV"]["calls"]

      
      setxAxisForAdvances(xaxisForAdvances)
      setratio(ratio)
      setratioNifty(nifty)
      setdec(declines)
      setadv(advances)
      setxAxisForOptions(optionXaxis)
      setOICalls(oiCalls)
      setCOICalls(coiCalls)
      setIVCalls(ivCalls)

      console.log(coiCalls)

      setloading(false)  

   }).catch((err)=>{
  seterror("something went wrong , may be some program is not running")      
   setloading(false)
   console.log(err)
})
    
    // setcallsStrikePrice(callsStrikePrice)

    // setstrikePriceChangeState("calls")
   

    // fectchGraphsData("calls")

  }


// useEffect(() => {

//   // if(strikePriceChangeState=="calls"){
//     fectchGraphsData("calls")
//   // }
//   // else{
//   //   fectchGraphsData("puts")
//   // }
  

// },[putsStrikePrice,callsStrikePrice])


//   const fectchGraphsData=(type)=>{

//     setloading(true)
//     seterror("") 
//     console.log(callsStrikePrice)
    
//     if(type=="puts"){
       
        
//         console.log(callsStrikePrice)
//         axios.post("http://127.0.0.1:5000/graphWithExpiryPutsStrikeDate",{"date":date,"expiry":selectedExpiry,'strikePrice':putsStrikePrice}).then((res)=>{
//         // console.log(res)
//         const xaxisForAdvances=res.data["advDec"]["xAsis"]

//         const nifty=res.data["ratio"]["yAsisNifty"]

//         const ratio=res.data["ratio"]["yAsisAdvDecRatio"]
//         const advances=res.data["advDec"]["yAsisAdvances"]
//         const declines=res.data["advDec"]["yAsisDeclines"]
    
//         const oiPuts=res.data["OI"]["puts"]
//         const oiCalls=res.data["OI"]["calls"]

//         const coiPuts=res.data["COI"]["puts"]
//         const coiCalls=res.data["COI"]["calls"]

//         const ivPuts=res.data["IV"]["puts"]
//         const ivCalls=res.data["IV"]["calls"]
//         const optionXaxis=res.data["COI"]["xAxis"]

//         // console.log(coiPuts)
       
        
//         // console.log(nifty)
//         // console.log(oiPuts)

        

//         setxAxisForAdvances(xaxisForAdvances)
//         setxAxisForOptions(optionXaxis)

//         setratio(ratio)
//         setratioNifty(nifty)
//         setdec(declines)
//         setadv(advances)

//         setOIPuts(oiPuts)
//         setCOIPuts(coiPuts)
//         setIVPuts(ivPuts)
       

//         setloading(false)
        


//       }).catch((err)=>{
//         seterror("something went wrong , may be some program is not running") 
//         setloading(false)
//         console.log(err)
//       })

//     }
//    else
//    {

//     setloading(true)
//     seterror("") 

//     axios.post("http://127.0.0.1:5000/graphWithExpiryCallsStrikeDate",{"date":date,"expiry":selectedExpiry,'strikePrice':callsStrikePrice}).then((res)=>{
      
//       console.log(res)
//       const xaxisForAdvances=res.data["advDec"]["xAsis"]
//       const nifty=res.data["ratio"]["yAsisNifty"]
//       const ratio=res.data["ratio"]["yAsisAdvDecRatio"]
//       const advances=res.data["advDec"]["yAsisAdvances"]
//       const declines=res.data["advDec"]["yAsisDeclines"]
//       const optionXaxis=res.data["COI"]["xAxis"]  

//       const oiPuts=res.data["OI"]["puts"]
//       const oiCalls=res.data["OI"]["calls"]

//       const coiPuts=res.data["COI"]["puts"]
//       const coiCalls=res.data["COI"]["calls"]

//       const ivPuts=res.data["IV"]["puts"]
//       const ivCalls=res.data["IV"]["calls"]

      
//       setxAxisForAdvances(xaxisForAdvances)
//       setratio(ratio)
//       setratioNifty(nifty)
//       setdec(declines)
//       setadv(advances)
//       setxAxisForOptions(optionXaxis)
//       setOICalls(oiCalls)
//       setCOICalls(coiCalls)
//       setIVCalls(ivCalls)

//       console.log(coiCalls)

//       setloading(false)  

//    }).catch((err)=>{
//    seterror("something went wrong , may be some program is not running")   
//    setloading(false)
//    console.log(err)
// })

//    } 
    
//   }


  return (
    <div className={classes.root}>
      {/* <liveModeStateProvider value={state}> */}
      <br></br>
      
      <Grid container spacing={2}>
      
      <Grid item xs={2}  >
        <CalenderComponent getDateAndExpiry={getExperies} ></CalenderComponent >
      
        </Grid>

        <Grid item xs={2}>
        
        <DropdownComponent dropDownValues={experies} dropDownName={'Experies'} type={"experies"} getStrikePrices={getStrikePrices}></DropdownComponent>
      
        </Grid>
        
        <Grid item xs={2}>
        
        <DropdownComponent dropDownValues={strikePrices} dropDownName={"Strike Price (CE)"}  type={"calls"} setSelectedValue={getSelectedaCallsStrikePrice}></DropdownComponent>
      
        </Grid>
       
        <Grid item xs={2}>
        
        <Box><DropdownComponent dropDownValues={strikePrices} dropDownName={"Strike Price (PE)"} setSelectedValue={getSelectedaPutsStrikePrice} type={"puts"}></DropdownComponent>
        </Box>
        </Grid>


 { maxavgOI.length>0 ?
     <Grid item xs={4}>
    
      <Dialog content={maxavgOI} ></Dialog>
        
      </Grid> 
   :
   ""      
}

        {/* <Grid item xs={12}>
          <HomeMadeContainer type={"status"} ContainerData={["some data"]}>
              
          </HomeMadeContainer>
        </Grid>  */}
        {/* <Box mt={}></Box> */}

      {/* { error ? <SnackBar color={"#f44336"}></SnackBar >  : "" } */}

{
   !loading ? <> <Grid item xs={6}>
        <Container>
        <OI xaxis={xAxisForOptions}  puts={OIValuesPuts}  calls={OIValuesCalls}></OI>
      </Container>
        </Grid>


        <Grid item xs={6}  spacing={0}>
        <Container >
        <NiftyChart xaxis={xAxisForAdvances} nifty={ratioValuesNifty} ratio={ratioValues}></NiftyChart>
        </Container>
        </Grid>



        <Grid item xs={6}>
        <Container >
        <IV xaxis={xAxisForOptions} puts={IVValuesPuts}  calls={IVValuesCalls}></IV>
      </Container>
        </Grid>

        <Grid item xs={6}  spacing={0}>
        <Container >
        <AdvDecChart xaxis={xAxisForAdvances}  advances={advValues} declines={decValues} ></AdvDecChart>
        </Container>
        </Grid>


        <Grid item xs={6}  spacing={0}>
        <Container >
        <COI  xaxis={xAxisForOptions} puts={COIValuesPuts}  calls={COIValuesCalls}></COI>
      </Container>
        </Grid>
        </>
 : <>
    <Grid item xs={12}  spacing={0}>
     <Box mt={10}>
      <Loader></Loader>
      </Box>
        </Grid>
  </> 

}        

       
      
      </Grid>
   
      
    </div>
  );
}




