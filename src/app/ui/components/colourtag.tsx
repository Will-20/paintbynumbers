

type Props = { children: React.ReactNode }


// The color code should be in the form #000000
const ColourTag = ({ colourCode }: { colourCode: string }) => {

  const hexNumber = parseInt('0x' + colourCode.slice(1))

  const red = Math.floor(hexNumber / (16**4))
  const green = (Math.floor(hexNumber / (16**2))) % 16**2
  const blue = hexNumber % (16**2)

  const textCol = (red*0.299 + green*0.587 + blue*0.114) < 150 ? "text-white" : "text-black" 
  
  return (
    <div style={{ backgroundColor: colourCode }} className= "flex min-h-10 rounded-lg shadow-md justify-center align-center items-center">
      <p className={`flex ${textCol}`}>
        {colourCode}
      </p>
    </div>
  );
}; 

export default ColourTag;