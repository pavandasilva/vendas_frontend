export const formatFloatToCurrency = (float: number) => {
  return new Intl.NumberFormat('de-DE').format(float)
}
