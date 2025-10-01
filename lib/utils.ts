export function formatDateISOToPt(dateISO: string) {
  const d = new Date(dateISO);
  return new Intl.DateTimeFormat('pt-BR', { dateStyle: 'long', timeZone: 'UTC' }).format(d);
}

export function excerpt(text: string, n = 160) {
  const plain = text.replace(/\*\*|\*|`|>\s?/g, '');
  return plain.length > n ? plain.slice(0, n).trim() + '…' : plain;
}
