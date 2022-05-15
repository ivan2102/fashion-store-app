import { createAsyncThunk, createEntityAdapter, createSlice } from "@reduxjs/toolkit";
import fetch from "../../app/api/fetch";
import { MetaData } from "../../app/models/pagination";
import { Product, ProductParams } from "../../app/models/product";
import { RootState } from "../../app/store/configureStore";

interface CatalogState {

    productsLoaded: boolean;
    filtersLoaded: boolean;
    status: string;
    brands: string[];
    types: string[];
    productParams: ProductParams;
    metaData: MetaData | null;
}

const productsAdapter = createEntityAdapter<Product>();

//axios params
function getAxiosParams(productParams: ProductParams) {

    const params = new URLSearchParams();
    params.append('pageNumber', productParams.pageNumber.toString())
    params.append('pageSize', productParams.pageSize.toString())
    params.append('orderBy', productParams.orderBy)
    if(productParams.searchTerm) params.append('searchTerm', productParams.searchTerm)
    if(productParams.brands.length > 0) params.append('brands', productParams.brands.toString())
    if(productParams.types.length > 0) params.append('types', productParams.types.toString())

    return params;
}

//fetch all products
export const fetchProductsAsync = createAsyncThunk<Product[], void, {state: RootState}>(

  'catalog/fetchProductsAsync',

  async (_, thunkAPI) => {

    const params = getAxiosParams(thunkAPI.getState().catalog.productParams)

    try {

        const response = await fetch.Catalog.list(params)
        thunkAPI.dispatch(setMetaData(response.metaData))
        return response.items
        
    } catch (error) {

        return thunkAPI.rejectWithValue({error: error.data})
        
        
    }
  }
)

//fetch single product
export const fetchSingleProductAsync = createAsyncThunk<Product, number>(

    'catalog/fetchSingleProductAsync',
    async (productId, thunkAPI) => {

        
        try {

            return await fetch.Catalog.details(productId)
            
        } catch (error) {

           return thunkAPI.rejectWithValue({error: error.data})
            
            
        }
    }
)


export const fetchFilters = createAsyncThunk(

    'catalog/fetchFilters',
    async(_, thunkAPI) => {

        try {

            return await fetch.Catalog.fetchFilters()
            
        } catch (error) {

            return thunkAPI.rejectWithValue({error: error.data})
            
        }
    }
)

function initParams() {

    return {
        pageNumber: 1,
        pageSize: 6,
        orderBy: 'name',
        brands: [],
        types: []
    }
}

export const catalogSlice = createSlice({

    name: 'catalog',
    initialState: productsAdapter.getInitialState<CatalogState>({

        productsLoaded: false,
        filtersLoaded: false,
        status: 'idle',
        brands: [],
        types: [],
        productParams: initParams(),
        metaData: null

           
        
    }),

    reducers: {

       setProductParams: (state, action) => {

        state.productsLoaded = false;
        state.productParams = {...state.productParams, ...action.payload, pageNumber: 1}
       },

       setPageNumber: (state, action) => {

        state.productsLoaded = false;
        state.productParams = {...state.productParams, ...action.payload}
       },

       resetProductParams: (state) => {

        state.productParams = initParams();
       },

       //pagination metaData
       setMetaData: (state, action) => {

        state.metaData = action.payload
       },

       //create new product
       setProduct: (state, action) => {

        productsAdapter.upsertOne(state, action.payload);
        state.productsLoaded = false;
       },
       //remove product
       removeProduct: (state, action) => {

        productsAdapter.removeOne(state, action.payload);
        state.productsLoaded = false;
       }
    },

    extraReducers: (builder => {

        //fetch all products

        builder.addCase(fetchProductsAsync.pending, (state) => {

          state.status = 'pendingFetchProducts'
        })

        builder.addCase(fetchProductsAsync.fulfilled, (state, action) => {

          productsAdapter.setAll(state, action.payload)
          state.status = 'idle'
          state.productsLoaded = true
        })

        builder.addCase(fetchProductsAsync.rejected, (state) => {

           state.status = 'idle'
        })

// fetch single product

        builder.addCase(fetchSingleProductAsync.pending, (state, action) => {

            state.status = 'pendingFetchSingleProduct'
        })

        builder.addCase(fetchSingleProductAsync.fulfilled, (state, action) => {

            productsAdapter.upsertOne(state, action.payload)
            state.status = 'idle'
           
        })

        builder.addCase(fetchSingleProductAsync.rejected, (state) => {

            state.status = 'idle'
        })

        // fetch filters

        builder.addCase(fetchFilters.pending, (state) => {

            state.status = 'pendingFetchFilters'
        })

        builder.addCase(fetchFilters.fulfilled, (state, action) => {

           state.brands = action.payload.brands;
           state.types = action.payload.types;
           state.filtersLoaded = true
           state.status = 'idle'

        })

        builder.addCase(fetchFilters.rejected, (state) => {

            state.status = 'idle'
            
            
        })
    })
})

export const productSelectors = productsAdapter.getSelectors((state: RootState) => state.catalog)
export const {setProductParams, resetProductParams, setMetaData, setPageNumber, setProduct, removeProduct} = catalogSlice.actions;
