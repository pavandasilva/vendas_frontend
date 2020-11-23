import React from 'react'
import { Layout } from '../Layout'
import { ListaClientesFidelizados } from '../../components'

export const DashBoard: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <div id="container" className="container-fluid">
        <ListaClientesFidelizados />
      </div>
    </Layout>
  )
}
