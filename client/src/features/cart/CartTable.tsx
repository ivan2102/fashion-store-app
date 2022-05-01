import { Remove, Add, Delete } from "@mui/icons-material"
import { LoadingButton } from "@mui/lab"
import { TableContainer, Paper, Table, TableHead, TableRow, TableBody, Box } from "@mui/material"
import { currencyFormat } from "../../app/util/util"
import { styled } from '@mui/material/styles';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { removeCartItemAsync, addCartItemAsync } from "./cartSlice"
import { purple } from "@mui/material/colors";
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore";
import { CartItem } from "../../app/models/cart";

interface Props {

    items: CartItem[]
    isCart?: boolean
}

const theme = createTheme({
    palette: {
      primary: {
        main: '#111',
      },
      secondary: {
        main: purple[500],
      },
    },
  });
  
  const StyledTableCell = styled(TableCell)(({ theme }) => ({
      [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black,
        color: theme.palette.common.white,
      },
      [`&.${tableCellClasses.body}`]: {
        fontSize: 14,
      },
    }));


function CartTable({items, isCart = true}: Props) {

const dispatch = useAppDispatch()

const { status} = useAppSelector(state => state.cart)

const subtotal = items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
    const tax = Number((0.15 * subtotal).toFixed(2))

  return (
   
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 700 }} aria-label="spanning table">
        <TableHead>
          {/* <TableRow>
            <TableCell align="right" colSpan={3}>
              Product
            </TableCell>
            <TableCell align="right">Price</TableCell>
          </TableRow> */}
          <TableRow>
            <StyledTableCell>Product</StyledTableCell>
            <StyledTableCell align="right">Price</StyledTableCell>
            <StyledTableCell align="center">Quantity</StyledTableCell>
            <StyledTableCell align="right">Subtotal</StyledTableCell>
            <StyledTableCell align="right">Delete</StyledTableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {items.map(item => (
            <TableRow key={item.productId}>
              <TableCell>
                  <Box display='flex' alignItems='center'>
                <img src={item.pictureUrl} alt={item.name} style={{height: 50, marginRight: 20}} />
                <span>{item.name}</span>
                  </Box>
              </TableCell>
              <TableCell align="right">${(item.price / 100).toFixed(2)}</TableCell>
              <TableCell align="center">
                 {isCart && 
                  <LoadingButton 
                  onClick={() => dispatch(removeCartItemAsync({productId: item.productId, quantity: 1, name: 'rem'}))} 
                  loading={status === 'pendingRemoveItem' + item.productId + 'rem'} 
                  color='error'
                  >
                      <Remove />
                  </LoadingButton> }
                  {item.quantity}
                  {isCart && 
                  <LoadingButton 
                  onClick={() => dispatch(addCartItemAsync({productId: item.productId}))} 
                  loading={status === 'pendingAddItem' + item.productId} 
                  color='success'
                  >
                  <Add />
                  </LoadingButton> }


                  </TableCell>
              <TableCell align="right">${((item.price / 100) * item.quantity).toFixed(2)}</TableCell>
              <TableCell align="right">
                  {isCart && 
                  <LoadingButton 
                  onClick={() => dispatch(removeCartItemAsync({productId: item.productId, quantity: item.quantity, name: 'del'}))}
                   loading={status === 'pendingRemoveItem' + item.productId + 'del'} 
                   color="error"
                   >
                     <Delete /> 
                  </LoadingButton> }
              </TableCell>
            </TableRow>
          ))}

          <TableRow>
            <TableCell rowSpan={3} />
            <TableCell colSpan={2}>Subtotal</TableCell>
            <TableCell align="right">{currencyFormat(subtotal)}</TableCell>
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Tax</TableCell>
            <TableCell align="right">{currencyFormat(tax)}</TableCell>
           
          </TableRow>
          <TableRow>
            <TableCell colSpan={2}>Total</TableCell>
            <TableCell align="right">{currencyFormat(subtotal + tax)}</TableCell>
          </TableRow>
        </TableBody>

        
      </Table>

  </TableContainer>
  )
}

export default CartTable