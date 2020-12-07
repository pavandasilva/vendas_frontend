import React from 'react'
import { FaSearch } from 'react-icons/fa'
import { MainLayout } from '../../layouts/MainLayout'
import { Input } from '../../components'

import { Container } from './styles'

export const DashBoard = () => {
  return (
    <MainLayout title="DashBoard">
      <Container>
        <header>
          <div>
            <Input type='text' startIcon={FaSearch} error="test"/>
          </div>
        </header>
      </Container>
    </MainLayout>
  )
}
