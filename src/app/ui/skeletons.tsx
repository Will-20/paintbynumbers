'use client'

import { useState } from "react";



export const ImageViewSkeleton = () => {
  const [data, setData] = useState(true)


  return (
    <div className="flex justify-evenly items-center w-full h-full space-x-10">
      <div className="flex space-y-4 flex-col border h-full w-full">
        <p>Loading</p>
      </div>
    </div>
  )
}