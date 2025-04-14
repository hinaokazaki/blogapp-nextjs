export const fetcher = async <T = any> (url: string): Promise<T> => {
  const res = await fetch(url);
  if(!res.ok) throw new Error('API fetch failed');
  return res.json();
} 