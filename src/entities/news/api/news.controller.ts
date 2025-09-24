export const fetchNews = async () => {
  const response = await fetch('/api/news')
  return response.json()
}
