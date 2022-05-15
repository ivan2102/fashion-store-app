import { useEffect } from "react"
import { productSelectors, fetchProductsAsync, fetchFilters } from "../../features/catalog/catalogSlice"
import { useAppDispatch, useAppSelector } from "../store/configureStore"


function useProducts() {

    const dispatch = useAppDispatch()

 const products = useAppSelector(productSelectors.selectAll)
 const {productsLoaded,  filtersLoaded, brands, types,  metaData} = useAppSelector(state => state.catalog)

  useEffect(() => {

   if(!productsLoaded) dispatch(fetchProductsAsync())
   

  }, [productsLoaded, dispatch])

  useEffect(() => {

    if(!filtersLoaded) dispatch(fetchFilters())
  }, [dispatch, filtersLoaded])

  return {

    products,
    productsLoaded,
    filtersLoaded,
    brands,
    types,
    metaData
  }
}

export default useProducts