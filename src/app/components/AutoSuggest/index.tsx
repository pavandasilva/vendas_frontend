import React, { useState, useCallback, useMemo } from 'react'
import Autosuggest from 'react-autosuggest'

interface Suggestion {
  name: string
  year: number
}

const languages = [
  'elme',
  'teste'
]

interface SuggestionsFetchRequestedParams {
  value: string
}

export const AutoSuggestExample = () => {
  const [value, setValue] = useState('')
  const [suggestions, setSuggestions] = useState(languages)

  const getSuggestionValue = useCallback((suggestion: string) => { return suggestion }, [])

  const renderSuggestion = useCallback((suggestion: string) => (
    <div>
      {suggestion }
    </div>
  ), [])

  const onSuggestionsFetchRequested = useCallback(({ value }: SuggestionsFetchRequestedParams) => {
    setSuggestions(languages)
  }, [])

  const onSuggestionsClearRequested = useCallback(() => {
    setSuggestions([])
  }, [])

  const onChange = useCallback((event: React.ChangeEvent<HTMLInputElement>, { newValue }) => {
    setValue(newValue)
  }, [])

  const inputProps = useMemo(() => ({
    placeholder: 'Type a programming language',
    value,
    onChange
  }), [onChange, value])

  return (
    <Autosuggest
      suggestions={suggestions}
      onSuggestionsFetchRequested={onSuggestionsFetchRequested}
      onSuggestionsClearRequested={onSuggestionsClearRequested}
      getSuggestionValue={getSuggestionValue}
      renderSuggestion={renderSuggestion}
      inputProps={inputProps}
    />
  )
}
