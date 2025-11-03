import { configureStore }  from "@reduxjs/toolkit";
import  petslice from "./slices/petSlice"

const store = configureStore({
    reducer:{

        petslice
    }
})

export default store;

