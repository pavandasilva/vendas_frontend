export const getIEMask = (uf: string): string => {
  let mask = ''

  if (!uf) {
    return ''
  }

  switch (uf) {
    case 'AC':
      mask = '99.999.999/999-99'
      break
    case 'AL':
      mask = '999999999'
      break
    case 'AP':
      mask = '999999999'
      break
    case 'BA':
      mask = '999999-99'
      break
    case 'CE':
      mask = '99999999-9'
      break
    case 'DF':
      mask = '99999999999-99'
      break
    case 'ES':
      mask = '99999999-9'
      break
    case 'GO':
      mask = '99.999.999-9'
      break
    case 'MA':
      mask = '99999999-9'
      break
    case 'MT':
      mask = '9999999999-9'
      break
    case 'MS':
      mask = '99999999-9'
      break
    case 'MG':
      mask = '999.999.999/9999'
      break
    case 'PA':
      mask = '99-999999-9'
      break
    case 'PB':
      mask = '99999999-9'
      break
    case 'PR':
      mask = '999.99999-99'
      break
    case 'PE':
      mask = '9999999-99'
      break
    case 'PI':
      mask = '99999999-9'
      break
    case 'RJ':
      mask = '99.999.99-9'
      break
    case 'RN':
      mask = '99.999.999-9'
      break
    case 'RS':
      mask = '999/9999999'
      break
    case 'RO':
      mask = '9999999999999-9'
      break
    case 'RR':
      mask = '99999999-9'
      break
    case 'SP':
      mask = '999.999.999.999'
      break
    case 'SC':
      mask = '999.999.999'
      break
    case 'SE':
      mask = '99999999-9'
      break
    case 'TO':
      mask = '9999999999-9'
      break
  }

  return mask
}
