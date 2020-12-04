import React, {
  ChangeEvent,
  InputHTMLAttributes,
  useCallback,
  useEffect,
  useRef,
  useState
} from 'react'

import { FaEye, FaInfoCircle } from 'react-icons/fa'
import { IconType } from 'react-icons'
import { Container, IconPassword, Label, IconError, ToolTip } from './styles'

interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  startIcon?: IconType;
  title?: string;
  error?: string;
  onChange?: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Input = ({ startIcon: StartIcon, title, error, onChange, ...rest }: InputProps) => {
  const [isActive, setIsActive] = useState(false)
  const [showPassword, setShowPassword] = useState(false)
  const [memoPlaceholder, setMemoPlaceHolder] = useState('')
  const [inputError, setInputError] = useState('')
  const [showToolTip, setShowToolTip] = useState(false)
  const inputEl = useRef((undefined as unknown) as HTMLInputElement)

  useEffect(() => {
    setInputError(error as string)
  }, [error])

  useEffect(() => {
    if (rest?.placeholder) {
      setMemoPlaceHolder(rest.placeholder)
    }
  }, [rest.placeholder, setMemoPlaceHolder])

  useEffect(() => {
    if (isActive) {
      inputEl?.current?.setAttribute('placeholder', '')
    } else {
      inputEl?.current?.setAttribute('placeholder', memoPlaceholder)
    }
  }, [isActive, memoPlaceholder])

  const handleContainerOnClick = useCallback(() => {
    inputEl?.current?.focus()
  }, [])

  const onFocus = useCallback(() => {
    setIsActive(true)
  }, [])

  const onBlur = useCallback(() => {
    setIsActive(false)
  }, [])

  const handleIconPasswordOnClick = useCallback(() => {
    setShowPassword(sp => {
      const show = !sp

      if (show) {
        inputEl.current.setAttribute('type', 'text')
      } else {
        inputEl.current.setAttribute('type', 'password')
      }

      return show
    })
  }, [])

  const handleOnChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setInputError('')
    onChange && onChange(e)
  }, [onChange])

  const handleOnMouseOver = useCallback(() => {
    setShowToolTip(true)
  }, [])

  const handleOnMouseOut = useCallback(() => {
    setShowToolTip(false)
  }, [])

  return (
    <>
      <Label isActive={isActive}>{title}</Label>
      <Container isActive={isActive} error={inputError} onClick={handleContainerOnClick}>
        <div>{StartIcon && <StartIcon />}</div>
        <input ref={inputEl} onFocus={onFocus} onBlur={onBlur} {...rest} onChange={handleOnChange}/>
        {rest.type === 'password' && (

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
    </>
  )
}
