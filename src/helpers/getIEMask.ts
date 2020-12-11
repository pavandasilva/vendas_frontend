export type IEType =
  'ie-AC' |
  'ie-AL' |
  'ie-AP' |
  'ie-BA' |
  'ie-CE' |
  'ie-DF' |
  'ie-ES' |
  'ie-GO' |
  'ie-MA' |
  'ie-MT' |
  'ie-MS' |
  'ie-MG' |
  'ie-PA' |
  'ie-PB' |
  'ie-PR' |
  'ie-PE' |
  'ie-PI' |
  'ie-RJ' |
  'ie-RN' |
  'ie-RS' |
  'ie-RO' |
  'ie-RR' |
  'ie-SP' |
  'ie-SC' |
  'ie-SE' |
  'ie-TO'

export const getIEMask = (uf: IEType): string => {
  let mask = ''

  if (!uf) {
    return ''
  }

  switch (uf) {
    case 'ie-AC':
      mask = '99.999.999/999-99'
      break
    case 'ie-AL':
      mask = '999999999'
      break
    case 'ie-AP':
      mask = '999999999'
      break
    case 'ie-BA':
      mask = '999999-99'
      break
    case 'ie-CE':
      mask = '99999999-9'
      break
    case 'ie-DF':
      mask = '99999999999-99'
      break
    case 'ie-ES':
      mask = '99999999-9'
      break
    case 'ie-GO':
      mask = '99.999.999-9'
      break
    case 'ie-MA':
      mask = '99999999-9'
      break
    case 'ie-MT':
      mask = '9999999999-9'
      break
    case 'ie-MS':
      mask = '99999999-9'
      break
    case 'ie-MG':
      mask = '999.999.999/9999'
      break
    case 'ie-PA':
      mask = '99-999999-9'
      break
    case 'ie-PB':
      mask = '99999999-9'
      break
    case 'ie-PR':
      mask = '999.99999-99'
      break
    case 'ie-PE':
      mask = '9999999-99'
      break
    case 'ie-PI':
      mask = '99999999-9'
      break
    case 'ie-RJ':
      mask = '99.999.99-9'
      break
    case 'ie-RN':
      mask = '99.999.999-9'
      break
    case 'ie-RS':
      mask = '999/9999999'
      break
    case 'ie-RO':
      mask = '9999999999999-9'
      break
    case 'ie-RR':
      mask = '99999999-9'
      break
    case 'ie-SP':
      mask = '999.999.999.999'
      break
    case 'ie-SC':
      mask = '999.999.999'
      break
    case 'ie-SE':
      mask = '99999999-9'
      break
    case 'ie-TO':
      mask = '9999999999-9'
      break
    default:
      mask = ''
  }

  return mask
}
