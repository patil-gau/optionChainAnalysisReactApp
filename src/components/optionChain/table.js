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
import ExperiesContext from '../../pages/optionChain'; 



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
    <TableContainer component={Paper} id={styleSheet.tableContainer} > 
      <Table className={classes.table} stickyHeader aria-label="sticky table" size="small" id={styleSheet.table}  >
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
            <TableCell id={styleSheet.tableheader} align="center"  size="small" >OI</TableCell >
            <TableCell align="center" id={styleSheet.tableheader} size="small">ChangeInOI</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">totalTradedVolume</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">impliedVolatility</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">ltp</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">change</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">pChange</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">strikePrice</TableCell> 
            <TableCell align="center" id={styleSheet.tableheader} size="small">change</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">pChange</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">ltp</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">impliedVolatility</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">totalTradedVolume</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">ChangeInOI</TableCell>
            <TableCell align="center" id={styleSheet.tableheader} size="small">OI</TableCell>
          </TableRow>
        </TableHead>
        <TableBody id={styleSheet.tableBody}>
          { props.values.length >0 ? props.values.map((row,index) => (
            
            <TableRow key={index}>
            <TableCell id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE.openInterest}</TableCell>
            <TableCell id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE.changeinOpenInterest}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.CE.totalTradedVolume}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE.impliedVolatility}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE.lastPrice}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true}>{row.CE.change}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center" size="small" hover={true} >{row.CE.pChange}</TableCell>
           <TableCell   id={styleSheet.tableBodyCell} align="center" id={styleSheet.strikePrice}size="small" >{row.CE.strikePrice}</TableCell>
            <TableCell id={styleSheet.tableBodyCell}  align="center" size="small" hover={true}>{row.CE.change}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.CE.Pchange}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.CE.lastPrice}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.CE.impliedVolatility}</TableCell>
            <TableCell  id={styleSheet.tableBodyCell} align="center"size="small" hover={true}>{row.CE.totalTradedVolume}</TableCell>
            <TableCell id={styleSheet.tableBodyCell}  align="center"size="small" hover={true}>{row.CE.changeinOpenInterest}</TableCell>
            <TableCell id={styleSheet.tableBodyCell}  align="center"size="small" hover={true}>{row.CE.openInterest}</TableCell>
          
           
            </TableRow>
          )): ""}


        </TableBody>
      </Table>
    </TableContainer>
  );
}
