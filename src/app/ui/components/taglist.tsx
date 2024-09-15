import ColourTag from "./colourtag"



const Taglist = ({ tags }: { tags: string[]}) => {


  


  return (
    <div className='flex flex-col justify-center h-full space-x-5'>
      <div className="flex flex-col h-[30rem] bg-[#958977] space-y-2 p-4 overflow-scroll overscroll-none rounded-md shadow-inner">
        {
          tags.map((tag, index) => {
            return <ColourTag id={index+1} colourCode={tag}/>
          })
        }
        
        {/* <ColourTag colourCode='#c42b45' /> 
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
        <ColourTag colourCode='#9827d6' /> */}
      </div>
    </div>
  )
} 

export default Taglist;