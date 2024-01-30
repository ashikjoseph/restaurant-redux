import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";




//  for calling APIs in redux/slice we use Thunk
// Thunk is a method provided by redux to make api calls 
// API calls are asynchronous function, so thunk make use of concept of Promise


// function to call API
export const fetchRestaurant = createAsyncThunk('restaurantSlice/fetchRestaurant', ()=>{
const result = axios.get('/restaurant.json').then(response=>response.data);
return result;
});


const restaurantSlice = createSlice({
    name: "restaurantSlice",
    initialState:{
        // pending
        loading:false ,  
        // resolve
        allRestaurant:[],
        // reject
        error:"",
        searchRestaurant:[],
    },
    extraReducers:(builder)=>{
        builder.addCase(fetchRestaurant.pending,(state)=>{
            state.loading = true;
        })
        builder.addCase(fetchRestaurant.fulfilled,(state,action)=>{
            state.loading = false
            state.allRestaurant = action.payload
            state.searchRestaurant = action.payload
            state.error =""
        })
        builder.addCase(fetchRestaurant.rejected,(state,action)=>{
            state.loading = false;
            state.allRestaurant= [];
            state.error = action.error.message
        })
    },
    reducers:{
        search:(state, action)=>{
            state.allRestaurant.restaurants = 
            state.searchRestaurant.restaurants.filter(item=>item.neighborhood.toLowerCase().includes(action.payload))
        }
    }

})

 export default restaurantSlice.reducer;
 export const {search}= restaurantSlice.actions