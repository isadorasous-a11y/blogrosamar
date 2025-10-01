import { getArticles } from '../lib/data';
import ArticleCard from '../components/ArticleCard';

// VALORES LITERAIS (sem ternário, sem process.env)
export const dynamic = 'force-static';
export const revalidate = 3600;

export default async function HomePage() {
  const articles = await getArticles();
  return (
    <section>
      <h1 className="h1">Artigos mais recentes</h1>
      <div className="grid" role="list">
        {articles.map((a) => (
          <div key={a.slug} role="listitem">
            <ArticleCard article={a} />
          </div>
        ))}
      </div>
    </section>
  );
}
