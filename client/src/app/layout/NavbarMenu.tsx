import { Button, Menu, Fade, MenuItem } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";
import { signOut } from "../../features/auth/authSlice";
import { clearCart } from "../../features/cart/cartSlice";
import { useAppDispatch, useAppSelector } from "../store/configureStore";

function NavbarMenu() {

    const dispatch = useAppDispatch()
    const {user} = useAppSelector(state => state.auth)
 
    const [anchorEl, setAnchorEl] = React.useState(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: any) => {
      setAnchorEl(event.currentTarget);
    };
    const handleClose = () => {
      setAnchorEl(null);
    };
  
    return (
      <>
        <Button
        color='inherit'
        sx={{typography: 'h6'}}
         onClick={handleClick} >
         {user?.email}
        </Button>
        <Menu
         
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          TransitionComponent={Fade}
        >
          <MenuItem onClick={handleClose}>Profile</MenuItem>
          <MenuItem component={Link} to='/orders'>My orders</MenuItem>
          <MenuItem onClick={() => {
            dispatch(signOut())
            dispatch(clearCart())
            }}>Logout</MenuItem>
        </Menu>
      </>
    );
}

export default NavbarMenu