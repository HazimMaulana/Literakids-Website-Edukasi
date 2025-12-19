import mongoose from 'mongoose';

const SiswaSchema = new mongoose.Schema(
  {
    nama: { type: String, required: true, trim: true },
    nisn: { type: String, required: true, trim: true, unique: true },
    kelas: { type: String, required: true, trim: true },
    jumlahCeritaDibaca: { type: Number, default: 0, min: 0 },
    username: { type: String, required: true, trim: true, unique: true },
    passwordHash: { type: String, required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Siswa || mongoose.model('Siswa', SiswaSchema);
