
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import React,{useEffect,useState} from 'react';


export default function SwitchLabels(props) {
    const [state, setState] = React.useState({
      checked: true,
      
    });
  
    const handleChange = (event) => {
      setState({ ...state, [event.target.name]: event.target.checked });
     

    };


    useEffect(() => {
      props.disableFunction(!state.checked)
      
    }, [state.checked]);
  
    return (
     
        <FormControlLabel
          control={<Switch checked={state.checked} onChange={handleChange} name="checked"  />}
          label="LIVE"
        />
    );
  }
  