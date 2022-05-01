import { createTheme, ThemeProvider } from '@mui/material/styles';
import { purple } from '@mui/material/colors';
import { Order } from '../../app/models/order';
import { Box } from '@mui/system';
import { Button, Grid, TableCell, TableRow, Typography } from '@mui/material';
import CartTable from '../cart/CartTable';
import { CartItem } from '../../app/models/cart';
import { currencyFormat } from '../../app/util/util';


interface Props {

    order: Order;
    setSelectedOrder: (id: number) => void;
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

function OrdersDetail({order, setSelectedOrder}: Props) {

const subtotal = order.orderItems.reduce((sum, item) => sum + (item.quantity * item.price), 0) ?? 0;

  return (
    <>
    <ThemeProvider theme={theme}>
    <Box display='flex' justifyContent='space-between'>
      <Typography sx={{p: 2}} gutterBottom variant='h4'>Order# {order.id} - {order.orderStatus}</Typography>
      <Button onClick={() => setSelectedOrder(0)} sx={{m: 2}} size='large' variant='contained'>Back to orders</Button>
    </Box>

    <CartTable  items={order.orderItems as CartItem[]}  isCart={false}/>

    <Grid container>
        <Grid item xs={6} />
        <Grid item xs={6}>
      
        </Grid>
    </Grid>
    </ThemeProvider>
    </>
  )
}

export default OrdersDetail