import ProductList from '../catalog/ProductList';
import {useEffect} from 'react';
import Loading from '../../app/layout/Loading';
import { useAppDispatch, useAppSelector } from '../../app/store/configureStore';
import { fetchFilters, productSelectors, setPageNumber, setProductParams } from './catalogSlice';
import {  Grid, Paper } from '@mui/material';
import ProductSearch from './ProductSearch';
import RadioButton from '../../app/components/RadioButton';
import CheckboxSidebar from '../../app/components/CheckboxSidebar';
import PaginationComponent from '../../app/components/PaginationComponent';
import useProducts from '../../app/hooks/useProducts';

const sortOptions = [

  {value: 'name', label: 'Alphabetical'},
  {value: 'priceDesc', label: 'Price - High to low'},
  {value: 'price', label: 'Price - Low to high'}
]


function Catalog() {

  const {products, brands, types, filtersLoaded,  metaData} = useProducts();

  const dispatch = useAppDispatch()

 const { productParams} = useAppSelector(state => state.catalog)

   if(!filtersLoaded) {

    return <Loading message='Loading products ...'/>
   }
  return (
     <Grid container columnSpacing={4}>
      
       <Grid item xs={3}>
      <Paper variant="outlined"  elevation={3}  sx={{mb: 2}}>
       <ProductSearch />
      </Paper>

      <Paper variant="outlined"  elevation={6} sx={{mb: 2, p: 2}}>
  
    <RadioButton  
    selectedValue={productParams.orderBy}
    options={sortOptions}
    onChange={(event) => dispatch(setProductParams({orderBy: event.target.value}))}
    />

    </Paper>


    <Paper variant="outlined" elevation={6} sx={{mb: 2, p: 2}}>
    <CheckboxSidebar 
    items={brands} 
    checked={productParams.brands} 
    onChange={(items: string[]) => dispatch(setProductParams({brands: items}))}
    />
    </Paper>

    <Paper variant="outlined" elevation={6} sx={{mb:2, p: 2}}>
    <CheckboxSidebar 
    items={types} 
    checked={productParams.types} 
    onChange={(items: string[]) => dispatch(setProductParams({types: items}))}
    />
    </Paper>


       </Grid>

       <Grid item xs={9}>
       <ProductList products={products}/>
       </Grid>
   
   
      <Grid item xs={3} />

      <Grid item xs={9} sx={{mb: 2}}>

        {metaData && 
      <PaginationComponent 
      metaData={metaData}
      onPageChange={(page: number) => dispatch(setPageNumber({pageNumber: page}))}
       />}
      </Grid>
   

    </Grid>
  )
}

export default Catalog