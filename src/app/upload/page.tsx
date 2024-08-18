import Image from 'next/image'
import ColourTag from '../ui/components/colourtag'
 
export default function Page() {

  return (
    <div className="flex justify-evenly items-center w-full space-x-10 my-20">
      <div className="flex space-y-4 flex-col">
        <Image
        src="/tmp391htj2p.jpg"
        width={800}
        height={800}
        alt="Picture of the author"
        className="rounded-md shadow-md"
        />
        
        <button className="border min-h-10 items-center shadow rounded-md bg-slate-200 hover:bg-green-400 text-zinc-950">
          Hello
        </button>
      </div>
      
      <div className='flex flex-col min-h-full justify-between'>
        <div className="flex bg-[#958977] flex-col min-w-52 max-h-[30rem] space-y-2 p-4 overflow-scroll overscroll-none  rounded-md shadow-inner">
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

        <button className='min-w-52 min-h-10 items-center shadow rounded-md bg-slate-200 hover:bg-green-400 text-zinc-950'>
          Save Colour Info
        </button>

      </div>

    </div>


    
  )
};