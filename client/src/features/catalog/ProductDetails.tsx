import { Divider, Grid, Typography, TableContainer, Table, TableBody, TableRow, TableCell, TextField } from "@mui/material"
import {useState, useEffect } from "react"
import { useParams } from "react-router-dom"
import NotFound from "../../app/errors/NotFound"
import Loading from "../../app/layout/Loading"
import { LoadingButton } from "@mui/lab"
import { brown, blueGrey } from '@mui/material/colors';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { useAppDispatch, useAppSelector } from "../../app/store/configureStore"
import { addCartItemAsync, removeCartItemAsync } from "../cart/cartSlice"
import { fetchSingleProductAsync, productSelectors } from "./catalogSlice"

const theme = createTheme({
  palette: {
    primary: {
      main: blueGrey[500],
    },

  }

  });
const ProductDetails = () => {

  const dispatch = useAppDispatch()

  const {cart, status} = useAppSelector(state => state.cart)

  const {id} = useParams<{id: string}>()

  const product = useAppSelector(state => productSelectors.selectById(state, id))

  const {status: productStatus} = useAppSelector(state => state.catalog)
 
  const [quantity, setQuantity] = useState(0)
 

  const item = cart?.items.find(item => item.productId === product?.id)

  useEffect(() => {

    if(item) setQuantity(item.quantity)

    if(!product) dispatch(fetchSingleProductAsync(parseInt(id)))
  }, [id, item, dispatch, product])

  //handle change input
  function handleChangeInput(event: any) {

    if(event.target.value >= 0) {
    
    setQuantity(parseInt(event.target.value))

    }
  }

  // update quantity or add item to cart
  function handleUpdateCart() {

    if(!item || quantity > item.quantity) {

      const updatedQuantity = item ? quantity - item.quantity : quantity

      dispatch(addCartItemAsync({productId: product?.id!, quantity: updatedQuantity}))
     
    }else {

      const updatedQuantity = item.quantity - quantity
      dispatch(removeCartItemAsync({productId: product?.id!, quantity: updatedQuantity}))
    }
  }

  if(productStatus.includes('pending')) {

    return <Loading message="Loading product ..." />

  }

    if(!product) {

      return <NotFound />
    }

   
  

  return (
  
    <Grid container spacing={6}>

      <Grid item xs={6}>
        <img src={product.pictureUrl} alt={product.name} style={{width: '100%'}} />
      </Grid>

      <Grid item xs={6}>
        <Typography variant='h3'>{product.name}</Typography>

        <Divider sx={{mb: 2}}/>

        <Typography variant='h4' color='secondary'>${(product.price / 100).toFixed(2)}</Typography>

        <TableContainer>

          <Table>
            <TableBody>

              <TableRow>
                <TableCell>Name</TableCell>
                <TableCell>{product.name}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Description</TableCell>
                <TableCell>{product.description}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Type</TableCell>
                <TableCell>{product.type}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Brand</TableCell>
                <TableCell>{product.brand}</TableCell>
              </TableRow>

              <TableRow>
                <TableCell>Quantity in stock</TableCell>
                <TableCell>{product.quantityInStock}</TableCell>
              </TableRow>
            </TableBody>
          </Table>

        </TableContainer>

        
        <Grid container spacing={2}>
          <Grid item xs={6}>
            <TextField 
            variant='outlined' 
            type='number'
             label='Quantity'
             fullWidth
             value={quantity}
             onChange={handleChangeInput}
             />
          </Grid>
       

        
  <ThemeProvider theme={theme} >
        <Grid item xs={6}>
          <LoadingButton 
          disabled={item?.quantity === quantity || !item && quantity === 0}
          sx={{height: '55px'}} 
          loading={status.includes('pending')}
           size='large'
           variant='contained'
           fullWidth
           onClick={handleUpdateCart}
           >
            {item ? 'Update Quantity' : 'Add to Cart'}
          </LoadingButton>
        </Grid>
        </ThemeProvider>
        </Grid>

      </Grid>

    </Grid>
  )
}

export default ProductDetails