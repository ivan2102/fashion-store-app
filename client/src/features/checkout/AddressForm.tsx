import * as React from 'react';
import Grid from '@mui/material/Grid';
import Typography from '@mui/material/Typography';
import { useFormContext } from 'react-hook-form';
import TextInputComponent from '../../app/components/TextInputComponent';
import CheckoutComponent from '../../app/components/CheckoutComponent';


export default function AddressForm() {

   const { control, formState } = useFormContext();

  return (
    <React.Fragment>
      <Typography variant="h6" gutterBottom>
        Shipping address
      </Typography>
      
      <Grid container spacing={3}>
        <Grid item xs={12} sm={12}>
          
           <TextInputComponent control={control} label='Full name' name='fullName' />
        
        </Grid>
        <Grid item xs={12}>
         <TextInputComponent control={control} label='Address1' name='Address1'/>
        </Grid>
        <Grid item xs={12}>
        <TextInputComponent control={control} label='Address2' name='Address2'/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextInputComponent control={control} label='City' name='City'/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextInputComponent control={control} label='State' name='State'/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextInputComponent control={control} label='Zipcode' name='ZipCode'/>
        </Grid>
        <Grid item xs={12} sm={6}>
        <TextInputComponent control={control} label='Country' name='Country'/>
        </Grid>
    
        <Grid item xs={12}>
         <CheckoutComponent control={control} disabled={!formState.isDirty} name='saveAddress' label='Save this as default address'/>
        </Grid>
      </Grid>

  
    </React.Fragment>
  );
}