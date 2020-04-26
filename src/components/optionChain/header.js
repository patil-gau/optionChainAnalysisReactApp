import React,{useState,useEffect,useContext}from 'react';
import { makeStyles } from '@material-ui/core/styles';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import Typography from '@material-ui/core/Typography';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import  styleSheet from './header.module.css';
import Paper from '@material-ui/core/Paper';
import Grid from '@material-ui/core/Grid';
import Switch from '../switch.js';
import InputLabel from '@material-ui/core/InputLabel';
import MenuItem from '@material-ui/core/MenuItem';
import FormControl from '@material-ui/core/FormControl';
import Select from '@material-ui/core/Select';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import axios from 'axios';
import Box from '@material-ui/core/Box';
import 'date-fns';
import {MuiPickersUtilsProvider,KeyboardDatePicker,} from '@material-ui/pickers';
import OptionsContext from '../../pages/optionChain';







const useStyles = makeStyles((theme) => ({
  root: {
    width: '100%',
    margin:'10px',
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    fontWeight: theme.typography.fontWeightRegular,
  },
  formControl: {
    margin: theme.spacing(1),
    minWidth: 150,
  },
}));









const useStylesGrid = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  paper: {
    padding: theme.spacing(2),
    textAlign: 'center',
    color: theme.palette.text.secondary,
  },
}));





export default function CenteredGrid(props) {
  const classes = useStylesGrid();
  var count=1
  var initialState=true;

  var [state, setstate] = useState(initialState)
  const [date, setdate] = useState("")
  const [experies, setexperies] = useState([]);
  const [times, settimes] = useState([])

  const [selectedTime, setselectedTime] = useState("")

  const [selectedExpiry, setselectedExpiry] = useState("");
 

  const fullTableFunction=(tableMode)=>{

    setstate(tableMode)
    props.selectedValues(date,selectedTime,selectedExpiry,tableMode)


  }
  


  const handleDateSelected=(selectedDate)=>{

    setdate(selectedDate)

    axios.post("http://127.0.0.1:5000/getDropdownValues",{"date":selectedDate,"type":"options"}).then(
       
        (res)=>{
         
          console.log(res.data)
          // console.log(selectedDate)
          // props.getDateAndExpiry(selectedDate,res.data.experies)
          setexperies(res.data.experies)
          settimes(res.data.times)
          
        }).catch(
          err =>console.log(err))
  

   }


   const handleSelectedTime=(time)=>{

       if(selectedTime==""){
        setselectedTime(time)
       }
       else{
        setselectedTime(time)
        props.selectedValues(date,time,selectedExpiry,state)
       }


  }




  const handleSelectedExpiry=(expiry)=>{

       setselectedExpiry(expiry)

       props.selectedValues(date,selectedTime,expiry,state)

      }

    
  

 



  return (
    <div className={classes.root}>
   <ExpansionPanel id={styleSheet.panelBackground} expanded={false} >
        <ExpansionPanelSummary
          aria-controls="panel1a-content"
          id="panel1a-header"
          
        >
      <Grid container spacing={2} >
        <Grid item xs={2} >
          <Paper className={classes.paper} id={styleSheet.container}>Date</Paper>
          <Paper className={classes.paper} >    
           <MaterialUIPickers  handleDate={handleDateSelected}></MaterialUIPickers>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} id={styleSheet.container}>Time</Paper>
          <Paper className={classes.paper} id={styleSheet.panelheader}>
          <ControlledOpenSelect id={styleSheet.experyHeader} liveExperies={props.experies} mode={props.type} handleTime={handleSelectedTime}  type={"time"} timeDropdown={times}></ControlledOpenSelect>
          
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} id={styleSheet.container}>Experies</Paper>
          <Paper className={classes.paper} id={styleSheet.panelheader}>
           
          <ControlledOpenSelect id={styleSheet.experyHeader} liveExperies={props.experies} mode={props.type} handleExpiry={handleSelectedExpiry}  expiryDropdown={experies}   type={"expiry"}></ControlledOpenSelect>
          </Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} id={styleSheet.container}>Nifty</Paper>
           <Paper className={classes.paper} id={styleSheet.nifty}>{props.nifty}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} id={styleSheet.container}>Last Sync</Paper>
          
            <Paper className={classes.paper} id={styleSheet.time}>{props.lastSync}</Paper>
        </Grid>
        <Grid item xs={2}>
          <Paper className={classes.paper} id={styleSheet.container}>Data Mode</Paper>
         <Paper className={classes.paper} id={styleSheet.nifty}>
           <center><Switch fullTableFunction={fullTableFunction}></Switch></center>
           </Paper>
        </Grid>
      </Grid>
      </ExpansionPanelSummary>
        
     </ExpansionPanel>
    </div>
  );
}



