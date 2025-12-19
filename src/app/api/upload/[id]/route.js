import { NextResponse } from 'next/server'
import mongoose from 'mongoose'
import { connectToDatabase } from '@/lib/mongoose'

export const runtime = 'nodejs'

const bucketName = process.env.MONGODB_UPLOAD_BUCKET || 'uploads'

export async function GET(request, { params }) {
  const { id } = params
  if (!id || !mongoose.isValidObjectId(id)) {
    return NextResponse.json({ error: 'Invalid file id' }, { status: 400 })
  }

  await connectToDatabase()
  const db = mongoose.connection.db
  if (!db) {
    return NextResponse.json({ error: 'Database connection not ready' }, { status: 500 })
  }

  const bucket = new mongoose.mongo.GridFSBucket(db, { bucketName })
  const objectId = new mongoose.mongo.ObjectId(id)
  const file = await bucket.find({ _id: objectId }).next()

  if (!file) {
    return NextResponse.json({ error: 'File not found' }, { status: 404 })
  }

  const stream = bucket.openDownloadStream(objectId)

  return new Response(stream, {
    headers: {
      'Content-Type': file.contentType || 'application/octet-stream',
      'Cache-Control': 'public, max-age=31536000, immutable',
      'Content-Disposition': `inline; filename=\"${file.filename}\"`,
    },
  })
}
