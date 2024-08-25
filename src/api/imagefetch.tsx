



export async function uploadToServer(imageId: string, filename: string) {
    
  const formData = new FormData();
  formData.append('image_id', imageId)
  formData.append('image_name', filename)
  formData.append('num_colours', "20")
  formData.append('width', "1400")

  const result: string = await fetch("/api/upload", {method: "POST", body: formData})
  .then(response => response.json())
  .then(data => {return data.task_id})

  return result
}

export async function serverProgress(taskId: string) {

  const status: string = await fetch("/api/progress", {
    method: "POST",
    headers: {"Content-Type": "application/json"},
    body: JSON.stringify({task_id: taskId})
  }).then(response => response.json())
    .then(result => {return result.progress})

  return status

}