import type {Client} from "@/model/types"
import {BACKEND_URL} from "@/socket/server"

/**
 * Fetches data from the specified URL using the given method, headers, and body.
 *
 * @param {string} url - The URL to fetch the data from.
 * @param {string} [method="GET"] - The HTTP method to use for the request. Default is "GET".
 * @param {HeadersInit} [headers] - The headers to include in the request.
 * @param {any} [body] - The body of the request.
 *
 * @returns {Promise<T>} - A promise that resolves to the fetched data.
 * @throws {Error} - If the response is not OK (status code 200).
 */
export async function fetchData<T>(
  url: string,
  method: string = "GET",
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

/**
 * Retrieves the current user's ID.
 *
 * @returns {Promise<number>} A promise that resolves to the current user's ID.
 *
 * @throws {Error} If the user is not authorized.
 */
export async function getCurrentUserId(): Promise<number> {
  const token: string | null = localStorage.getItem("auth_token")
  if (token) {
    const client: Client = await fetchData(`${BACKEND_URL}/auth/profile`, "GET", [["access_token", token]])
    return client.user_id as number
  }
  throw new Error("User not authorized")
}

/**
 * Returns the current timestamp formatted as a string in the format 'yyyy-mm-dd hh:mm:ss'.
 *
 * @return {string} The formatted timestamp.
 */
export function getFormattedTimestamp() {
  const now = new Date()
  const year = now.getFullYear()
  const month = String(now.getMonth() + 1).padStart(2, "0")
  const day = String(now.getDate()).padStart(2, "0")
  const hours = String(now.getHours()).padStart(2, "0")
  const minutes = String(now.getMinutes()).padStart(2, "0")
  const seconds = String(now.getSeconds()).padStart(2, "0")

  return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`
}