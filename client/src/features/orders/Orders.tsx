import { styled } from '@mui/material/styles';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';
import { useEffect, useState } from 'react';
import fetch from '../../app/api/fetch';
import Loading from '../../app/layout/Loading';
import { Button } from '@mui/material';
import { Order } from '../../app/models/order';
import { currencyFormat } from '../../app/util/util';
import OrdersDetail from '../orders/OrdersDetail'

const StyledTableCell = styled(TableCell)(({ theme }) => ({
  [`&.${tableCellClasses.head}`]: {
    backgroundColor: theme.palette.common.black,
    color: theme.palette.common.white,
  },
  [`&.${tableCellClasses.body}`]: {
    fontSize: 14,
  },
}));

const StyledTableRow = styled(TableRow)(({ theme }) => ({
  '&:nth-of-type(odd)': {
    backgroundColor: theme.palette.action.hover,
  },
  // hide last border
  '&:last-child td, &:last-child th': {
    border: 0,
  },
}));


function Orders() {

  const [orders, setOrders] = useState<Order[] | null>(null);
  const [loading, setLoading] = useState(true)
  const [selectedOrderNumber, setSelectedOrderNumber] = useState(0)

  useEffect(() => {

    fetch.Orders.list()
    .then(orders => setOrders(orders))
    .catch(error => console.log(error))
    .finally(() => setLoading(false))
  }, [])

  if(loading) return <Loading message='Loading orders...'/>

  if(selectedOrderNumber > 0) return (

    <OrdersDetail order={orders?.find(order => order.id === selectedOrderNumber)!}
    setSelectedOrder={setSelectedOrderNumber}
    />
  )

  return (
    
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="customized table">
        <TableHead>
          <TableRow>
            <StyledTableCell>Order number</StyledTableCell>
            <StyledTableCell align="right">Order Date</StyledTableCell>
            <StyledTableCell align="right">Order Status</StyledTableCell>
            <StyledTableCell align="right">Total</StyledTableCell>
            <StyledTableCell align="right"></StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {orders?.map((order) => (
            <StyledTableRow key={order.id}>
              <StyledTableCell component="th" scope="row">
                {order.id}
              </StyledTableCell>
              <StyledTableCell align="right">{order.orderDate.split('T')[0]}</StyledTableCell>
              <StyledTableCell align="right">{order.orderStatus}</StyledTableCell>
              <StyledTableCell align="right">{currencyFormat(order.total)}</StyledTableCell>
              <StyledTableCell align="right">
                  <Button onClick={() => setSelectedOrderNumber(order.id)}>View</Button>
              </StyledTableCell>
            </StyledTableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  )
}

export default Orders