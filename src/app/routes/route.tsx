import React, { ComponentType } from 'react'
import { Route as ReactRoute, Redirect, RouteProps } from 'react-router-dom'
import { useUsuario } from '../hooks/contexts'

interface PrivateRouteProps extends RouteProps{
  component: ComponentType,
  isPrivate?: boolean
}

export function Route ({
  component: Component,
  isPrivate = false,
  ...rest
}: PrivateRouteProps) {
  const { data } = useUsuario()
  // const signed = !!data?.id

  const signed = true

  return (
    <ReactRoute {...rest}
      render={() => {
        if (isPrivate && !signed) {
          return <Redirect to={{ pathname: '/login' }}/>
        } else if (isPrivate && signed) {
          return <Component/>
        } else {
          return <Component/>
        }
      }}
    />)
}
