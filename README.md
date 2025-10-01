# Blog Rosa Mar — App Router (Next.js)

Projeto para EBAC:
- Rotas dinâmicas (`app/artigos/[slug]/page.tsx`)
- Data Fetching com Server Components
- SSG/SSR via `force-static` / `generateStaticParams` ou `force-dynamic`
- SEO dinâmico por artigo com `generateMetadata`
- Deploy na Vercel

## Rodando

```bash
npm i
cp .env.example .env.local
npm run dev
