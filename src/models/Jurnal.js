import mongoose from 'mongoose';

const JurnalSchema = new mongoose.Schema(
  {
    ceritaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Cerita', required: true },
    siswaId: { type: mongoose.Schema.Types.ObjectId, ref: 'Siswa', required: true },
    submissionText: { type: String, required: true, trim: true },
  },
  { timestamps: true }
);

JurnalSchema.pre('save', function () {
  this.$locals.wasNew = this.isNew;
});

JurnalSchema.post('save', async function (doc, next) {
  if (!doc.$locals?.wasNew) {
    return next();
  }

  try {
    const Siswa = mongoose.model('Siswa');
    await Siswa.findByIdAndUpdate(doc.siswaId, { $inc: { jumlahCeritaDibaca: 1 } });
    return next();
  } catch (error) {
    return next(error);
  }
});

export default mongoose.models.Jurnal || mongoose.model('Jurnal', JurnalSchema);
