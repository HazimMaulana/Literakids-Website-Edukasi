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
  const durationMinutes = Math.max(1, pages.length) * 2

  return {
    id: story?._id,
    title: normalizeText(story?.judul) || 'Cerita Baru',
    description: getFirstText(pages),
    imageUrl,
    duration: `${durationMinutes} menit`,
    author: 'Tim Literakids',
    bgColor: CATEGORY_COLORS[category] || 'from-blue-400 to-purple-500',
    category,
  }
}

export const mapCeritaToStory = (story) => {
  const pages = Array.isArray(story?.halaman) ? story.halaman : []
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
  }
}
