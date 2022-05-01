import { createAsyncThunk, createSlice, isAnyOf } from "@reduxjs/toolkit";
import { FieldValues } from "react-hook-form";
import fetch from '../../app/api/fetch';
import { User } from "../../app/models/user";
import {useHistory} from 'react-router-dom';
import { history } from "../..";
import { toast } from "react-toastify";
import { setCart } from "../cart/cartSlice";


interface AuthState {

    user: User | null
}

const initialState: AuthState = {

    user: null
}

//login
export const loginUser = createAsyncThunk<User,  FieldValues>(

    'auth/loginUser',
    async (data, thunkAPI) => {

        try {

            const userDto = await fetch.Auth.login(data)

            const {cart, ...user } = userDto

            if(cart) thunkAPI.dispatch(setCart(cart))

            localStorage.setItem('user', JSON.stringify(user))
            return user;
            
        } catch (error) {

            return thunkAPI.rejectWithValue({error: error.data})
            
        }
    }
)

//fetch current User
export const fetchCurrentUser = createAsyncThunk<User>(

    'auth/fetchCurrentUser',
    async (_, thunkAPI) => {

        thunkAPI.dispatch(setUser(JSON.parse(localStorage.getItem('user'))))

        try {

            const userDto = await fetch.Auth.currentUser()
            const {cart, ...user} = userDto
            if(cart) thunkAPI.dispatch(setCart(cart))
            localStorage.setItem('user', JSON.stringify(user))
            return user;

        } catch (error) {

            return thunkAPI.rejectWithValue({ error: error.data });

        }
    },

    {
        condition: () => {

           if(!localStorage.getItem('user')) return false
        }
    }


)

export const authSlice = createSlice({

    name: 'auth',
    initialState,
    reducers: {

        signOut: (state) => {

          state.user = null
          localStorage.removeItem('user')
          history.push('/')

        },

        setUser: (state, action) => {

            state.user = action.payload
        }
    },

    extraReducers: (builder => {

        builder.addCase(fetchCurrentUser.rejected, (state) => {

            state.user = null
            localStorage.removeItem('user')
            toast.error('Session expired - please login again')
            history.push('/')
        })

        builder.addMatcher(isAnyOf(loginUser.fulfilled, fetchCurrentUser.fulfilled), (state, action) => {

           state.user = action.payload   
        })

        builder.addMatcher(isAnyOf(loginUser.rejected), (state, action) => {

            throw action.payload
            
        })
    })
})

export const {signOut, setUser} = authSlice.actions