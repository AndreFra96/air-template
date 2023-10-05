export async function fetchWithTimeout(
  input: RequestInfo | URL,
  timeout: number,
  init?: RequestInit | undefined
): Promise<Response> {
  const controller = new AbortController();
  const id = setTimeout(() => controller.abort(), timeout);

  const response = await fetch(input, {
    ...init,
    signal: controller.signal,
  });
  clearTimeout(id);

  return response;
}
