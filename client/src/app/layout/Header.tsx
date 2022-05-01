import { AppBar, Badge, Box, IconButton, List, ListItem, Switch, Toolbar, Typography } from '@mui/material';
import { createTheme, ThemeProvider } from '@mui/material/styles';
import { NavLink, Link } from 'react-router-dom';
import { ShoppingCart } from '@mui/icons-material';
import { useAppSelector } from '../store/configureStore';
import NavbarMenu from './NavbarMenu';


interface Props {

    darkMode: boolean;
    handleThemeChange: () => void

}

const links = [

    {title: 'catalog', path: '/catalog'},
    {title: 'about', path: '/about'},
    {title: 'contact', path: '/contact'}
]

const rightLinks = [

    {title: 'login', path: '/login'},
    {title: 'register', path: '/register'},
    
]


const navStyles = {

  color: 'inherit',
  typography: 'h6',
  textDecoration: 'none',
  '&:hover': {

   color: '#c5cae9'
  },

  '&.active': {

   color: '#18ffff'
  }
}

const theme = createTheme({
    palette: {
      primary: {
        // Purple and green play nicely together.
        main: '#455a64',
      },
      secondary: {
        // This is green.A700 as hex.
        main: '#11cb5f',
      },
    },
  });

function Header({darkMode, handleThemeChange}: Props) {

  const {user} = useAppSelector(state => state.auth)

  const {cart} = useAppSelector(state => state.cart)

  const itemCount = cart?.items.reduce((sum, item) => sum + item.quantity, 0)
  

  return (
      <ThemeProvider theme={theme}>
    <AppBar position='static'>

     <Toolbar sx={{display: 'flex', justifyContent: 'space-between', alignItems: 'center'}}>

       <Box display='flex' alignItems='center'>
       <Typography exact variant='h6' component={NavLink} to='/' sx={navStyles}>
          WEB STORE
          </Typography>   

          <Switch checked={darkMode} onChange={handleThemeChange}/>
       </Box>

    

          <List sx={{display: 'flex'}}>
              {links.map(({title, path}) => (

                  <ListItem 
                  component={NavLink}
                   to={path}
                    key={path}
                    sx={navStyles}
                    >
                     {title.toUpperCase()} 
                  </ListItem>
              ))}
          </List>

         <Box display='flex' alignItems='center'>
          <IconButton component={Link} to='/cart'  size='large' sx={{color: 'inherit'}}>
              <Badge badgeContent={itemCount} color='secondary'>
              <ShoppingCart />
            </Badge>
          </IconButton>

           {user ? (<NavbarMenu />) : (

        <List sx={{display: 'flex'}}>
        {rightLinks.map(({title, path}) => (

          <ListItem 
          component={NavLink}
          to={path}
          key={path}
          sx={navStyles}
          >
              {title.toUpperCase()}
              </ListItem> 
            ))}
            </List>
           )}

         

          </Box>

     </Toolbar>
    </AppBar>
    </ThemeProvider>
  )
}

export default Header;