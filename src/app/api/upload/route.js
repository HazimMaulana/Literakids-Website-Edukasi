import { NextResponse } from 'next/server'
import { createClient } from '@supabase/supabase-js'

export const runtime = 'nodejs'

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL
const serviceRoleKey = process.env.SUPABASE_SERVICE_ROLE_KEY
const bucketName = process.env.SUPABASE_STORAGE_BUCKET || 'images'

if (!supabaseUrl || !serviceRoleKey) {
  throw new Error('Supabase URL or service role key missing in environment variables')
}

const supabase = createClient(supabaseUrl, serviceRoleKey)

async function ensureBucketExists() {
  const { data, error } = await supabase.storage.getBucket(bucketName)
  if (data) return
  if (error && !/not\s+found/i.test(error.message)) {
    throw error
  }
  const { error: createError } = await supabase.storage.createBucket(bucketName, {
    public: true,
  })
  if (createError && !/already exists/i.test(createError.message)) {
    throw createError
  }
}

export async function POST(request) {
  const formData = await request.formData()
  const file = formData.get('file')
  const folder = (formData.get('folder') || 'uploads').toString()

  if (!file || typeof file === 'string') {
    return NextResponse.json({ error: 'File is required' }, { status: 400 })
  }

  await ensureBucketExists()

  const arrayBuffer = await file.arrayBuffer()
  const buffer = Buffer.from(arrayBuffer)
  const extension = file.name?.split('.').pop() || 'bin'
  const fileName = `${Date.now()}-${Math.random().toString(36).slice(2)}.${extension}`
  const filePath = `${folder}/${fileName}`

  const { data, error } = await supabase.storage
    .from(bucketName)
    .upload(filePath, buffer, {
      contentType: file.type || 'application/octet-stream',
      upsert: false,
    })

  if (error) {
    return NextResponse.json({ error: error.message }, { status: 500 })
  }

  const { data: publicUrlData } = supabase.storage.from(bucketName).getPublicUrl(data?.path || filePath)

  return NextResponse.json({
    path: data?.path || filePath,
    publicUrl: publicUrlData?.publicUrl,
  })
}
