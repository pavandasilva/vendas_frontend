import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useState
} from 'react'

import { FaEye, FaInfoCircle } from 'react-icons/fa'
import InputMask from 'react-input-mask'
import { IconType } from 'react-icons'
import { Wrapper, Container, IconPassword, Label, IconError, ToolTip } from './styles'
import { getIEMask, IEType } from '../../../helpers/getIEMask'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: IconType;
  title?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
  width?: string;
  type?: 'cnpj' | 'cpf' | 'text' | 'password' | 'email' | 'cep' | 'ddd' | 'telefone' | 'celular' | IEType
}

const isIeType = (type: string): boolean => type?.includes('ie-')

export const Input = ({ startIcon: StartIcon, title, error, onChange, width, type: typeProp, ...rest }: InputProps) => {
  const [isActive, setIsActive] = useState(false)
  const [hasContent, setHasContent] = useState(false)
  const [type] = useState('text')
  const [showPassword, setShowPassword] = useState(false)
  const [inputError, setInputError] = useState('')
  const [showToolTip, setShowToolTip] = useState(false)
  const [mask, setMask] = useState('')
  /*   const inputEl = useRef((undefined as unknown) as Props) */

  useEffect(() => {
    if (isIeType(typeProp as string)) {
      setMask(getIEMask(typeProp as IEType))
    } else {
      if (typeProp === 'cnpj') {
        setMask('99.999.999/9999-99')
      } else if (typeProp === 'cpf') {
        setMask('999.999.999-99')
      } else if (typeProp === 'cep') {
        setMask('99999-999')
      } else if (typeProp === 'ddd') {
        setMask('99')
      } else if (typeProp === 'telefone') {
        setMask('9999-9999')
      } else if (typeProp === 'celular') {
        setMask('99999-9999')
      }
    }
  }, [typeProp])

  useEffect(() => {
    setInputError(error as string)
  }, [error])

  /*  useEffect(() => {
    if (isActive) {
      inputEl?.current?.setAttribute('placeholder', '')
    } else {
      inputEl?.current?.setAttribute('placeholder', memoPlaceholder)
    }
  }, [isActive, memoPlaceholder])
 */
  /*   const handleContainerOnClick = useCallback(() => {
    inputEl?.current?.focus()
  }, []) */

  const onFocus = useCallback(() => {
    setIsActive(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsActive(false)
  }, [])

  const handleIconPasswordOnClick = useCallback(() => {
    setShowPassword(sp => {
      const show = !sp

      /*    if (show) {
        inputEl.current.setAttribute('type', 'text')
      } else {
        inputEl.current.setAttribute('type', 'password')
      } */

      return show
    })
  }, [])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputError('')
    onChange && onChange(e)

    if (e?.currentTarget?.value?.length) {
      setHasContent(true)
    } else {
      setHasContent(false)
    }
  }, [onChange])

  const handleOnMouseOver = useCallback(() => {
    setShowToolTip(true)
  }, [])

  const handleOnMouseOut = useCallback(() => {
    setShowToolTip(false)
  }, [])

  return (
    <Wrapper className="wrapper-input" width={width}>
      {(!!title || (hasContent && !!title)) && <Label isActive={isActive || (!isActive && hasContent)}>{title}</Label> }
      <Container isActive={isActive} error={inputError} /* onClick={handleContainerOnClick} */ hasStartIcon={!!StartIcon}>
        {StartIcon && <div><StartIcon /></div>}
        <InputMask
          { ...rest}
          onFocus={onFocus}
          onBlur={onBlur}
          onChange={handleOnChange}
          type={type}
          mask={mask}
        />

        {type === 'password' && (

          <IconPassword
            showPassword={showPassword}
            onClick={handleIconPasswordOnClick}
          >
            <FaEye />
          </IconPassword>

        )}

        { !!inputError && (
          <IconError error={inputError}>
            <FaInfoCircle onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}/>
          </IconError>
        )}
        {showToolTip && <ToolTip><span>{error}</span></ToolTip>}
      </Container>
    </Wrapper>
  )
}
