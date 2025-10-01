import type { MetadataRoute } from 'next';
import { getArticles } from '@/lib/data';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const articles = await getArticles();
  const items: MetadataRoute.Sitemap = [
    { url: `${base}/`, lastModified: new Date() },
    ...articles.map((a) => ({
      url: `${base}/artigos/${a.slug}`,
      lastModified: new Date(a.date),
    })),
  ];
  return items;
}
