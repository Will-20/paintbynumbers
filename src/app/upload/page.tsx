"use client"

import Image from 'next/image'
import { useState } from 'react'
import { useSearchParams } from 'next/navigation'
import DownloadIcon from '../ui/icons/downloadicon'
import { useEffect } from 'react'
import { serverProgress, uploadToServer } from '@/api/imagefetch'
import { GetObjectCommand, S3Client } from '@aws-sdk/client-s3'
import { getSignedUrl } from '@aws-sdk/s3-request-presigner'
import { Loading } from '../ui/components/loading'
import Taglist from '../ui/components/taglist'

export default function Page() {

  const searchParams = useSearchParams()
  const imageId = searchParams.get("id") ?? ""
  const filename = searchParams.get("filename") ?? ""
  const num_colours = searchParams.get("colours") ?? "20"
  const width = searchParams.get("width") ?? "1400"

  const [allImages, setAllImages] = useState<string[]>([])
  const [index, setIndex] = useState(0)

  const [status, setStatus] = useState("UNSTARTED")
  const [tags, setTags] = useState<string[]>([])
  const [colourJson, setColourJson] = useState("")

  const client = new S3Client({
    region: process.env.NEXT_PUBLIC_AWS_REGION,
    credentials: {
      accessKeyId: process.env.NEXT_PUBLIC_AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.NEXT_PUBLIC_AWS_SECRET_ACCESS_KEY ?? '',
    },
  })

  const downloadColours = async () => {
    console.log(tags)
    if (tags.length != 0) {
      const a = document.createElement("a");
      const enc = new TextEncoder();
      a.href = URL.createObjectURL(new Blob([colourJson]))
      a.download = filename + ".colours.txt"
      a.click()
    }
  }

  const downloadOutline = async () => {
    if (allImages[2] != "") {
      const response = await fetch(allImages[2])
      if (response.status !== 200) {
        console.log("Error")
        return;
      }
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a");
      a.href = url;
      a.download = "outline_" + filename;
      a.click()
    } else {
      console.log("No outline yet")
    }
  }

  const downloadFilled = async () => {
    if (allImages[1] != "") {
      const response = await fetch(allImages[1])
      if (response.status !== 200) {
        console.log("Error")
        return;
      }
      const blob = await response.blob()
      const url = URL.createObjectURL(blob)
      const a = document.createElement("a");
      a.href = url;
      a.download = "filled_" + filename;
      a.click()
    } else {
      console.log("No outline yet")
    }
  }

  useEffect(() => {
    const work = async () => {
      const taskId = await uploadToServer(imageId, filename, num_colours, width)
      let interval = setInterval(async () => {
        const stat = await serverProgress(taskId)
        console.log(stat)
        setStatus(stat)
        if ((stat === "Finished" || stat === "Filling in regions" || stat === "Uploading Images") && tags.length == 0) {
          try {
                  // Get the object from the Amazon S3 bucket. It is returned as a ReadableStream.
            const data = await client.send(new GetObjectCommand({
              Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
              Key: imageId + '_colours'
            }));

            const bodyContents = await data.Body?.transformToString() ?? "{}";
            console.log(bodyContents)
            console.log(typeof(bodyContents))

            const json = JSON.parse(bodyContents)
            setColourJson(bodyContents)
            console.log(json)
            console.log(typeof(json))
            const array = Object.values(json) as string[]
            setTags(array);
          } catch (error: any){
            console.log(error)
          }

        }
        if (stat === "Finished") {
          try {
            const filledBucketParams = {
              Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
              Key: imageId + "_filled",
            }
            const filledCommand = new GetObjectCommand(filledBucketParams)
            // setFilled(await getSignedUrl(client, filledCommand))
            const filled = await getSignedUrl(client, filledCommand)

            const outlineBucketParams = {
              Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
              Key: imageId + "_outline",
            }
            const outlineCommand = new GetObjectCommand(outlineBucketParams)
            // setOutline(await getSignedUrl(client, outlineCommand))
            const outline = await getSignedUrl(client, outlineCommand)

            const originalBucketParams = {
              Bucket: process.env.NEXT_PUBLIC_AWS_BUCKET_NAME,
              Key: imageId,
            }
            const originalCommand = new GetObjectCommand(originalBucketParams)
            // setOriginal(await getSignedUrl(client, originalCommand))
            const original = await getSignedUrl(client, originalCommand)

            setAllImages([original, filled, outline])
            setIndex(2) // Default photo is the outlined template
          } catch (error: any) {
            console.log(error)
          }
          clearInterval(interval)
        }
      }, 3000)
    }
    work()
  }, [])


  return (

    <div className="flex flex-row justify-evenly items-center w-full m-10 space-x-10">
      
      <div className="flex flex-col justify-between items-center h-full space-y-5 w-full">
        <div className="flex justify-center items-center h-full w-full shadow-lg border-x-8 border-x-white overflow-scroll relative rounded-lg bg-slate-700">
          <Loading status={status}/>
          
          <div className="flex min-w-[55rem] flex-row absolute top-1/2 left-1/2 [transform:translate(-50%,-50%)]">
            {allImages[index] && (
            <Image
            src={allImages[index]}
            // src="/130882.png"
            width={880}
            height={700}
            alt="Picture of the author"
            className="rounded-md shadow-md"
            quality={100}/> )}
            
          </div>  
        </div>
        <div className='flex flex-row'>
        <button onClick={() => setIndex(0)} className="flex flex-grow border-gray-400 border-r min-h-10 px-2 items-center bg-slate-200 hover:bg-green-400 text-zinc-950 rounded-l-md">
          Original
        </button>
        <button onClick={() => setIndex(1)} className="flex flex-grow border-gray-400 border-r min-h-10 px-2 items-center bg-slate-200 hover:bg-green-400 text-zinc-950">
          Converted
        </button>
        <button onClick={downloadFilled} className="flex flex-grow border-r border-gray-400 min-h-10 px-2 items-center bg-slate-200 hover:bg-green-400 text-zinc-950">
          <DownloadIcon/>
        </button>
        <button onClick={() => setIndex(2)} className="flex flex-grow border-r border-gray-400 min-h-10 px-2 items-center bg-slate-200 hover:bg-green-400 text-zinc-950">
          Outline
        </button>
        <button onClick={downloadOutline} className="flex flex-grow min-h-10 items-center bg-slate-200 px-2 hover:bg-green-400 text-zinc-950 rounded-r-md">
          <DownloadIcon/>
        </button>
        </div>
      </div>

      <div className='flex flex-col items-stretch justify-between h-full'>
        <Taglist tags={tags}/>
          
        <div className='flex justify-center items-center'>
          <button onClick={downloadColours} className='flex min-w-52 min-h-10 justify-center items-center shadow rounded-md bg-slate-200 hover:bg-green-400 text-zinc-950'>
            Save Colour Info
          </button>
        </div>
      </div>
    </div>
  )
};