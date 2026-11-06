// Shrinks a photo before it's saved. Phone photos are often 3-5 MB, and the browser
// only has room for about 5 MB in total, so each upload is scaled down to fit inside
// 900 x 900 pixels and saved as a JPEG. That's usually 80-150 KB and still looks sharp.
export function resizeImage(file, maxSize = 900, quality = 0.8) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onerror = () => reject(new Error('Could not read that file.'))
    reader.onload = () => {
      const img = new Image()
      img.onerror = () => reject(new Error('That file isn’t a picture the site can use. Try a JPG or PNG.'))
      img.onload = () => {
        const scale = Math.min(1, maxSize / Math.max(img.width, img.height))
        const canvas = document.createElement('canvas')
        canvas.width = Math.round(img.width * scale)
        canvas.height = Math.round(img.height * scale)
        canvas.getContext('2d').drawImage(img, 0, 0, canvas.width, canvas.height)
        resolve(canvas.toDataURL('image/jpeg', quality))
      }
      img.src = reader.result
    }
    reader.readAsDataURL(file)
  })
}