function ControlledOpenSelect(props) {

  const classes = useStyles();

  const [selectedTime, setselectedTime] = useState("");
  const [selectedExpiry, setselectedExpiry] = useState("");

  const [open, setOpen] = React.useState(false);

  const [expirydropdownValues, setexpirydropdownValues] = useState([])

  const [timedropdownValues, settimedropdownValues] = useState([]);




//sets dropdown values
  useEffect(() => {

       if(props.type=="expiry"){
    
    
        setexpirydropdownValues(props.expiryDropdown)
       }
    
       else{
  
       
        settimedropdownValues(props.timeDropdown)
       }

  
  }, [props])






  const handleChange = (event) => {



    if(props.type=="expiry"){
      
      setselectedExpiry(event.target.value)
     
      props.handleExpiry(event.target.value)
     }
    //  else if(props.liveExperies){
    //   setliveSelectedExpiry(event.target.value)
    //  }
     else{
      setselectedTime(event.target.value)
      props.handleTime(event.target.value)
      
     }
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleOpen = () => {
    setOpen(true);
  };




    if(props.type=="expiry"){

      return (
        <div>
         
          <FormControl  className={classes.formControl}  >
           
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={selectedExpiry}
              onChange={handleChange}
              
            >
             
             
      { expirydropdownValues.length ? expirydropdownValues.map((ele,index) => <MenuItem  key={index} value={ele}>{ele}</MenuItem>) :  <MenuItem  key={"None"} value={"None"}>{"None"}</MenuItem> }
            </Select>
          </FormControl>
        </div>
      );

    }

    else{

      return (
        <div>
         
          <FormControl  className={classes.formControl}  >
           
            <Select
              labelId="demo-controlled-open-select-label"
              id="demo-controlled-open-select"
              open={open}
              onClose={handleClose}
              onOpen={handleOpen}
              value={selectedTime}
              onChange={handleChange}
              
            >
             
             
      { timedropdownValues.length ? timedropdownValues.map((ele,index) => <MenuItem  key={index} value={ele}>{ele}</MenuItem>) :  <MenuItem  key={"None"} value={"None"}>No Data</MenuItem> }
            </Select>
          </FormControl>
        </div>
      );


    }

    

  


  
}












function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));

  var formatedDate;



  const handleDateChange =(date) => {

    formatedDate = moment(date).format('YYYY-MM-DD')
    
    setSelectedDate(formatedDate); 
    // console.log(selectedDate)
    props.handleDate(formatedDate)


    

  };


  

  
   



  return (
    <Box mt={2}>
    <MuiPickersUtilsProvider utils={DateFnsUtils} >

        <KeyboardDatePicker
         
          id="date-picker-dialog"
          // minDate={Date('2020-04-05T21:11:54')}
          format="yyyy-MM-dd"
          value={selectedDate}
          name="date"
          onChange={handleDateChange}
          KeyboardButtonProps={{
            'aria-label': 'change date',
          }}
        />

    </MuiPickersUtilsProvider>
    </Box>
  );
}
