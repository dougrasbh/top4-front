export function formatDate(date: Date): string {
  // Meses abreviados em português
  const months = [
    'Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun',
    'Jul', 'Ago', 'Set', 'Out', 'Nov', 'Dez'
  ];

  const day = date.getDate();
  const month = months[date.getMonth()];
  const year = date.getFullYear();

  // Hora e minuto formatados
  const hours = String(date.getHours()).padStart(2, '0');
  const minutes = String(date.getMinutes()).padStart(2, '0');

  // Construir a string no formato desejado
  return `${month} ${day}, ${year} • ${hours}:${minutes}`;
}
