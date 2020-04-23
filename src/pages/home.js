import React,{useState,useContext,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
import AdvDecChart from '../components/liveGraphs/advDec';
import NiftyChart from '../components/liveGraphs/nifty';
import 'date-fns';
import axios from 'axios';
import Moment from 'moment'
import Loader from '../components/loader/loader';
import Test from '../components/liveGraphs/test';




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

  

  useEffect(() => {
    const interval = setInterval(async() =>{
      setloading(true)
    
     await axios.post("http://127.0.0.1:5000/liveGraphs",{"date":todayDate}).then(
       
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


    },180000)
  
    
  //  return clearInterval(interval)   
       
  },[])
  return (
   
    <div className={classes.root}>
     
      <br></br>
   
      
    { loading ? <Loader></Loader> : <div> <Grid container > 
      <Grid item xs={1}  >
        
        </Grid>  
    <Grid item xs={5} > 
      <NiftyChart  xaxis={xAxisForAdvances} nifty={ratioValuesNifty} ratio={ratioValues} ></NiftyChart> 
    </Grid> 
    <Grid item xs={1}  >
        
        </Grid> 
    
     <Grid item xs={4}  >
         <AdvDecChart xaxis={xAxisForAdvances}  advances={advValues} declines={decValues} ></AdvDecChart>
        </Grid>

      <Grid item xs={1}  >
         
        </Grid>   

        {/* <Grid item xs={6}  >
         <Test xaxis={xAxisForAdvances}  advances={advValues} declines={decValues} ></Test>
        </Grid> */}

      </Grid>
      </div>
   }          
    </div>
  );
}



