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
        `${SITE_URL}/images/products/kurkum.png`,
        `${SITE_URL}/images/products/shata.png`,
        `${SITE_URL}/images/products/kamoun.png`,
        `${SITE_URL}/images/products/baharat7.png`,
        `${SITE_URL}/images/products/felfel-asmar.png`,
        `${SITE_URL}/images/products/felfel-abyad.png`,
        `${SITE_URL}/images/products/thoum.png`,
        `${SITE_URL}/images/products/basal.png`,
        `${SITE_URL}/images/products/kozabra.png`,
        `${SITE_URL}/images/products/zaatar.png`,
        `${SITE_URL}/images/products/habba.png`,
        `${SITE_URL}/images/products/babrika.png`,
        `${SITE_URL}/images/products/baharat-batatas.png`,
        `${SITE_URL}/images/products/moraka-farkh.png`,
        `${SITE_URL}/images/products/moraka-lahm.png`,
        `${SITE_URL}/images/products/lineup.jpg`,
      ],
    },
  ]
}
