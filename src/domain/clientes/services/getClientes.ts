import useSWR from 'swr'

export function getClientes (url: string) {
  // eslint-disable-next-line react-hooks/rules-of-hooks
  const { data, error } = useSWR(url, async url => {
    const response = await fetch(url)
    const data = await response.json()

    return data
  })

  return { data, error }
}
