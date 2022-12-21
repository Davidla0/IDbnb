import * as React from 'react';
import Paper from '@mui/material/Paper';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TablePagination from '@mui/material/TablePagination';
import TableRow from '@mui/material/TableRow';
import { useState } from "react"
import { useEffect } from "react"
import { orderService } from "../services/order.service"
import { userService } from "../services/user.service"
import { useDispatch, useSelector } from 'react-redux';
import { getOrders, saveOrder } from '../store/order.actions';


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
    {
        id: 'status',
        label: 'status',
        minWidth: 100
    }

];

function createData(stayName, startDate, endDate, total, status, id) {

    return { stayName, startDate, endDate, total, status, id };
}




export function TableOrders() {
    const [page, setPage] = React.useState(0);
    const [rowsPerPage, setRowsPerPage] = React.useState(10);
    // const [orders, setOrders] = useState([])
    const [rows, setRows] = useState([])

    const { orders } = useSelector(state => state.orderModule)

    const dispatch = useDispatch()

    useEffect(() => {
        if (!orders) { loadOrders() }
        else {
            setRows(orders.map(order => createData(order.stay.name, order.startDate, order.endDate, order.total, order.status, order._id)))
        }
    }, [orders])

    function loadOrders() {
        // const orders = await orderService.query()
        dispatch(getOrders())

        // console.log(orders)
        // setOrders(orders)
        // setRows(orders.map(order => createData(order.stay.name, order.startDate, order.endDate, order.total, order.status, order._id)))

    }


    const handleChangePage = (event, newPage) => {
        setPage(newPage);
    };

    const handleChangeRowsPerPage = (event) => {
        setRowsPerPage(+event.target.value);
        setPage(0);
    };

    const checkStatus = (value) => {
        let color
        switch (value) {
            case 'pending':
                color = 'orange'
                break;
            case 'confirmed':
                color = 'green'
                break;
            case 'rejected':
                color = 'red';
                break;
            default:
                color = 'black';
                break;
        }
        return color
    }

    const handleChange = async (ev, id) => {
        const value = ev.target.value
        let order = await orderService.getById(id)
        order.status = value
        // order = await orderService.save(order)
        // const newOrders = orders.filter(ord => ord._id !== order._id)
        // setOrders([...newOrders, order])

        dispatch(saveOrder(order))


    }

    if (!rows) return <h1>Loading ..</h1>
    return (
        <Paper sx={{ width: '100%', overflow: 'hidden', margin: 0 }}>
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
                                    <TableRow hover role="checkbox" tabIndex={-1} key={row.id}>
                                        {columns.map((column) => {
                                            const value = row[column.id];
                                            return <React.Fragment>
                                                {column.id === 'status' ?
                                                    <TableCell key={column.id} align={column.align} style={{ color: checkStatus(value) }}>
                                                        {window.location.href.includes('my-orders') ?
                                                            <p>{row.status}</p>
                                                            :

                                                            <select name="status" id="status" value={row.status} onChange={(event) => handleChange(event, row.id)}>
                                                                <option value="pending">pending</option>
                                                                <option value="confirmed">confirmed</option>
                                                                <option value="rejected">rejected</option>

                                                            </select>
                                                        }

                                                    </TableCell>
                                                    :

                                                    <TableCell key={column.id} align={column.align}>
                                                        {column.format && typeof value === 'number'
                                                            ? column.format(value)
                                                            : value}
                                                    </TableCell>
                                                }

                                            </React.Fragment>

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