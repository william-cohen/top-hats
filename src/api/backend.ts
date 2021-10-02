export const backend = async <T>(
  target: string,
  data: Record<string, string>
): Promise<T> => {
  const formData = new FormData()

  for (const pair of Object.entries(data)) {
    formData.append(pair[0], pair[1])
  }
  const request = await fetch(`/backend/${target}`, {
    method: 'POST',
    body: formData
  })
  const jsonResponse = await request.json()
  return jsonResponse as T
}
