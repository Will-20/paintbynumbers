import Image from "next/image";
import React from "react";
import { lusitana } from '@/app/ui/fonts';
import Palette from "./ui/icons/palette";
import Link from 'next/link';

// import IconButton from "./ui/components/iconbutton";

// Essential

// TODO: Design creation page
// TODO: Make About, Demo and FAQ page
// TODO: Host on server

// Moderately Important

// TODO: Speed up k-means?
// TODO: Make Button Component reusable
// TODO: Make Hero Image
// TODO: Make slider colour not blue - maybe orange?
// TODO: Look into cors
// TODO: Make file size too big notification

// Low-Priority

// TODO: Rename app to something better
// TODO: Turn number of colours to max number of colours :P

// Completed :)
// TODO: Add numbers
// TODO: Use Python script 
// TODO: Remove small reions of pixels from the image
// TODO: Link file upload



export default function Home() {

  return (
    
    <div className="flex flex-col flex-auto place-content-stretch items-center justify-between pt-8 pl-24 pr-24 pb-24">

      <div className = "flex items-stretch grow gap-10 justify-between p-10 ">
        <div className="basis-3/6 flex flex-col gap-10 ">
          <div className="flex basis-1/3 text-center justify-between ">
            <p className="flex font-bold text-center items-center justify-center text-white text-6xl">
            Create Your Masterpiece
            </p>
          </div>
          <div className="flex basis-2/6 text-center items-center justify-center ">
            <p className="text-sm text-slate-300">
            Paint-by-number-maker is a free online tool to help create and customise your own paint-by-numbers template. Simply upload a photo, select the number of colours that you want, and watch the magic happen.
            </p>
          </div>
          <div className="basis-1/6 flex items-center justify-center">

          <Link href="/create" className="group relative inline-flex items-center justify-between overflow-hidden rounded bg-indigo-50 py-3 pl-6 pr-6 font-semibold text-indigo-600 transition-all duration-500 ease-in-out hover:pl-14 hover:pr-4">
            <span className="absolute bottom-0 left-0 h-1 w-full bg-indigo-600 transition-all duration-500 ease-in-out group-hover:h-full"></span>
            <span className="absolute left-0 -translate-x-20 duration-500 ease-in-out group-hover:translate-x-2">
              <Palette/>
            </span>
            <span className="relative w-full text-left transition-colors duration-500 ease-in-out group-hover:text-white">Start Now</span>
          </Link>
  
  
          </div>
        </div>

        {/* Use z-axis */}
        {/* <div className="basis-3/5 flex relative border-2 border-emerald-50">
          <div className="w-72 h-40 z-30 bg-green-400 transform transition-all hover:skew-x-12 hover:-skew-y-12 absolute rounded-lg">

          </div>
          <div className="w-72 h-40 z-20 bg-yellow-400 transform transition-all hover:skew-x-12 hover:-skew-y-12 absolute -top-4 -left-4 rounded-lg">

          </div>
          <div className="w-72 h-40 z-10 bg-red-400 transform transition-all hover:skew-x-12 hover:-skew-y-12 absolute -top-8 -left-8 rounded-lg">

          </div>
          <div className="w-72 h-40 z-0 bg-black transform transition-all hover:skew-x-12 hover:-skew-y-12 absolute -top-12 -left-12 rounded-lg">

          </div>
        </div> */}
      </div>
      

    </div>
  );
}
