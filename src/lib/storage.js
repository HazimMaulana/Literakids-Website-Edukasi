'use client'

import { supabase } from '../supabase/supabase'

const bucketName = process.env.NEXT_PUBLIC_SUPABASE_STORAGE_BUCKET || 'images'

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

export function getPublicImageUrl(path) {
  if (!path) return null
  const { data } = supabase.storage.from(bucketName).getPublicUrl(path)
  return data?.publicUrl || null
}
