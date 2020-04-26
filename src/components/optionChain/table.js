import React,{useContext} from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Table from '@material-ui/core/Table';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import styleSheet from './table.module.css';
import Grid from '@material-ui/core/Grid';



const useStyles = makeStyles({
  table: {
    minWidth: 700,
     

  },
  head: {
    position: "sticky",
    top: 0
  }
});





export default function SpanningTable(props) {
  const classes = useStyles();

  // const experiesContext=useContext(ExperiesContext)
  // console.log(experiesContext.experies)

  return (
    <Grid item xs={12}>
    <TableContainer component={Paper} id={styleSheet.tableContainer} > 
      <Table className={classes.table} fixedHeader={true} aria-label="sticky table" size="small" id={styleSheet.table}  >
        <TableHead >
          <TableRow>
            <TableCell align="center" colSpan="8" id={styleSheet.calls} size="small" classsName={classes.head}>
             Calls
            </TableCell>
            <TableCell align="center" colSpan="10" id={styleSheet.puts} size="small" classsName={classes.head}>
                Puts
            </TableCell>
          </TableRow>
          <TableRow  >
            <TableCell  id={styleSheet.tableheader} align="center"  size="small" >oi</TableCell >
            <TableCell  align="center" id={styleSheet.tableheader} size="small">chngInOI</TableCell>
            <TableCell  align="center" id={styleSheet.tableheader} size="small">ttv</TableCell>
            <TableCell  align="center" id={styleSheet.tableheader} size="small">iv</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">ltp</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">Chng</TableCell>
            <TableCell  align="center" id={styleSheet.tableheader} size="small">pChng</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">strikePrice</TableCell> 
            <TableCell align="center" id={styleSheet.tableheader} size="small">chng</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">pChng</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">ltp</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">iv</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">ttv</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">changInOI</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">oi</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id={styleSheet.tableBody}>
          { props.values.length >0 ? props.values.map((row,index) => (
  
            
            <TableRow key={index}>
            <TableCell id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE ? row.CE.openInterest?row.CE.openInterest:"-" : "no data"}</TableCell>
            <TableCell id={styleSheet.tableBodyCell}  align="center" size="small" hover={true}>{row.CE ? row.CE.changeinOpenInterest?row.CE.changeinOpenInterest:'-': "no data"}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.CE ?  row.CE.totalTradedVolume?row.CE.totalTradedVolume:"-": "no data"}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE ? row.CE.impliedVolatility?row.CE.impliedVolatility:"-": "no data"}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" id={styleSheet.ltp} hover={true}>{row.CE ? row.CE.lastPrice?row.CE.lastPrice:"-": "no data"}</TableCell>
            
            { row.CE ? row.CE.change>0 ? <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" id={styleSheet.changePositive} hover={true}>{row.CE ? row.CE.change ?row.CE.change:'-': "no data"}</TableCell>
              :
              <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" id={styleSheet.changeNegative} hover={true}>{row.CE ? row.CE.change ?row.CE.change:'-': "no data"}</TableCell>
            :  <TableCell  id={styleSheet.tableBodyCell} align="center" size="small"  hover={true}>{row.CE ? row.CE.change ?row.CE.change:'-': "no data"}</TableCell>
            }

            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true} >{row.CE ? row.CE.pChange?row.CE.pChange:'-': "no data"}</TableCell>
            <TableCell   id={styleSheet.tableBodyCell} align="center"  id={styleSheet.strikePrice} size="small" >{row.strikePrice}</TableCell>
            
            { row.PE ? row.PE.change>0 ?  <TableCell id={styleSheet.changePositive}  align="center" size="small" hover={true}>{row.PE ? row.PE.change ? row.PE.change:'-': "no data"}</TableCell>
            : 
           <TableCell  id={styleSheet.changeNegative} align="center" size="small" hover={true}>{row.PE ? row.PE.change ? row.PE.change:'-': "no data"}</TableCell>
            :  <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.PE ? row.PE.change ? row.PE.change:'-': "no data"}</TableCell>
          }

           <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.PE ? row.PE.pChange?row.PE.pChange:'-': "no data"}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" id={styleSheet.ltp} hover={true}>{row.PE ? row.PE.lastPrice?row.PE.lastPrice:'-': "no data"}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.PE ? row.PE.impliedVolatility?row.PE.impliedVolatility:'-': "no data"}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.PE ? row.PE.totalTradedVolume?row.PE.totalTradedVolume:'-': "no data"}</TableCell>
            <TableCell id={styleSheet.tableBodyCell}  align="center"size="small" hover={true}>{row.PE ? row.PE.changeinOpenInterest?row.PE.changeinOpenInterest:'-': "no data"}</TableCell>
            <TableCell id={styleSheet.tableBodyCell}  align="center"size="small" hover={true}>{row.PE ? row.PE.openInterest?row.PE.openInterest:'-': "no data"}</TableCell>
          
           
            </TableRow>
          
           
          )): ""}


        </TableBody>
      </Table>
    </TableContainer>
    </Grid>
  );
}
