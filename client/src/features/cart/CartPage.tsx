import { Box, Button, Grid, IconButton, Paper, Table, TableBody, TableContainer, TableHead, TableRow, Typography } from '@mui/material';
import TableCell, { tableCellClasses } from '@mui/material/TableCell';
import { styled } from '@mui/material/styles';
import { Add, Delete, Remove } from '@mui/icons-material';
import {Link} from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { currencyFormat } from '../../app/util/util';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { removeCartItemAsync, addCartItemAsync } from './cartSlice';
import CartTable from './CartTable';


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

function CartPage() {

//const dispatch = useAppDispatch()

const {cart} = useAppSelector(state => state.cart)




// const subtotal = cart?.items.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;
//     const tax = Number((0.15 * subtotal).toFixed(2))


  if(!cart) return <Typography variant='h3'>Your cart is empty</Typography>

  return (

    <>
   
    <CartTable items={cart.items} />

<ThemeProvider theme={theme}>
    <Grid container>
      <Grid item xs={9} />
        <Grid item xs={3}>
     <Button 
     component={Link} 
     to='/checkout'
     variant='contained'
     size='large'
     fullWidth
     >
       Checkout
       </Button>
       </Grid>
    </Grid>
    </ThemeProvider>
    </>
  )
}

export default CartPage;