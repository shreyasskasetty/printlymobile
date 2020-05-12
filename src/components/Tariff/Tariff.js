import React from 'react';
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import {withStyles} from  "@material-ui/core/styles"
import './styles.css'

class Tariff extends React.Component {

  render(){
    let id = 0;
    const StyledTableCell = withStyles((theme) => ({
        head: {
          backgroundColor: theme.palette.common.black,
          color: theme.palette.common.white,
        },
        body: {
          fontSize: 14,
        },
      }))(TableCell);
    const createData = (name,price,service) => {
      id += 1;
      return { id, name, price,service};
    };
    
     const rows=[
      createData(
        "Color",
        159,
        6.0,
        24,
      ),
      createData(
        "Hard Bind",
        237,
        9.0,
        37,
      ),
      createData(
        "Black and White",
        262,
        16.0,
        24,
      ),
      createData(
        "Soft Bind",
        305,
        3.7,
        67,
      ),
     
    ];
    
      return(
        <Paper className="container">
        <Table>
          <TableHead>
            <TableRow>
              <StyledTableCell>Print Type </StyledTableCell>
              <StyledTableCell >Price(Rs)</StyledTableCell>
              <StyledTableCell >Service Charge(Rs)</StyledTableCell>
              <StyledTableCell >Total(Rs)</StyledTableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {rows.map(({ id, name, price, service}) => (
              <TableRow key={id}>
                <TableCell component="th" scope="row">
                  {name}
                </TableCell>
                <TableCell >{price}</TableCell>
                <TableCell >{service}</TableCell>
                <TableCell >{price+service}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>
      )
       
  }
 
}
export default Tariff
