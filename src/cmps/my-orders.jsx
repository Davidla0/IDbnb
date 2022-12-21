import { useState, useEffect } from "react"
import {useDispatch, useSelector} from "react-redux"

import { orderService } from "../services/order.service"
import { userService } from '../services/user.service';

import {getOrders} from "../store/order.actions"

import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';



const columns = [
  { id: 'stayName', label: 'stay-name', minWidth: 170 },
  { id: 'startDate', label: 'arrive-at', minWidth: 100 },
  { id: 'endDate', label: 'leave-at', minWidth: 100 },
  {
    id: 'total',
    label: 'Total',
    minWidth: 170,
    align: 'right',
    format: (value) => value.toLocaleString('en-US'),
  },
  { id: 'status', label: 'status', minWidth: 170 },
];

function createData(stayName, startDate, endDate, total, status) {
  
  return { stayName, startDate, endDate, total, status };
}

  


export  function MyOrders() {
  const [page, setPage] = useState(0);
  const [rowsPerPage, setRowsPerPage] = useState(10);

  const [orders, setOrders] = useState([])

  let rows = orders.map(order => createData(order.stay.name, order.startDate, order.endDate, order.total ,order.status))

  const dispatch = useDispatch()

  useEffect(() => {
      loadOrders()
  }, [])

  const loadOrders = async () => {
    const ordersToSHow = await dispatch(getOrders())
    //should go to back
    // console.log('ordersToSHow:',ordersToSHow[0].buyer._id )
    // const currUserId = userService.getLoggedinUser()._id
    // ordersToSHow = ordersToSHow.filter(order => order.buyer._id === currUserId)

    setOrders(ordersToSHow)
  }


  const handleChangePage = (event, newPage) => {
    setPage(newPage);
  };

  const handleChangeRowsPerPage = (event) => {
    setRowsPerPage(+event.target.value);
    setPage(0);
  };

  if(!rows || !orders) return <h1>Loading ..</h1>
  return (
    <Paper sx={{ width: '100%', overflow: 'hidden' }}>
      <TableContainer sx={{ maxHeight: 440 }}>
        <Table stickyHeader aria-label="sticky table">
          <TableHead>
            <TableRow>
              {columns.map((column) => (
                <TableCell
                  key={column.id}
                  align={column.align}
                  style={{ minWidth: column.minWidth }}
                >
                  {column.label}
                </TableCell>
              ))}
            </TableRow>
          </TableHead>
          <TableBody>
            {rows
              .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
              .map((row) => {
                return (
                  <TableRow hover role="checkbox" tabIndex={-1} key={row.code}>
                    {columns.map((column) => {
                      const value = row[column.id];
                      return (
                        <TableCell key={column.id} align={column.align}>
                          {column.format && typeof value === 'number'
                            ? column.format(value)
                            : value}
                        </TableCell>
                      );
                    })}
                  </TableRow>
                );
              })}
          </TableBody>
        </Table>
      </TableContainer>
      <TablePagination
        rowsPerPageOptions={[10, 25, 100]}
        component="div"
        count={rows.length}
        rowsPerPage={rowsPerPage}
        page={page}
        onPageChange={handleChangePage}
        onRowsPerPageChange={handleChangeRowsPerPage}
      />
    </Paper>
  );
}



// export const MyOrders = () => {

  
//     if (!orders) return <h1>Loading ..</h1>
//     return <div>
//         <div>
//             <table>

//                 <thead>
//                     <tr>
//                         <th>Stay name</th>
//                         <th>Arrive at</th>
//                         <th>Leave at</th>
//                         <th>Total</th>
//                     </tr>
//                 </thead>

//                 <tbody>
//                     {orders.map(order =>
//                         <tr key={order._id}>
//                             <td>{order.stay.name}</td>
//                             <td>{order.startDate}</td>
//                             <td>{order.endDate}</td>
//                             <td>${order.total}</td>
//                         </tr>
//                     )}
//                 </tbody>
//             </table>

//         </div>
//     </div>
// }