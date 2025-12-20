'use client'

export async function uploadImage(file, folder = 'uploads') {
  if (!file) {
    throw new Error('No file provided')
  }

  const formData = new FormData()
  formData.append('file', file)
  formData.append('folder', folder)

  const response = await fetch('/api/upload', {
    method: 'POST',
    body: formData,
  })

  const payload = await response.json()
  if (!response.ok) {
    throw new Error(payload.error || 'Failed to upload image')
  }

  return payload
}

export function getPublicImageUrl(idOrUrl) {
  if (!idOrUrl) return null
  if (idOrUrl.startsWith('http://') || idOrUrl.startsWith('https://')) {
    return idOrUrl
  }
  if (idOrUrl.startsWith('/')) {
    return idOrUrl
  }
  return `/api/upload/${idOrUrl}`
}
