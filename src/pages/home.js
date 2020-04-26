import React,{useState,useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AdvDecChart from '../components/liveGraphs/advDec';
import NiftyChart from '../components/liveGraphs/nifty';
import 'date-fns';
import axios from 'axios';
import Moment from 'moment'
import Loader from '../components/loader/loader';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import TableComponent from '../components/optionChain/table.js';



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


  var todayDate=Moment().format("YYYY-MM-DD")
  // console.log(todayDate)
  const [advValues, setadv] = useState([]);
  const [decValues, setdec] = useState([]);
  const [ratioValuesNifty, setratioNifty] = useState([])
  const [ratioValues, setratio] = useState([])
  const [xAxisForAdvances, setxAxisForAdvances] = useState([]);
  const [loading, setloading] = useState(false);
  const [liveNiftyValue, setliveNiftyValue] = useState(0);
  const [liveSyncTime, setliveSyncTime] = useState("null");
  const [liveType, setliveType] = useState(true)
  const [experies, setexperies] = useState([])
  const [optionsData, setoptionsData] = useState({});

  
const disableFunction=(state)=>{
  
  console.log(`props to parent ${state}`)
  setliveType(state)

}



  useEffect(() => {
 
    console.log(`use effect state ${liveType}`)

    const interval = setInterval(() =>{
    setloading(true)
    console.log(liveType)
        axios.post("http://127.0.0.1:5000/liveGraphs",{"date":todayDate}).then(
       
        (res)=>{
         
          const xaxis=res.data["result"]["AdvDecRatio"]["xAsis"]
          const nifty=res.data["result"]["AdvDecRatio"]["yAsisNifty"]
          const ratio=res.data["result"]["AdvDecRatio"]["yAsisAdvDecRatio"]
          const advances=res.data["result"]["advDec"]["yAsisAdvances"]
          const declines=res.data["result"]["advDec"]["yAsisDeclines"]
          setxAxisForAdvances(xaxis)
          setratio(ratio)
          setratioNifty(nifty)
          setdec(declines)
          setadv(advances)
          setloading(false)
          
        }).catch(
          err =>console.log(err))


          axios.get("http://127.0.0.1:5000/options").then(
             
            (res)=>{
             setexperies(res.data[0].experies)
             setoptionsData(res.data[0].filtered.data)
             setliveNiftyValue(res.data[0].filtered.niftyPrice)
             setliveSyncTime(res.data[0].filtered.time)
             console.log(res.data[0])
             setloading(false)
              
            }).catch(
              err =>console.log(err))   


        


    },18000)
    
    return () => {
      clearTimeout(interval)
 }   

       
  },[liveType])


  if(liveType==true){

    return (
   
      <div className={classes.root}>
       
        <br></br>

    { loading ? <Loader></Loader> 
      : 
       <> <Grid container > 
      <Grid item xs={12}  >
        <SwitchLabels initialState={liveType} mode={disableFunction}></SwitchLabels>
        </Grid>

        <TableComponent  values={optionsData}></TableComponent> 

        </Grid>
    </>
    }  
    </div>
    );  


  }

  else
  {
    return (
   
      <div className={classes.root}>
       
        <br></br>
     
        
      { loading ? <Loader></Loader> : <div> <Grid container > 
        <Grid item xs={12}  >
        <SwitchLabels initialState={liveType} mode={disableFunction}></SwitchLabels>
        </Grid>
      <Grid item xs={5} > 
        <NiftyChart  xaxis={xAxisForAdvances} nifty={ratioValuesNifty} ratio={ratioValues} ></NiftyChart> 
      </Grid> 
      <Grid item xs={1}  >
          
          </Grid> 
      
       <Grid item xs={5}  >
           <AdvDecChart xaxis={xAxisForAdvances}  advances={advValues} declines={decValues} ></AdvDecChart>
          </Grid>

        </Grid>
        </div>
     }          
      </div>
    );
    

  }


  
}











function SwitchLabels(props) {
  const [state, setState] = React.useState({
    checked: true,
    
  });

  const handleChange = (event) => {

    setState({ ...state, [event.target.name]: event.target.checked });
    // console.log("state changed")
    console.log(` switch comp state ${event.target.checked}`)
    props.mode(event.target.checked)
   

  };


  // useEffect(() => {
  //   console.log(state.checked)
  //   props.mode(state.checked)
    
  // }, [state.checked]);

  return (
   <>
      <FormControlLabel
        control={<Switch  checked={props.initialState} onChange={handleChange} name="checked"  />}
        label="Options"
      />
    
   </>
  );

}