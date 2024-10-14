const downloadBlobAsFile = async (res: any, filename: string) => {
  const file = (await toBase64(new Blob([res]))) as string
  const link = document.createElement('a')
  link.href = file
  link.setAttribute('download', `${filename}`)
  document.body.appendChild(link)
  link.click()
  return res
}
const toBase64 = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.readAsDataURL(file)
    reader.onload = () => resolve(reader.result)
    reader.onerror = (error) => reject(error)
  })

export default {
  downloadBlobAsFile
}
