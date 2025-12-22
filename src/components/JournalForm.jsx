'use client';

import { useState } from 'react';
import { Send, Loader2 } from 'lucide-react';

export function JournalForm({ storyId, storyTitle, onCancel, onSuccess }) {
  const [text, setText] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!text.trim()) return;

    setIsSubmitting(true);
    setError('');

    try {
      // Get user from localStorage (assuming login saves it there)
      const userStr = localStorage.getItem('user');
      if (!userStr) {
        throw new Error('Kamu harus login terlebih dahulu untuk mengirim jurnal.');
      }
      const user = JSON.parse(userStr);
      
      const response = await fetch('/api/jurnal', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          ceritaId: storyId,
          siswaId: user._id || user.id, // Handle both cases
          submissionText: text,
        }),
      });

      const data = await response.json();

      if (!response.ok) {
        throw new Error(data.error || 'Gagal mengirim jurnal.');
      }

      setText('');
      if (onSuccess) onSuccess();
    } catch (err) {
      setError(err.message);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="w-full max-w-4xl mx-auto mt-8 animate-fadeIn">
      <div className="bg-white/80 backdrop-blur-xl rounded-3xl shadow-2xl overflow-hidden border border-white/50 p-6 md:p-8">
        <h3 className="font-dynapuff text-2xl font-bold text-gray-800 mb-4">
          Jurnal Membaca: {storyTitle}
        </h3>
        <p className="text-gray-600 mb-6">
          Wah, hebat! Kamu sudah selesai membaca. Sekarang, ceritakan apa yang kamu pelajari atau bagian mana yang paling kamu suka dari cerita ini?
        </p>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="relative">
            <textarea
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Tulis ceritamu di sini..."
              className="w-full h-40 p-4 rounded-2xl border-2 border-gray-200 focus:border-blue-500 focus:ring-2 focus:ring-blue-200 outline-none transition-all resize-none text-lg"
              disabled={isSubmitting}
            />
          </div>

          {error && (
            <div className="p-4 bg-red-50 text-red-600 rounded-xl text-sm">
              {error}
            </div>
          )}

          <div className="flex gap-3 justify-end">
            {onCancel && (
              <button
                type="button"
                onClick={onCancel}
                className="px-6 py-3 rounded-xl font-bold text-gray-500 hover:bg-gray-100 transition-all"
                disabled={isSubmitting}
              >
                Batal
              </button>
            )}
            <button
              type="submit"
              disabled={isSubmitting || !text.trim()}
              className="flex items-center gap-2 px-8 py-3 rounded-xl font-bold bg-gradient-to-r from-blue-500 to-purple-600 text-white shadow-md hover:shadow-lg hover:opacity-90 disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            >
              {isSubmitting ? (
                <>
                  <Loader2 className="w-5 h-5 animate-spin" />
                  <span>Mengirim...</span>
                </>
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  <span>Kirim Jurnal</span>
                </>
              )}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
