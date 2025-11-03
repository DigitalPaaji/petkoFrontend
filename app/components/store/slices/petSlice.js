import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import axios from "axios";
import { baseurl } from "@/app/admin/components/apis";

export const getPet = createAsyncThunk("pet/getPet", async () => {
  const response = await axios.get(`${baseurl}/petcat`);
  return response.data; 
});

const petSlice = createSlice({
  name: "pet",
  initialState: {
    info: null,
    isLoading: false,
    isError: false,
  },
  extraReducers: (builder) => {
    builder
      .addCase(getPet.pending, (state) => {
        state.isLoading = true;
        state.isError = false;
        state.info = null;
      })
      .addCase(getPet.fulfilled, (state, action) => {
        state.isLoading = false;
        state.isError = false;
        state.info = action.payload;
      })
      .addCase(getPet.rejected, (state) => {
        state.isLoading = false;
        state.isError = true;
        state.info = null;
      });
  },
});

export default petSlice.reducer;
