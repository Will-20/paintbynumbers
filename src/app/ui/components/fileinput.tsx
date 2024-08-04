import { useCallback, useState } from "react";
import FileUploadIcon from "../icons/fileuploadicon";



export const FileInput = () => {

  const [dragOver, setDragOver] = useState(false);
  const [saving, setSaving] = useState(false);

  const handleDragEnter = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragOver = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragOver(true)
  }

  const handleDragLeave = (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault()
    setDragOver(false)
  }

  async function send_file() {
    
  }

  const handleDrop = async (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation()
    setDragOver(false)

    const file = e.dataTransfer.files[0]

    if (file != null) {
      const formData = new FormData();

      formData.append('file', file)
      console.log(file)

      const process_request = await fetch('/api/upload', {
        method: 'POST',
        body: formData
      });

      if (process_request.ok) {
        const process_request_json_data = await process_request.json();
        console.log(process_request_json_data["output"])
      }

    } else {
      console.log("No file")
    }
    

    // const file = e.dataTransfer.files && e.dataTransfer.files[0]
    // if (file) {
    //   if (file.size / 1024 / 1024 > 50) {
    //     console.log("File Size Too Big")
    //   } else {
    //     setFile(file)
    //     console.log(file.name)
    //     const reader = new FileReader()
    //     reader.onload = (e) => {
    //       setData((prev) => ({
    //         ...prev,
    //         image: e.target?.result as string,
    //       }))
    //     }
    //     reader.readAsDataURL(file)
    //     submitFile()
    //   }
    // } 
   }

  // function submitFile() {
  //   setSaving(true)
  //   fetch('/api/upload', {
  //     method: 'POST',
  //     headers: { 'content-type': file?.type || 'application/octet-stream' },
  //     body: file,
  //   }).then(async (res) => {
  //     if (res.status == 200) {
  //       console.log((await res.text()))
  //       console.log(data)
  //     } else {
  //       console.log(res.status)
  //     }
  //   })
  // }

  return (
    <div onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} className="flex items-center justify-center w-7/12 group" onDrop = {handleDrop}>
      <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-64 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer group-hover:bg-gray-300 group-hover:bg-opacity-10">
      
      <div className="flex flex-col items-center justify-center pt-5 pb-6">
        <FileUploadIcon/>
        <p className="mb-2 text-sm"><span className="font-semibold">Click to upload</span> or drag and drop</p>
        <p className="text-xs ">SVG, PNG or JPG</p>
      </div>
      <input
            id="image-upload"
            name="image"
            type="file"
            accept="image/*"
            className="sr-only"
          />
      </label>

      {/* {data.image && (
            // eslint-disable-next-line @next/next/no-img-element
            <img
              src={data.image}
              alt="Preview"
              className="h-full w-full rounded-md object-cover"
            />
          )} */}
    </div> 
  )
}