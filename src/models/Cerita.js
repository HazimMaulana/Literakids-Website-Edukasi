import mongoose from 'mongoose';

// Force delete the model to ensure schema updates are applied in dev mode
if (process.env.NODE_ENV === 'development' && mongoose.models.Cerita) {
  delete mongoose.models.Cerita;
}

const CeritaHalamanSchema = new mongoose.Schema(
  {
    gambarUrl: { type: String, required: true, trim: true },
    teks: { type: String, required: true, trim: true },
    audioUrl: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const GlosariumSchema = new mongoose.Schema(
  {
    kata: { type: String, required: true, trim: true },
    arti: { type: String, required: true, trim: true },
  },
  { _id: false }
);

const CeritaSchema = new mongoose.Schema(
  {
    judul: { type: String, required: true, trim: true },
    kategori: { type: String, trim: true },
    status: { type: String, default: 'Draft', trim: true },
    halaman: { type: [CeritaHalamanSchema], default: [] },
    glosarium: { type: [GlosariumSchema], default: [] },
    coverUrl: { type: String, trim: true },
  },
  { timestamps: true }
);

export default mongoose.models.Cerita || mongoose.model('Cerita', CeritaSchema);
