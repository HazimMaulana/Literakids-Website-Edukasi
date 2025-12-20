import { NextResponse } from 'next/server'
import { put } from '@vercel/blob'

export async function POST(request) {
  if (!process.env.BLOB_READ_WRITE_TOKEN) {
    return NextResponse.json(
      { error: 'BLOB_READ_WRITE_TOKEN is not configured' },
      { status: 500 }
    )
  }

  const formData = await request.formData()
  const file = formData.get('file')
  const folder = (formData.get('folder') || 'uploads').toString()

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  const extension = file.name?.split('.').pop() || 'bin'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
  const filePath = `${folder}/${fileName}`
  const blob = await put(filePath, file, {
    access: 'public',
    contentType: file.type || 'application/octet-stream',
  })

  return NextResponse.json({
    path: filePath,
    pathname: blob.pathname,
    url: blob.url,
    publicUrl: blob.url,
  })
}
