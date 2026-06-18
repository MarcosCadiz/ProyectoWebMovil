export function normalizeDatabaseUrl(databaseUrl = '') {
  if (!databaseUrl) return '';

  const parsed = new URL(databaseUrl);
  parsed.searchParams.delete('sslmode');
  parsed.searchParams.delete('channel_binding');
  return parsed.toString();
}
