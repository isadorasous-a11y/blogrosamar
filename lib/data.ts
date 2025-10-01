import fs from 'node:fs/promises';

export type Article = {
  title: string;
  slug: string;
  author: string;
  date: string; // ISO
  content: string;
};

const API_BASE_URL = process.env.API_BASE_URL;

async function getFromLocal(): Promise<Article[]> {
  const file = await fs.readFile(process.cwd() + '/data/artigos.json', 'utf-8');
  const items = JSON.parse(file) as Article[];
  return items.sort((a, b) => (a.date < b.date ? 1 : -1));
}

async function getFromApi(): Promise<Article[]> {
  if (!API_BASE_URL) return [];
  const res = await fetch(API_BASE_URL, { cache: 'no-store' });
  if (!res.ok) throw new Error('Falha ao buscar API: ' + res.status);
  const items = (await res.json()) as Article[];
  const normalized = items.map((it) => ({
    title: it.title,
    slug: it.slug,
    author: it.author,
    date: it.date,
    content: it.content,
  }));
  return normalized.sort((a, b) => (a.date < b.date ? 1 : -1));
}

export async function getArticles(): Promise<Article[]> {
  if (API_BASE_URL) return getFromApi();
  return getFromLocal();
}

export async function getArticleBySlug(slug: string): Promise<Article | null> {
  const all = await getArticles();
  return all.find((a) => a.slug === slug) ?? null;
}

export async function getAllSlugs(): Promise<string[]> {
  if (API_BASE_URL) return []; // em modo API faremos SSR
  const all = await getFromLocal();
  return all.map((a) => a.slug);
}
