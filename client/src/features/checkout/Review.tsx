import * as React from 'react';
import Typography from '@mui/material/Typography';
import { Grid } from '@mui/material';
import CartTable from '../cart/CartTable';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppSelector } from '../../app/store/configureStore';
import { purple } from '@mui/material/colors';

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

export default function Review() {

const {cart} = useAppSelector(state => state.cart)

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Order summary
      </Typography>

      
    <>
   {cart && 
   <CartTable items={cart.items} isCart={false} /> }

<ThemeProvider theme={theme}>
   <Grid container>
     <Grid item xs={9} />
       <Grid item xs={3}>
 
      </Grid>
   </Grid>
   </ThemeProvider>
   </>
     
    </React.Fragment>
  );
}