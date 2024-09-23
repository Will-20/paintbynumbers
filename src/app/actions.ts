'use server'

import { PutObjectCommand, S3Client } from "@aws-sdk/client-s3";


export async function awsupload(formData: FormData) {
  const imageId = formData.get('imageId') as string
  const image = formData.get('image') as File
  const imagebuffer = Buffer.from(await image.arrayBuffer())
  
  const client = new S3Client({
    region: process.env.AWS_REGION,
    credentials: {
      accessKeyId: process.env.AWS_ACCESS_KEY_ID ?? '',
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY ?? '',
    },
  })

  const uploadCommand = new PutObjectCommand({
    Bucket: process.env.AWS_BUCKET_NAME,
    Key: imageId,
    Body: imagebuffer,
  });

  // TODO: Handle response here if incorrect
  const response = await client.send(uploadCommand);
  console.log(response)

  return response
}