export const toCnpj = (string: string): string => {
  if (string.length === 14) {
    return string.replace(/^(\d{2})(\d{3})(\d{3})(\d{4})(\d{2})/, '$1.$2.$3/$4-$5')
  } else if (string.length === 11) {
    return string.replace(/^(\d{3})(\d{3})(\d{3})(\d{2})/, '$1.$2.$3-$2')
  } else {
    return string
  }
}
