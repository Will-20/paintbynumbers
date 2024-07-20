import Image from "next/image";
import React from "react";
import { lusitana } from '@/app/ui/fonts';


export default function Create() {
  return (
    <div className="flex flex-col flex-1 items-center justify-around">

      <div className="flex flex-col w-full items-center justify-center">
        <label htmlFor="steps-range" className="block mb-2text-sm font-medium text-gray-900 dark:text-white p-6">Number of Colours</label>
        <input id="steps-range" type="range" min="0" max="5" step="0.5" className=" w-9/12 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"></input>
      </div>

      <div className="flex items-center justify-center w-7/12 group">
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer group-hover:bg-gray-300 group-hover:bg-opacity-10">
        <div className="flex flex-col items-center justify-center pt-5 pb-6">
          <svg className="w-8 h-8 mb-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
            <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
          </svg>
            <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
            <p className="text-xs ">SVG, PNG or JPG</p>
        </div>
        <input id="dropzone-file" type="file" className="hidden" />
        </label>
      </div> 

      
    
    </div>

  );
}
