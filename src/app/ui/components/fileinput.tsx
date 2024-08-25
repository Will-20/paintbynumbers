import { useState } from "react";
import FileUploadIcon from "../icons/fileuploadicon";
import { S3Client, PutObjectCommand } from '@aws-sdk/client-s3';
import { customAlphabet } from 'nanoid'
import { useRouter } from "next/navigation";

export const FileInput = () => {

  // const navigation = useNavigation()

  const router = useRouter()
  const [dragOver, setDragOver] = useState(false);
  const [data, setData] = useState<{
    image: string | null
  }>({
    image: null,
  })

  const [file, setFile] = useState<File | null>(null)

  const [image_id, setImageId] = useState("")

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
    e.preventDefault()
    e.stopPropagation()
    setDragOver(false)

    const file = e.dataTransfer.files && e.dataTransfer.files[0]

    if (file) {
      // TODO: Use toast here?
      setFile(file)
      const reader = new FileReader()
      reader.onload = (e) => {
        setData((prev) => ({
          ...prev,
          image: e.target?.result as string,
        }))
      }
      reader.readAsDataURL(file)
    }
  }

  const upload = async () => {
    if (file != null) {

      try {
        const client = new S3Client({
          region: process.env.NEXT_PUBLIC_AWS_REGION,
          credentials: {
            accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? '',
            secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? '',
          },
        })

        const nanoid = customAlphabet(
          '0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz',
          16
        )
        
        const imageId = nanoid();
        setImageId(imageId)

        const uploadCommand = new PutObjectCommand({
          Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
          Key: imageId,
          Body: file,
        });
        
        // TODO: Handle response here if incorrect
        const response = await client.send(uploadCommand);
        console.log(response) 

        router.push(`/upload?id=${imageId}&filename=${file.name}`)

      } catch (error: any) {
        console.log(error)
      }
    } else {
      console.log("No file")
    }
  }

  return (
    <div className="flex flex-col space-y-10 items-center justify-center w-10/12 group" >
      <div onDragEnter={handleDragEnter} onDragOver={handleDragOver} onDragLeave={handleDragLeave} onDrop={handleDrop} className="flex items-center justify-center w-full h-full group" >
        <label htmlFor="dropzone-file" className="flex flex-col items-center justify-center w-full h-96 border-2 border-gray-300 border-dashed rounded-lg cursor-pointer group-hover:bg-gray-300 group-hover:bg-opacity-10">
        <div className={`flex flex-col items-center justify-center pt-5 pb-6 ${data.image ? 'hidden' : ''}`}>
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
            {data.image && (
              // eslint-disable-next-line @next/next/no-img-element
              <img
                src={data.image}
                alt="Preview"
                className="h-full w-full rounded-md object-cover"
              />
            )}
        </label>
      </div>
      <div>
        <button onClick={upload} className='min-w-52 min-h-10 items-center shadow rounded-md bg-slate-200 hover:bg-green-400 text-zinc-950'>
          Convert Image
        </button>
      </div>
      
    </div>
  )
}