import { NextResponse } from 'next/server'
import { Readable } from 'stream'
import mongoose from 'mongoose'
import { connectToDatabase } from '@/lib/mongoose'

export const runtime = 'nodejs'

const bucketName = process.env.MONGODB_UPLOAD_BUCKET || 'uploads'

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')
  const folder = (formData.get('folder') || 'uploads').toString()

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  await connectToDatabase()
  const db = mongoose.connection.db
  if (!db) {
    return NextResponse.json({ error: 'Database connection not ready' }, { status: 500 })
  }

  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName })
  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const extension = file.name?.split('.').pop() || 'bin'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
  const filePath = `${folder}/${fileName}`

  const uploadStream = bucket.openUploadStream(filePath, {
    contentType: file.type || 'application/octet-stream',
  })

  const readable = Readable.from(buffer)
  await new Promise((resolve, reject) => {
    readable.pipe(uploadStream).on('finish', resolve).on('error', reject)
  })

  return NextResponse.json({
    path: filePath,
    id: uploadStream.id?.toString(),
    publicUrl: `/api/upload/${uploadStream.id}`,
  })
}
