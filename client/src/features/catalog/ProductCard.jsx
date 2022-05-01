import Card from '@mui/material/Card';
import CardActions from '@mui/material/CardActions';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import { Avatar, CardHeader } from '@mui/material';
import { Link } from 'react-router-dom';
import { LoadingButton } from '@mui/lab';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { addCartItemAsync } from '../cart/cartSlice';


interface Props {

    product: Product;
}

export const   ProductCard =  ({product}: Props) =>   {

  const {status} = useAppSelector(state => state.cart)

  const dispatch = useAppDispatch()


  return (
 
        <Card>

          <CardHeader 
          
          avatar={

            <Avatar sx={{bgcolor: '#11cb5f'}}>
              {product.name.charAt(0).toUpperCase()}
            </Avatar>
          }

          title={product.name}
          titleTypographyProps={{

            sx: {fontWeight: 'bold'}
          }}
          
          />
          <CardMedia
           
            sx={{height: 140, backgroundSize: 'contain', bgcolor: '#cfd8dc'}}
            image={product.pictureUrl}
            title={product.name}
          />
          <CardContent>
            <Typography gutterBottom color='secondary' variant="h5">
              ${(product.price / 100).toFixed(2)}
            </Typography>
            <Typography variant="body2" color="text.secondary">
              {product.brand} / {product.type}
            </Typography>
          </CardContent>
          <CardActions>
            <LoadingButton loading={status.includes('pendingAddItem' + product.id)} onClick={() => dispatch(addCartItemAsync({productId: product.id}))} size="small">Add to cart</LoadingButton>
            <Button component={Link} to={`/catalog/${product.id}`} size="small">View</Button>
          </CardActions>
        </Card>
    
    



  )
}
