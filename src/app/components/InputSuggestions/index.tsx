import React, { ChangeEvent, useState, useCallback, useRef } from 'react'
import './styles.scss'

export interface InputSuggestions {
  placeHolder: string,
  onChange: (event: ChangeEvent<HTMLInputElement>) => void
  getSuggestions: (value: string) => string[]
}

export const InputSuggestions = ({ onChange, placeHolder, getSuggestions }: InputSuggestions) => {
  const [suggestions, setSuggestions] = useState([] as string[])
  const [value, setValue] = useState('')
  const inputEl = useRef<HTMLInputElement>(null)

  const handleInputOnChange = useCallback(async (event: ChangeEvent<HTMLInputElement>) => {
    if (!event.target.value.length) {
      setSuggestions([])
      setValue('')
      return
    } else {
      setSuggestions(getSuggestions(event.target.value))
    }

    setValue(event.target.value)
    onChange(event)
  }, [getSuggestions, onChange])

  const handleSuggestClick = (suggest: string) => {
    setValue(suggest)
  }

  return (
    <div className='wrapperInput'>
      <input ref={inputEl} onChange={handleInputOnChange} placeholder={placeHolder} value={value}></input>
      <ul>
        { suggestions.map((suggest: string) => <li key={suggest} onClick={() => handleSuggestClick(suggest)} onInput={(e) => { console.log('React:onChange') }}>{suggest}</li>)}
      </ul>
    </div>

  )
}
