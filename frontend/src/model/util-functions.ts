export async function fetchData<T>(
  url: string, method: string = "GET",
  headers?: HeadersInit,
  body?: any,
): Promise<T> {
  const response = await fetch(
    url,
    {
      method,
      headers,
      body: body ? JSON.stringify(body) : null,
    },
  )
  if (!response.ok) {
    throw new Error(response.statusText)
  }
  return await response.json() as Promise<T>
}