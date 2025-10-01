import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL || 'http://localhost:3000'),
  title: {
    default: 'Blog Rosa Mar',
    template: '%s • Blog Rosa Mar',
  },
  description: 'Um blog simples e elegante com App Router.',
  icons: [{ rel: 'icon', url: '/favicon.ico' }],
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="pt-BR">
      <body>
        <header className="container header" role="banner">
          <div className="brand">Blog <span style={{color:'var(--brand)'}}>Rosa Mar</span></div>
          <span className="badge" aria-label="compromisso smq">SMQ • SEO • A11y</span>
        </header>
        <main className="container" role="main">{children}</main>
        <footer className="container" role="contentinfo" style={{borderTop:'1px solid #eee', padding:'20px 0', marginTop:40}}>
          <small>© {new Date().getFullYear()} Rosa Mar • Conteúdo com carinho e rigor técnico.</small>
        </footer>
      </body>
    </html>
  );
}
