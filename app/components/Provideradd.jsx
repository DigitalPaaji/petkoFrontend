"use client"
import React from 'react'
import { Provider } from 'react-redux'
import store from './store/store'
import Offer from "./Offer"
import Navbar from "./Navbar";
import Footer from "./Footer";

function Provideradd({children}) {
  return (
   <Provider store={store}>
<Offer />

        <Navbar />

        {children}
        <Footer />
        {/* <PopupModal/> */}

   </Provider>
  )
}

export default Provideradd
