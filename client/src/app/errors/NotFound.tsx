import { Container, Button, Paper, Divider, Typography } from "@mui/material"
import {Link } from 'react-router-dom';


function NotFound() {
  return (
    <Container component={Paper} sx={{height: 400}}>
        <Typography gutterBottom variant='h3'>Sorry, we couldn't find that page</Typography>
        <Divider />

        <Button fullWidth component={Link} to='/catalog'>Home Page</Button>
    </Container>
  )
}

export default NotFound