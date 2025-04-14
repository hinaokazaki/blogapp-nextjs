export const fetcherWithToken = async <T = any> (url: string, token: string): Promise<T> => {
  const res = await fetch(url, {
    headers: {
      'Content-Type': 'application/json',
      'Authorization': `${token}`,
    },
  });
  if(!res.ok) throw new Error('API fetch failed');
  return res.json();
}