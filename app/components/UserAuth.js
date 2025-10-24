
import axios from 'axios'
import React from 'react'
import { baseurl } from '../admin/components/apis'

const UserAuth =async () => {
const  response = await axios.get(`${baseurl}/user`)
  



  return (
    <div>
      
    </div>
  )
}

export default UserAuth
