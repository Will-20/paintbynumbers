import { useCallback, useState } from "react";






export const FileInput = () => {

  const [dragOver, setDragOver] = useState(false);
  const [file, setFile] = useState<File | null>(null)
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragOver(false)
  }

  const handleDrop = useCallback(
    (event: React.DragEvent<HTMLInputElement>) => {
      const file = event.currentTarget.files && event.currentTarget.files[0]
      if (file) {
        if (file.size / 1024 / 1024 > 20) {
          console.log("File size too big (max 20MB)")
        } else {
          setFile(file)
          const reader = new FileReader()
          reader.onload = (e) => {
            setData((prev) => ({ ...prev, image: e.target?.result as string }))
          }
          reader.readAsDataURL(file)
        }
      }
    },
    [setData]
  )

  const fileInput = async (event: React.ChangeEvent<HTMLInputElement>) => {
  console.log("Hello There")
  }
  
  return (
    <div onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="flex items-center justify-center w-7/12 group">
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer group-hover:bg-gray-300 group-hover:bg-opacity-10">
      
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <svg className="w-8 h-8 mb-4 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 16">
          <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 13h3a3 3 0 0 0 0-6h-.025A5.56 5.56 0 0 0 16 6.5 5.5 5.5 0 0 0 5.207 5.021C5.137 5.017 5.071 5 5 5a4 4 0 0 0 0 8h2.167M10 15V6m0 0L8 8m2-2 2 2"/>
        </svg>
        <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
        <p className="text-xs ">SVG, PNG or JPG</p>
        <input 
          id="dropzone-file" 
          onChange={fileInput} 
          type="file" 
          className="hidden size-full" 
        />
      </div>
        
      </label>
    </div> 
  )
}