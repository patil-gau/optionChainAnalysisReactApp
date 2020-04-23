import React from 'react';
import AppBar from './components/navbar/navbar.js';
// import 'bootstrap/dist/css/bootstrap.min.css';
import CssBaseline from '@material-ui/core/CssBaseline';
import Appbar from './components/navbar/navbarui.js';


function App() {
  return (
    <div >
       <React.Fragment>
        <CssBaseline />
        <Appbar />
      </React.Fragment>
    </div>
  );
}

export default App;
