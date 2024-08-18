import { useCallback, useState } from "react";
import FileUploadIcon from "../icons/fileuploadicon";

import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3'


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

  const handleDrop = async (e: React.DragEvent<HTMLInputElement>) => {
    e.preventDefault();
    e.stopPropagation()
    setDragOver(false)

    const file = e.dataTransfer.files[0]

    sessionStorage.setItem("image_name", file.name)
    console.log(file.type)

    if (file != null) {

      // We should upload to AWS here

      try {

        console.log(process.env)

        const client = new S3Client({ region: process.env.AWS_REGION })
        const uploadCommand = new PutObjectCommand({
          Bucket: process.env.AWS_BUCKET_NAME,
          Key: 'file-name',
          Body: file,
        });
      
        const response = await client.send(uploadCommand);
        console.log(response)
      } catch (error: any) {
        console.log(error)
      }

      // const formData = new FormData();

      // formData.append('file', file)
      // console.log(file)

      // const process_request = await fetch('/api/upload', {
      //   method: 'POST',
      //   body: formData
      // });

      // if (process_request.ok) {
      //   const process_request_json_data = await process_request.json();
      //   console.log(process_request_json_data["output"])
      // }
    } else {
      console.log("No file")
    }
   }

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