"use server"

import { GetObjectCommand, S3Client } from "@aws-sdk/client-s3";
import { getSignedUrl } from "@aws-sdk/s3-request-presigner";

export async function uploadToServer(imageId: string, filename: string, num_colours: string, width: string) {
  const formData = new FormData();
  formData.append('image_id', imageId)
  formData.append('image_name', filename)
  formData.append('num_colours', num_colours)
  formData.append('width', width)

  const result: string = await fetch(process.env.BACKEND + "/api/upload", {method: "POST", body: formData})
  .then(response => response.json())
  .then(data => {return data.task_id})

  return result
}

export async function serverProgress(taskId: string) {
  const status: string = await fetch(process.env.BACKEND + "/api/progress", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({task_id: taskId})
  }).then(response => response.json())
    .then(result => {return result.progress})
  return status

}

const client = new S3Client({
  region: process.env.AWS_REGION,
  credentials: {
    accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
    secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
  },
})

export async function getColours(imageId: string) {
  const data = await client.send(new GetObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageId + '_colours'
  }));

  const colours = await data.Body?.transformToString() ?? "{}";
  return colours
}

export async function getOutline(imageId: string) {
  const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageId + "_outline",
  }
  const command = new GetObjectCommand(bucketParams)
  return await getSignedUrl(client, command)
}
export async function getFilled(imageId: string) {
  const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageId + "_filled",
  }
  const command = new GetObjectCommand(bucketParams)
  return await getSignedUrl(client, command)
}

export async function getOriginal(imageId: string) {
  const bucketParams = {
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageId,
  }
  const command = new GetObjectCommand(bucketParams)
  return await getSignedUrl(client, command)
}