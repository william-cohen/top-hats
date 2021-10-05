export const backend = async <T>(
  target: string,
  data: Record<string, string>
): Promise<T | Error> => {
  const formData = new FormData()

  for (const pair of Object.entries(data)) {
    formData.append(pair[0], pair[1])
  }
  try {
    const response = await fetch(`/backend/${target}`, {
      method: 'POST',
      body: formData
    })
    const jsonResponse = await response.json()
    return jsonResponse as T
  } catch (err) {
    if (err instanceof Error) {
      return err
    }
    if (typeof err === 'string') {
      return Error(err)
    }
    console.warn(err)
    return Error('Something went wrong')
  }
}
