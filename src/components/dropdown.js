import React,{useState,useEffect} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';

const useStyles = makeStyles((theme) => ({
  formControl: {
    minWidth: 180,
  },
  selectEmpty: {

  },
}));

export default function SimpleSelect(props) {
  const classes = useStyles();

  const [experies,setexperies]=useState([])
  const [putsStrikePrices, setputsStrikePrices] = useState([]);
  const [callsStrikePrices, setcallsStrikePrices] = useState([]);


  const [selectedExpiry,setSelectedExpiry] = useState("")
  const [selectedPuts, setselectedPuts] = useState("");
  const [selectedCalls, setselectedCalls] = useState("")

  const handleChange = (event) => {
    if (props.type==="experies") {
      console.log(event.target.value)

      setSelectedExpiry(event.target.value);
      
    }
    else if (props.type=="puts")
    {
      console.log(event.target.value) 
      setselectedPuts(event.target.value)
       
    }    
    else {
      console.log(event.target.value)
       
      setselectedCalls(event.target.value)
      
      }

  };

 

  useEffect(() => {

    if(props.type=="experies"){
     
      setexperies(props.dropDownValues)
     
    }
    else if (props.type=="puts"){
       setputsStrikePrices(props.dropDownValues)
       
    }
    else{
      setcallsStrikePrices(props.dropDownValues)
    }
    
  },[props]);


  useEffect(() => {
    if (props.type=="experies"){
      console.log(selectedExpiry)
      props.getStrikePrices(selectedExpiry)
    }
    else if(props.type=="puts"){
      console.log(selectedPuts)
      props.setSelectedValue(selectedPuts)
    }
    else{
      console.log(selectedCalls)
      props.setSelectedValue(selectedCalls)
    }
  },[selectedExpiry,selectedPuts,selectedCalls])




  if(props.type ==="experies"){
    return (
      <div>
        <FormControl className={classes.formControl} >
         <InputLabel id="demo-controlled-open-select-label">{props.dropDownName}</InputLabel>
          <Select
        
            id="demo-simple-select"
            value={selectedExpiry}
            onChange={handleChange}
          >
           
           {  
           experies.length>0 ?  experies.map((expiry,index) => <MenuItem  key={index}  value={expiry}>{expiry}</MenuItem>) : <MenuItem   value={""}>{"No Data"}</MenuItem>
           
           }
         
          </Select>
        </FormControl>
        
      </div>
    );
  }
  else if (props.type=="calls"){
    return (
      <div>
        <FormControl className={classes.formControl} >
         <InputLabel id="demo-controlled-open-select-label">{props.dropDownName}</InputLabel>
          <Select
        
            id="demo-simple-select"
            value={selectedCalls}
            onChange={handleChange}
          >
           
           {  
           callsStrikePrices ?   callsStrikePrices.map((strikes,index) => <MenuItem  key={index}  value={strikes}>{strikes}</MenuItem>) : <MenuItem   value={""}>{"No Data"}</MenuItem>
           
           }
         
          </Select>
        </FormControl>
        
      </div>
    );
    
  }
  else {
    return (
      <div>
        <FormControl className={classes.formControl} >
         <InputLabel id="demo-controlled-open-select-label">{props.dropDownName}</InputLabel>
          <Select
        
            id="demo-simple-select"
            value={selectedPuts}
            onChange={handleChange}
          >
           
           {  
           putsStrikePrices ?   putsStrikePrices.map((strikes,index) => <MenuItem  key={index}  value={strikes}>{strikes}</MenuItem>) : <MenuItem   value={""}>{"No Data"}</MenuItem>
           
           }
         
          </Select>
        </FormControl>
        
      </div>
    );
  }

}
