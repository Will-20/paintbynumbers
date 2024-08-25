"use client"

import Image from 'next/image'
import ColourTag from '../ui/components/colourtag'
import { ImageView } from '../ui/components/imageview'
import { Suspense, useState } from 'react'
import { useSearchParams } from 'next/navigation'
import DownloadIcon from '../ui/icons/downloadicon'

export default function Page() {

  const searchParams = useSearchParams()
  const image_id = searchParams.get("id") ?? ""
  const filename = searchParams.get("filename") ?? ""


  console.log(image_id, filename)

  return (
    <div className="flex flex-row justify-evenly items-center w-full m-10 space-x-10">
      
      <ImageView imageId={image_id} filename={filename}/>

      <div className='flex flex-col items-stretch justify-between h-full'>
          <div className='flex flex-col justify-center h-full space-x-5'>
            <div className="flex flex-col h-[30rem] bg-[#958977] space-y-2 p-4 overflow-scroll overscroll-none rounded-md shadow-inner">
              <ColourTag colourCode='#c42b45' /> 
              <ColourTag colourCode='#000000' />
              <ColourTag colourCode='#ffffff' />
              <ColourTag colourCode='#6ac7f2' />
              <ColourTag colourCode='#96f7b1' />
              <ColourTag colourCode='#4f676f' />
              <ColourTag colourCode='#9b54ef' />
              <ColourTag colourCode='#daba65' />
              <ColourTag colourCode='#c8762a' />
              <ColourTag colourCode='#6b273d' />
              <ColourTag colourCode='#9914af' />
              <ColourTag colourCode='#daba65' />
              <ColourTag colourCode='#9b54ef' />
              <ColourTag colourCode='#d31b45' />
              <ColourTag colourCode='#9827d6' />
            </div>
          </div>
          
        
        <div className='flex justify-center items-center'>
          <button className='flex min-w-52 min-h-10 justify-center items-center shadow rounded-md bg-slate-200 hover:bg-green-400 text-zinc-950'>
            Save Colour Info
          </button>
        </div>
        

      </div>

    </div>


    
  )
};