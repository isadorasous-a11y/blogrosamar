import Link from 'next/link';

export default function NotFound() {
  return (
    <div className="article">
      <h1>Conteúdo não encontrado</h1>
      <p className="meta">Talvez o link tenha mudado. Vamos voltar para a <Link href="/">página inicial</Link>?</p>
    </div>
  );
}
