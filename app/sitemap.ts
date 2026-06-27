import type { MetadataRoute } from 'next'

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL || 'https://happy-farm.store'

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1,
      images: [
        `${SITE_URL}/images/og-image.jpg`,
        `${SITE_URL}/images/products/kurkum.jpg`,
        `${SITE_URL}/images/products/shata.jpg`,
        `${SITE_URL}/images/products/kamoun.jpg`,
        `${SITE_URL}/images/products/baharat7.jpg`,
        `${SITE_URL}/images/products/felfel-asmar.jpg`,
        `${SITE_URL}/images/products/felfel-abyad.png`,
        `${SITE_URL}/images/products/mahashi.jpg`,
        `${SITE_URL}/images/products/mshawi.jpg`,
        `${SITE_URL}/images/products/thoum.jpg`,
        `${SITE_URL}/images/products/basal.jpg`,
        `${SITE_URL}/images/products/kozabra.jpg`,
        `${SITE_URL}/images/products/zaatar.jpg`,
        `${SITE_URL}/images/products/habba.jpg`,
        `${SITE_URL}/images/products/babrika.jpg`,
        `${SITE_URL}/images/products/baharat-batatas.jpg`,
        `${SITE_URL}/images/products/moraka-farkh.jpg`,
        `${SITE_URL}/images/products/moraka-lahm.jpg`,
        `${SITE_URL}/images/products/lineup.jpg`,
      ],
    },
  ]
}
