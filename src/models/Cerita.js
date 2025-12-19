import mongoose from 'mongoose';

const CeritaHalamanSchema = new mongoose.Schema(
  {
    gambarUrl: { type: String, required: true, trim: true },
    teks: { type: String, required: true, trim: true },
    audioUrl: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CeritaSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true },
    kategori: { type: String, trim: true },
    status: { type: String, default: 'Draft', trim: true },
    halaman: { type: [CeritaHalamanSchema], default: [] },
    coverUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Cerita || mongoose.model('Cerita', CeritaSchema);
