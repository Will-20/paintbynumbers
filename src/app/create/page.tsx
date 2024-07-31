'use client';

import Image from "next/image";
import React, { ChangeEventHandler } from "react";
import { FileInput } from "../ui/components/fileinput";
// import { lusitana } from '@/app/ui/fonts';


export default function Create() {
  const formData = new FormData()
  formData.append("title", "body")
  
  async function click () {
    try {
    const res = await fetch("/api/goodbye", {
      method: "POST",
      body: formData
    }
    );
    const data = await res.text();
    console.log(data)

    } catch (err) {
      console.log(err)
    }
  }



  return (
    <div className="flex flex-col flex-1 items-center justify-around">

      <div className="flex flex-col w-full items-center justify-center">
        <label htmlFor="steps-range" className="block mb-2text-sm font-medium text-gray-900 dark:text-white p-6">Number of Colours</label>
        <input id="steps-range" type="range" min="0" max="5" step="0.5" className=" w-9/12 h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"></input>
      </div>

      <FileInput/>

      <button onClick={click}>TestMe</button>

    </div>

  );
}
