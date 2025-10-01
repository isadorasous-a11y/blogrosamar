import Link from 'next/link';
import { formatDateISOToPt, excerpt } from '../lib/utils';
import type { Article } from '../lib/data';

export default function ArticleCard({ article }: { article: Article }) {
  return (
    <article className="card" aria-labelledby={`title-${article.slug}`}>
      <header>
        <h2 className="h2" id={`title-${article.slug}`}>
          <Link href={`/artigos/${article.slug}`}>{article.title}</Link>
        </h2>
        <p className="meta">
          Por {article.author} • {formatDateISOToPt(article.date)}
        </p>
      </header>
      <p>{excerpt(article.content)}</p>
      <p style={{marginTop:8}}>
        <Link href={`/artigos/${article.slug}`} aria-label={`Ler artigo ${article.title}`}>
          Ler artigo →
        </Link>
      </p>
    </article>
  );
}
