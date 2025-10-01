import type { Metadata } from 'next';
import { getArticleBySlug, getAllSlugs } from '../../../lib/data';
import { formatDateISOToPt, excerpt } from '../../../lib/utils';

// VALORES LITERAIS (sem ternário)
export const dynamic = 'force-static';
export const revalidate = 3600;

// SSG: gera os slugs estaticamente
export async function generateStaticParams() {
  const slugs = await getAllSlugs();
  return slugs.map((slug) => ({ slug }));
}

// ✅ Tipagem correta (NADA de Promise aqui!)
type PageProps = { params: { slug: string } };

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const article = await getArticleBySlug(params.slug);
  if (!article) {
    return { title: 'Artigo não encontrado', description: 'Conteúdo não existe ou foi movido.' };
  }
  const base = process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000';
  const url = new URL(`/artigos/${article.slug}`, base);

  return {
    title: article.title,
    description: excerpt(article.content, 180),
    alternates: { canonical: url.toString() },
    openGraph: {
      type: 'article',
      title: article.title,
      description: excerpt(article.content, 180),
      url: url.toString(),
      tags: [article.author],
      locale: 'pt_BR',
    },
    twitter: {
      card: 'summary',
      title: article.title,
      description: excerpt(article.content, 180),
    },
  };
}

export default async function ArticlePage({ params }: PageProps) {
  const article = await getArticleBySlug(params.slug);
  if (!article) return null;

  return (
    <article className="article">
      <header>
        <h1>{article.title}</h1>
        <p className="meta">Por {article.author} • {formatDateISOToPt(article.date)}</p>
      </header>
      {article.content.split('\n\n').map((para, i) => <p key={i}>{para}</p>)}
    </article>
  );
}
