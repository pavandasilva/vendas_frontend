import React from 'react'
import { Layout } from '../Layout'
import { Clientes } from '../../components'

export const DashBoard: React.FC = () => {
  return (
    <Layout title="Dashboard">
      <div id="container" className="container-fluid">
        <Clientes />
      </div>
    </Layout>
  )
}
