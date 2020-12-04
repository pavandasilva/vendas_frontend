import React from 'react'
import { Container } from './styles'

interface AvatarProps {
  imgUrl?: string
  size: number
}

export const Avatar = ({ imgUrl, size }: AvatarProps) => {
  return (
    <Container size={size}>
      {/* {!!imgUrl && <img src={imgUrl} alt='' />} */}
      <img src='https://www.w3schools.com/howto/img_avatar.png' alt='' />
    </Container>
  )
}
