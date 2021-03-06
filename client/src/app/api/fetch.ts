import axios, {AxiosResponse, AxiosError} from 'axios';
import { toast } from 'react-toastify';
import { AnyObjectSchema } from 'yup';
import { history } from '../..';
import { PaginatedResponse } from '../models/pagination';
import { store } from '../store/configureStore';


const sleep = () => new Promise(resolve => setTimeout(resolve, 500))

axios.defaults.baseURL = process.env.REACT_APP_API_URL;
axios.defaults.withCredentials = true;

const responseBody = (response: AxiosResponse) => response.data;

axios.interceptors.request.use(config => {

   const token = store.getState().auth.user?.token
   if(token) config.headers.Authorization = `Bearer ${token}`
   return config;
})

axios.interceptors.response.use(async response => {

    if(process.env.NODE_ENV === 'development') await sleep();
    

    const pagination = response.headers['pagination'];
    if(pagination) {

        response.data = new PaginatedResponse(response.data, JSON.parse(pagination));
        return response;
    }

    return response
}, (error: AxiosError) => {

    const {data, status} = error.response!;

    switch (status) {
        case 400:

        if(data.errors) {

            const modelStateErrors: string[] = []

            for(const key in data.errors) {

                if(data.errors[key]) {

                    modelStateErrors.push(data.errors[key])
                }
            }

            throw modelStateErrors.flat();
        }

        toast.error(data.title)
            
            break;

            case 401:

            toast.error(data.title)

            break;

            case 403:

            toast.error('You need to login as admin user to see this area ')

            break;

            case 500:

            history.push({

                pathname: '/server-error',
                state: {error: data}
            })

            break;
    
        default:
            break;
    }

    return Promise.reject(error.response);
    
})



const requests = {

    get: (url: string, params?: URLSearchParams) => axios.get(url, {params}).then(responseBody),
    post: (url: string, body: {}) => axios.post(url, body).then(responseBody),
    put: (url: string, body: {}) => axios.put(url, body).then(responseBody),
    delete: (url: string) => axios.delete(url).then(responseBody),
    postForm: (url: string, data: FormData) => axios.post(url, data, {

        headers: {'Content-type': 'multipart/form-data'}
    }).then(responseBody),

    putForm: (url: string, data: FormData) => axios.put(url, data, {

      headers: {'Content-type': 'multipart/form-data'}  
    }).then(responseBody)

}

function createFormData(item: any) {

    let formData = new FormData();

    for(const key in item) {

        formData.append(key, item[key])
    }

    return formData;
}

const Admin = {

    createProduct: (product: any) => requests.postForm('products', createFormData(product)),
    updateProduct: (product: any) => requests.putForm('products', createFormData(product)),
    deleteProduct: (id: number) => requests.delete(`products/${id}`)
}

const Catalog = {

    list: (params: URLSearchParams) => requests.get('products', params),
    details: (id: number) => requests.get(`products/${id}`),
    fetchFilters: () => requests.get('products/filters')
}

//errors
const testErrors = {

    get400Error: () => requests.get('buggy/bad-request'),
    get401Error: () => requests.get('buggy/unauthorized'),
    get404Error: () => requests.get('buggy/not-found'),
    get500Error: () => requests.get('buggy/server-error'),
    getValidationError: () => requests.get('buggy/validation-error')

}

// axios
const Cart = {

    get: () => requests.get('cart'),
    addItem: (productId: number, quantity = 1) => requests.post(`cart?productId=${productId}&quantity=${quantity}`, {}),
    removeItem: (productId: number, quantity = 1) => requests.delete(`cart?productId=${productId}&quantity=${quantity}`)
}

//register login
const Auth = {

    login: (values: any) => requests.post('auth/login', values),
    register: (values: any) => requests.post('auth/register', values),
    currentUser: () => requests.get('auth/currentUser'),
    fetchAddress: () => requests.get('auth/savedAddress')
}

//create orders
const Orders = {

    list: () => requests.get('orders'),
    fetch: (id: number) => requests.get(`orders/${id}`),
    create: (values: any) => requests.post('orders', values)
}

const Payments = {

    createPaymentIntent: () => requests.post('payments', {})
}

const fetch = {

    Catalog,
    testErrors,
    Cart,
    Auth,
    Orders,
    Payments,
    Admin
}

export default fetch;