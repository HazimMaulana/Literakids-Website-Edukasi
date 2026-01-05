import { NextResponse } from 'next/server';
import { connectToDatabase } from '@/lib/mongoose';
import Siswa from '@/models/Siswa';
import Cerita from '@/models/Cerita';
import Jurnal from '@/models/Jurnal';

export const runtime = 'nodejs';

export async function GET() {
  await connectToDatabase();

  try {
    // 1. Statistics Counts
    const totalSiswa = await Siswa.countDocuments();
    const totalCerita = await Cerita.countDocuments();
    const totalJurnal = await Jurnal.countDocuments();

    // 2. Top Students (Most reads)
    const topStudents = await Siswa.find({}, 'nama kelas jumlahCeritaDibaca')
      .sort({ jumlahCeritaDibaca: -1 })
      .limit(10)
      .lean();

    // 3. Popular Stories (Most journals submitted)
    // Aggregate journals to count occurrences of each ceritaId
    const popularStoriesAgg = await Jurnal.aggregate([
      {
        $group: {
          _id: '$ceritaId',
          reads: { $sum: 1 },
        },
      },
      { $sort: { reads: -1 } },
      { $limit: 10 },
    ]);

    // Populate story details for the aggregated results
    const popularStories = await Promise.all(
      popularStoriesAgg.map(async (item) => {
        const story = await Cerita.findById(item._id, 'judul kategori').lean();
        return {
          id: item._id,
          title: story ? story.judul : 'Cerita Terhapus',
          category: story ? story.kategori : '-',
          reads: item.reads,
        };
      })
    );

    return NextResponse.json({
      stats: {
        totalSiswa,
        totalCerita,
        totalJurnal,
      },
      topStudents,
      popularStories,
    });
  } catch (error) {
    console.error('Dashboard API Error:', error);
    return NextResponse.json({ error: 'Failed to fetch dashboard data' }, { status: 500 });
  }
}
