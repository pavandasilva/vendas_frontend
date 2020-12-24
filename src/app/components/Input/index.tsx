import React, {
  ChangeEvent,
  InputHTMLAttributes,
  ReactElement,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { FaEye, FaInfoCircle } from 'react-icons/fa'
import InputMask, { ReactInputMask } from 'react-input-mask'
import { IconType } from 'react-icons'
import { Wrapper, Container, IconPassword, Label, IconError, ToolTip, Icon } from './styles'
import { getIEMask, IEType } from '../../../helpers/getIEMask'
import { Modal } from '../Modal'
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: IconType
  title?: string
  error?: string
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
  width?: string;
  type?: 'cnpj' | 'cpf' | 'text' | 'password' | 'email' | 'cep' | 'ddd' | 'telefone' | 'celular' | IEType
  f2Title?: string
  f2Content?: React.ReactNode
  f2CallBack?: (value: any) => void
}

const isIeType = (type: string): boolean => type?.includes('ie-')

export const Input = ({
  startIcon: StartIcon,
  title, error,
  onChange,
  width,
  disabled,
  f2Title,
  f2Content,
  f2CallBack,
  type: typeProp,
  ...rest
}: InputProps) => {
  const [isActive, setIsActive] = useState(false)
  const [hasContent, setHasContent] = useState(false)
  const [type, setType] = useState('text')
  const [showPassword, setShowPassword] = useState(false)
  const [inputError, setInputError] = useState('')
  const [showToolTip, setShowToolTip] = useState(false)
  const [mask, setMask] = useState('')
  const [f2ModalIsvisible, setF2ModalIsvisible] = useState(false)
  const inputEl = useRef<ReactInputMask>({} as ReactInputMask)

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
      } else if (typeProp === 'password') {
        setType('password')
      }
    }
  }, [typeProp])

  useEffect(() => {
    setInputError(error as string)
  }, [error])

  useEffect(() => {
    const value = inputEl?.current?.props?.value?.toString().replace(/[^\w\s]/gi, '').replace(/_/g, '')

    if (value && value.length > 0) {
      setHasContent(true)
    } else {
      setHasContent(false)
    }
  }, [inputEl.current.props])

  useEffect(() => {
    if (typeProp === 'password') {
      setType(showPassword ? 'text' : 'password')
    }
  }, [showPassword, typeProp])

  const onFocus = useCallback(() => {
    setIsActive(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsActive(false)
  }, [])

  const handleOnMouseOver = useCallback(() => {
    setShowToolTip(true)
  }, [])

  const handleOnMouseOut = useCallback(() => {
    setShowToolTip(false)
  }, [])

  const handleOnKeyDown = useCallback((e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'F2') {
      setF2ModalIsvisible(true)
    }
  }, [])

  const F2Content = useCallback(() => {
    return React.cloneElement(f2Content as ReactElement, {
      close: () => setF2ModalIsvisible(false),
      callBack: f2CallBack
    })
  }, [f2CallBack, f2Content])

  return (
    <Wrapper className="wrapper-input" width={width}>
      {(!!title || (hasContent && !!title)) && <Label isActive={isActive || (!isActive && hasContent)}>{title}</Label> }
      <Container
        isActive={isActive}
        error={inputError}
        hasStartIcon={!!StartIcon}
        disabled={disabled}
        hasf2={!!f2Content}
      >
        {StartIcon && <Icon isActive={isActive} error={inputError} hasStartIcon={!!StartIcon}><StartIcon /></Icon>}

        <InputMask
          ref={inputEl}
          { ...rest}
          disabled={disabled}
          onFocus={onFocus}
          onBlur={onBlur}
          onKeyDown={handleOnKeyDown}
          onChange={onChange}
          type={type}
          mask={mask}
        />

        {typeProp === 'password' && (
          <IconPassword
            showPassword={showPassword}
            onClick={() => setShowPassword(sp => !sp)}
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

      {(!!f2Content && f2ModalIsvisible) &&
      <Modal title={f2Title} close={() => setF2ModalIsvisible(false)} >{f2Content && <F2Content/>} </Modal>}
    </Wrapper>
  )
}
