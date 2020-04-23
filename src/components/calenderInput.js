import 'date-fns';
import React,{useEffect} from 'react';
import Grid from '@material-ui/core/Grid';
import DateFnsUtils from '@date-io/date-fns';
import moment from 'moment';
import axios from 'axios';
import Box from '@material-ui/core/Box';


import {
  MuiPickersUtilsProvider,
  KeyboardDatePicker,
} from '@material-ui/pickers';




export default function MaterialUIPickers(props) {
  // The first commit of Material-UI
  const [selectedDate, setSelectedDate] = React.useState(moment(new Date()).format('YYYY-MM-DD'));
  var formatedDate;



  const handleDateChange =(date) => {

    formatedDate = moment(date).format('YYYY-MM-DD')
    
    console.log("setting formated date")
    setSelectedDate(formatedDate); 
    console.log(selectedDate)

  };

  useEffect(() => {
    console.log("useEffect")
     axios.post("http://127.0.0.1:5000/getDropdownValues",{"date":selectedDate,"type":"graph"}).then(
       
        (res)=>{
         
          console.log(res.data.experies)
          console.log(selectedDate)
          props.getDateAndExpiry(selectedDate,res.data.experies)
          
        }).catch(
          err =>console.log(err))
  },[selectedDate])



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
