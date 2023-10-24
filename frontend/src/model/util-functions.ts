/**
 * Fetches data from the given URL using the specified method, headers, and request body.
 *
 * @param {string} url - The URL from which to fetch the data.
 * @param {string} method - The HTTP method to use (default: "GET").
 * @param {string[][]} headers - The array of header key-value pairs.
 * @param {Object} body - The request body (optional).
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - If the response status is not OK.
 */
export async function fetchData<T>(url: string, method: string = "GET", headers?: string[][], body?: any): Promise<T> {
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