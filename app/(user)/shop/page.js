import React, { Suspense } from 'react'
import Composhop from './Composhop'

const page = () => {


  return (
    <div>
      <Suspense  fallback={<div>Loading...</div>}>
              <Composhop />

      </Suspense>
    </div>
  )
}

export default page
