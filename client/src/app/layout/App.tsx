import { useState, useEffect, useCallback } from 'react';
import Catalog from '../../features/catalog/Catalog';
import { Container, createTheme, CssBaseline, ThemeProvider } from '@mui/material';
import Header from './Header';
import { Route } from 'react-router-dom';
import HomePage from '../../features/home/HomePage';
import ProductDetails from '../../features/catalog/ProductDetails';
import AboutPage from '../../features/about/AboutPage';
import ContactPage from '../../features/contact/ContactPage';
import CartPage from '../../features/cart/CartPage';
import { ToastContainer } from 'react-toastify';
import ServerError from '../errors/ServerError';
import NotFound from '../errors/NotFound';
import { Switch } from 'react-router-dom';
import 'react-toastify/dist/ReactToastify.css';
import Loading from './Loading';
import {  fetchCartAsync } from '../../features/cart/cartSlice';
import { useAppDispatch } from '../store/configureStore';
import Login from '../../features/auth/Login';
import Register from '../../features/auth/Register';
import { fetchCurrentUser } from '../../features/auth/authSlice';
import PrivateRoute from './PrivateRoute';
import Orders from '../../features/orders/Orders';
import CheckoutWrapper from '../../features/checkout/CheckoutWrapper';




function App() {

  const dispatch = useAppDispatch()
  const [loading, setLoading] = useState(true)

 const initApp =  useCallback(async () => {

    try {

      await dispatch(fetchCurrentUser())
      await dispatch(fetchCartAsync())

    } catch (error) {

      console.log(error);
      
      
    }
  }, [dispatch])


  useEffect(() => {

   initApp().then(() => setLoading(false))
  }, [initApp])

  const [darkMode, setDarkMode] = useState(false);

  const palleteType = darkMode ? 'dark': 'light'

const theme = createTheme({

  palette: {

    mode: palleteType,

    background: {

      default: palleteType === 'light' ? '#eceff1' : '#121212'
    }
  }
})

function handleThemeChange () {

setDarkMode(!darkMode)
}

if(loading) return <Loading message='Initializing app...'/>
  
  return (
    <>
    <ThemeProvider theme={theme}>
    <ToastContainer hideProgressBar position='bottom-right' theme='colored'/>  
    <CssBaseline />
   <Header darkMode={darkMode} handleThemeChange={handleThemeChange}/>
   <Route exact path='/' component={HomePage} />
   <Route path={'/(.+)'} render={() => (

<Container sx={{mt: 4}}>

<Switch>


<Route exact path='/catalog' component={Catalog} />
<Route path='/catalog/:id' component={ProductDetails} />
<Route path='/about' component={AboutPage} />
<Route path='/contact' component={ContactPage} />
<Route path='/server-error' component={ ServerError } />
<Route path='/cart' component={CartPage} />
<PrivateRoute path='/checkout' component={CheckoutWrapper} />
<PrivateRoute path='/orders' component={Orders} />
<Route path='/login' component={ Login } />
<Route path='/register' component={ Register } />
<Route component={ NotFound } />

</Switch>

</Container>
   )}/>
  

   </ThemeProvider>
    </>
  );
}

export default App;
