import  {useState} from 'react';
import {Alert,List, ListItem, ListItemText, AlertTitle, Button, ButtonGroup, Container, Typography } from '@mui/material';
import fetch from '../../app/api/fetch';


const AboutPage = () => {

  const [validationErrors, setValidationErrors] = useState<string[]>([])

  function getValidationError() {

    fetch.testErrors.getValidationError()
    .then(() => console.log('should not see this'))
    .catch(error => setValidationErrors(error));
  }

  return (
    <Container>
        <Typography gutterBottom variant='h2'>Errors for testing purposes</Typography>

        <ButtonGroup fullWidth>
          <Button variant='contained' onClick={() => fetch.testErrors.get400Error().catch(error => console.log(error))}>Test 400 Error</Button>
          <Button variant='contained' onClick={() => fetch.testErrors.get401Error().catch(error => console.log(error))}>Test 401 Error</Button>
          <Button variant='contained' onClick={() => fetch.testErrors.get404Error().catch(error => console.log(error))}>Test 404 Error</Button>
          <Button variant='contained' onClick={() => fetch.testErrors.get500Error().catch(error => console.log(error))}>Test 500 Error</Button>
          <Button variant='contained' onClick={getValidationError}>Test Validation Error</Button>
        </ButtonGroup>

        {validationErrors.length > 0 && 
        
        <Alert severity='error'>
          <AlertTitle>Validation Errors</AlertTitle>

          <List>
            {validationErrors.map(error => (

              <ListItem key={error}>
                <ListItemText>{error}</ListItemText>
              </ListItem>
            ))}
          </List>
          </Alert>}
    </Container>
  )
}

export default AboutPage;