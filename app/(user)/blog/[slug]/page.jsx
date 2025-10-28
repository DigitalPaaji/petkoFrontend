import React from 'react'
import BlogCompo from './BlogCompo'

const page = ({params:{slug}}) => {
  return (
    <div>
    
      <BlogCompo  slug={slug}/>
    </div>
  )
}

export default page
