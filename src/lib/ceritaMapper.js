const CATEGORY_COLORS = {
  Bermasyarakat: 'from-green-400 to-teal-500',
  Beribadah: 'from-emerald-400 to-green-500',
  'Makan Bergizi': 'from-orange-400 to-amber-500',
}

const CATEGORY_FALLBACK_IMAGES = {
  Bermasyarakat: '/assets/bermasyarakat-hero-mobile.png',
  Beribadah: '/backgroundImages/heroSectionBeribadahMobile.png',
  'Makan Bergizi': '/assets/makan-hero-mobile.png',
}

const normalizeText = (value) => (typeof value === 'string' ? value.trim() : '')

const normalizeCategory = (value) => normalizeText(value).toLowerCase()

const normalizeStatus = (value) => normalizeText(value).toLowerCase()

const getFirstText = (pages) => {
  const first = pages.find((page) => normalizeText(page?.teks))
  return normalizeText(first?.teks) || 'Cerita seru menunggumu!'
}

const getFirstImage = (pages) => {
  const first = pages.find((page) => normalizeText(page?.gambarUrl))
  return normalizeText(first?.gambarUrl)
}

const getFirstAudio = (pages) => {
  const first = pages.find((page) => normalizeText(page?.audioUrl))
  return normalizeText(first?.audioUrl)
}

export const calculateTotalDuration = async (pages) => {
  if (!pages || pages.length === 0) return null;
  
  // Handle both raw pages (from DB) and mapped pages (from mapCeritaToStory)
  const audioUrls = pages.map(p => p.audio || p.audioUrl).filter(Boolean);
  if (audioUrls.length === 0) return null;

  try {
    const durationPromises = audioUrls.map(url => {
      return new Promise((resolve) => {
        const audio = new Audio(url);
        audio.preload = 'metadata';
        audio.onloadedmetadata = () => {
          resolve(audio.duration);
        };
        audio.onerror = () => {
          resolve(0);
        };
        // Timeout to prevent hanging
        setTimeout(() => resolve(0), 5000);
      });
    });

    const durations = await Promise.all(durationPromises);
    const totalSeconds = durations.reduce((a, b) => a + b, 0);
    
    if (totalSeconds === 0) return null;

    const minutes = Math.floor(totalSeconds / 60);
    const seconds = Math.floor(totalSeconds % 60);
    
    if (minutes > 0) {
        return `${minutes} menit ${seconds > 0 ? `${seconds} detik` : ''}`;
    }
    return `${seconds} detik`;
  } catch (e) {
    console.error("Error calculating duration:", e);
    return null;
  }
};

export const filterCeritaByCategory = (stories, category) => {
  const target = normalizeCategory(category)
  return (stories || []).filter((story) => {
    const kategori = normalizeCategory(story?.kategori)
    const status = normalizeStatus(story?.status)
    return kategori === target && status === 'published'
  })
}

export const mapCeritaToCard = (story) => {
  const pages = Array.isArray(story?.halaman) ? story.halaman : []
  const category = normalizeText(story?.kategori) || 'Umum'
  const imageUrl =
    normalizeText(story?.coverUrl) ||
    getFirstImage(pages) ||
    CATEGORY_FALLBACK_IMAGES[category] ||
    '/assets/dashboard-hero-mobile.png'
  
  // Default heuristic: 1 minute per page (better estimate than 2)
  const durationMinutes = Math.max(1, pages.length);

  return {
    id: story?._id,
    title: normalizeText(story?.judul) || 'Cerita Baru',
    description: getFirstText(pages),
    imageUrl,
    duration: `${durationMinutes} menit`,
    author: 'Titis Dea Mascambuan',
    bgColor: CATEGORY_COLORS[category] || 'from-blue-400 to-purple-500',
    category,
    // Pass raw pages to allow async calculation later if needed
    rawPages: pages 
  }
}

export const mapCeritaToStory = (story) => {
  const pages = Array.isArray(story?.halaman) ? story.halaman : []
  const glosarium = Array.isArray(story?.glosarium) ? story.glosarium : []
  const card = mapCeritaToCard(story)
  const fallbackImage = card.imageUrl
  const fallbackAudio = getFirstAudio(pages)
  const content =
    pages.length > 0
      ? pages.map((page) => ({
          text: normalizeText(page?.teks) || card.description,
          image: normalizeText(page?.gambarUrl) || fallbackImage,
          audio: normalizeText(page?.audioUrl) || fallbackAudio,
        }))
      : [
          {
            text: card.description,
            image: fallbackImage,
            audio: fallbackAudio,
          },
        ]

  return {
    ...card,
    content,
    glosarium,
  }
}
